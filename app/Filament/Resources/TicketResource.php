<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TicketResource\Pages;
use App\Models\Ticket;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class TicketResource extends Resource
{
    protected static ?string $model = Ticket::class;
    protected static ?string $navigationIcon = 'heroicon-o-lifebuoy';
    protected static ?string $navigationGroup = 'Support';

    public static function getNavigationBadge(): ?string
    {
        return Ticket::where('status', 'open')->count() ?: null;
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('user_id')
                ->relationship('user', 'name')->searchable()->disabled(),
            Forms\Components\TextInput::make('subject')->required(),
            Forms\Components\Select::make('priority')->options([
                'low' => 'Low', 'medium' => 'Medium', 'high' => 'High', 'urgent' => 'Urgent',
            ]),
            Forms\Components\Select::make('category')->options([
                'billing' => 'Billing', 'technical' => 'Technical',
                'account' => 'Account', 'feature_request' => 'Feature Request', 'other' => 'Other',
            ]),
            Forms\Components\Select::make('status')->options([
                'open' => 'Open', 'pending' => 'Pending',
                'resolved' => 'Resolved', 'closed' => 'Closed',
            ]),
            Forms\Components\Select::make('assigned_to')
                ->relationship('assignee', 'name')->searchable(),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                Tables\Columns\TextColumn::make('id')->label('#')->sortable(),
                Tables\Columns\TextColumn::make('user.name')->searchable(),
                Tables\Columns\TextColumn::make('subject')->searchable()->limit(40),
                Tables\Columns\TextColumn::make('priority')
                    ->badge()
                    ->color(fn (string $s): string => match ($s) {
                        'urgent' => 'danger', 'high' => 'warning',
                        'medium' => 'info', 'low' => 'gray',
                    }),
                Tables\Columns\TextColumn::make('category')->badge(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $s): string => match ($s) {
                        'open' => 'warning', 'pending' => 'info',
                        'resolved' => 'success', 'closed' => 'gray',
                    }),
                Tables\Columns\TextColumn::make('created_at')->since(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')->options([
                    'open' => 'Open', 'pending' => 'Pending',
                    'resolved' => 'Resolved', 'closed' => 'Closed',
                ])->default('open'),
            ])
            ->actions([Tables\Actions\EditAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTickets::route('/'),
            'edit' => Pages\EditTicket::route('/{record}/edit'),
        ];
    }
}
