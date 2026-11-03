<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = ['key', 'value', 'type', 'group', 'description', 'is_public'];

    protected function casts(): array
    {
        return ['is_public' => 'boolean'];
    }

    protected static function booted(): void
    {
        static::saved(fn () => Cache::forget('settings:all'));
        static::deleted(fn () => Cache::forget('settings:all'));
    }

    public static function get(string $key, $default = null)
    {
        $all = Cache::remember('settings:all', 3600, fn () => static::pluck('value', 'key')->toArray());

        return $all[$key] ?? $default;
    }

    public static function set(string $key, $value): void
    {
        static::updateOrCreate(['key' => $key], ['value' => $value]);
    }
}
