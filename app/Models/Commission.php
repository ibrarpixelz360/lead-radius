<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Commission extends Model
{
    use HasFactory;

    protected $fillable = [
        'referrer_id', 'referral_id', 'payment_id', 'amount', 'currency',
        'type', 'rate', 'status', 'hold_until', 'withdrawal_id', 'notes',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'rate' => 'decimal:2',
            'hold_until' => 'datetime',
        ];
    }

    public function referrer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'referrer_id');
    }

    public function referral(): BelongsTo
    {
        return $this->belongsTo(Referral::class);
    }

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class);
    }

    public function withdrawal(): BelongsTo
    {
        return $this->belongsTo(Withdrawal::class);
    }

    public function isReleasable(): bool
    {
        return $this->status === 'pending'
            && $this->hold_until?->isPast();
    }

    public function scopePending($q)
    {
        return $q->where('status', 'pending');
    }

    public function scopeApproved($q)
    {
        return $q->where('status', 'approved');
    }
}
