<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Storage;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'plan_id', 'amount', 'currency', 'transaction_id',
        'bank_name', 'sender_name', 'sender_account', 'screenshot_path',
        'status', 'admin_notes', 'rejection_reason', 'reviewed_by',
        'reviewed_at', 'invoice_number', 'invoice_path', 'metadata',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'reviewed_at' => 'datetime',
            'metadata' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function subscription(): HasOne
    {
        return $this->hasOne(Subscription::class);
    }

    public function commission(): HasOne
    {
        return $this->hasOne(Commission::class);
    }

    public function getScreenshotUrlAttribute(): ?string
    {
        if (! $this->screenshot_path) {
            return null;
        }

        return Storage::disk('screenshots')->url($this->screenshot_path);
    }

    public function getInvoiceUrlAttribute(): ?string
    {
        if (! $this->invoice_path) {
            return null;
        }

        return Storage::disk('invoices')->url($this->invoice_path);
    }

    public function isPending(): bool
    {
        return $this->status === 'pending_review';
    }

    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }

    public function isRejected(): bool
    {
        return $this->status === 'rejected';
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending_review');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }
}
