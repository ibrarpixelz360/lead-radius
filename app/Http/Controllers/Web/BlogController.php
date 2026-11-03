<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/Blog', [
            'posts' => BlogPost::published()
                ->orderByDesc('published_at')
                ->paginate(12)
                ->through(fn ($p) => [
                    'id' => $p->id,
                    'slug' => $p->slug,
                    'title' => $p->title,
                    'excerpt' => $p->excerpt,
                    'cover_image' => $p->cover_image,
                    'published_at' => $p->published_at,
                    'tags' => $p->tags,
                ]),
        ]);
    }

    public function show(string $slug): Response
    {
        $post = BlogPost::published()->where('slug', $slug)->firstOrFail();

        $post->increment('views_count');

        return Inertia::render('Public/BlogPost', [
            'post' => [
                'id' => $post->id,
                'slug' => $post->slug,
                'title' => $post->title,
                'content' => $post->content,
                'excerpt' => $post->excerpt,
                'cover_image' => $post->cover_image,
                'published_at' => $post->published_at,
                'meta_title' => $post->meta_title,
                'meta_description' => $post->meta_description,
                'tags' => $post->tags,
            ],
            'related' => BlogPost::published()
                ->where('id', '!=', $post->id)
                ->latest('published_at')
                ->limit(3)
                ->get(['id', 'slug', 'title', 'excerpt', 'cover_image', 'published_at']),
        ]);
    }
}
