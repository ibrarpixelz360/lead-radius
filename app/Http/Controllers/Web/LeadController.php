<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\LeadUser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LeadController extends Controller
{
    /**
     * Lead list with filters.
     */
    public function index(Request $request): Response
    {
        $userId = $request->user()->id;

        $query = $request->user()->leads();

        // Apply filters
        $this->applyFilters($query, $request);

        $leads = $query->orderByDesc('lead_user.created_at')
            ->paginate(50)
            ->withQueryString()
            ->through(fn ($lead) => [
                'id' => $lead->id,
                'pivot_id' => $lead->pivot->id,
                'business_name' => $lead->business_name,
                'category' => $lead->category,
                'phone' => $lead->phone,
                'email' => $lead->email,
                'website' => $lead->website,
                'address' => $lead->address,
                'city' => $lead->city,
                'country' => $lead->country,
                'rating' => $lead->rating,
                'reviews_count' => $lead->reviews_count,
                'ai_score' => $lead->ai_score,
                'ai_category' => $lead->ai_category,
                'user_status' => $lead->pivot->status,
                'is_favorite' => (bool) $lead->pivot->is_favorite,
                'is_archived' => (bool) $lead->pivot->is_archived,
                'tags' => $lead->pivot->tags,
                'notes' => $lead->pivot->notes,
                'added_at' => $lead->pivot->created_at,
            ]);

        return Inertia::render('Leads/Index', [
            'leads' => $leads,
            'filters' => $request->only([
                'q', 'country', 'city', 'category', 'min_rating', 'min_reviews',
                'has_email', 'has_phone', 'has_website', 'status', 'ai_category',
                'is_favorite', 'is_archived',
            ]),
            'stats' => [
                'total' => $request->user()->leads()->count(),
                'new' => $request->user()->leads()->wherePivot('status', 'new')->count(),
                'contacted' => $request->user()->leads()->wherePivot('status', 'contacted')->count(),
                'converted' => $request->user()->leads()->wherePivot('status', 'converted')->count(),
            ],
        ]);
    }

    /**
     * Show one lead.
     */
    public function show(Request $request, Lead $lead): Response
    {
        $pivot = LeadUser::where('user_id', $request->user()->id)
            ->where('lead_id', $lead->id)
            ->firstOrFail();

        return Inertia::render('Leads/Show', [
            'lead' => $lead,
            'pivot' => $pivot,
        ]);
    }

    /**
     * Update a single lead's pivot (status, notes, tags, favorite).
     */
    public function update(Request $request, Lead $lead): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['nullable', 'in:new,contacted,responded,converted,closed'],
            'notes' => ['nullable', 'string', 'max:5000'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:40'],
            'is_favorite' => ['nullable', 'boolean'],
            'is_archived' => ['nullable', 'boolean'],
        ]);

        $pivot = LeadUser::where('user_id', $request->user()->id)
            ->where('lead_id', $lead->id)
            ->firstOrFail();

        if (isset($data['status']) && $data['status'] === 'contacted' && $pivot->status !== 'contacted') {
            $data['contacted_at'] = now();
        }

        $pivot->fill($data)->save();

        return back()->with('success', 'Lead updated.');
    }

    /**
     * Bulk operations: status change, add tag, archive, delete.
     */
    public function bulk(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'lead_ids' => ['required', 'array', 'min:1', 'max:500'],
            'lead_ids.*' => ['integer'],
            'action' => ['required', 'in:set_status,add_tag,archive,unarchive,favorite,unfavorite,delete'],
            'value' => ['nullable', 'string'],
        ]);

        $userId = $request->user()->id;
        $pivots = LeadUser::where('user_id', $userId)
            ->whereIn('lead_id', $data['lead_ids']);

        match ($data['action']) {
            'set_status' => $pivots->update(['status' => $data['value']]),
            'archive' => $pivots->update(['is_archived' => true]),
            'unarchive' => $pivots->update(['is_archived' => false]),
            'favorite' => $pivots->update(['is_favorite' => true]),
            'unfavorite' => $pivots->update(['is_favorite' => false]),
            'delete' => $pivots->delete(),
            'add_tag' => $this->bulkAddTag($pivots->get(), $data['value']),
        };

        return back()->with('success', 'Bulk action applied to '.count($data['lead_ids']).' leads.');
    }

    protected function bulkAddTag($pivots, ?string $tag): void
    {
        if (! $tag) return;
        foreach ($pivots as $pivot) {
            $tags = $pivot->tags ?? [];
            if (! in_array($tag, $tags, true)) {
                $tags[] = $tag;
                $pivot->update(['tags' => $tags]);
            }
        }
    }

    protected function applyFilters($query, Request $request): void
    {
        if ($q = $request->input('q')) {
            $query->where(function ($w) use ($q) {
                $w->where('leads.business_name', 'like', "%{$q}%")
                  ->orWhere('leads.email', 'like', "%{$q}%")
                  ->orWhere('leads.phone', 'like', "%{$q}%");
            });
        }

        if ($country = $request->input('country')) $query->where('leads.country', $country);
        if ($city = $request->input('city')) $query->where('leads.city', 'like', "%{$city}%");
        if ($category = $request->input('category')) $query->where('leads.category', 'like', "%{$category}%");

        if (($r = $request->input('min_rating')) !== null && $r !== '') {
            $query->where('leads.rating', '>=', (float) $r);
        }
        if (($rv = $request->input('min_reviews')) !== null && $rv !== '') {
            $query->where('leads.reviews_count', '>=', (int) $rv);
        }

        if ($request->boolean('has_email')) $query->whereNotNull('leads.email')->where('leads.email', '!=', '');
        if ($request->boolean('has_phone')) $query->whereNotNull('leads.phone')->where('leads.phone', '!=', '');
        if ($request->boolean('has_website')) $query->whereNotNull('leads.website')->where('leads.website', '!=', '');

        if ($status = $request->input('status')) $query->wherePivot('status', $status);
        if ($cat = $request->input('ai_category')) $query->where('leads.ai_category', $cat);

        if ($request->boolean('is_favorite')) $query->wherePivot('is_favorite', true);

        // Default: exclude archived unless explicitly requested
        if ($request->boolean('is_archived')) {
            $query->wherePivot('is_archived', true);
        } else {
            $query->wherePivot('is_archived', false);
        }
    }
}
