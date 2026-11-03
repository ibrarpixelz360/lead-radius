<?php

use App\Jobs\RunLeadScraperJob;
use App\Models\Lead;
use App\Models\LeadCategory;
use App\Models\LeadScraperBatch;
use App\Models\LeadScraperLog;
use App\Models\User;
use App\Services\ScraperService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;

uses(RefreshDatabase::class);

beforeEach(function () {
    LeadCategory::firstOrCreate(['name' => 'Plumber']);
    LeadCategory::firstOrCreate(['name' => 'Electrician']);
});

it('renders client lead generator on /leads/search and /leads/generator', function (string $url) {
    $user = User::factory()->create([
        'status'         => 'active',
        'trial_ends_at'  => now()->addDays(7),
        'avatar_path'    => null,
        'last_login_at'  => null,
    ]);

    $response = $this->actingAs($user)->get($url);

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Leads/Search')
        ->has('predefined_categories')
        ->has('australian_states')
        ->has('recent_batches')
    );
})->with(['/leads/search', '/leads/generator']);

it('allows client to start a lead generator batch', function () {
    Queue::fake([RunLeadScraperJob::class]);

    $user = User::factory()->create([
        'status'         => 'active',
        'trial_ends_at'  => now()->addDays(7),
        'avatar_path'    => null,
        'last_login_at'  => null,
    ]);

    $payload = [
        'keywords'        => ['Plumber', 'Electrician'],
        'selected_states' => ['NSW', 'VIC'],
        'limit'           => 50,
    ];

    $response = $this->actingAs($user)->postJson(route('leads.generator.start'), $payload);

    $response->assertOk();
    $response->assertJsonStructure([
        'success',
        'batch_id',
        'search_id',
        'total_jobs',
        'message',
    ]);

    $batchId = $response->json('batch_id');
    expect(LeadScraperBatch::find($batchId))->not->toBeNull();
    expect(LeadScraperBatch::find($batchId)->user_id)->toBe($user->id);
});

it('validates keywords and location for client generator', function () {
    $user = User::factory()->create([
        'status'         => 'active',
        'trial_ends_at'  => now()->addDays(7),
        'avatar_path'    => null,
        'last_login_at'  => null,
    ]);

    // Missing locations
    $response = $this->actingAs($user)->postJson(route('leads.generator.start'), [
        'keywords' => ['Plumber'],
    ]);

    $response->assertStatus(422);
});

it('returns real-time status and logs for client batch polling', function () {
    $user = User::factory()->create([
        'status'         => 'active',
        'trial_ends_at'  => now()->addDays(7),
        'avatar_path'    => null,
        'last_login_at'  => null,
    ]);

    $batch = LeadScraperBatch::create([
        'user_id'         => $user->id,
        'query'           => ['Plumber'],
        'location'        => ['Sydney NSW, Australia'],
        'source'          => 'google_maps',
        'total_jobs'      => 1,
        'completed_jobs'  => 1,
        'failed_jobs'     => 0,
        'found_leads'     => 5,
        'total_requested' => 10,
        'status'          => 'completed',
    ]);

    LeadScraperLog::info($batch->id, 'Scraped 5 leads successfully');

    $response = $this->actingAs($user)->getJson(route('leads.generator.batches.status', $batch->id));

    $response->assertOk();
    $response->assertJson([
        'id'             => $batch->id,
        'status'         => 'completed',
        'total_jobs'     => 1,
        'completed_jobs' => 1,
        'found_leads'    => 5,
        'is_finished'    => true,
    ]);
    expect($response->json('logs'))->toHaveCount(1);
});

it('prevents clients from viewing or exporting other users batches', function () {
    $owner = User::factory()->create([
        'status'         => 'active',
        'trial_ends_at'  => now()->addDays(7),
        'avatar_path'    => null,
        'last_login_at'  => null,
    ]);

    $stranger = User::factory()->create([
        'status'         => 'active',
        'trial_ends_at'  => now()->addDays(7),
        'avatar_path'    => null,
        'last_login_at'  => null,
    ]);

    $batch = LeadScraperBatch::create([
        'user_id'         => $owner->id,
        'query'           => ['Dentist'],
        'location'        => ['Perth WA, Australia'],
        'source'          => 'google_maps',
        'total_jobs'      => 1,
        'completed_jobs'  => 1,
        'failed_jobs'     => 0,
        'found_leads'     => 3,
        'total_requested' => 10,
        'status'          => 'completed',
    ]);

    $response = $this->actingAs($stranger)->getJson(route('leads.generator.batches.status', $batch->id));
    $response->assertForbidden();

    $exportResponse = $this->actingAs($stranger)->get(route('leads.generator.batches.export', $batch->id));
    $exportResponse->assertForbidden();
});

it('exports client batch leads to CSV', function () {
    $user = User::factory()->create([
        'status'         => 'active',
        'trial_ends_at'  => now()->addDays(7),
        'avatar_path'    => null,
        'last_login_at'  => null,
    ]);

    $batch = LeadScraperBatch::create([
        'user_id'         => $user->id,
        'query'           => ['Plumber'],
        'location'        => ['Sydney NSW, Australia'],
        'source'          => 'google_maps',
        'total_jobs'      => 1,
        'completed_jobs'  => 1,
        'failed_jobs'     => 0,
        'found_leads'     => 1,
        'total_requested' => 10,
        'status'          => 'completed',
    ]);

    Lead::create([
        'business_name'         => 'Sydney Premier Plumbing',
        'category'              => 'Plumber',
        'city'                  => 'Sydney',
        'state'                 => 'NSW',
        'country'               => 'Australia',
        'phone'                 => '+61298765432',
        'lead_scraper_batch_id' => $batch->id,
    ]);

    $response = $this->actingAs($user)->get(route('leads.generator.batches.export', $batch->id));

    $response->assertOk();
    expect($response->headers->get('content-type'))->toContain('text/csv');
});
