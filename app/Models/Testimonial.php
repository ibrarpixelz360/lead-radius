<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'title', 'company', 'avatar_path', 'content', 'rating',
        'is_featured', 'is_active', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'rating' => 'integer',
        ];
    }

    public function scopeActive($q)
    {
        return $q->where('is_active', true)->orderBy('sort_order');
    }

    public function scopeFeatured($q)
    {
        return $q->where('is_featured', true);
    }
}
