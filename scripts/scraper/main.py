#!/usr/bin/env python3
"""
Lead Scraper — entry point called by Laravel's PythonProcessService.

Usage:
    python main.py \
        --query    "car dealerships" \
        --location "Brisbane QLD, Australia" \
        --limit    100 \
        --output   /storage/scraper/output/batch_42_car_dealerships.json \
        --batch-id 42 \
        --source   google_maps \
        --headless true
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

# Ensure project root is importable regardless of cwd
sys.path.insert(0, str(Path(__file__).parent))

from scrapers.google_maps import GoogleMapsScraper
from utils.logger import get_logger

logger = get_logger(__name__)

# ── Scraper registry ──────────────────────────────────────────────────────────
SCRAPERS: dict[str, type] = {
    "google_maps": GoogleMapsScraper,
}


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Playwright lead scraper")
    p.add_argument("--query",     required=True,  help="Search query (e.g. 'car dealerships')")
    p.add_argument("--location",  required=True,  help="Location string (e.g. 'Brisbane QLD, Australia')")
    p.add_argument("--limit",     type=int, default=100, help="Max leads to collect")
    p.add_argument("--output",    required=True,  help="Absolute path to write JSON output")
    p.add_argument("--batch-id",  type=int, default=0, dest="batch_id")
    p.add_argument("--source",    default="google_maps", choices=list(SCRAPERS))
    p.add_argument(
        "--headless",
        type=lambda x: x.lower() != "false",
        default=True,
        help="'true' (default) or 'false' for visible browser",
    )
    return p.parse_args()


def write_output(path: str, leads: list[dict], meta: dict) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as fh:
        json.dump({"leads": leads, "meta": meta}, fh, ensure_ascii=False, indent=2)


def main() -> None:
    args = parse_args()

    logger.info(
        "Scraper started",
        extra={
            "batch_id": args.batch_id,
            "query":    args.query,
            "location": args.location,
            "limit":    args.limit,
            "source":   args.source,
            "headless": args.headless,
        },
    )

    scraper_cls = SCRAPERS.get(args.source)
    if not scraper_cls:
        logger.error(f"Unknown source: {args.source}")
        write_output(args.output, [], {"total_found": 0, "error": f"Unknown source: {args.source}"})
        sys.exit(1)

    scraper = scraper_cls(
        headless=args.headless,
        limit=args.limit,
        batch_id=args.batch_id,
    )

    leads: list[dict] = []
    error: str | None = None

    try:
        leads = scraper.run(query=args.query, location=args.location)
    except Exception as exc:
        error = str(exc)
        logger.error(f"Scraper error: {exc}", exc_info=True)
    finally:
        scraper.close()

    meta: dict = {"total_found": len(leads), "batch_id": args.batch_id}
    if error:
        meta["error"] = error

    write_output(args.output, leads, meta)

    logger.info(
        "Scraper finished",
        extra={"batch_id": args.batch_id, "total_found": len(leads)},
    )

    # Exit non-zero only on hard error with zero results
    if error and not leads:
        sys.exit(1)


if __name__ == "__main__":
    main()
