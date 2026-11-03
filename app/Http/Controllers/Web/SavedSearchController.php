<?php

namespace App\Http\Controllers\Web;

use App\Domains\Lead\Jobs\GenerateLeadsJob;
use App\Http\Controllers\Controller;
use App\Models\SavedSearch;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SavedSearchController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Leads/SavedSearches', [
            'saved' => $request->user()->savedSearches()->latest()->get(),
        ]);
    }

    public function destroy(Request $request, SavedSearch $savedSearch): RedirectResponse
    {
        abort_unless($savedSearch->user_id === $request->user()->id, 403);
        $savedSearch->delete();
        return back()->with('success', 'Saved search deleted.');
    }

    /**
     * Re-run a saved search → creates a new Search row + queues job.
     */
    public function run(Request $request, SavedSearch $savedSearch): RedirectResponse
    {
        abort_unless($savedSearch->user_id === $request->user()->id, 403);

        $filters = $savedSearch->filters;
        $search = $request->user()->searches()->create($filters);

        $savedSearch->update(['last_run_at' => now()]);
        GenerateLeadsJob::dispatch($search);

        return redirect()->route('leads.searches.show', $search)
            ->with('success', 'Saved search re-running.');
    }
}
