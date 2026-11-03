<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Settings/Notifications', [
            'notifications' => $request->user()->notifications()
                ->paginate(30)
                ->through(fn ($n) => [
                    'id' => $n->id,
                    'type' => $n->data['type'] ?? 'general',
                    'data' => $n->data,
                    'read_at' => $n->read_at,
                    'created_at' => $n->created_at,
                ]),
            'unread_count' => $request->user()->unreadNotifications()->count(),
            'preferences' => $request->user()->notification_preferences ?? [
                'email_marketing' => false,
                'email_lead_complete' => true,
                'email_weekly_digest' => true,
            ],
        ]);
    }

    public function markRead(Request $request, string $id): RedirectResponse
    {
        $notification = $request->user()->notifications()->findOrFail($id);
        $notification->markAsRead();
        return back();
    }

    public function markAllRead(Request $request): RedirectResponse
    {
        $request->user()->unreadNotifications->markAsRead();
        return back()->with('success', 'All notifications marked as read.');
    }

    public function updatePreferences(Request $request): RedirectResponse
    {
        $prefs = $request->validate([
            'email_marketing' => ['boolean'],
            'email_lead_complete' => ['boolean'],
            'email_weekly_digest' => ['boolean'],
        ]);

        $request->user()->update(['notification_preferences' => $prefs]);
        return back()->with('success', 'Notification preferences updated.');
    }
}
