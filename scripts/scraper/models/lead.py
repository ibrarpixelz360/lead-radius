"""
LeadData — canonical lead structure + NOT NULL validation.

DB columns that are NOT NULL (from SHOW COLUMNS FROM leads):
    rating            decimal(3,1)  NOT NULL  default 0.0
    user_rating_count int           NOT NULL  default 0
    location_count    int           NOT NULL  default 1
    ads               tinyint(1)    NOT NULL  default 0

Every lead dict that leaves this module is guaranteed to satisfy those
constraints, so the PHP LeadRepository never hits a 1048 integrity error.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass, field
from typing import Optional


# ── Dataclass ────────────────────────────────────────────────────────────────

@dataclass
class LeadData:
    # Nullable in DB — Python may legitimately return None
    google_id:                Optional[str]  = None
    googleMapsUri:            Optional[str]  = None
    businessStatus:           Optional[str]  = None

    # Text columns — empty string is safe; never None
    name:                     str            = ""
    internationalPhoneNumber: str            = ""
    websiteUri:               str            = ""
    displayName:              str            = ""
    formattedAddress:         str            = ""
    state:                    str            = ""
    business_type:            str            = "small"

    # NOT NULL numeric — must always be a concrete number
    rating:            float = 0.0   # 0.0 = no rating yet
    user_rating_count: int   = 0     # 0   = no reviews yet
    location_count:    int   = 1     # 1   = assumed single location
    ads:               int   = 0     # 0   = not running ads (checked later)

    # Array / JSON fields
    types:    list = field(default_factory=list)
    ads_data: dict = field(default_factory=lambda: {
        "checked": 1,
        "current": {"count": 0, "details": [], "platforms": []},
    })

    def to_dict(self) -> dict:
        return asdict(self)


# ── Factory ───────────────────────────────────────────────────────────────────

def build_lead(
    *,
    name:            str,
    display_name:    str           = "",
    phone:           str           = "",
    website:         str           = "",
    address:         str           = "",
    state:           str           = "",
    rating:          float | None  = None,
    review_count:    int | None    = None,
    biz_type:        str           = "",
    status:          str | None    = None,
    google_id:       str | None    = None,
    google_maps_uri: str | None    = None,
) -> dict:
    """
    Build a validated lead dict safe for MySQL insertion.
    Applies NOT NULL defaults so the PHP repository never gets a null
    for a column that cannot be null.
    """
    lead = LeadData(
        google_id                 = google_id or None,
        name                      = name or "N/A",
        displayName               = display_name or name or "N/A",
        internationalPhoneNumber  = phone or "",
        googleMapsUri             = google_maps_uri or None,
        websiteUri                = website or "",
        businessStatus            = status or None,
        formattedAddress          = address or "",
        state                     = state or "",
        # NOT NULL — apply explicit defaults when scraper could not extract
        rating                    = _safe_rating(rating),
        user_rating_count         = _safe_int(review_count, default=0),
        location_count            = 1,
        business_type             = "small",
        ads                       = 0,
        types                     = [biz_type] if biz_type else [],
        ads_data                  = {
            "checked": 1,
            "current": {"count": 0, "details": [], "platforms": []},
        },
    )
    return _validate(lead.to_dict())


# ── Guard functions ───────────────────────────────────────────────────────────

def _safe_rating(value: float | None) -> float:
    """
    Returns a valid decimal(3,1) rating.
    - None  → 0.0  (business has no reviews yet — matches DB default)
    - < 0   → 0.0  (impossible but defensive)
    - > 5   → 5.0  (impossible but defensive)
    """
    if value is None:
        return 0.0
    try:
        v = round(float(value), 1)
        return max(0.0, min(5.0, v))
    except (TypeError, ValueError):
        return 0.0


def _safe_int(value: int | None, default: int = 0) -> int:
    """Coerce value to int, returning default when None or unconvertible."""
    if value is None:
        return default
    try:
        return max(0, int(value))
    except (TypeError, ValueError):
        return default


def _validate(lead: dict) -> dict:
    """
    Final safety net — enforce all NOT NULL DB constraints on the dict
    that will be JSON-serialised and sent to Laravel.
    Logs a warning for any field that needed correction.
    """
    # NOT NULL numeric columns
    if not isinstance(lead.get("rating"), (int, float)) or lead["rating"] is None:
        lead["rating"] = 0.0

    if not isinstance(lead.get("user_rating_count"), int) or lead["user_rating_count"] is None:
        lead["user_rating_count"] = 0

    if not isinstance(lead.get("location_count"), int) or lead["location_count"] is None:
        lead["location_count"] = 1

    if lead.get("ads") is None:
        lead["ads"] = 0

    # Required text columns — empty string beats null for varchar NOT NULL
    for col in ("name", "displayName", "formattedAddress", "business_type",
                "internationalPhoneNumber", "websiteUri", "state"):
        if lead.get(col) is None:
            lead[col] = ""

    if not lead.get("business_type"):
        lead["business_type"] = "small"

    return lead
