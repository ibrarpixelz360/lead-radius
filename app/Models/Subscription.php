<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'plan_id', 'status', 'starts_at', 'ends_at',
        'cancelled_at', 'payment_id', 'auto_renew', 'metadata',
    ];

    protected function casts(): array
    {
        return [
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
            'cancelled_at' => 'datetime',
            'auto_renew' => 'boolean',
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

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class);
    }

    public function isActive(): bool
    {
        return in_array($this->status, ['active', 'trial'], true)
            && $this->ends_at->isFuture();
    }

    public function isExpired(): bool
    {
        return $this->status === 'expired' || $this->ends_at->isPast();
    }

    public function isOnTrial(): bool
    {
        return $this->status === 'trial' && $this->ends_at->isFuture();
    }

    public function daysRemaining(): int
    {
        if ($this->ends_at->isPast()) {
            return 0;
        }

        return (int) ceil(now()->diffInDays($this->ends_at, false));
    }

    public function scopeActive($query)
    {
        return $query->whereIn('status', ['active', 'trial'])
            ->where('ends_at', '>', now());
    }

    public function scopeExpiringWithin($query, int $days)
    {
        return $query->active()
            ->whereBetween('ends_at', [now(), now()->addDays($days)]);
    }
}
