<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:180'],
            'subject' => ['required', 'string', 'max:200'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
        ]);

        Feedback::create([
            'user_id' => $request->user()?->id,
            'type' => 'general',
            'message' => "[{$data['subject']}] from {$data['name']} <{$data['email']}>:\n\n{$data['message']}",
            'status' => 'new',
        ]);

        return back()->with('success', 'Thanks! We received your message and will reply within 24 hours.');
    }
}
