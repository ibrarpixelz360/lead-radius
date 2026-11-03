<?php

namespace App\Http\Middleware;

use App\Domains\Subscription\Services\PlanLimitChecker;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnforcePlanLimits
{
    public function __construct(protected PlanLimitChecker $checker) {}

    public function handle(Request $request, Closure $next, string $limit): Response
    {
        $user = $request->user();

        if (! $user) {
            return redirect()->route('login');
        }

        $allowed = match ($limit) {
            'leads' => $this->checker->canGenerateLeads($user),
            'export' => $this->checker->canExport($user),
            'saved_search' => $this->checker->canSaveSearch($user),
            default => true,
        };

        if (! $allowed) {
            $message = match ($limit) {
                'leads' => 'Monthly lead generation limit reached for your plan.',
                'export' => 'Monthly export limit reached for your plan.',
                'saved_search' => 'Saved searches limit reached for your plan.',
                default => 'Plan limit reached.',
            };

            if ($request->expectsJson()) {
                return response()->json([
                    'message' => $message,
                    'code' => 'plan_limit_exceeded',
                ], 402);
            }

            return back()->with('warning', $message.' Upgrade your plan to continue.');
        }

        return $next($request);
    }
}
