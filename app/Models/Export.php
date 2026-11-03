<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Export extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'filename', 'format', 'lead_count', 'filters',
        'file_path', 'file_size', 'status', 'error_message', 'expires_at',
    ];

    protected function casts(): array
    {
        return [
            'filters' => 'array',
            'expires_at' => 'datetime',
            'lead_count' => 'integer',
            'file_size' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isExpired(): bool
    {
        return $this->expires_at?->isPast() ?? false;
    }
}
