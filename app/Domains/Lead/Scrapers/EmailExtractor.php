<?php

namespace App\Domains\Lead\Scrapers;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class EmailExtractor
{
    /** Pages typically containing contact info. */
    protected array $contactPaths = ['', '/contact', '/contact-us', '/about', '/about-us', '/team'];

    /** Email addresses to ignore. */
    protected array $ignoredPatterns = ['/^noreply@/i', '/^no-reply@/i', '/^postmaster@/i', '/sentry\.io$/i'];

    public function __construct(protected Client $http) {}

    /**
     * Visit the website and try to find a real contact email.
     */
    public function extract(string $website): ?string
    {
        $base = rtrim($website, '/');

        foreach ($this->contactPaths as $path) {
            $url = $base.$path;
            $html = $this->fetch($url);
            if (! $html) continue;

            $email = $this->findEmail($html);
            if ($email) return $email;
        }

        return null;
    }

    protected function fetch(string $url): ?string
    {
        try {
            $response = $this->http->get($url, [
                'timeout' => 10,
                'connect_timeout' => 5,
                'allow_redirects' => ['max' => 5],
                'headers' => [
                    'User-Agent' => 'Mozilla/5.0 (compatible; CustomerNearMe-Bot/1.0)',
                    'Accept' => 'text/html,application/xhtml+xml',
                ],
                'http_errors' => false,
            ]);

            if ($response->getStatusCode() !== 200) return null;
            $body = (string) $response->getBody();
            return strlen($body) > 0 ? $body : null;
        } catch (GuzzleException $e) {
            return null;
        }
    }

    protected function findEmail(string $html): ?string
    {
        // 1. mailto: links (highest signal)
        if (preg_match('/mailto:([\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,})/i', $html, $m)) {
            $email = strtolower($m[1]);
            if (! $this->isIgnored($email)) return $email;
        }

        // 2. Plain regex
        $candidates = [];
        if (preg_match_all('/[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}/i', $html, $matches)) {
            foreach ($matches[0] as $email) {
                $email = strtolower($email);
                if (! $this->isIgnored($email)) {
                    $candidates[] = $email;
                }
            }
        }

        // 3. Decode common obfuscations: "name [at] domain [dot] com"
        if (empty($candidates)
            && preg_match('/([\w._%+-]+)\s*\[?\s*at\s*\]?\s*([\w.-]+)\s*\[?\s*dot\s*\]?\s*([a-zA-Z]{2,})/i', $html, $m)) {
            $email = strtolower("{$m[1]}@{$m[2]}.{$m[3]}");
            if (! $this->isIgnored($email)) $candidates[] = $email;
        }

        // Prefer info@/contact@/hello@ over generic
        usort($candidates, function ($a, $b) {
            $priority = fn ($e) => str_starts_with($e, 'info@') || str_starts_with($e, 'contact@') || str_starts_with($e, 'hello@') ? 0 : 1;
            return $priority($a) <=> $priority($b);
        });

        return $candidates[0] ?? null;
    }

    protected function isIgnored(string $email): bool
    {
        foreach ($this->ignoredPatterns as $pattern) {
            if (preg_match($pattern, $email)) return true;
        }
        return false;
    }
}
