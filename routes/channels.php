<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('search.{searchId}', function ($user, $searchId) {
    return \App\Models\Search::where('id', $searchId)
        ->where('user_id', $user->id)
        ->exists();
});
