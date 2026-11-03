"""
BaseScraper — abstract foundation for all Playwright scrapers.

Subclasses must implement:
    run(query: str, location: str) -> list[dict]
"""

from __future__ import annotations

import time
import random
from abc import ABC, abstractmethod

from playwright.sync_api import (
    sync_playwright,
    Page,
    Browser,
    BrowserContext,
    TimeoutError as PlaywrightTimeout,
)

import config
from utils.logger import get_logger

logger = get_logger(__name__)


class BaseScraper(ABC):

    def __init__(
        self,
        headless:   bool = True,
        limit:      int  = 100,
        batch_id:   int  = 0,
    ) -> None:
        self.headless  = headless
        self.limit     = limit
        self.batch_id  = batch_id

        self._playwright  = None
        self._browser: Browser | None         = None
        self._context: BrowserContext | None  = None
        self._page:    Page | None            = None

    # ── Lifecycle ─────────────────────────────────────────────────────────

    def start(self) -> None:
        """Launch browser and create a stealth page."""
        self._playwright = sync_playwright().start()

        self._browser = self._playwright.chromium.launch(
            headless=self.headless,
            args=[
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-blink-features=AutomationControlled",
            ],
        )

        self._context = self._browser.new_context(
            viewport={"width": 1280, "height": 900},
            user_agent=config.USER_AGENT,
            java_script_enabled=True,
            accept_downloads=False,
        )

        # Remove webdriver fingerprint
        self._context.add_init_script(
            "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
        )

        self._page = self._context.new_page()
        self._page.set_default_timeout(config.PAGE_TIMEOUT)
        self._page.set_default_navigation_timeout(config.NAV_TIMEOUT)

        logger.debug(f"[Batch:{self.batch_id}] Browser started (headless={self.headless})")

    def close(self) -> None:
        """Gracefully shut down browser resources."""
        try:
            if self._browser:
                self._browser.close()
            if self._playwright:
                self._playwright.stop()
        except Exception as exc:
            logger.warning(f"[Batch:{self.batch_id}] Error closing browser: {exc}")

    # ── Abstract interface ────────────────────────────────────────────────

    @abstractmethod
    def run(self, query: str, location: str) -> list[dict]:
        """Execute the scrape. Returns a list of lead dicts."""

    # ── Helpers ───────────────────────────────────────────────────────────

    def random_sleep(self, min_s: float = 1.0, max_s: float = 3.0) -> None:
        time.sleep(random.uniform(min_s, max_s))

    def retry(self, fn, *args, label: str = "operation", **kwargs):
        """
        Retry *fn* up to config.RETRY_ATTEMPTS times with exponential back-off.
        Re-raises the last exception if all attempts fail.
        """
        last_exc: Exception | None = None

        for attempt in range(1, config.RETRY_ATTEMPTS + 1):
            try:
                return fn(*args, **kwargs)
            except Exception as exc:
                last_exc = exc
                logger.warning(
                    f"[Batch:{self.batch_id}] '{label}' attempt {attempt}/{config.RETRY_ATTEMPTS} failed: {exc}"
                )
                if attempt < config.RETRY_ATTEMPTS:
                    time.sleep(config.RETRY_DELAY * attempt)

        raise last_exc  # type: ignore[misc]

    def safe_text(self, selector: str, *, page: Page | None = None) -> str:
        """Return inner_text of the first matching element, or '' on failure."""
        _page = page or self._page
        try:
            el = _page.query_selector(selector)
            return el.inner_text().strip() if el else ""
        except Exception:
            return ""

    def safe_attr(self, selector: str, attr: str, *, page: Page | None = None) -> str:
        """Return an attribute value of the first matching element, or '' on failure."""
        _page = page or self._page
        try:
            el = _page.query_selector(selector)
            return (el.get_attribute(attr) or "").strip() if el else ""
        except Exception:
            return ""

    def wait_for(self, selector: str, timeout: int | None = None, *, page: Page | None = None) -> bool:
        """Return True if element appears within timeout, False otherwise."""
        _page   = page or self._page
        _timeout = timeout or config.PAGE_TIMEOUT
        try:
            _page.wait_for_selector(selector, timeout=_timeout)
            return True
        except PlaywrightTimeout:
            return False
