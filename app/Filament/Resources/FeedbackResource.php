<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FeedbackResource\Pages;
use App\Models\Feedback;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class FeedbackResource extends Resource
{
    protected static ?string $model = Feedback::class;
    protected static ?string $navigationIcon = 'heroicon-o-megaphone';
    protected static ?string $navigationGroup = 'Support';

    public static function getNavigationBadge(): ?string
    {
        return Feedback::where('status', 'new')->count() ?: null;
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('user_id')->relationship('user', 'name')->disabled(),
            Forms\Components\Select::make('type')->options([
                'general' => 'General', 'bug' => 'Bug', 'feature_request' => 'Feature Request', 'rating' => 'Rating',
            ])->disabled(),
            Forms\Components\Textarea::make('message')->disabled()->rows(6),
            Forms\Components\TextInput::make('rating')->disabled(),
            Forms\Components\Select::make('status')->options([
                'new' => 'New', 'reviewing' => 'Reviewing',
                'resolved' => 'Resolved', 'archived' => 'Archived',
            ]),
            Forms\Components\Textarea::make('admin_response')->rows(4),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                Tables\Columns\TextColumn::make('id')->label('#'),
                Tables\Columns\TextColumn::make('user.name'),
                Tables\Columns\TextColumn::make('type')->badge(),
                Tables\Columns\TextColumn::make('message')->limit(60),
                Tables\Columns\TextColumn::make('rating'),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $s): string => match ($s) {
                        'new' => 'warning', 'reviewing' => 'info',
                        'resolved' => 'success', 'archived' => 'gray',
                    }),
                Tables\Columns\TextColumn::make('created_at')->since(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')->options([
                    'new' => 'New', 'reviewing' => 'Reviewing',
                    'resolved' => 'Resolved', 'archived' => 'Archived',
                ])->default('new'),
                Tables\Filters\SelectFilter::make('type')->options([
                    'general' => 'General', 'bug' => 'Bug',
                    'feature_request' => 'Feature Request', 'rating' => 'Rating',
                ]),
            ])
            ->actions([Tables\Actions\EditAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListFeedback::route('/'),
            'edit' => Pages\EditFeedback::route('/{record}/edit'),
        ];
    }
}
