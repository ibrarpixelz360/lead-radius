<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/v1/me', fn (Request $r) => $r->user());
    // Lead, subscription, affiliate APIs go here in next turn
});

Route::prefix('v1/auth')->group(function () {
    // Public auth endpoints (mobile API) — to be added in API phase
});
