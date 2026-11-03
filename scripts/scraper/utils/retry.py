"""
retry() decorator — thin wrapper around BaseScraper.retry() for
non-class functions that still need retry logic.
"""

from __future__ import annotations

import functools
import time
import logging

logger = logging.getLogger(__name__)


def retry(
    max_attempts: int             = 3,
    delay:        float           = 2.0,
    exceptions:   tuple[type, ...] = (Exception,),
):
    """
    Decorator that retries the wrapped function up to *max_attempts* times,
    sleeping *delay * attempt* seconds between retries.

    Usage:
        @retry(max_attempts=3, delay=1.5, exceptions=(PlaywrightTimeout,))
        def fetch_something():
            ...
    """
    def decorator(fn):
        @functools.wraps(fn)
        def wrapper(*args, **kwargs):
            last_exc: Exception | None = None
            for attempt in range(1, max_attempts + 1):
                try:
                    return fn(*args, **kwargs)
                except exceptions as exc:
                    last_exc = exc
                    logger.warning(
                        f"Retry {attempt}/{max_attempts} for '{fn.__name__}': {exc}"
                    )
                    if attempt < max_attempts:
                        time.sleep(delay * attempt)
            raise last_exc  # type: ignore[misc]
        return wrapper
    return decorator
