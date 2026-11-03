<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proxy extends Model
{
    use HasFactory;

    protected $table = 'proxies';

    protected $fillable = [
        'host', 'port', 'username', 'password', 'type', 'country',
        'success_count', 'failure_count', 'last_used_at', 'cool_down_until', 'status',
    ];

    protected $hidden = ['password'];

    protected function casts(): array
    {
        return [
            'last_used_at' => 'datetime',
            'cool_down_until' => 'datetime',
        ];
    }

    public function isAvailable(): bool
    {
        return $this->status === 'active'
            && (! $this->cool_down_until || $this->cool_down_until->isPast());
    }

    public function url(): string
    {
        $auth = $this->username ? "{$this->username}:{$this->password}@" : '';
        return "http://{$auth}{$this->host}:{$this->port}";
    }

    public function scopeAvailable($q)
    {
        return $q->where('status', 'active')
            ->where(fn ($x) => $x->whereNull('cool_down_until')
                ->orWhere('cool_down_until', '<', now()));
    }
}
