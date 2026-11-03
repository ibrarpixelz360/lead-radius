<?php

namespace App\Filament\Widgets;

use App\Models\Payment;
use App\Models\Subscription;
use App\Models\User;
use App\Models\Withdrawal;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class RevenueStatsWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $monthRevenue = Payment::approved()
            ->whereMonth('reviewed_at', now()->month)
            ->whereYear('reviewed_at', now()->year)
            ->sum('amount');

        $allTimeRevenue = Payment::approved()->sum('amount');

        $pendingPayments = Payment::pending()->count();
        $pendingWithdrawals = Withdrawal::where('status', 'pending')->count();

        $activeSubs = Subscription::active()->count();
        $newUsersThisMonth = User::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        return [
            Stat::make('This month revenue', 'PKR '.number_format((float) $monthRevenue))
                ->description('All-time: PKR '.number_format((float) $allTimeRevenue))
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('success'),

            Stat::make('Active subscriptions', $activeSubs)
                ->description($newUsersThisMonth.' new users this month')
                ->descriptionIcon('heroicon-m-user-plus')
                ->color('primary'),

            Stat::make('Pending payments', $pendingPayments)
                ->description($pendingPayments > 0 ? 'Action required' : 'All clear')
                ->descriptionIcon('heroicon-m-clock')
                ->color($pendingPayments > 0 ? 'warning' : 'gray')
                ->url($pendingPayments > 0 ? '/admin/payments?tableFilters[status][value]=pending_review' : null),

            Stat::make('Pending withdrawals', $pendingWithdrawals)
                ->description($pendingWithdrawals > 0 ? 'Action required' : 'All clear')
                ->descriptionIcon('heroicon-m-arrow-up-circle')
                ->color($pendingWithdrawals > 0 ? 'warning' : 'gray')
                ->url($pendingWithdrawals > 0 ? '/admin/withdrawals?tableFilters[status][value]=pending' : null),
        ];
    }
}
