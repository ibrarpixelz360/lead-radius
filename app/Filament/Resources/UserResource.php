<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class UserResource extends Resource
{
    protected static ?string $model = User::class;
    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationGroup = 'Users & Access';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Profile')
                ->schema([
                    Forms\Components\TextInput::make('name')->required()->maxLength(120),
                    Forms\Components\TextInput::make('email')->email()->required()->unique(ignoreRecord: true),
                    Forms\Components\TextInput::make('phone')->maxLength(30),
                    Forms\Components\TextInput::make('country_code')->maxLength(2),
                ])->columns(2),

            Forms\Components\Section::make('Account')
                ->schema([
                    Forms\Components\Select::make('status')
                        ->options(['active' => 'Active', 'banned' => 'Banned', 'pending' => 'Pending'])
                        ->required()
                        ->default('active'),
                    Forms\Components\Select::make('roles')
                        ->relationship('roles', 'name')
                        ->multiple()
                        ->preload(),
                    Forms\Components\TextInput::make('password')
                        ->password()
                        ->dehydrateStateUsing(fn ($state) => filled($state) ? bcrypt($state) : null)
                        ->dehydrated(fn ($state) => filled($state))
                        ->required(fn (string $context): bool => $context === 'create'),
                ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('email')->searchable(),
                Tables\Columns\TextColumn::make('roles.name')->badge(),
                Tables\Columns\TextColumn::make('activeSubscription.plan.name')
                    ->label('Plan')->badge(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'active' => 'success',
                        'banned' => 'danger',
                        'pending' => 'warning',
                    }),
                Tables\Columns\TextColumn::make('last_login_at')
                    ->label('Last login')
                    ->since()->sortable()->toggleable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->date()->sortable()->toggleable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(['active' => 'Active', 'banned' => 'Banned', 'pending' => 'Pending']),
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('ban')
                    ->icon('heroicon-o-no-symbol')
                    ->color('danger')
                    ->visible(fn (User $r) => $r->status === 'active')
                    ->requiresConfirmation()
                    ->action(fn (User $r) => $r->update(['status' => 'banned'])),
                Tables\Actions\Action::make('unban')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn (User $r) => $r->status === 'banned')
                    ->requiresConfirmation()
                    ->action(fn (User $r) => $r->update(['status' => 'active'])),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([\Illuminate\Database\Eloquent\SoftDeletingScope::class]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
