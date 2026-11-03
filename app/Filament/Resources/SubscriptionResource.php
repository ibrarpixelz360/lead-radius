<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SubscriptionResource\Pages;
use App\Models\Subscription;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SubscriptionResource extends Resource
{
    protected static ?string $model = Subscription::class;
    protected static ?string $navigationIcon = 'heroicon-o-credit-card';
    protected static ?string $navigationGroup = 'Billing';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('user.name')->disabled(),
            Forms\Components\TextInput::make('plan.name')->disabled(),
            Forms\Components\Select::make('status')
                ->options([
                    'trial' => 'Trial',
                    'active' => 'Active',
                    'expired' => 'Expired',
                    'cancelled' => 'Cancelled',
                    'pending_payment' => 'Pending payment',
                ])->required(),
            Forms\Components\DateTimePicker::make('starts_at')->required(),
            Forms\Components\DateTimePicker::make('ends_at')->required(),
            Forms\Components\Toggle::make('auto_renew'),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                Tables\Columns\TextColumn::make('user.name')->searchable(),
                Tables\Columns\TextColumn::make('user.email')->searchable()->toggleable(),
                Tables\Columns\TextColumn::make('plan.name')->badge(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'active' => 'success',
                        'trial' => 'warning',
                        'cancelled', 'expired' => 'gray',
                        'pending_payment' => 'info',
                    }),
                Tables\Columns\TextColumn::make('starts_at')->date()->sortable(),
                Tables\Columns\TextColumn::make('ends_at')->date()->sortable(),
                Tables\Columns\TextColumn::make('created_at')->since()->sortable()->toggleable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')->options([
                    'trial' => 'Trial', 'active' => 'Active', 'expired' => 'Expired',
                    'cancelled' => 'Cancelled', 'pending_payment' => 'Pending Payment',
                ]),
                Tables\Filters\SelectFilter::make('plan_id')
                    ->relationship('plan', 'name'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('extend')
                    ->icon('heroicon-o-arrow-path')
                    ->form([
                        Forms\Components\TextInput::make('days')
                            ->numeric()->required()->default(30)
                            ->label('Extend by (days)'),
                    ])
                    ->action(function (Subscription $r, array $data) {
                        $r->update([
                            'ends_at' => $r->ends_at->addDays((int) $data['days']),
                            'status' => 'active',
                        ]);
                        Notification::make()->success()->title("Extended by {$data['days']} days")->send();
                    }),
                Tables\Actions\Action::make('cancel')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->visible(fn (Subscription $r) => in_array($r->status, ['trial', 'active']))
                    ->requiresConfirmation()
                    ->action(function (Subscription $r) {
                        $r->update(['status' => 'cancelled', 'cancelled_at' => now()]);
                        Notification::make()->warning()->title('Subscription cancelled')->send();
                    }),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSubscriptions::route('/'),
            'edit' => Pages\EditSubscription::route('/{record}/edit'),
        ];
    }
}
