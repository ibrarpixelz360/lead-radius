<?php

namespace App\Console\Commands;

use App\Models\BlogPost;
use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';
    protected $description = 'Generate sitemap.xml for SEO.';

    public function handle(): int
    {
        $sitemap = Sitemap::create();

        // Static public pages
        $static = [
            ['url' => '/', 'priority' => 1.0, 'frequency' => Url::CHANGE_FREQUENCY_WEEKLY],
            ['url' => '/pricing', 'priority' => 0.9, 'frequency' => Url::CHANGE_FREQUENCY_MONTHLY],
            ['url' => '/how-it-works', 'priority' => 0.8, 'frequency' => Url::CHANGE_FREQUENCY_MONTHLY],
            ['url' => '/faq', 'priority' => 0.7, 'frequency' => Url::CHANGE_FREQUENCY_MONTHLY],
            ['url' => '/affiliate-program', 'priority' => 0.7, 'frequency' => Url::CHANGE_FREQUENCY_MONTHLY],
            ['url' => '/blog', 'priority' => 0.8, 'frequency' => Url::CHANGE_FREQUENCY_DAILY],
            ['url' => '/contact', 'priority' => 0.5, 'frequency' => Url::CHANGE_FREQUENCY_YEARLY],
            ['url' => '/terms', 'priority' => 0.3, 'frequency' => Url::CHANGE_FREQUENCY_YEARLY],
            ['url' => '/privacy', 'priority' => 0.3, 'frequency' => Url::CHANGE_FREQUENCY_YEARLY],
        ];

        foreach ($static as $page) {
            $sitemap->add(
                Url::create(url($page['url']))
                    ->setPriority($page['priority'])
                    ->setChangeFrequency($page['frequency'])
            );
        }

        // Blog posts
        BlogPost::published()->get()->each(function ($post) use ($sitemap) {
            $sitemap->add(
                Url::create(url("/blog/{$post->slug}"))
                    ->setLastModificationDate($post->updated_at)
                    ->setPriority(0.6)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
            );
        });

        $sitemap->writeToFile(public_path('sitemap.xml'));
        $this->info("Sitemap written to public/sitemap.xml");
        return self::SUCCESS;
    }
}
