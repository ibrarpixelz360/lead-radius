<?php

namespace App\Policies;

use App\Models\Subscription;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SubscriptionPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Subscription $model): bool
    {
        if (property_exists($model, 'user_id') || isset($model->user_id)) {
            return $user->id === $model->user_id || $user->isAdmin();
        }
        return $user->isAdmin();
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Subscription $model): bool
    {
        if (isset($model->user_id)) {
            return $user->id === $model->user_id || $user->isAdmin();
        }
        return $user->isAdmin();
    }

    public function delete(User $user, Subscription $model): bool
    {
        if (isset($model->user_id)) {
            return $user->id === $model->user_id || $user->isAdmin();
        }
        return $user->isAdmin();
    }
}
