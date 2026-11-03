<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Domains\Subscription\Actions\CreateTrialSubscriptionAction;
use App\Filament\Resources\UserResource;
use App\Models\User;
use Filament\Resources\Pages\CreateRecord;

class CreateUser extends CreateRecord
{
    protected static string $resource = UserResource::class;

    protected function afterCreate(): void
    {
        /** @var User $user */
        $user = $this->record;
        if (! $user->roles()->exists()) {
            $user->assignRole('user');
        }
        if (! $user->subscriptions()->exists()) {
            app(CreateTrialSubscriptionAction::class)->execute($user);
        }
    }
}
