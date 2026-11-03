<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LeadScraperLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'lead_scraper_batch_id',
        'level',
        'message',
        'context',
    ];

    protected $casts = [
        'context' => 'array',
    ];

    public function batch(): BelongsTo
    {
        return $this->belongsTo(LeadScraperBatch::class, 'lead_scraper_batch_id');
    }

    public static function info(int $batchId, string $message, array $context = []): self
    {
        return static::write($batchId, 'info', $message, $context);
    }

    public static function warning(int $batchId, string $message, array $context = []): self
    {
        return static::write($batchId, 'warning', $message, $context);
    }

    public static function error(int $batchId, string $message, array $context = []): self
    {
        return static::write($batchId, 'error', $message, $context);
    }

    public static function debug(int $batchId, string $message, array $context = []): self
    {
        return static::write($batchId, 'debug', $message, $context);
    }

    private static function write(int $batchId, string $level, string $message, array $context): self
    {
        return static::create([
            'lead_scraper_batch_id' => $batchId,
            'level'                 => $level,
            'message'               => $message,
            'context'               => $context ?: null,
        ]);
    }
}
