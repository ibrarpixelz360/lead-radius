<?php

namespace App\Domains\Lead\Scrapers;

use App\Domains\Lead\Services\ProxyManager;
use App\Models\Search;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;

/**
 * Production scraper for Google Maps using Browserless headless Chrome.
 *
 * IMPORTANT: Scraping Google Maps is against Google's ToS. This implementation
 * is a starting point. In production you MUST:
 *   - Use residential proxies (Bright Data / Oxylabs)
 *   - Rotate user agents
 *   - Inject random mouse movements / scroll behavior
 *   - Maintain DOM selectors as Google updates their UI
 *
 * Consider Google Places API as a paid alternative.
 */
class GoogleMapsScraper implements ScraperInterface
{
    public function __construct(
        protected ProxyManager $proxyManager,
        protected Client $http,
    ) {}

    public function scrape(Search $search): array
    {
        $browserlessToken = config('cnm.scraping.browserless_token');
        if (empty($browserlessToken) && config('scraper.enabled', true)) {
            $location = trim(($search->city ?: '') . ' ' . ($search->state ?: '') . ' ' . ($search->country ?: ''));
            $limit = (int) config('cnm.scraping.max_results_per_search', 50);
            return app(\App\Services\PythonProcessService::class)->runScraper($search->query, $location, $limit);
        }

        $proxy = $this->proxyManager->allocate();
        $url = $this->buildSearchUrl($search);

        $context = [
            'proxyUrl' => $proxy ? $this->proxyManager->urlFor($proxy) : null,
            'maxResults' => (int) config('cnm.scraping.max_results_per_search', 200),
        ];

        $script = $this->buildBrowserlessScript($url, $search);

        try {
            // Browserless V2: raw JS body + context as a URL-encoded JSON query param.
            // V2 also requires proxy to be set via launch args, not just passed in context.
            $token = config('cnm.scraping.browserless_token');
            $contextParam = urlencode(json_encode($context));
            $browserlessUrl = rtrim(config('cnm.scraping.browserless_url'), '/')
                . '/function?token=' . $token
                . '&context=' . $contextParam;

            $requestOptions = [
                'body' => $script,
                'headers' => ['Content-Type' => 'application/javascript'],
                'timeout' => 90,
            ];

            // Pass proxy as browser launch arg if one was allocated
            if ($proxy) {
                $requestOptions['headers']['x-launch-options'] = json_encode([
                    'args' => ['--proxy-server=' . $this->proxyManager->urlFor($proxy)],
                ]);
            }

            $response = $this->http->post($browserlessUrl, $requestOptions);

            $body = json_decode((string) $response->getBody(), true);

            // Browserless V2: when the script returns { data: [...], type: 'application/json' }
            // the HTTP response body IS the data array directly. Handle both shapes.
            $items = null;
            if (is_array($body)) {
                if (array_key_exists(0, $body) || $body === []) {
                    $items = $body;
                } elseif (isset($body['data']) && is_array($body['data'])) {
                    $items = $body['data'];
                }
            }

            if (! $items) {
                if ($proxy) $this->proxyManager->reportFailure($proxy, 'empty response');
                return [];
            }

            if ($proxy) $this->proxyManager->reportSuccess($proxy);

            $search->update(['proxy_used' => $proxy?->host]);

            return $this->normalize($items, $search);
        } catch (\Throwable $e) {
            Log::warning('GoogleMapsScraper Browserless failed, attempting fallback to Python scraper', [
                'search_id' => $search->id,
                'error'     => $e->getMessage(),
            ]);

            if (config('scraper.enabled', true)) {
                $location = trim(($search->city ?: '') . ' ' . ($search->state ?: '') . ' ' . ($search->country ?: ''));
                $limit = (int) config('cnm.scraping.max_results_per_search', 50);
                return app(\App\Services\PythonProcessService::class)->runScraper($search->query, $location, $limit);
            }

            if ($proxy) $this->proxyManager->reportFailure($proxy, $e->getMessage());
            throw $e;
        }
    }

    protected function buildSearchUrl(Search $search): string
    {
        $query = urlencode("{$search->query} in {$search->city} {$search->country}");
        return "https://www.google.com/maps/search/{$query}";
    }

    /**
     * The JS executed inside the headless browser.
     * This is intentionally a starting template — you'll iterate on selectors.
     */
    protected function buildBrowserlessScript(string $url, Search $search): string
    {
        $maxResults = (int) config('cnm.scraping.max_results_per_search', 200);

        return <<<JS
export default async ({ page, context }) => {
  const { maxResults = {$maxResults} } = context || {};

  // Stealth tweaks
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
    Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3] });
  });

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  );
  await page.setViewport({ width: 1366, height: 768 });
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });

  await page.goto({$this->jsString($url)}, { waitUntil: 'networkidle2', timeout: 60000 });

  // Accept any cookie/consent dialogs Google may show
  try {
    const consentBtn = await page.$('button[aria-label*="Accept"], form[action*="consent"] button');
    if (consentBtn) {
      await consentBtn.click();
      await new Promise(r => setTimeout(r, 1000));
    }
  } catch (_) {}

  // Wait for results panel — try multiple known selectors
  const feedSelector = 'div[role="feed"]';
  try {
    await page.waitForSelector(feedSelector, { timeout: 20000 });
  } catch (e) {
    return { data: [], type: 'application/json' };
  }

  // Scroll feed to load more results
  let prevCount = 0;
  for (let i = 0; i < 15; i++) {
    const count = await page.evaluate((sel) =>
      document.querySelectorAll(sel + ' > div').length,
      feedSelector
    );
    if (count >= maxResults || count === prevCount) break;
    prevCount = count;
    await page.evaluate((sel) => {
      const feed = document.querySelector(sel);
      if (feed) feed.scrollBy(0, feed.clientHeight);
    }, feedSelector);
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 1500));
  }

  // Extract listings — use stable ARIA/role attributes rather than obfuscated class names
  const data = await page.evaluate((feedSel, max) => {
    const results = [];

    // Each result in the feed is a div > div containing an anchor to /maps/place/
    const feed = document.querySelector(feedSel);
    if (!feed) return results;

    const anchors = Array.from(feed.querySelectorAll('a[href*="/maps/place/"]'));

    for (let i = 0; i < Math.min(anchors.length, max); i++) {
      const anchor = anchors[i];
      const card = anchor.closest('div[jsaction]') || anchor.parentElement;
      if (!card) continue;

      const rawText = (card.innerText || anchor.innerText || '').trim();
      // Collapse newlines → spaces so regexes match across line-broken elements
      const text = rawText.replace(/\\s+/g, ' ');
      const lines = rawText.split('\\n').map(l => l.trim()).filter(Boolean);

      // Business name: aria-label on the anchor is the most reliable source
      const ariaLabel = anchor.getAttribute('aria-label') || '';
      const businessName = ariaLabel || lines[0] || '';
      if (!businessName) continue;

      // Place ID from the href: .../maps/place/...!19sCHIJxxx
      const hrefPlaceId = (anchor.href.match(/!19s([^!&?]+)/) || [])[1] || null;
      const cidMatch = anchor.href.match(/[?&]cid=(\\d+)/) || anchor.href.match(/0x[0-9a-f]+:0x([0-9a-f]+)/i);
      const placeId = hrefPlaceId || (cidMatch ? cidMatch[1] : null);

      // Rating: Google list view shows just "4.4" on its own line — no review count visible
      const ratingLine = lines.find(l => /^\\d+\\.\\d+$/.test(l));
      const rating = ratingLine ? parseFloat(ratingLine) : null;

      // Category line format: "Category ·  · Address" — take first part as category
      const categoryLine = lines.find(l =>
        l.includes('·') && !/^(Open|Closed|Temporarily|Permanently)/i.test(l)
      );
      const catParts = categoryLine
        ? categoryLine.split('·').map(p => p.trim()).filter(Boolean)
        : [];
      const category = catParts[0] || null;
      // Address is embedded as the last segment after the final '·' in category line
      const addressFromCat = catParts.length > 1 ? catParts[catParts.length - 1] : null;

      // Fallback address: digit-containing line that isn't hours/phone/rating
      const address = addressFromCat || lines.find(l =>
        /\\d/.test(l) &&
        !/^[+\\d\\s\\-().]{7,}$/.test(l) &&
        !/^\\d+\\.\\d/.test(l) &&
        !/^(Open|Closed|Temporarily|Permanently)/i.test(l) &&
        !l.includes('·')
      ) || null;

      // Phone: standalone phone line or inline match
      const phoneLine = lines.find(l => /^[+\\d][\\d\\s\\-().]{6,}\\d$/.test(l.trim()));
      const phoneInline = (text.match(/(?<![\\d.])([+]?\\d[\\d\\s\\-().]{6,}\\d)(?![\\d.])/) || [])[1];
      const phone = phoneLine || phoneInline || null;

      // Website link via aria-label on sibling elements
      const websiteAnchor = card.querySelector(
        'a[aria-label*="website" i], a[data-value="Website"], a[aria-label*="Website"]'
      );
      const website = websiteAnchor ? websiteAnchor.href : null;

      results.push({
        google_place_id: placeId,
        business_name: businessName.trim(),
        rating,
        reviews_count: 0,
        category,
        address,
        phone: phone ? phone.trim() : null,
        website,
      });
    }
    return results;
  }, feedSelector, maxResults);

  return { data, type: 'application/json' };
};
JS;
    }

    protected function jsString(string $value): string
    {
        return json_encode($value, JSON_UNESCAPED_SLASHES);
    }

    /**
     * Normalize raw scraped items into the schema expected by LeadDeduplicator.
     */
    protected function normalize(array $rawItems, Search $search): array
    {
        $normalized = [];
        foreach ($rawItems as $raw) {
            if (empty($raw['business_name'])) {
                continue;
            }

            $normalized[] = [
                'google_place_id' => $raw['google_place_id'] ?? null,
                'business_name' => trim($raw['business_name']),
                'category' => $raw['category'] ?? $search->category ?? null,
                'phone' => $this->cleanPhone($raw['phone'] ?? null),
                'website' => $this->cleanWebsite($raw['website'] ?? null),
                'email' => null, // enrichment job fills this
                'address' => $raw['address'] ?? null,
                'city' => $search->city,
                'state' => $search->state,
                'country' => $search->country,
                'lat' => isset($raw['lat']) ? (float) $raw['lat'] : null,
                'lng' => isset($raw['lng']) ? (float) $raw['lng'] : null,
                'rating' => isset($raw['rating']) ? (float) $raw['rating'] : null,
                'reviews_count' => (int) ($raw['reviews_count'] ?? 0),
                'hours' => $raw['hours'] ?? null,
                'photos' => $raw['photos'] ?? null,
            ];
        }
        return $normalized;
    }

    protected function cleanPhone(?string $phone): ?string
    {
        if (! $phone) return null;
        $cleaned = preg_replace('/[^\d+]/', '', $phone);
        return strlen($cleaned) >= 7 ? $cleaned : null;
    }

    protected function cleanWebsite(?string $url): ?string
    {
        if (! $url) return null;
        if (! preg_match('#^https?://#', $url)) return null;
        // Strip Google redirect URLs
        if (str_contains($url, 'google.com/url?')) {
            parse_str(parse_url($url, PHP_URL_QUERY) ?? '', $q);
            return $q['url'] ?? $q['q'] ?? null;
        }
        return $url;
    }
}
