<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProxyResource\Pages;
use App\Models\Proxy;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ProxyResource extends Resource
{
    protected static ?string $model = Proxy::class;
    protected static ?string $navigationIcon = 'heroicon-o-server';
    protected static ?string $navigationGroup = 'System';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('host')->required(),
            Forms\Components\TextInput::make('port')->numeric()->required(),
            Forms\Components\TextInput::make('username'),
            Forms\Components\TextInput::make('password')->password(),
            Forms\Components\Select::make('type')->options([
                'residential' => 'Residential',
                'datacenter' => 'Datacenter',
                'mobile' => 'Mobile',
            ])->default('residential'),
            Forms\Components\TextInput::make('country')->maxLength(80),
            Forms\Components\Select::make('status')->options([
                'active' => 'Active',
                'cooling' => 'Cooling',
                'banned' => 'Banned',
                'inactive' => 'Inactive',
            ])->default('active'),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('host')->searchable(),
                Tables\Columns\TextColumn::make('port'),
                Tables\Columns\TextColumn::make('type')->badge(),
                Tables\Columns\TextColumn::make('country'),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $s): string => match ($s) {
                        'active' => 'success',
                        'cooling' => 'warning',
                        'banned' => 'danger',
                        'inactive' => 'gray',
                    }),
                Tables\Columns\TextColumn::make('success_count')->sortable(),
                Tables\Columns\TextColumn::make('failure_count')->sortable(),
                Tables\Columns\TextColumn::make('last_used_at')->since()->sortable(),
                Tables\Columns\TextColumn::make('cool_down_until')->since()->toggleable(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProxies::route('/'),
            'create' => Pages\CreateProxy::route('/create'),
            'edit' => Pages\EditProxy::route('/{record}/edit'),
        ];
    }
}
