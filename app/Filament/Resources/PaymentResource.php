<?php

namespace App\Filament\Resources;

use App\Domains\Subscription\Actions\ApprovePaymentAction;
use App\Domains\Subscription\Actions\RejectPaymentAction;
use App\Filament\Resources\PaymentResource\Pages;
use App\Models\Payment;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification as FilamentNotification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class PaymentResource extends Resource
{
    protected static ?string $model = Payment::class;
    protected static ?string $navigationIcon = 'heroicon-o-banknotes';
    protected static ?string $navigationGroup = 'Billing';
    protected static ?int $navigationSort = 1;

    public static function getNavigationBadge(): ?string
    {
        return Payment::pending()->count() ?: null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('User & plan')
                ->schema([
                    Forms\Components\TextInput::make('user.name')->disabled()->label('User'),
                    Forms\Components\TextInput::make('user.email')->disabled()->label('Email'),
                    Forms\Components\TextInput::make('plan.name')->disabled()->label('Plan'),
                    Forms\Components\TextInput::make('amount')->disabled()->prefix(fn ($record) => $record?->currency ?? 'PKR'),
                ])->columns(2),

            Forms\Components\Section::make('Bank transfer details')
                ->schema([
                    Forms\Components\TextInput::make('transaction_id')->disabled(),
                    Forms\Components\TextInput::make('bank_name')->disabled(),
                    Forms\Components\TextInput::make('sender_name')->disabled(),
                    Forms\Components\TextInput::make('sender_account')->disabled(),
                ])->columns(2),

            Forms\Components\Section::make('Screenshot')
                ->schema([
                    Forms\Components\ViewField::make('screenshot_preview')
                        ->view('filament.fields.payment-screenshot'),
                ]),

            Forms\Components\Section::make('Review')
                ->schema([
                    Forms\Components\Select::make('status')
                        ->options([
                            'pending_review' => 'Pending Review',
                            'approved' => 'Approved',
                            'rejected' => 'Rejected',
                        ])->disabled()->dehydrated(false),
                    Forms\Components\Textarea::make('admin_notes')->rows(3),
                    Forms\Components\Textarea::make('rejection_reason')->rows(2)
                        ->visible(fn ($record) => $record?->status === 'rejected'),
                    Forms\Components\TextInput::make('invoice_number')->disabled()
                        ->visible(fn ($record) => $record?->invoice_number),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                Tables\Columns\TextColumn::make('id')->label('#')->sortable(),
                Tables\Columns\TextColumn::make('user.name')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('user.email')->searchable()->toggleable(),
                Tables\Columns\TextColumn::make('plan.name')->badge(),
                Tables\Columns\TextColumn::make('amount')
                    ->money(fn ($record) => $record->currency)
                    ->sortable(),
                Tables\Columns\TextColumn::make('transaction_id')
                    ->searchable()
                    ->copyable()
                    ->limit(20),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending_review' => 'warning',
                        'approved' => 'success',
                        'rejected' => 'danger',
                    }),
                Tables\Columns\TextColumn::make('created_at')->since()->sortable(),
                Tables\Columns\TextColumn::make('reviewed_at')->since()->toggleable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending_review' => 'Pending Review',
                        'approved' => 'Approved',
                        'rejected' => 'Rejected',
                    ])
                    ->default('pending_review'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make()->iconButton(),

                Tables\Actions\Action::make('approve')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->iconButton()
                    ->visible(fn (Payment $r) => $r->status === 'pending_review')
                    ->requiresConfirmation()
                    ->modalHeading('Approve payment')
                    ->modalDescription('This will activate the user\'s subscription, generate an invoice, and notify the user.')
                    ->form([
                        Forms\Components\Textarea::make('admin_notes')
                            ->label('Internal notes (optional)')
                            ->rows(2),
                    ])
                    ->action(function (Payment $record, array $data) {
                        try {
                            app(ApprovePaymentAction::class)->execute(
                                $record,
                                auth()->user(),
                                $data['admin_notes'] ?? null
                            );
                            FilamentNotification::make()
                                ->success()
                                ->title('Payment approved')
                                ->body("Subscription activated for {$record->user->name}.")
                                ->send();
                        } catch (\Throwable $e) {
                            FilamentNotification::make()
                                ->danger()
                                ->title('Approval failed')
                                ->body($e->getMessage())
                                ->send();
                        }
                    }),

                Tables\Actions\Action::make('reject')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->iconButton()
                    ->visible(fn (Payment $r) => $r->status === 'pending_review')
                    ->form([
                        Forms\Components\Textarea::make('rejection_reason')
                            ->label('Rejection reason (sent to user)')
                            ->required()
                            ->rows(3),
                    ])
                    ->action(function (Payment $record, array $data) {
                        app(RejectPaymentAction::class)->execute(
                            $record,
                            auth()->user(),
                            $data['rejection_reason']
                        );
                        FilamentNotification::make()
                            ->warning()
                            ->title('Payment rejected')
                            ->send();
                    }),

                Tables\Actions\Action::make('view_screenshot')
                    ->icon('heroicon-o-photo')
                    ->iconButton()
                    ->color('gray')
                    ->visible(fn (Payment $r) => $r->screenshot_path)
                    ->modalContent(fn (Payment $r) => view('filament.fields.payment-screenshot', ['record' => $r]))
                    ->modalSubmitAction(false)
                    ->modalCancelActionLabel('Close'),
            ])
            ->bulkActions([]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPayments::route('/'),
            'view' => Pages\ViewPayment::route('/{record}'),
            'edit' => Pages\EditPayment::route('/{record}/edit'),
        ];
    }
}
