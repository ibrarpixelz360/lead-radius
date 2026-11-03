<?php

namespace App\Filament\Resources;

use App\Filament\Resources\WithdrawalResource\Pages;
use App\Models\Withdrawal;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class WithdrawalResource extends Resource
{
    protected static ?string $model = Withdrawal::class;
    protected static ?string $navigationIcon = 'heroicon-o-arrow-up-circle';
    protected static ?string $navigationGroup = 'Affiliate';
    protected static ?int $navigationSort = 1;

    public static function getNavigationBadge(): ?string
    {
        return Withdrawal::where('status', 'pending')->count() ?: null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('user.name')->disabled(),
            Forms\Components\TextInput::make('user.email')->disabled(),
            Forms\Components\TextInput::make('amount')->disabled()->prefix(fn ($r) => $r?->currency),
            Forms\Components\TextInput::make('method')->disabled(),
            Forms\Components\TextInput::make('account_title')->disabled(),
            Forms\Components\TextInput::make('account_number')->disabled(),
            Forms\Components\TextInput::make('bank_name')->disabled(),
            Forms\Components\Select::make('status')->options([
                'pending' => 'Pending',
                'approved' => 'Approved',
                'paid' => 'Paid',
                'rejected' => 'Rejected',
            ]),
            Forms\Components\Textarea::make('admin_notes'),
            Forms\Components\TextInput::make('transaction_reference')
                ->helperText('Bank transaction reference once paid'),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                Tables\Columns\TextColumn::make('user.name')->searchable(),
                Tables\Columns\TextColumn::make('amount')->money(fn ($r) => $r->currency)->sortable(),
                Tables\Columns\TextColumn::make('method')->badge(),
                Tables\Columns\TextColumn::make('account_title'),
                Tables\Columns\TextColumn::make('account_number')->copyable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $s): string => match ($s) {
                        'pending' => 'warning',
                        'approved' => 'info',
                        'paid' => 'success',
                        'rejected' => 'danger',
                    }),
                Tables\Columns\TextColumn::make('created_at')->since()->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')->options([
                    'pending' => 'Pending', 'approved' => 'Approved',
                    'paid' => 'Paid', 'rejected' => 'Rejected',
                ])->default('pending'),
            ])
            ->actions([
                Tables\Actions\EditAction::make()->iconButton(),
                Tables\Actions\Action::make('mark_paid')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->iconButton()
                    ->visible(fn (Withdrawal $r) => in_array($r->status, ['pending', 'approved']))
                    ->form([
                        Forms\Components\TextInput::make('transaction_reference')
                            ->required()
                            ->label('Bank transaction reference'),
                        Forms\Components\Textarea::make('admin_notes')->rows(2),
                    ])
                    ->action(function (Withdrawal $r, array $data) {
                        $r->update([
                            'status' => 'paid',
                            'transaction_reference' => $data['transaction_reference'],
                            'admin_notes' => $data['admin_notes'] ?? null,
                            'processed_by' => auth()->id(),
                            'processed_at' => now(),
                        ]);
                        // Mark linked commissions as paid
                        $r->commissions()->update(['status' => 'paid']);
                        Notification::make()->success()->title('Withdrawal marked paid')->send();
                    }),
                Tables\Actions\Action::make('reject')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->iconButton()
                    ->visible(fn (Withdrawal $r) => $r->status === 'pending')
                    ->form([
                        Forms\Components\Textarea::make('admin_notes')->required()->label('Reason'),
                    ])
                    ->action(function (Withdrawal $r, array $data) {
                        $r->update([
                            'status' => 'rejected',
                            'admin_notes' => $data['admin_notes'],
                            'processed_by' => auth()->id(),
                            'processed_at' => now(),
                        ]);
                        Notification::make()->warning()->title('Withdrawal rejected')->send();
                    }),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListWithdrawals::route('/'),
            'edit' => Pages\EditWithdrawal::route('/{record}/edit'),
        ];
    }
}
