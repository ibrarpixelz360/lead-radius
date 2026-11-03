<?php

use Illuminate\Support\Str;

return [
    'domain' => env('HORIZON_DOMAIN'),
    'path' => env('HORIZON_PATH', 'horizon'),
    'use' => 'default',
    'prefix' => env('HORIZON_PREFIX', Str::slug(env('APP_NAME', 'laravel'), '_').'_horizon:'),

    'middleware' => ['web', 'admin'],

    'waits' => [
        'redis:default' => 60,
        'redis:scraping' => 300,
        'redis:enrichment' => 120,
        'redis:exports' => 120,
        'redis:emails' => 60,
        'redis:critical' => 30,
    ],

    'trim' => [
        'recent' => 60,
        'pending' => 60,
        'completed' => 60,
        'recent_failed' => 10080,
        'failed' => 10080,
        'monitored' => 10080,
    ],

    'silenced' => [],

    'metrics' => [
        'trim_snapshots' => ['job' => 24, 'queue' => 24],
    ],

    'fast_termination' => false,
    'memory_limit' => 64,

    'defaults' => [
        'critical-supervisor' => [
            'connection' => 'redis',
            'queue' => ['critical', 'emails'],
            'balance' => 'auto',
            'autoScalingStrategy' => 'time',
            'maxProcesses' => 8,
            'maxTime' => 0,
            'maxJobs' => 0,
            'memory' => 128,
            'tries' => 5,
            'timeout' => 60,
            'nice' => 0,
        ],
        'scraping-supervisor' => [
            'connection' => 'redis',
            'queue' => ['scraping'],
            'balance' => 'auto',
            'autoScalingStrategy' => 'size',
            'maxProcesses' => 30,
            'memory' => 256,
            'tries' => 3,
            'timeout' => 600,
        ],
        'enrichment-supervisor' => [
            'connection' => 'redis',
            'queue' => ['enrichment'],
            'balance' => 'auto',
            'autoScalingStrategy' => 'size',
            'maxProcesses' => 15,
            'memory' => 192,
            'tries' => 2,
            'timeout' => 120,
        ],
        'default-supervisor' => [
            'connection' => 'redis',
            'queue' => ['exports', 'default'],
            'balance' => 'auto',
            'autoScalingStrategy' => 'size',
            'maxProcesses' => 6,
            'memory' => 128,
            'tries' => 3,
            'timeout' => 300,
        ],
    ],

    'environments' => [
        'production' => [
            'critical-supervisor' => ['minProcesses' => 3, 'maxProcesses' => 8, 'balanceMaxShift' => 1, 'balanceCooldown' => 3],
            'scraping-supervisor' => ['minProcesses' => 5, 'maxProcesses' => 30, 'balanceMaxShift' => 1, 'balanceCooldown' => 3],
            'enrichment-supervisor' => ['minProcesses' => 3, 'maxProcesses' => 15, 'balanceMaxShift' => 1, 'balanceCooldown' => 3],
            'default-supervisor' => ['minProcesses' => 2, 'maxProcesses' => 6, 'balanceMaxShift' => 1, 'balanceCooldown' => 3],
        ],
        'local' => [
            'critical-supervisor' => ['maxProcesses' => 2],
            'scraping-supervisor' => ['maxProcesses' => 2],
            'enrichment-supervisor' => ['maxProcesses' => 2],
            'default-supervisor' => ['maxProcesses' => 2],
        ],
    ],
];
