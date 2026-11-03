<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Subscription lifecycle
Schedule::command('trials:expire')->dailyAt('00:30')->withoutOverlapping();
Schedule::command('subscriptions:expire')->dailyAt('01:00')->withoutOverlapping();
Schedule::command('subscriptions:remind-renewal')->dailyAt('09:00');

// Affiliate
Schedule::command('commissions:release-holds')->dailyAt('02:00');

// Maintenance
Schedule::command('exports:cleanup')->dailyAt('03:00');
Schedule::command('devices:cleanup-stale')->dailyAt('03:30');

// Health
Schedule::command('horizon:snapshot')->everyFiveMinutes();

// Backups
Schedule::command('backup:clean')->dailyAt('04:30');
Schedule::command('backup:run')->dailyAt('05:00');

// SEO
Schedule::command('sitemap:generate')->dailyAt('06:00');
