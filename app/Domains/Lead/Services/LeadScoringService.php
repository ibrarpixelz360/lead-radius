<?php

namespace App\Domains\Lead\Services;

use App\Models\Lead;

class LeadScoringService
{
    /**
     * Score a lead 0-100 based on contactability + opportunity signals.
     * Higher = better lead.
     */
    public function score(Lead $lead): int
    {
        $score = 30; // base

        // Contactability signals
        if ($lead->email) $score += 25;
        if ($lead->phone) $score += 10;
        if ($lead->website) $score += 15;

        // Opportunity signals (lower competition / SEO weakness = higher opportunity)
        if ($lead->rating !== null && (float) $lead->rating < 3.5) $score += 15;
        if ($lead->reviews_count < 20) $score += 10;
        if (! $lead->website) $score += 20;

        // Inactive signal — heuristic only since we don't always have last review date
        if ($lead->reviews_count === 0) $score += 5;

        return max(0, min(100, $score));
    }

    /**
     * Assign a category bucket based on score and signals.
     */
    public function category(Lead $lead, int $score): string
    {
        // Inactive: zero engagement
        if ($lead->reviews_count === 0 && $lead->rating === null) {
            return 'inactive';
        }

        // Low rating: reputation problem
        if ($lead->rating !== null && (float) $lead->rating < 3.0) {
            return 'low_rating';
        }

        // SEO weak: no website but otherwise viable
        if (! $lead->website && $score >= 40) {
            return 'seo_weak';
        }

        // Score-based buckets
        return match (true) {
            $score >= 80 => 'hot',
            $score >= 60 => 'good',
            default => 'competitive',
        };
    }

    /**
     * Score and persist on the model. Returns the updated lead.
     */
    public function scoreAndPersist(Lead $lead): Lead
    {
        $score = $this->score($lead);
        $lead->ai_score = $score;
        $lead->ai_category = $this->category($lead, $score);
        $lead->save();

        return $lead;
    }
}
