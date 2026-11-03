<?php

namespace App\Domains\Auth\Services;

use App\Models\Device;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DeviceTrackingService
{
    public const RESULT_OK = 'ok';
    public const RESULT_DEVICE_LIMIT_EXCEEDED = 'device_limit_exceeded';

    public function fingerprint(Request $request): string
    {
        $components = [
            $request->userAgent() ?? 'unknown',
            $request->ip() ?? 'unknown',
            $request->header('Accept-Language', ''),
            $request->cookie('cnm_device_seed') ?? Str::random(16),
        ];

        return hash('sha256', implode('|', $components));
    }

    public function trackAndEnforce(User $user, Request $request): string
    {
        $fingerprint = $this->fingerprint($request);

        $device = $user->devices()->firstOrNew(['device_id' => $fingerprint]);
        $isNew = ! $device->exists;

        $device->fill([
            'user_agent' => $request->userAgent(),
            'ip' => $request->ip(),
            'os' => $this->parseOs($request->userAgent() ?? ''),
            'browser' => $this->parseBrowser($request->userAgent() ?? ''),
            'last_seen_at' => now(),
        ]);

        if ($isNew) {
            // Check limit before saving
            $plan = $user->currentPlan();
            if ($plan) {
                $activeCount = $user->devices()->active()->count();
                if ($activeCount >= $plan->max_devices) {
                    return self::RESULT_DEVICE_LIMIT_EXCEEDED;
                }
            }
        }

        $device->save();

        return self::RESULT_OK;
    }

    protected function parseOs(string $ua): string
    {
        $ua = strtolower($ua);
        return match (true) {
            str_contains($ua, 'windows') => 'Windows',
            str_contains($ua, 'mac os') || str_contains($ua, 'macintosh') => 'macOS',
            str_contains($ua, 'iphone') || str_contains($ua, 'ipad') => 'iOS',
            str_contains($ua, 'android') => 'Android',
            str_contains($ua, 'linux') => 'Linux',
            default => 'Unknown',
        };
    }

    protected function parseBrowser(string $ua): string
    {
        $ua = strtolower($ua);
        return match (true) {
            str_contains($ua, 'edg/') => 'Edge',
            str_contains($ua, 'chrome') => 'Chrome',
            str_contains($ua, 'safari') => 'Safari',
            str_contains($ua, 'firefox') => 'Firefox',
            default => 'Unknown',
        };
    }
}
