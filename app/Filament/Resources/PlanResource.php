<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PlanResource\Pages;
use App\Models\Plan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PlanResource extends Resource
{
    protected static ?string $model = Plan::class;
    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationGroup = 'Billing';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Plan details')
                ->schema([
                    Forms\Components\TextInput::make('name')->required()->maxLength(60),
                    Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true)->maxLength(60),
                    Forms\Components\Textarea::make('description')->rows(2)->maxLength(500),
                    Forms\Components\TextInput::make('price')->numeric()->required()->prefix('PKR')->step(0.01),
                    Forms\Components\TextInput::make('currency')->default('PKR')->required()->maxLength(3),
                    Forms\Components\Select::make('billing_cycle')
                        ->options(['monthly' => 'Monthly', 'yearly' => 'Yearly', 'lifetime' => 'Lifetime'])
                        ->default('monthly'),
                ])->columns(2),

            Forms\Components\Section::make('Limits')
                ->schema([
                    Forms\Components\TextInput::make('trial_days')->numeric()->default(0),
                    Forms\Components\TextInput::make('max_devices')->numeric()->required()->default(1),
                    Forms\Components\TextInput::make('monthly_lead_limit')->numeric()->helperText('Leave empty for unlimited'),
                    Forms\Components\TextInput::make('monthly_export_limit')->numeric()->helperText('Leave empty for unlimited'),
                    Forms\Components\TextInput::make('saved_searches_limit')->numeric()->helperText('Leave empty for unlimited'),
                ])->columns(2),

            Forms\Components\Section::make('Features')
                ->schema([
                    Forms\Components\Toggle::make('priority_support'),
                    Forms\Components\Toggle::make('api_access'),
                    Forms\Components\Toggle::make('ai_scoring')->default(true),
                ])->columns(3),

            Forms\Components\Section::make('Display')
                ->schema([
                    Forms\Components\TextInput::make('sort_order')->numeric()->default(0),
                    Forms\Components\Toggle::make('is_active')->default(true),
                    Forms\Components\Toggle::make('is_featured'),
                ])->columns(3),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->columns([
                Tables\Columns\TextColumn::make('name')->searchable(),
                Tables\Columns\TextColumn::make('slug')->badge(),
                Tables\Columns\TextColumn::make('price')->money(fn ($record) => $record->currency)->sortable(),
                Tables\Columns\TextColumn::make('billing_cycle')->badge(),
                Tables\Columns\TextColumn::make('max_devices'),
                Tables\Columns\TextColumn::make('monthly_lead_limit')->placeholder('Unlimited'),
                Tables\Columns\IconColumn::make('priority_support')->boolean(),
                Tables\Columns\IconColumn::make('is_active')->boolean(),
                Tables\Columns\IconColumn::make('is_featured')->boolean(),
                Tables\Columns\TextColumn::make('subscriptions_count')->counts('subscriptions')->label('Active subs'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPlans::route('/'),
            'create' => Pages\CreatePlan::route('/create'),
            'edit' => Pages\EditPlan::route('/{record}/edit'),
        ];
    }
}
