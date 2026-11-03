<?php

namespace App\Http\Controllers\Web;

use App\Domains\Subscription\Services\PlanLimitChecker;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request, PlanLimitChecker $checker): Response
    {
        $user         = $request->user();
        $plan         = $user->currentPlan();
        $subscription = $user->activeSubscription;

        $totalLeads   = $user->leadEntries()->count();
        $todayLeads   = $user->leadEntries()->whereDate('created_at', today())->count();
        $monthlyLeads = $checker->monthlyLeadsUsed($user);
        $hotLeads     = $user->leads()->where('leads.ai_category', 'hot')->count();

        return Inertia::render('Dashboard/Index', [
            'stats' => [
                'total_leads'                 => $totalLeads,
                'today_leads'                 => $todayLeads,
                'monthly_leads'               => $monthlyLeads,
                'hot_leads'                   => $hotLeads,
                'monthly_limit'               => $plan?->monthly_lead_limit,
                'affiliate_balance'           => $user->affiliateBalance(),
                'affiliate_pending'           => $user->pendingCommissions(),
                'trial_days_left'             => $user->trialDaysLeft(),
                'subscription_days_remaining' => $subscription?->daysRemaining(),
            ],
            'plan_info' => $plan ? [
                'name'                 => $plan->name,
                'slug'                 => $plan->slug,
                'is_trial'             => $subscription?->isOnTrial() ?? false,
                'expires_at'           => $subscription?->ends_at?->format('d M Y'),
                'expires_human'        => $subscription?->ends_at?->diffForHumans(),
                'monthly_lead_limit'   => $plan->monthly_lead_limit,
                'monthly_export_limit' => $plan->monthly_export_limit,
                'max_devices'          => $plan->max_devices,
                'priority_support'     => $plan->priority_support,
                'ai_scoring'           => $plan->ai_scoring,
                'api_access'           => $plan->api_access,
                'saved_searches_limit' => $plan->saved_searches_limit,
            ] : null,
            'recent_searches' => $user->searches()
                ->latest()
                ->limit(5)
                ->get(['id', 'query', 'city', 'country', 'status', 'results_count', 'created_at']),
            'recent_leads' => $user->leads()
                ->latest('lead_user.created_at')
                ->limit(10)
                ->get(['leads.id', 'business_name', 'city', 'rating', 'phone', 'email', 'ai_category']),
        ]);
    }
}
