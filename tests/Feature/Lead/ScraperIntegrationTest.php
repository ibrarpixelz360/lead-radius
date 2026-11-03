<?php

use App\Domains\Lead\Jobs\EnrichLeadJob;
use App\Models\Lead;
use App\Models\LeadCategory;
use App\Models\LeadScraperBatch;
use App\Models\LeadScraperLog;
use App\Models\User;
use App\Services\PythonProcessService;
use App\Services\ScraperService;
use Illuminate\Support\Facades\Queue;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    // Ensure roles exist
    Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
    Role::firstOrCreate(['name' => 'super_admin', 'guard_name' => 'web']);
    Role::firstOrCreate(['name' => 'user', 'guard_name' => 'web']);
});

it('allows admin to access /admin/generator-new', function () {
    $admin = User::factory()->create([
        'status' => 'active',
    ]);
    $admin->assignRole('admin');

    $response = $this->actingAs($admin)->get('/admin/generator-new');

    $response->assertSuccessful();
    $response->assertSee('Lead Generator (Google Maps)');
});

it('allows regular clients and users to access /admin/generator-new', function () {
    $client = User::factory()->create([
        'status' => 'active',
    ]);
    $client->assignRole('user');

    $response = $this->actingAs($client)->get('/admin/generator-new');

    $response->assertSuccessful();
    $response->assertSee('Lead Generator (Google Maps)');
});

it('denies unauthenticated guests from accessing /admin/generator-new', function () {
    $response = $this->get('/admin/generator-new');

    $response->assertRedirect('/admin/login');
});

it('denies banned users from accessing /admin/generator-new', function () {
    $bannedUser = User::factory()->create([
        'status' => 'banned',
    ]);
    $bannedUser->assignRole('user');

    $response = $this->actingAs($bannedUser)->get('/admin/generator-new');

    $response->assertForbidden();
});

it('creates batch and logs initialization', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $scraperService = app(ScraperService::class);

    $batch = $scraperService->createBatch(
        categories: ['Car dealer', 'Electrician'],
        locations: ['Brisbane QLD, Australia'],
        limit: 20,
        userId: $admin->id,
        source: 'google_maps',
    );

    expect($batch)->toBeInstanceOf(LeadScraperBatch::class)
        ->and($batch->total_jobs)->toBe(2)
        ->and($batch->status)->toBe('processing')
        ->and($batch->user_id)->toBe($admin->id);

    $log = LeadScraperLog::where('lead_scraper_batch_id', $batch->id)->first();
    expect($log)->not->toBeNull()
        ->and($log->level)->toBe('info');
});

it('processes scraper results and stores normalized leads with deduplication and scoring', function () {
    Queue::fake([EnrichLeadJob::class]);

    $admin = User::factory()->create();
    $admin->assignRole('admin');

    // Mock PythonProcessService to return predictable data without hitting external network
    $mockPython = Mockery::mock(PythonProcessService::class);
    $mockPython->shouldReceive('runScraper')
        ->once()
        ->with('Plumber', 'Brisbane QLD, Australia', 10, Mockery::any(), 'google_maps')
        ->andReturn([
            'leads' => [
                [
                    'google_id' => 'ChIJ_TEST_PLUMBER_001',
                    'displayName' => 'Brisbane Premier Plumbing',
                    'business_type' => 'Plumber',
                    'internationalPhoneNumber' => '+61 7 3000 1111',
                    'websiteUri' => 'https://brisbaneplumbing.com.au',
                    'formattedAddress' => '123 Queen St, Brisbane QLD 4000',
                    'state' => 'QLD',
                    'rating' => 4.8,
                    'user_rating_count' => 85,
                ],
                [
                    'google_id' => 'ChIJ_TEST_PLUMBER_002',
                    'displayName' => 'Rapid Emergency Plumbers',
                    'business_type' => 'Plumber',
                    'internationalPhoneNumber' => '+61 7 3000 2222',
                    'websiteUri' => '',
                    'formattedAddress' => '456 Ann St, Brisbane QLD 4000',
                    'state' => 'QLD',
                    'rating' => 4.2,
                    'user_rating_count' => 15,
                ],
            ],
            'meta' => [
                'total_found' => 2,
            ],
        ]);

    $this->app->instance(PythonProcessService::class, $mockPython);

    $scraperService = app(ScraperService::class);

    $batch = $scraperService->createBatch(
        categories: ['Plumber'],
        locations: ['Brisbane QLD, Australia'],
        limit: 10,
        userId: $admin->id,
    );

    $inserted = $scraperService->scrape(
        query: 'Plumber',
        location: 'Brisbane QLD, Australia',
        limit: 10,
        batchId: $batch->id,
        userId: $admin->id,
    );

    expect($inserted)->toBe(2);

    $lead1 = Lead::where('google_place_id', 'ChIJ_TEST_PLUMBER_001')->first();
    expect($lead1)->not->toBeNull()
        ->and($lead1->business_name)->toBe('Brisbane Premier Plumbing')
        ->and($lead1->state)->toBe('QLD')
        ->and($lead1->country)->toBe('Australia')
        ->and($lead1->ai_score)->not->toBeNull()
        ->and($lead1->lead_scraper_batch_id)->toBe($batch->id);

    // Verify user attachment via lead_user pivot
    expect($admin->leads()->where('lead_id', $lead1->id)->exists())->toBeTrue();

    // Verify batch progress update
    $batch->refresh();
    expect($batch->completed_jobs)->toBe(1)
        ->and($batch->found_leads)->toBe(2)
        ->and($batch->status)->toBe('completed');
});

it('gracefully handles scraper failure and logs error', function () {
    $mockPython = Mockery::mock(PythonProcessService::class);
    $mockPython->shouldReceive('runScraper')
        ->once()
        ->andThrow(new \RuntimeException('Connection timed out to Google Maps'));

    $this->app->instance(PythonProcessService::class, $mockPython);

    $scraperService = app(ScraperService::class);

    $batch = $scraperService->createBatch(
        categories: ['FailedCategory'],
        locations: ['Sydney NSW, Australia'],
        limit: 10,
    );

    try {
        $scraperService->scrape(
            query: 'FailedCategory',
            location: 'Sydney NSW, Australia',
            limit: 10,
            batchId: $batch->id,
        );
    } catch (\Throwable $e) {
        expect($e->getMessage())->toContain('Connection timed out');
    }

    $batch->refresh();
    expect($batch->failed_jobs)->toBe(1)
        ->and($batch->status)->toBe('failed');

    $errorLog = LeadScraperLog::where('lead_scraper_batch_id', $batch->id)
        ->where('level', 'error')
        ->first();

    expect($errorLog)->not->toBeNull()
        ->and($errorLog->message)->toContain('Scrape execution failed');
});

it('exports batch leads to CSV cleanly', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $batch = LeadScraperBatch::create([
        'user_id' => $admin->id,
        'query' => ['Dentist'],
        'location' => ['Perth WA, Australia'],
        'status' => 'completed',
        'found_leads' => 1,
        'total_jobs' => 1,
        'completed_jobs' => 1,
    ]);

    Lead::create([
        'lead_scraper_batch_id' => $batch->id,
        'google_place_id' => 'ChIJ_DENTIST_PERTH',
        'business_name' => 'Perth Dental Clinic',
        'category' => 'Dentist',
        'city' => 'Perth',
        'state' => 'WA',
        'country' => 'Australia',
        'phone' => '+61 8 9000 1234',
        'website' => 'https://perthdental.com.au',
        'rating' => 4.9,
        'reviews_count' => 120,
    ]);

    $page = new \App\Filament\Pages\GeneratorNew();
    $response = $page->exportBatchCsv($batch->id);

    expect($response)->toBeInstanceOf(\Symfony\Component\HttpFoundation\StreamedResponse::class);
    expect($response->headers->get('content-type'))->toBe('text/csv; charset=UTF-8');
});
