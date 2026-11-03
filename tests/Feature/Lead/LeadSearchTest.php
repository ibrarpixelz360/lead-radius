<?php

use App\Domains\Lead\Jobs\GenerateLeadsJob;
use App\Domains\Subscription\Actions\CreateTrialSubscriptionAction;
use App\Models\SavedSearch;
use App\Models\Search;
use App\Models\User;
use Illuminate\Support\Facades\Queue;

beforeEach(function () {
    Queue::fake();
    $this->user = User::factory()->create();
    app(CreateTrialSubscriptionAction::class)->execute($this->user);
});

it('renders the lead search form for subscribed users', function () {
    $this->actingAs($this->user)
        ->get('/leads/search')
        ->assertOk()
        ->assertInertia(fn ($p) => $p->component('Leads/Search'));
});

it('submits a search and queues the scrape job', function () {
    $this->actingAs($this->user)->post('/leads/search', [
        'country' => 'PK',
        'state' => 'Sindh',
        'city' => 'Karachi',
        'query' => 'dentist',
        'radius_km' => 10,
    ])->assertRedirect();

    $search = Search::latest()->first();

    expect($search)->not->toBeNull()
        ->and($search->user_id)->toBe($this->user->id)
        ->and($search->status)->toBe('queued')
        ->and($search->city)->toBe('Karachi')
        ->and($search->query)->toBe('dentist');

    Queue::assertPushed(GenerateLeadsJob::class);
});

it('saves the search when save_search is checked', function () {
    $this->actingAs($this->user)->post('/leads/search', [
        'country' => 'PK',
        'city' => 'Lahore',
        'query' => 'plumber',
        'save_search' => true,
        'save_search_name' => 'Lahore plumbers',
    ]);

    expect(SavedSearch::where('user_id', $this->user->id)->where('name', 'Lahore plumbers')->exists())
        ->toBeTrue();
});

it('rejects searches without an active subscription or trial', function () {
    $banned = User::factory()->create(['trial_ends_at' => now()->subDay()]);
    // No subscription created

    $this->actingAs($banned)->post('/leads/search', [
        'country' => 'PK',
        'city' => 'Karachi',
        'query' => 'cafe',
    ])->assertRedirect(); // Redirected to billing

    Queue::assertNothingPushed();
});

it('validates required fields', function () {
    $this->actingAs($this->user)->post('/leads/search', [])
        ->assertSessionHasErrors(['country', 'city', 'query']);
});

it('cancels a queued search', function () {
    $search = Search::create([
        'user_id' => $this->user->id,
        'country' => 'PK', 'city' => 'Karachi', 'query' => 'test',
        'status' => 'queued',
    ]);

    $this->actingAs($this->user)
        ->post(route('leads.searches.cancel', $search))
        ->assertRedirect();

    expect($search->fresh()->status)->toBe('cancelled');
});

it('returns search status as JSON for polling', function () {
    $search = Search::create([
        'user_id' => $this->user->id,
        'country' => 'PK', 'city' => 'Karachi', 'query' => 'test',
        'status' => 'running', 'results_count' => 12,
    ]);

    $this->actingAs($this->user)
        ->get(route('leads.searches.status', $search))
        ->assertOk()
        ->assertJson([
            'status' => 'running',
            'results_count' => 12,
        ]);
});
