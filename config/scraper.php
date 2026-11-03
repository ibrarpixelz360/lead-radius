<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Python binary
    |--------------------------------------------------------------------------
    | Full path or shell alias to the Python interpreter.
    | On Windows with a local virtualenv: scripts/scraper/.venv/Scripts/python.exe
    | On Linux/Docker: scripts/scraper/.venv/bin/python or python3
    */
    'python_bin' => env(
        'PYTHON_BIN',
        PHP_OS_FAMILY === 'Windows' && file_exists(base_path('scripts/scraper/.venv/Scripts/python.exe'))
            ? base_path('scripts/scraper/.venv/Scripts/python.exe')
            : (file_exists(base_path('scripts/scraper/.venv/bin/python'))
                ? base_path('scripts/scraper/.venv/bin/python')
                : (PHP_OS_FAMILY === 'Windows' ? 'python' : 'python3'))
    ),

    /*
    |--------------------------------------------------------------------------
    | Scripts directory
    |--------------------------------------------------------------------------
    | Absolute path to the Python scraper project root (contains main.py).
    */
    'scripts_path' => env('SCRAPER_SCRIPTS_PATH', base_path('scripts/scraper')),

    /*
    |--------------------------------------------------------------------------
    | JSON output directory
    |--------------------------------------------------------------------------
    | Where Python writes its per-batch JSON output files.
    | Must be writable by the PHP process.
    */
    'output_path' => env('SCRAPER_OUTPUT_PATH', storage_path('scraper/output')),

    /*
    |--------------------------------------------------------------------------
    | Process timeout (seconds)
    |--------------------------------------------------------------------------
    | How long to wait for the Python process before killing it.
    */
    'timeout' => (int) env('SCRAPER_TIMEOUT', 1800),

    /*
    |--------------------------------------------------------------------------
    | Headless mode
    |--------------------------------------------------------------------------
    | Set to false for debugging so you can observe the browser window.
    */
    'headless' => filter_var(env('SCRAPER_HEADLESS', true), FILTER_VALIDATE_BOOLEAN),

    /*
    |--------------------------------------------------------------------------
    | Queue name for scraper jobs
    |--------------------------------------------------------------------------
    */
    'queue' => env('SCRAPER_QUEUE', 'default'),
];
