<?php

use App\Domains\Lead\Services\LeadScoringService;
use App\Models\Lead;

beforeEach(function () {
    $this->scoring = app(LeadScoringService::class);
});

it('gives higher score to leads with full contact info', function () {
    $rich = Lead::factory()->make([
        'email' => 'a@b.com', 'phone' => '+1234567890', 'website' => 'https://x.com',
        'rating' => 4.5, 'reviews_count' => 50,
    ]);
    $poor = Lead::factory()->make([
        'email' => null, 'phone' => null, 'website' => null,
        'rating' => null, 'reviews_count' => 0,
    ]);

    expect($this->scoring->score($rich))->toBeGreaterThan($this->scoring->score($poor));
});

it('flags leads with low rating as low_rating', function () {
    $lead = Lead::factory()->make([
        'rating' => 2.5, 'reviews_count' => 5, 'email' => 'a@b.com',
    ]);
    $score = $this->scoring->score($lead);

    expect($this->scoring->category($lead, $score))->toBe('low_rating');
});

it('flags leads without website but otherwise good as seo_weak', function () {
    $lead = Lead::factory()->make([
        'website' => null, 'email' => 'a@b.com', 'phone' => '+1234567890',
        'rating' => 4.0, 'reviews_count' => 30,
    ]);
    $score = $this->scoring->score($lead);

    expect($this->scoring->category($lead, $score))->toBe('seo_weak');
});

it('flags leads with no engagement as inactive', function () {
    $lead = Lead::factory()->make([
        'rating' => null, 'reviews_count' => 0,
    ]);
    $score = $this->scoring->score($lead);

    expect($this->scoring->category($lead, $score))->toBe('inactive');
});

it('persists score and category to the model', function () {
    $lead = Lead::factory()->create([
        'email' => 'a@b.com', 'rating' => 4.8, 'reviews_count' => 100, 'website' => 'https://x.com',
    ]);
    $this->scoring->scoreAndPersist($lead);

    $fresh = $lead->fresh();
    expect($fresh->ai_score)->toBeGreaterThan(0)
        ->and($fresh->ai_category)->not->toBeNull();
});
