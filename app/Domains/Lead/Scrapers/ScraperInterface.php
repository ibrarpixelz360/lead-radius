<?php

namespace App\Domains\Lead\Scrapers;

use App\Models\Search;

interface ScraperInterface
{
    /**
     * Execute the scrape for the given Search record.
     * Returns an array of raw lead data dicts ready for the Deduplicator.
     *
     * Each item should include (when available):
     *   google_place_id, business_name, category, phone, website,
     *   address, city, state, country, postal_code, lat, lng,
     *   rating, reviews_count, hours (array), social_links (array), photos (array).
     *
     * @return array<int, array<string, mixed>>
     */
    public function scrape(Search $search): array;
}
