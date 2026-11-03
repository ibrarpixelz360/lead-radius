<?php

use App\Domains\Lead\Services\LeadDeduplicator;
use App\Models\Lead;

beforeEach(function () {
    $this->dedup = app(LeadDeduplicator::class);
});

it('creates a new lead when google_place_id is unseen', function () {
    [$lead, $created] = $this->dedup->upsert([
        'google_place_id' => 'CHJ_NEWPLACE_001',
        'business_name' => 'Test Cafe',
        'city' => 'Karachi',
        'country' => 'PK',
    ]);

    expect($created)->toBeTrue()
        ->and($lead->business_name)->toBe('Test Cafe');
});

it('matches existing lead by google_place_id', function () {
    Lead::factory()->create([
        'google_place_id' => 'CHJ_EXISTING_001',
        'business_name' => 'Original Name',
        'email' => 'old@example.com',
    ]);

    [$lead, $created] = $this->dedup->upsert([
        'google_place_id' => 'CHJ_EXISTING_001',
        'business_name' => 'Updated Name',
        'rating' => 4.5,
    ]);

    expect($created)->toBeFalse()
        ->and($lead->email)->toBe('old@example.com')  // preserved
        ->and($lead->rating)->toEqual(4.5);  // updated
});

it('falls back to fingerprint matching when no place_id', function () {
    Lead::factory()->create([
        'google_place_id' => null,
        'business_name' => 'Joes Pizza',
        'city' => 'Lahore',
        'country' => 'PK',
        'phone' => '+11111111',
        'website' => null,
    ]);

    [$lead, $created] = $this->dedup->upsert([
        'business_name' => 'Joes Pizza',
        'city' => 'Lahore',
        'country' => 'PK',
        'website' => 'https://joes.com',
    ]);

    expect($created)->toBeFalse()
        ->and($lead->website)->toBe('https://joes.com');
});
