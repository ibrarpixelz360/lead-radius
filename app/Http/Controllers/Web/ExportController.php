<?php

namespace App\Http\Controllers\Web;

use App\Domains\Lead\Jobs\ExportLeadsJob;
use App\Http\Controllers\Controller;
use App\Models\Export;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ExportController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Leads/Exports', [
            'exports' => $request->user()->exports()
                ->latest()
                ->paginate(20)
                ->through(fn ($e) => [
                    'id' => $e->id,
                    'filename' => $e->filename,
                    'format' => $e->format,
                    'lead_count' => $e->lead_count,
                    'status' => $e->status,
                    'file_size' => $e->file_size,
                    'expires_at' => $e->expires_at,
                    'created_at' => $e->created_at,
                ]),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'format' => ['required', 'in:csv,xlsx'],
            'filters' => ['nullable', 'array'],
            'columns' => ['nullable', 'array'],
            'columns.*' => ['string'],
        ]);

        $filters = array_merge($data['filters'] ?? [], ['columns' => $data['columns'] ?? null]);
        $filename = 'leads_'.now()->format('Ymd_His').'_'.Str::random(6).'.'.$data['format'];

        $export = $request->user()->exports()->create([
            'filename' => $filename,
            'format' => $data['format'],
            'filters' => $filters,
            'status' => 'queued',
        ]);

        ExportLeadsJob::dispatch($export);

        return redirect()->route('leads.exports.index')
            ->with('success', 'Export queued. We\'ll email you when it\'s ready.');
    }

    public function download(Request $request, Export $export): BinaryFileResponse
    {
        abort_unless($export->user_id === $request->user()->id, 403);
        abort_unless($export->status === 'completed', 409, 'Export is not ready yet.');
        abort_if($export->isExpired(), 410, 'Export has expired.');

        $absolutePath = Storage::disk('exports')->path($export->file_path);
        abort_unless(file_exists($absolutePath), 404);

        return response()->download($absolutePath, $export->filename);
    }

    public function destroy(Request $request, Export $export): RedirectResponse
    {
        abort_unless($export->user_id === $request->user()->id, 403);

        if ($export->file_path) {
            Storage::disk('exports')->delete($export->file_path);
        }
        $export->delete();

        return back()->with('success', 'Export deleted.');
    }
}
