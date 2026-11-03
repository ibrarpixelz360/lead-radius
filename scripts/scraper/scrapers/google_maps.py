"""
GoogleMapsScraper
─────────────────
1.  Navigate to Google Maps search URL.
2.  Scroll the left-panel feed to collect listing URLs (up to `limit`).
3.  For each URL, open the detail panel and extract structured data.
4.  Return lead dicts validated against the Laravel Lead model's NOT NULL rules.

Target URL:
    https://www.google.com/maps/search/{query+location}
"""

from __future__ import annotations

import re
import time
from urllib.parse import quote_plus

from playwright.sync_api import TimeoutError as PlaywrightTimeout

from scrapers.base import BaseScraper
from models.lead import build_lead
from utils.logger import get_logger
from utils.normalizer import normalize_phone, normalize_website
import config

logger = get_logger(__name__)

# ── Stable selectors (prefer aria-* attributes — less brittle than class names) ─
SEL_FEED          = '[role="feed"]'
SEL_LISTING_LINK  = "a.hfpxzc"

SEL_DETAIL_NAME   = "h1.DUwDvf"
SEL_DETAIL_ADDR   = '[data-item-id="address"] .Io6YTe'
SEL_DETAIL_PHONE  = '[data-item-id^="phone"]'
SEL_DETAIL_WEB    = 'a[data-item-id="authority"]'   # href is on the <a> itself
SEL_DETAIL_TYPE   = "button.DkEaL"
SEL_DETAIL_STATUS = "div.o0Svhf span"
SEL_CONSENT_BTN   = (
    "button[aria-label='Accept all'], "
    "button[aria-label='Reject all'], "
    "form[action*='consent'] button"
)

# Rating / review — Google obfuscates class names; rely on aria attributes.
# "Rated 4.5 out of 5, 1,234 reviews" is always on the aria-label of the
# star-icon wrapper — this is the most stable extraction point.
SEL_RATING_CONTAINER = "[aria-label*='out of 5']"
SEL_REVIEW_BTN       = "button[jsaction*='reviewSort'], button[aria-label*='review']"


class GoogleMapsScraper(BaseScraper):

    BASE_URL = "https://www.google.com/maps/search/{query}"

    def run(self, query: str, location: str) -> list[dict]:
        self.start()

        full_query = f"{query} in {location}"
        url = self.BASE_URL.format(query=quote_plus(full_query))

        logger.info(f"[Batch:{self.batch_id}] Navigating → {url}")
        self.retry(
            lambda: self._page.goto(url, wait_until="domcontentloaded"),
            label="page.goto",
        )

        self._dismiss_consent()

        if not self.wait_for(SEL_FEED, timeout=20_000):
            logger.warning(f"[Batch:{self.batch_id}] Feed not found for: {full_query}")
            return []

        listing_urls = self._collect_listing_urls()
        logger.info(f"[Batch:{self.batch_id}] Collected {len(listing_urls)} listing URLs")

        leads: list[dict] = []

        for idx, listing_url in enumerate(listing_urls, start=1):
            if len(leads) >= self.limit:
                break

            logger.debug(f"[Batch:{self.batch_id}] [{idx}/{len(listing_urls)}] scraping detail")

            try:
                lead = self._scrape_detail(listing_url)
                if lead:
                    leads.append(lead)
                    logger.debug(
                        f"[Batch:{self.batch_id}] OK — {lead['displayName']} "
                        f"rating={lead['rating']} reviews={lead['user_rating_count']}"
                    )
            except Exception as exc:
                logger.warning(f"[Batch:{self.batch_id}] Detail scrape failed [{idx}]: {exc}")

            self.random_sleep(0.8, 2.0)

        logger.info(f"[Batch:{self.batch_id}] Scraped {len(leads)} leads")
        return leads

    # ── Feed collection ───────────────────────────────────────────────────────

    def _collect_listing_urls(self) -> list[str]:
        urls: list[str] = []
        seen: set[str]  = set()
        stale_rounds    = 0

        for scroll_round in range(config.MAX_SCROLL_ROUNDS):
            items = self._page.query_selector_all(SEL_LISTING_LINK)
            prev_count = len(urls)

            for item in items:
                href = item.get_attribute("href") or ""
                if href and "/maps/place/" in href and href not in seen:
                    seen.add(href)
                    urls.append(href)

            if len(urls) >= self.limit:
                break

            feed = self._page.query_selector(SEL_FEED)
            if not feed:
                break

            feed.evaluate("el => el.scrollTop += 800")
            time.sleep(config.SCROLL_PAUSE)

            if len(urls) == prev_count:
                stale_rounds += 1
                if stale_rounds >= 3:
                    logger.debug(f"[Batch:{self.batch_id}] Feed exhausted after {scroll_round + 1} scrolls")
                    break
            else:
                stale_rounds = 0

        return urls[: self.limit]

    # ── Detail page extraction ────────────────────────────────────────────────

    def _scrape_detail(self, url: str) -> dict | None:
        self.retry(
            lambda: self._page.goto(url, wait_until="domcontentloaded"),
            label="detail.goto",
        )

        if not self.wait_for(SEL_DETAIL_NAME, timeout=15_000):
            logger.warning(f"[Batch:{self.batch_id}] Name not found: {url}")
            return None

        name = self.safe_text(SEL_DETAIL_NAME)
        if not name:
            return None

        # Give dynamic content a moment to settle (rating loads async)
        self.random_sleep(0.8, 1.5)

        phone    = normalize_phone(self._extract_phone())
        website  = normalize_website(self._extract_website())
        address  = self.safe_text(SEL_DETAIL_ADDR)
        rating   = self._parse_rating()
        reviews  = self._parse_review_count()
        btype    = self.safe_text(SEL_DETAIL_TYPE)
        status   = self._parse_status()
        gmaps_url = self._clean_maps_url(self._page.url)
        google_id = self._extract_place_id(self._page.url)
        state     = self._extract_state(address)

        return build_lead(
            name            = name,
            display_name    = name,
            phone           = phone,
            website         = website,
            address         = address,
            state           = state,
            rating          = rating,
            review_count    = reviews,
            biz_type        = btype,
            status          = status,
            google_id       = google_id,
            google_maps_uri = gmaps_url,
        )

    # ── Rating extraction (4 strategies, guaranteed float return) ────────────

    def _parse_rating(self) -> float:
        """
        Always returns a float (0.0 when the business has no reviews).
        Tries four progressively broader strategies before defaulting.
        """

        # Strategy 1 — aria-label="Rated X.X out of 5, …" on the star wrapper.
        # This is Google's accessibility text — the most stable signal.
        rating = self._rating_from_aria_label()
        if rating is not None:
            return rating

        # Strategy 2 — any visible numeric span inside the known container class.
        # Google obfuscates class names but F7nice has been stable for years.
        rating = self._rating_from_f7nice_span()
        if rating is not None:
            return rating

        # Strategy 3 — scan ALL aria-labels on the page for the rating pattern.
        rating = self._rating_from_page_scan()
        if rating is not None:
            return rating

        # Strategy 4 — no rating data found.  Business either has zero reviews
        # or the DOM changed.  0.0 matches the DB column default and is safe.
        logger.debug(f"[Batch:{self.batch_id}] No rating found — defaulting to 0.0")
        return 0.0

    def _rating_from_aria_label(self) -> float | None:
        """Extract rating from 'Rated X.X out of 5' aria-label."""
        try:
            els = self._page.query_selector_all(SEL_RATING_CONTAINER)
            for el in els:
                aria = el.get_attribute("aria-label") or ""
                m = re.search(r"[Rr]ated\s+([\d]+[.,][\d]+|[\d]+)\s+out of 5", aria)
                if m:
                    return round(float(m.group(1).replace(",", ".")), 1)
        except Exception:
            pass
        return None

    def _rating_from_f7nice_span(self) -> float | None:
        """
        Look for the numeric rating inside div.F7nice.
        Searches ALL descendant spans (not just direct children) for a number
        that is a valid star rating (0.0–5.0).
        """
        try:
            container = self._page.query_selector("div.F7nice")
            if not container:
                return None
            # All spans — aria-hidden="true" ones carry display text
            spans = container.query_selector_all("span[aria-hidden='true'], span[aria-hidden=\"true\"]")
            for span in spans:
                text = (span.inner_text() or "").strip().replace(",", ".")
                if re.match(r"^\d(\.\d)?$", text):
                    val = float(text)
                    if 1.0 <= val <= 5.0:
                        return val
        except Exception:
            pass
        return None

    def _rating_from_page_scan(self) -> float | None:
        """Last resort: scan the full page text for 'Rated X.X out of 5'."""
        try:
            body = self._page.inner_text("body") or ""
            m = re.search(r"[Rr]ated\s+([\d]+[.,][\d]*)\s+out of 5", body)
            if m:
                return round(float(m.group(1).replace(",", ".")), 1)
        except Exception:
            pass
        return None

    # ── Review count extraction (3 strategies, guaranteed int return) ─────────

    def _parse_review_count(self) -> int:
        """
        Always returns an int (0 when the business has no reviews).
        """

        # Strategy 1 — aria-label="X,XXX reviews" on any element
        count = self._reviews_from_aria_label()
        if count is not None:
            return count

        # Strategy 2 — parenthesised number "(1,234)" inside div.F7nice
        count = self._reviews_from_f7nice_text()
        if count is not None:
            return count

        # Strategy 3 — review button text / aria-label
        count = self._reviews_from_button()
        if count is not None:
            return count

        logger.debug(f"[Batch:{self.batch_id}] No review count found — defaulting to 0")
        return 0

    def _reviews_from_aria_label(self) -> int | None:
        try:
            # Matches "1,234 reviews" or "1234 reviews"
            els = self._page.query_selector_all("[aria-label*='review']")
            for el in els:
                aria = el.get_attribute("aria-label") or ""
                m = re.search(r"([\d,]+)\s+review", aria, re.IGNORECASE)
                if m:
                    return int(m.group(1).replace(",", ""))
        except Exception:
            pass
        return None

    def _reviews_from_f7nice_text(self) -> int | None:
        try:
            container = self._page.query_selector("div.F7nice")
            if not container:
                return None
            text = container.inner_text() or ""
            # Google renders review count as "(1,234)" next to the rating
            m = re.search(r"\(([\d,]+)\)", text)
            if m:
                return int(m.group(1).replace(",", ""))
        except Exception:
            pass
        return None

    def _reviews_from_button(self) -> int | None:
        try:
            els = self._page.query_selector_all(SEL_REVIEW_BTN)
            for el in els:
                text = el.inner_text() or ""
                aria = el.get_attribute("aria-label") or ""
                for source in (aria, text):
                    m = re.search(r"([\d,]+)\s+review", source, re.IGNORECASE)
                    if m:
                        return int(m.group(1).replace(",", ""))
                    # Also match "(1,234)" format in button text
                    m = re.search(r"\(([\d,]+)\)", source)
                    if m:
                        return int(m.group(1).replace(",", ""))
        except Exception:
            pass
        return None

    # ── Other field extractors ────────────────────────────────────────────────

    def _dismiss_consent(self) -> None:
        try:
            self._page.wait_for_selector(SEL_CONSENT_BTN, timeout=5_000)
            self._page.click(SEL_CONSENT_BTN)
            self.random_sleep(1, 2)
        except PlaywrightTimeout:
            pass

    def _extract_website(self) -> str:
        """
        Three strategies for website extraction — returns '' when not listed.

        Strategy 1: a[data-item-id="authority"]  ← href lives on the <a> itself.
        Strategy 2: aria-label="Website: …"       ← parse URL from aria text.
        Strategy 3: aria-label="Open website"     ← secondary anchor Google adds.
        """
        # Strategy 1 — direct href on the authority anchor
        try:
            el = self._page.query_selector(SEL_DETAIL_WEB)
            if el:
                href = (el.get_attribute("href") or "").strip()
                if href and not href.startswith("https://www.google"):
                    return href
        except Exception:
            pass

        # Strategy 2 — aria-label="Website: example.com" pattern
        try:
            els = self._page.query_selector_all('[aria-label*="Website:"]')
            for el in els:
                aria = el.get_attribute("aria-label") or ""
                href = el.get_attribute("href") or ""
                if href and not href.startswith("https://www.google"):
                    return href
                # Fallback: parse URL from aria-label text
                m = re.search(r"Website:\s*(\S+)", aria)
                if m:
                    return m.group(1).strip()
        except Exception:
            pass

        # Strategy 3 — "Open website" secondary button
        try:
            els = self._page.query_selector_all('[aria-label="Open website"]')
            for el in els:
                href = el.get_attribute("href") or ""
                if href and not href.startswith("https://www.google"):
                    return href
        except Exception:
            pass

        return ""   # Business has no website listed on Google Maps

    def _extract_phone(self) -> str:
        try:
            el = self._page.query_selector(SEL_DETAIL_PHONE)
            if not el:
                return ""
            aria = el.get_attribute("aria-label") or ""
            m = re.search(r"Phone[:\s]+(.+)", aria, re.IGNORECASE)
            if m:
                return m.group(1).strip()
            return el.inner_text().strip()
        except Exception:
            return ""

    def _parse_status(self) -> str | None:
        raw = self.safe_text(SEL_DETAIL_STATUS)
        if not raw:
            return None
        lower = raw.lower()
        if "permanently closed" in lower:
            return "CLOSED_PERMANENTLY"
        if "temporarily closed" in lower:
            return "CLOSED_TEMPORARILY"
        if "open" in lower:
            return "OPERATIONAL"
        return None

    @staticmethod
    def _clean_maps_url(url: str) -> str:
        """
        Strip '/data=...' and query params from the Google Maps URL.
        The base URL (https://www.google.com/maps/place/Name/) is always
        well under 255 chars and is a valid, bookmarkable link.
        """
        # Remove everything from /data= onwards
        base = re.split(r"/data=", url, maxsplit=1)[0].rstrip("/")
        # Also strip any lingering query string
        base = base.split("?")[0]
        return base[:255]  # hard cap as final backstop

    @staticmethod
    def _extract_place_id(url: str) -> str | None:
        # Prefer the ChIJ-format ID (matches Google Places API) from the !19s segment
        m = re.search(r"!19s(ChIJ[A-Za-z0-9_-]+)", url)
        if m:
            return m.group(1)
        # Fallback: hex-encoded ID from the !1s segment
        m = re.search(r"1s([A-Za-z0-9_:%-]+)[!/]", url)
        if m:
            return m.group(1)
        # Fallback: explicit place_id query param
        m = re.search(r"place_id=([^&]+)", url)
        if m:
            return m.group(1)
        return None

    @staticmethod
    def _extract_state(address: str) -> str:
        if not address:
            return ""
        au_states = {"NSW", "VIC", "QLD", "SA", "WA", "TAS", "ACT", "NT"}
        for segment in reversed(address.split(",")):
            for word in segment.split():
                if word.upper() in au_states:
                    return word.upper()
        return ""
