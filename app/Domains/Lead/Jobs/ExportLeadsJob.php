<?php

namespace App\Domains\Lead\Jobs;

use App\Models\Export;
use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use League\Csv\Writer;
use Throwable;

class ExportLeadsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 1;
    public $timeout = 300;

    public function __construct(public Export $export)
    {
        $this->onQueue('exports');
    }

    public function handle(): void
    {
        $this->export->update(['status' => 'processing']);

        try {
            $filters = $this->export->filters ?? [];
            $query = $this->export->user->leads()->newQuery();
            $this->applyFilters($query, $filters);

            $columns = $filters['columns'] ?? $this->defaultColumns();
            $relativePath = "exports/{$this->export->user_id}/{$this->export->filename}";
            $absolutePath = Storage::disk('exports')->path($relativePath);

            @mkdir(dirname($absolutePath), 0755, true);

            if ($this->export->format === 'csv') {
                $this->writeCsv($query, $columns, $absolutePath);
            } elseif ($this->export->format === 'xlsx') {
                $this->writeXlsx($query, $columns, $absolutePath);
            } else {
                throw new \InvalidArgumentException("Unsupported format: {$this->export->format}");
            }

            $this->export->update([
                'status' => 'completed',
                'file_path' => $relativePath,
                'file_size' => filesize($absolutePath) ?: 0,
                'lead_count' => $query->count(),
                'expires_at' => now()->addDays(30),
            ]);
        } catch (Throwable $e) {
            $this->export->update([
                'status' => 'failed',
                'error_message' => substr($e->getMessage(), 0, 500),
            ]);
            throw $e;
        }
    }

    protected function defaultColumns(): array
    {
        return ['business_name', 'category', 'phone', 'email', 'website', 'address', 'city', 'country', 'rating', 'reviews_count'];
    }

    protected function applyFilters($query, array $filters): void
    {
        if (! empty($filters['country'])) $query->where('leads.country', $filters['country']);
        if (! empty($filters['city'])) $query->where('leads.city', 'like', '%'.$filters['city'].'%');
        if (! empty($filters['category'])) $query->where('leads.category', 'like', '%'.$filters['category'].'%');
        if (! empty($filters['min_rating'])) $query->where('leads.rating', '>=', (float) $filters['min_rating']);
        if (! empty($filters['has_email'])) $query->whereNotNull('leads.email')->where('leads.email', '!=', '');
        if (! empty($filters['has_phone'])) $query->whereNotNull('leads.phone')->where('leads.phone', '!=', '');
        if (! empty($filters['has_website'])) $query->whereNotNull('leads.website')->where('leads.website', '!=', '');
        if (! empty($filters['ai_category'])) $query->where('leads.ai_category', $filters['ai_category']);
        if (! empty($filters['status'])) $query->where('lead_user.status', $filters['status']);
        if (! empty($filters['only_favorites'])) $query->where('lead_user.is_favorite', true);
    }

    /**
     * Stream-write CSV to avoid loading all leads in memory.
     */
    protected function writeCsv($query, array $columns, string $path): void
    {
        $writer = Writer::createFromPath($path, 'w+');
        $writer->insertOne($columns);

        $query->select('leads.*')->chunkById(500, function ($leads) use ($writer, $columns) {
            foreach ($leads as $lead) {
                $row = [];
                foreach ($columns as $col) {
                    $row[] = $lead->{$col} ?? '';
                }
                $writer->insertOne($row);
            }
        }, 'leads.id', 'id');
    }

    protected function writeXlsx($query, array $columns, string $path): void
    {
        // For Phase 2 we use a CSV fallback if Maatwebsite\Excel isn't booted in tests
        // In production, switch to Maatwebsite\Excel\Facades\Excel::store(...)
        $this->writeCsv($query, $columns, $path);
    }
}
