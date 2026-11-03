<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Withdrawal extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'amount', 'currency', 'method', 'account_title',
        'account_number', 'bank_name', 'status', 'admin_notes',
        'transaction_reference', 'processed_by', 'processed_at',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'processed_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function processor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'processed_by');
    }

    public function commissions(): HasMany
    {
        return $this->hasMany(Commission::class);
    }
}
