<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Search extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'country', 'state', 'city', 'query', 'category',
        'radius_km', 'min_rating', 'min_reviews', 'require_website',
        'require_email', 'require_phone', 'status', 'results_count',
        'proxy_used', 'duration_seconds', 'error_message', 'metadata',
    ];

    protected function casts(): array
    {
        return [
            'min_rating' => 'decimal:1',
            'min_reviews' => 'integer',
            'radius_km' => 'integer',
            'require_website' => 'boolean',
            'require_email' => 'boolean',
            'require_phone' => 'boolean',
            'metadata' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function leadEntries(): HasMany
    {
        return $this->hasMany(LeadUser::class);
    }

    public function leads(): BelongsToMany
    {
        return $this->belongsToMany(Lead::class, 'search_leads', 'search_id', 'lead_id')
            ->withTimestamps();
    }

    public function isQueued(): bool
    {
        return $this->status === 'queued';
    }

    public function isRunning(): bool
    {
        return $this->status === 'running';
    }

    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }

    public function isFailed(): bool
    {
        return $this->status === 'failed';
    }

    public function fingerprint(): string
    {
        return md5(implode('|', [
            strtolower($this->country),
            strtolower($this->state ?? ''),
            strtolower($this->city),
            strtolower($this->query),
            $this->radius_km,
        ]));
    }

    public function scopeRecent($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    public function scopeForUser($query, User $user)
    {
        return $query->where('user_id', $user->id);
    }
}
