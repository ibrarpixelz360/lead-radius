<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Allow generator-new for all authenticated active users/clients
        $referer = (string) $request->headers->get('referer');
        if (
            $request->is('admin/generator-new*') ||
            $request->routeIs('*generator-new*') ||
            str_contains($referer, 'admin/generator-new')
        ) {
            if (! $user || $user->status !== 'active') {
                abort(403, 'Active account required.');
            }

            return $next($request);
        }

        if (! $user || ! $user->isAdmin() || $user->status !== 'active') {
            abort(403, 'Admin access required.');
        }

        return $next($request);
    }
}
