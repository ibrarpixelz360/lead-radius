<?php

namespace App\Domains\Lead\Services;

use App\Models\Lead;
use Illuminate\Support\Str;

class LeadDeduplicator
{
    /**
     * Find by google_place_id or by (business_name + city + country) when no place_id exists.
     * Returns [Lead $lead, bool $wasCreated].
     *
     * @param array<string, mixed> $data
     */
    public function upsert(array $data): array
    {
        // Strategy 1: google_place_id is the gold key
        if (! empty($data['google_place_id'])) {
            $lead = Lead::where('google_place_id', $data['google_place_id'])->first();
            if ($lead) {
                $lead->fill($this->mergeNonNull($lead, $data));
                $lead->last_scraped_at = now();
                $wasCreated = false;
                $lead->save();
                return [$lead, $wasCreated];
            }

            $data['last_scraped_at'] = now();
            return [Lead::create($data), true];
        }

        // Strategy 2: fingerprint by name + city + country
        $fingerprint = $this->fingerprint($data);
        if (\Illuminate\Support\Facades\DB::getDriverName() === 'sqlite') {
            $lead = Lead::query()
                ->whereRaw('LOWER(business_name) = ?', [Str::lower($data['business_name'] ?? '')])
                ->whereRaw('LOWER(city) = ?', [Str::lower($data['city'] ?? '')])
                ->whereRaw('LOWER(country) = ?', [Str::lower($data['country'] ?? '')])
                ->first();
        } else {
            $lead = Lead::query()
                ->whereRaw('MD5(CONCAT_WS("|", LOWER(business_name), LOWER(city), LOWER(country))) = ?', [$fingerprint])
                ->first();
        }

        if ($lead) {
            $lead->fill($this->mergeNonNull($lead, $data));
            $lead->last_scraped_at = now();
            $lead->save();
            return [$lead, false];
        }

        $data['last_scraped_at'] = now();
        return [Lead::create($data), true];
    }

    /**
     * Only override existing fields if the existing value is null/empty.
     * Preserves enrichment data from prior scrapes.
     */
    protected function mergeNonNull(Lead $existing, array $incoming): array
    {
        $merged = [];
        foreach ($incoming as $key => $value) {
            if ($value === null || $value === '') {
                continue;
            }
            // Always update these (they may change over time or were extracted incorrectly before)
            if (in_array($key, ['rating', 'reviews_count', 'category', 'address', 'hours', 'photos'], true)) {
                $merged[$key] = $value;
                continue;
            }
            // Otherwise only fill if existing is empty
            if (empty($existing->{$key})) {
                $merged[$key] = $value;
            }
        }
        return $merged;
    }

    protected function fingerprint(array $data): string
    {
        return md5(Str::lower(($data['business_name'] ?? '').'|'.($data['city'] ?? '').'|'.($data['country'] ?? '')));
    }
}
