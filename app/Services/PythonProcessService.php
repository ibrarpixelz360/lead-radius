<?php

namespace App\Services;

use App\Models\LeadScraperLog;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class PythonProcessService
{
    private readonly string $pythonBin;
    private readonly string $scriptsPath;
    private readonly int    $timeout;
    private readonly string $outputDir;

    public function __construct()
    {
        $this->pythonBin   = config('scraper.python_bin', 'python');
        $this->scriptsPath = config('scraper.scripts_path', base_path('scripts/scraper'));
        $this->timeout     = (int) config('scraper.timeout', 1800);
        $this->outputDir   = config('scraper.output_path', storage_path('scraper/output'));
    }

    /**
     * Execute the Python Playwright scraper and return parsed results.
     *
     * @param  string $query     Search query, e.g. "car dealerships"
     * @param  string $location  Location string, e.g. "Brisbane QLD, Australia"
     * @param  int    $limit     Max leads to collect
     * @param  int    $batchId   Used for output file naming + logging
     * @param  string $source    Scraper source key (default: google_maps)
     * @return array{leads: array, meta: array}
     *
     * @throws ProcessFailedException  If Python exits with a non-zero code.
     */
    public function runScraper(
        string $query,
        string $location,
        int    $limit    = 50,
        int    $batchId  = 0,
        string $source   = 'google_maps',
    ): array {
        $outputFile = $this->resolveOutputFile($batchId, $query);

        $process = new Process(
            command: [
                $this->pythonBin,
                $this->scriptsPath . DIRECTORY_SEPARATOR . 'main.py',
                '--query',    $query,
                '--location', $location,
                '--limit',    (string) $limit,
                '--output',   $outputFile,
                '--batch-id', (string) $batchId,
                '--source',   $source,
                '--headless', config('scraper.headless', true) ? 'true' : 'false',
            ],
            cwd: $this->scriptsPath,
            env: $this->buildEnv(),
            timeout: $this->timeout,
        );

        Log::info('PythonProcessService: launching scraper', [
            'query'       => $query,
            'location'    => $location,
            'limit'       => $limit,
            'batch_id'    => $batchId,
            'source'      => $source,
            'output_file' => $outputFile,
            'python_bin'  => $this->pythonBin,
        ]);

        $process->run(function (string $type, string $buffer) use ($batchId): void {
            if ($type === Process::ERR) {
                foreach (explode("\n", trim($buffer)) as $line) {
                    $line = trim($line);
                    if ($line === '') continue;

                    // Forward structured log to Laravel log
                    Log::debug("[scraper:{$batchId}] {$line}");

                    // Optionally record warning or error lines into database LeadScraperLog
                    $decoded = json_decode($line, true);
                    if ($batchId > 0 && is_array($decoded) && isset($decoded['level'])) {
                        $lvl = strtolower($decoded['level']);
                        if (in_array($lvl, ['info', 'warning', 'error'], true)) {
                            try {
                                LeadScraperLog::create([
                                    'lead_scraper_batch_id' => $batchId,
                                    'level'                 => $lvl,
                                    'message'               => $decoded['message'] ?? $line,
                                    'context'               => $decoded,
                                ]);
                            } catch (\Throwable) {
                                // Ignore if batch does not exist in DB (e.g. standalone test)
                            }
                        }
                    }
                }
            }
        });

        if (!$process->isSuccessful()) {
            $errOutput = substr($process->getErrorOutput(), 0, 2000);
            Log::error('PythonProcessService: scraper process failed', [
                'batch_id'  => $batchId,
                'exit_code' => $process->getExitCode(),
                'stderr'    => $errOutput,
            ]);

            LeadScraperLog::error($batchId, "Scraper process failed with exit code {$process->getExitCode()}", [
                'stderr' => $errOutput,
            ]);

            throw new ProcessFailedException($process);
        }

        return $this->readOutput($outputFile, $batchId);
    }

    private function resolveOutputFile(int $batchId, string $query): string
    {
        if (!is_dir($this->outputDir)) {
            mkdir($this->outputDir, 0755, true);
        }

        $slug = substr(preg_replace('/[^a-z0-9]+/', '_', strtolower($query)), 0, 50);

        return $this->outputDir . DIRECTORY_SEPARATOR . "batch_{$batchId}_{$slug}.json";
    }

    private function readOutput(string $outputFile, int $batchId): array
    {
        if (!file_exists($outputFile)) {
            Log::warning('PythonProcessService: output file missing', [
                'file'     => $outputFile,
                'batch_id' => $batchId,
            ]);
            return ['leads' => [], 'meta' => ['total_found' => 0]];
        }

        $raw  = file_get_contents($outputFile);
        $data = json_decode($raw, true);

        // Remove output file immediately to avoid stale data
        @unlink($outputFile);

        if (json_last_error() !== JSON_ERROR_NONE) {
            Log::error('PythonProcessService: malformed JSON output', [
                'batch_id' => $batchId,
                'file'     => $outputFile,
                'error'    => json_last_error_msg(),
            ]);
            return ['leads' => [], 'meta' => ['total_found' => 0]];
        }

        return [
            'leads' => $data['leads'] ?? [],
            'meta'  => $data['meta']  ?? ['total_found' => 0],
        ];
    }

    private function buildEnv(): array
    {
        return array_filter([
            'PYTHONUNBUFFERED'         => '1',
            'PLAYWRIGHT_BROWSERS_PATH' => env('PLAYWRIGHT_BROWSERS_PATH'),
            'PATH'                     => getenv('PATH'),
            'USERPROFILE'              => getenv('USERPROFILE'),
            'HOME'                     => getenv('HOME'),
        ]);
    }
}
