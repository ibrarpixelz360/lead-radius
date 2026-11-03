<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SavedSearch extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'filters', 'auto_run', 'frequency', 'last_run_at'];

    protected function casts(): array
    {
        return [
            'filters' => 'array',
            'auto_run' => 'boolean',
            'last_run_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
