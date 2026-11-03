<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class LeadUser extends Pivot
{
    use HasFactory;

    protected $table = 'lead_user';

    public $incrementing = true;

    protected $fillable = [
        'user_id', 'lead_id', 'search_id', 'status', 'notes', 'tags',
        'is_favorite', 'is_archived', 'contacted_at',
    ];

    protected function casts(): array
    {
        return [
            'tags' => 'array',
            'is_favorite' => 'boolean',
            'is_archived' => 'boolean',
            'contacted_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function lead(): BelongsTo
    {
        return $this->belongsTo(Lead::class);
    }

    public function search(): BelongsTo
    {
        return $this->belongsTo(Search::class);
    }
}
