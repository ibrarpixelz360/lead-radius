<?php

namespace App\Filament\Widgets;

use App\Models\Payment;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentPaymentsWidget extends BaseWidget
{
    protected static ?int $sort = 2;
    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(Payment::pending()->latest()->limit(10))
            ->heading('Pending payments')
            ->columns([
                Tables\Columns\TextColumn::make('user.name'),
                Tables\Columns\TextColumn::make('plan.name')->badge(),
                Tables\Columns\TextColumn::make('amount')->money(fn ($r) => $r->currency),
                Tables\Columns\TextColumn::make('transaction_id')->limit(20),
                Tables\Columns\TextColumn::make('created_at')->since(),
            ])
            ->actions([
                Tables\Actions\Action::make('review')
                    ->url(fn (Payment $r) => "/admin/payments/{$r->id}/edit")
                    ->icon('heroicon-o-eye')
                    ->iconButton(),
            ]);
    }
}
