<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Plan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'description', 'price', 'currency', 'billing_cycle',
        'trial_days', 'max_devices', 'monthly_lead_limit', 'monthly_export_limit',
        'saved_searches_limit', 'priority_support', 'api_access', 'ai_scoring',
        'features', 'sort_order', 'is_active', 'is_featured',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'trial_days' => 'integer',
            'max_devices' => 'integer',
            'monthly_lead_limit' => 'integer',
            'monthly_export_limit' => 'integer',
            'saved_searches_limit' => 'integer',
            'priority_support' => 'boolean',
            'api_access' => 'boolean',
            'ai_scoring' => 'boolean',
            'features' => 'array',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ];
    }

    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function isFree(): bool
    {
        return $this->slug === config('cnm.plans.free') || (float) $this->price === 0.0;
    }

    public function isUnlimitedLeads(): bool
    {
        return $this->monthly_lead_limit === null;
    }

    public function isUnlimitedExports(): bool
    {
        return $this->monthly_export_limit === null;
    }

    public function getFormattedPriceAttribute(): string
    {
        return $this->currency.' '.number_format((float) $this->price, 0);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('price');
    }
}
