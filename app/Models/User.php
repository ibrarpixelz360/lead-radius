<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements FilamentUser, MustVerifyEmail
{
    use HasApiTokens;
    use HasFactory;
    use HasRoles;
    use Notifiable;
    use SoftDeletes;

    protected $fillable = [
        'name', 'email', 'password', 'phone', 'country_code', 'avatar_path',
        'referral_code', 'referred_by_id', 'trial_ends_at', 'last_login_at',
        'last_login_ip', 'status', 'two_factor_secret', 'two_factor_recovery_codes',
        'two_factor_confirmed_at', 'notification_preferences',
    ];

    protected $hidden = [
        'password', 'remember_token', 'two_factor_secret', 'two_factor_recovery_codes',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'trial_ends_at' => 'datetime',
            'last_login_at' => 'datetime',
            'two_factor_confirmed_at' => 'datetime',
            'password' => 'hashed',
            'notification_preferences' => 'array',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (self $user) {
            if (empty($user->referral_code)) {
                $user->referral_code = static::generateReferralCode();
            }
            if (empty($user->trial_ends_at)) {
                $user->trial_ends_at = now()->addDays(config('cnm.trial_days', 7));
            }
        });
    }

    public static function generateReferralCode(): string
    {
        do {
            $code = strtoupper(Str::random(10));
        } while (static::where('referral_code', $code)->exists());

        return $code;
    }

    // ===== Relationships =====

    public function referrer(): BelongsTo
    {
        return $this->belongsTo(self::class, 'referred_by_id');
    }

    public function referrals(): HasMany
    {
        return $this->hasMany(self::class, 'referred_by_id');
    }

    public function devices(): HasMany
    {
        return $this->hasMany(Device::class);
    }

    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }

    public function activeSubscription(): HasOne
    {
        return $this->hasOne(Subscription::class)
            ->whereIn('status', ['trial', 'active'])
            ->where('ends_at', '>', now())
            ->latestOfMany();
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function searches(): HasMany
    {
        return $this->hasMany(Search::class);
    }

    public function leads(): BelongsToMany
    {
        return $this->belongsToMany(Lead::class, 'lead_user')
            ->withPivot(['id', 'search_id', 'status', 'notes', 'tags', 'is_favorite', 'is_archived', 'contacted_at'])
            ->withTimestamps();
    }

    public function leadEntries(): HasMany
    {
        return $this->hasMany(LeadUser::class);
    }

    public function savedSearches(): HasMany
    {
        return $this->hasMany(SavedSearch::class);
    }

    public function exports(): HasMany
    {
        return $this->hasMany(Export::class);
    }

    public function commissionsEarned(): HasMany
    {
        return $this->hasMany(Commission::class, 'referrer_id');
    }

    public function withdrawals(): HasMany
    {
        return $this->hasMany(Withdrawal::class);
    }

    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class);
    }

    // ===== Accessors =====

    public function currentPlan(): ?Plan
    {
        return $this->activeSubscription?->plan;
    }

    public function isOnTrial(): bool
    {
        return $this->trial_ends_at && $this->trial_ends_at->isFuture()
            && (! $this->activeSubscription || $this->activeSubscription->status === 'trial');
    }

    public function trialDaysLeft(): int
    {
        if (! $this->trial_ends_at || $this->trial_ends_at->isPast()) {
            return 0;
        }

        return (int) ceil(now()->diffInDays($this->trial_ends_at, false));
    }

    public function hasActiveSubscription(): bool
    {
        return $this->activeSubscription !== null;
    }

    public function getReferralLinkAttribute(): string
    {
        return url('/?ref='.$this->referral_code);
    }

    public function affiliateBalance(): float
    {
        return (float) $this->commissionsEarned()
            ->where('status', 'approved')
            ->whereNull('withdrawal_id')
            ->sum('amount');
    }

    public function pendingCommissions(): float
    {
        return (float) $this->commissionsEarned()
            ->where('status', 'pending')
            ->sum('amount');
    }

    // ===== Filament =====

    public function canAccessPanel(Panel $panel): bool
    {
        // Allow access to generator-new for any active client/user
        $referer = (string) request()->headers->get('referer');
        if (request()->is('admin/generator-new*') || request()->routeIs('*generator-new*') || str_contains($referer, 'generator-new')) {
            return $this->status === 'active';
        }

        return $this->hasAnyRole(['super_admin', 'admin']) && $this->status === 'active';
    }

    public function isAdmin(): bool
    {
        return $this->hasAnyRole(['super_admin', 'admin']);
    }
}
