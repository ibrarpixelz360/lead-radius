<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>{{ config('app.name', 'Customer Near Me') }}</title>

        <meta name="description" content="Generate verified GMB business leads instantly. Filter by country, city, niche & radius. Get phone, email, website, ratings — ready for outreach." />

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700,800&family=jetbrains-mono:400,500&display=swap" rel="stylesheet" />

        <link rel="icon" type="image/svg+xml" href="/favicon.svg">

        @routes
        @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased h-full bg-surface-50 dark:bg-surface-950 text-surface-900 dark:text-surface-100">
        @inertia
    </body>
</html>
