<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'lead_scraper_batch_id', 'google_place_id', 'business_name', 'category', 'phone', 'email',
        'website', 'address', 'city', 'state', 'country', 'postal_code',
        'lat', 'lng', 'rating', 'reviews_count', 'hours', 'social_links',
        'photos', 'ai_score', 'ai_category', 'last_scraped_at',
    ];

    protected function casts(): array
    {
        return [
            'lat' => 'decimal:7',
            'lng' => 'decimal:7',
            'rating' => 'decimal:1',
            'reviews_count' => 'integer',
            'hours' => 'array',
            'social_links' => 'array',
            'photos' => 'array',
            'ai_score' => 'integer',
            'last_scraped_at' => 'datetime',
        ];
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'lead_user')
            ->withPivot(['id', 'search_id', 'status', 'notes', 'tags', 'is_favorite', 'is_archived', 'contacted_at'])
            ->withTimestamps();
    }

    public function batch(): BelongsTo
    {
        return $this->belongsTo(LeadScraperBatch::class, 'lead_scraper_batch_id');
    }

    // ===== Filter scopes =====

    public function scopeInCountry(Builder $q, ?string $country): Builder
    {
        return $country ? $q->where('country', $country) : $q;
    }

    public function scopeInCity(Builder $q, ?string $city): Builder
    {
        return $city ? $q->where('city', 'like', "%{$city}%") : $q;
    }

    public function scopeInCategory(Builder $q, ?string $category): Builder
    {
        return $category ? $q->where('category', 'like', "%{$category}%") : $q;
    }

    public function scopeMinRating(Builder $q, ?float $min): Builder
    {
        return $min ? $q->where('rating', '>=', $min) : $q;
    }

    public function scopeMinReviews(Builder $q, ?int $min): Builder
    {
        return $min ? $q->where('reviews_count', '>=', $min) : $q;
    }

    public function scopeHasEmail(Builder $q, bool $required = true): Builder
    {
        return $required ? $q->whereNotNull('email')->where('email', '!=', '') : $q;
    }

    public function scopeHasPhone(Builder $q, bool $required = true): Builder
    {
        return $required ? $q->whereNotNull('phone')->where('phone', '!=', '') : $q;
    }

    public function scopeHasWebsite(Builder $q, bool $required = true): Builder
    {
        return $required ? $q->whereNotNull('website')->where('website', '!=', '') : $q;
    }

    public function scopeNearby(Builder $q, float $lat, float $lng, int $radiusKm): Builder
    {
        // Haversine formula in MySQL — approximate
        return $q->selectRaw(
            "*, (6371 * acos(cos(radians(?)) * cos(radians(lat)) * cos(radians(lng) - radians(?)) + sin(radians(?)) * sin(radians(lat)))) AS distance",
            [$lat, $lng, $lat]
        )->having('distance', '<=', $radiusKm)
         ->orderBy('distance');
    }
}
