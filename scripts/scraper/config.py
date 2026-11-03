"""
Scraper runtime configuration.
Values can be overridden via environment variables.
"""

import os

HEADLESS: bool        = os.getenv("SCRAPER_HEADLESS", "true").lower() != "false"
DEFAULT_LIMIT: int    = int(os.getenv("SCRAPER_DEFAULT_LIMIT", "100"))
PAGE_TIMEOUT: int     = int(os.getenv("SCRAPER_PAGE_TIMEOUT", "15000"))   # ms — 15s; failed page retries cost 15+1+15=31s instead of 96s
NAV_TIMEOUT: int      = int(os.getenv("SCRAPER_NAV_TIMEOUT",  "15000"))   # ms
RETRY_ATTEMPTS: int   = int(os.getenv("SCRAPER_RETRY_ATTEMPTS", "2"))     # 2 attempts; 3rd retry rarely recovers and wastes 30s
RETRY_DELAY: float    = float(os.getenv("SCRAPER_RETRY_DELAY", "1.0"))    # seconds
SCROLL_PAUSE: float   = float(os.getenv("SCRAPER_SCROLL_PAUSE", "1.5"))   # seconds
MAX_SCROLL_ROUNDS: int = int(os.getenv("SCRAPER_MAX_SCROLL_ROUNDS", "30"))

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/124.0.0.0 Safari/537.36"
)
