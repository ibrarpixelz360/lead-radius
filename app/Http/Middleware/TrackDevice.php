<?php

namespace App\Http\Middleware;

use App\Domains\Auth\Services\DeviceTrackingService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class TrackDevice
{
    public function __construct(protected DeviceTrackingService $service) {}

    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Ensure the device seed cookie exists before fingerprinting
        $seedExists = $request->hasCookie('cnm_device_seed');
        if (! $seedExists) {
            $request->cookies->set('cnm_device_seed', Str::random(32));
        }

        if (! $user) {
            $response = $next($request);
            if (! $seedExists) {
                $response->cookie('cnm_device_seed', $request->cookie('cnm_device_seed'), 60 * 24 * 365, '/', null, false, true);
            }
            return $response;
        }

        $result = $this->service->trackAndEnforce($user, $request);

        if ($result === DeviceTrackingService::RESULT_DEVICE_LIMIT_EXCEEDED) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect()->route('login')->withErrors([
                'device_limit' => 'Your plan does not allow more devices. Please revoke an existing device to log in.',
            ]);
        }

        $response = $next($request);

        if (! $seedExists) {
            if (method_exists($response, 'cookie')) {
                $response->cookie('cnm_device_seed', $request->cookie('cnm_device_seed'), 60 * 24 * 365, '/', null, false, true);
            } elseif (isset($response->headers) && method_exists($response->headers, 'setCookie')) {
                $cookie = cookie('cnm_device_seed', $request->cookie('cnm_device_seed'), 60 * 24 * 365, '/', null, false, true);
                $response->headers->setCookie($cookie);
            }
        }

        return $response;
    }
}
