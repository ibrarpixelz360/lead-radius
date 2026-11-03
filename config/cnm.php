<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Trial Configuration
    |--------------------------------------------------------------------------
    */
    'trial_days' => (int) env('TRIAL_DAYS', 7),

    /*
    |--------------------------------------------------------------------------
    | Manual Payment Bank Details
    |--------------------------------------------------------------------------
    */
    'bank' => [
        'name' => env('BANK_NAME', 'Meezan Bank'),
        'account_title' => env('BANK_ACCOUNT_TITLE', 'Customer Near Me Pvt Ltd'),
        'account_number' => env('BANK_ACCOUNT_NUMBER', ''),
        'iban' => env('BANK_IBAN', ''),
        'branch_code' => env('BANK_BRANCH_CODE', ''),
    ],

    /*
    |--------------------------------------------------------------------------
    | Affiliate Configuration
    |--------------------------------------------------------------------------
    */
    'affiliate' => [
        'commission_percent' => (float) env('AFFILIATE_COMMISSION_PERCENT', 30),
        'recurring_percent' => (float) env('AFFILIATE_RECURRING_PERCENT', 20),
        'hold_days' => (int) env('AFFILIATE_HOLD_DAYS', 14),
        'min_withdrawal' => (float) env('AFFILIATE_MIN_WITHDRAWAL', 1000),
        'cookie_days' => (int) env('AFFILIATE_COOKIE_DAYS', 90),
        'cookie_name' => 'cnm_ref',
    ],

    /*
    |--------------------------------------------------------------------------
    | Scraping
    |--------------------------------------------------------------------------
    */
    'scraping' => [
        'browserless_url' => env('BROWSERLESS_URL', 'http://localhost:3000'),
        'browserless_token' => env('BROWSERLESS_TOKEN'),
        'max_results_per_search' => 200,
        'page_load_timeout' => 30,
        'request_jitter_min_ms' => 1500,
        'request_jitter_max_ms' => 4000,
        'max_retries' => 3,
        'cool_down_minutes_on_429' => 30,
    ],

    /*
    |--------------------------------------------------------------------------
    | Proxy
    |--------------------------------------------------------------------------
    */
    'proxy' => [
        'provider' => env('PROXY_PROVIDER', 'brightdata'),
        'host' => env('PROXY_HOST'),
        'port' => env('PROXY_PORT'),
        'username' => env('PROXY_USERNAME'),
        'password' => env('PROXY_PASSWORD'),
        'rotate_per_request' => true,
    ],

    /*
    |--------------------------------------------------------------------------
    | reCAPTCHA
    |--------------------------------------------------------------------------
    */
    'recaptcha' => [
        'site_key' => env('RECAPTCHA_SITE_KEY'),
        'secret_key' => env('RECAPTCHA_SECRET_KEY'),
        'threshold' => (float) env('RECAPTCHA_THRESHOLD', 0.5),
    ],

    /*
    |--------------------------------------------------------------------------
    | Plan Codes (referenced by code in seeders & limit logic)
    |--------------------------------------------------------------------------
    */
    'plans' => [
        'free' => 'free',
        'starter' => 'starter',
        'growth' => 'growth',
    ],
];
