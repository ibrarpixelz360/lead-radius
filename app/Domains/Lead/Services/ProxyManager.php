<?php

namespace App\Domains\Lead\Services;

use App\Models\Proxy;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProxyManager
{
    /**
     * Allocate the least-recently-used available proxy, optionally filtered by country.
     * Uses SELECT ... FOR UPDATE inside a transaction to prevent collision.
     */
    public function allocate(?string $country = null): ?Proxy
    {
        return DB::transaction(function () use ($country) {
            $query = Proxy::query()
                ->where('status', 'active')
                ->where(function ($q) {
                    $q->whereNull('cool_down_until')
                      ->orWhere('cool_down_until', '<', now());
                })
                ->orderByRaw('last_used_at IS NULL DESC') // unused first
                ->orderBy('last_used_at', 'asc')
                ->lockForUpdate();

            if ($country) {
                $query->where(function ($q) use ($country) {
                    $q->where('country', $country)
                      ->orWhereNull('country');
                });
            }

            $proxy = $query->first();

            if ($proxy) {
                $proxy->update(['last_used_at' => now()]);
            }

            return $proxy;
        });
    }

    public function reportSuccess(Proxy $proxy): void
    {
        $proxy->increment('success_count');
    }

    public function reportFailure(Proxy $proxy, string $reason = ''): void
    {
        $proxy->increment('failure_count');

        // Cool down after 3 failures within recent window
        $recentFailures = $proxy->failure_count;
        if ($recentFailures > 0 && $recentFailures % 3 === 0) {
            $minutes = (int) config('cnm.scraping.cool_down_minutes_on_429', 30);
            $proxy->update([
                'status' => 'cooling',
                'cool_down_until' => now()->addMinutes($minutes),
            ]);
            Log::warning("Proxy {$proxy->host}:{$proxy->port} cooling down for {$minutes}m. Reason: {$reason}");
        }

        // After 10 consecutive failures, mark as banned
        if ($proxy->failure_count >= 10 && $proxy->success_count < $proxy->failure_count) {
            $proxy->update(['status' => 'banned']);
            Log::error("Proxy {$proxy->host}:{$proxy->port} banned after sustained failures.");
        }
    }

    /**
     * Return all proxies currently cooled down whose timer has expired,
     * and reactivate them. Run via scheduled command.
     */
    public function reactivateCooled(): int
    {
        return Proxy::where('status', 'cooling')
            ->whereNotNull('cool_down_until')
            ->where('cool_down_until', '<', now())
            ->update([
                'status' => 'active',
                'cool_down_until' => null,
            ]);
    }

    /**
     * Build a Guzzle-compatible proxy URL from the proxy record.
     */
    public function urlFor(Proxy $proxy): string
    {
        $auth = $proxy->username ? rawurlencode($proxy->username).':'.rawurlencode($proxy->password ?? '').'@' : '';
        return "http://{$auth}{$proxy->host}:{$proxy->port}";
    }
}
