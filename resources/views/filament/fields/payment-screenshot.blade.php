@php
    $payment = $record ?? $getRecord();
@endphp
@if ($payment && $payment->screenshot_path)
    <div class="space-y-3">
        <p class="text-sm text-gray-500">
            Uploaded: {{ $payment->created_at->format('M j, Y H:i') }}
        </p>
        <img
            src="{{ \Illuminate\Support\Facades\Storage::disk('screenshots')->url($payment->screenshot_path) }}"
            alt="Payment screenshot"
            class="rounded-lg border border-gray-200 max-w-full"
            style="max-height: 600px;"
            onerror="this.outerHTML='<div class=\'p-4 bg-yellow-50 text-yellow-800 rounded\'>Screenshot file is no longer available.</div>'"
        />
    </div>
@else
    <p class="text-sm text-gray-500">No screenshot.</p>
@endif
