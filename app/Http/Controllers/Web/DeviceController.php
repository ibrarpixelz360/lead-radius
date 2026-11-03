<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Device;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DeviceController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Settings/Devices', [
            'devices' => $request->user()->devices()
                ->orderByDesc('last_seen_at')
                ->get(),
        ]);
    }

    public function destroy(Request $request, Device $device): RedirectResponse
    {
        abort_unless($device->user_id === $request->user()->id, 403);
        $device->revoke();
        return back()->with('success', 'Device revoked.');
    }
}
