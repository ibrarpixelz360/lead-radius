"""
Data normalisation helpers for raw values extracted from web pages.
"""

from __future__ import annotations

import re


def normalize_phone(raw: str) -> str:
    """
    Strip irrelevant characters, ensure international format where possible.
    Returns '' if raw is empty.

    Examples:
        "(07) 3000 0000"   → "+61 7 3000 0000"  (AU local → international)
        "+61 7 3000 0000"  → "+61 7 3000 0000"  (already clean)
        "Phone: +61…"      → "+61…"              (label prefix stripped)
    """
    if not raw:
        return ""

    # Strip "Phone:" label prefix if present
    raw = re.sub(r"^[Pp]hone[:\s]+", "", raw).strip()

    # Remove everything except digits, +, spaces, hyphens, parentheses
    cleaned = re.sub(r"[^\d+\s\-()]", "", raw).strip()

    # Normalise Australian local numbers → international
    # (07) XXXX XXXX or 07 XXXX XXXX → +61 7 XXXX XXXX
    au_local = re.match(r"^\(?0([2-9])\)?[\s\-]?(\d{4})[\s\-]?(\d{4})$", cleaned)
    if au_local:
        return f"+61 {au_local.group(1)} {au_local.group(2)} {au_local.group(3)}"

    return cleaned


def normalize_website(raw: str) -> str:
    """
    Ensure the URL has a scheme.  Returns '' if raw is empty.

    Examples:
        "example.com"        → "https://example.com"
        "http://example.com" → "http://example.com"
    """
    if not raw:
        return ""

    raw = raw.strip().rstrip("/")

    if raw and not raw.startswith(("http://", "https://")):
        raw = "https://" + raw

    return raw


def normalize_address(raw: str) -> str:
    """Collapse excessive whitespace in an address string."""
    if not raw:
        return ""
    return re.sub(r"\s+", " ", raw).strip()
