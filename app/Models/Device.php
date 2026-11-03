<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Device extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'device_id', 'user_agent', 'ip', 'country', 'city',
        'os', 'browser', 'device_type', 'last_seen_at', 'revoked_at', 'is_trusted',
    ];

    protected function casts(): array
    {
        return [
            'last_seen_at' => 'datetime',
            'revoked_at' => 'datetime',
            'is_trusted' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isActive(): bool
    {
        return $this->revoked_at === null
            && $this->last_seen_at?->isAfter(now()->subDays(30));
    }

    public function revoke(): void
    {
        $this->update(['revoked_at' => now()]);
    }

    public function scopeActive($query)
    {
        return $query->whereNull('revoked_at')
            ->where('last_seen_at', '>', now()->subDays(30));
    }
}
