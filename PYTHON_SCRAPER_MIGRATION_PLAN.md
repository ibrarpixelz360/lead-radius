# Python Lead Generator Scraper Migration Plan

## Executive Summary
This document provides the complete architectural blueprint and feature mapping for migrating the Python scraping module from `C:\laragon\www\business-lead-generator` into `C:\laragon\www\lead-radius-main`.

The goal is to maintain Python as an independent, isolated scraping worker (using Playwright Chromium) and Laravel as the application, database, authentication, queue, and lead-management layer, accessible at `/admin/generator-new`.

---

## 1. Architecture Overview

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Lead Radius Admin (/admin/generator-new)             │
│            Filament v3 Page (Livewire 3 + Alpine.js + Tailwind)        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Submit Search (Keywords, Locations, Limit)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     Laravel ScraperService (PHP)                       │
│    - Creates LeadScraperBatch & LeadScraperLog records                 │
│    - Calculates job distribution across (Keyword x Location)          │
│    - Dispatches RunLeadScraperJob to Laravel Queue ('scraper' / 'default')│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Asynchronous Job Execution
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      RunLeadScraperJob (Worker)                        │
│    - Calls PythonProcessService                                        │
│    - Spawns Python CLI with JSON output path & arguments               │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ CLI Execution (Symfony Process)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     Python Scraper Engine (Playwright)                 │
│    - Path: scripts/scraper/main.py                                     │
│    - Headless Chromium browser automation                              │
│    - Google Maps feed scroll & detail parsing                          │
│    - Output JSON payload + Stderr structured log streaming             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ JSON output read & validated
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│              Lead Normalization & Deduplication Layer                  │
│    - LeadDeduplicator: deduplicate by google_place_id & fingerprint    │
│    - LeadScoringService: compute AI score and category classification  │
│    - Attach to User (lead_user) & Batch/Search (search_leads)          │
│    - Optional Enrichment: trigger EnrichLeadJob                        │
│    - Update Batch progress: completed_jobs, found_leads, status        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Feature Mapping Matrix

| # | Feature | Source File / Module | Existing Functionality | Target File / Module | Database Tables Involved | API / Service Integration | UI Changes | Implementation Status |
|---|---------|----------------------|------------------------|----------------------|--------------------------|---------------------------|------------|-----------------------|
| 1 | **Scraper CLI Entry Point** | `scripts/scraper/main.py` | Argument parsing (`--query`, `--location`, `--limit`, `--output`, `--batch-id`, `--source`, `--headless`), executes Google Maps scraper, dumps JSON output file, logs stderr JSON. | `scripts/scraper/main.py` | None (file-based) | CLI / Process invocation | None | Completed |
| 2 | **Scraper Engine & Browser Automation** | `scripts/scraper/scrapers/base.py`, `scrapers/google_maps.py`, `config.py` | Playwright Chromium stealth launch, Google Maps search, consent bypass, feed scrolling, detail extraction (name, phone, website, address, rating, reviews, place ID). | `scripts/scraper/scrapers/base.py`, `scrapers/google_maps.py`, `scripts/scraper/config.py` | None | Playwright Chromium | None | Completed |
| 3 | **Scraper Data Validation & Normalization** | `scripts/scraper/models/lead.py`, `utils/normalizer.py`, `utils/logger.py` | `LeadData` dataclass, phone/website/address formatting, structured JSON stderr logging. | `scripts/scraper/models/lead.py`, `utils/normalizer.py`, `utils/logger.py` | None | Python stdlib | None | Completed |
| 4 | **Scraper Configuration** | `config/scraper.php`, `.env` | Defines `python_bin`, `scripts_path`, `output_path`, `timeout`, `headless`, `queue`. | `config/scraper.php`, `.env` | None | Laravel Config | None | Completed |
| 5 | **Python Process Bridge** | `app/Services/PythonProcessService.php` | Spawns Symfony Process for Python, streams stderr to Laravel logs, reads and deletes JSON output file safely. | `app/Services/PythonProcessService.php` | None | Symfony Process | None | Completed |
| 6 | **Scraper Batch Management & Service** | `app/Services/ScraperService.php` | `createBatch()`, `dispatchBatch()`, `scrape()` orchestration, stats tracking. | `app/Services/ScraperService.php` | `lead_scraper_batches`, `lead_scraper_logs` | Laravel Service Container | None | Completed |
| 7 | **Asynchronous Job Worker** | `app/Jobs/RunLeadScraperJob.php` | Queued job with timeout, retry backoff, unique job ID, failure handling. | `app/Jobs/RunLeadScraperJob.php` | `jobs`, `lead_scraper_batches`, `lead_scraper_logs` | Laravel Queue | None | Completed |
| 8 | **Batch & Log Models** | `app/Models/LeadScraperBatch.php`, `app/Models/LeadScraperLog.php`, `app/Models/LeadCategory.php` | Eloquent models for batches, logs, and categories with relationships. | `app/Models/LeadScraperBatch.php`, `app/Models/LeadScraperLog.php`, `app/Models/LeadCategory.php` | `lead_scraper_batches`, `lead_scraper_logs`, `lead_categories` | Eloquent ORM | None | Completed |
| 9 | **Database Schema Migrations** | `database/migrations/*` | Batches table, logs table, categories table, batch foreign key on leads. | `database/migrations/*` | `lead_scraper_batches`, `lead_scraper_logs`, `lead_categories`, `leads` | Laravel Migration engine | None | Completed |
| 10 | **Data Deduplication & Ingestion** | `app/Repositories/LeadRepository.php` | Duplicate detection by google_place_id and name/location fingerprint, rating/reviews update, user attachment. | `app/Domains/Lead/Services/LeadDeduplicator.php`, `app/Services/ScraperService.php` | `leads`, `lead_user`, `search_leads` | `LeadDeduplicator`, `LeadScoringService` | None | Completed |
| 11 | **Admin Generator UI (`admin/generator-new`)** | `app/Http/Controllers/Lead/LeadScraperGeneratorController.php`, `app/Livewire/Lead/LeadScraperGenerator.php`, `resources/views/livewire/lead/lead-scraper-generator.blade.php` | Multi-category keyword selector, Australian state checkboxes + custom location input, limit slider, real-time progress polling, final stats summary. | `app/Filament/Pages/GeneratorNew.php`, `resources/views/filament/pages/generator-new.blade.php` | `lead_categories`, `lead_scraper_batches`, `leads` | Filament v3 / Livewire 3 | Filament Admin Page at `/admin/generator-new` | Completed |
| 12 | **Execution History & Logs Inspection** | Embedded in Livewire view | View past batches, status, leads found, and inspect real-time scraper log output. | Integrated in `GeneratorNew` Filament Page | `lead_scraper_batches`, `lead_scraper_logs` | Filament Tables / Modals | Added to Generator page | Completed |
| 13 | **CSV Export of Scraped Leads** | Lead export functionality | Export leads generated by batch to CSV. | `App\Domains\Lead\Jobs\ExportLeadsJob` / Batch export in `GeneratorNew` & Client API | `leads`, `lead_scraper_batches` | Laravel CSV generator | Export button in UI | Completed |
| 14 | **Completion Notifications** | `app/Notifications/ScraperBatchCompletedNotification.php` | Mail and database notification sent upon batch completion or failure. | `app/Notifications/ScraperBatchCompletedNotification.php` | `notifications` | Laravel Notification | Notifications Bell in Admin | Completed |
| 15 | **Client Portal Generator Integration** | Client Dashboard & Leads Search | Integrated directly into Inertia/Vue client portal at `/leads/search` and `/leads/generator`, linked from `/dashboard` and sidebar. | `resources/js/Pages/Leads/Search.vue`, `app/Http/Controllers/Web/LeadSearchController.php` | `lead_scraper_batches`, `lead_scraper_logs`, `leads`, `searches` | Inertia.js / Vue 3 / REST API | Client UI at `/leads/search` | Completed |

---

## 3. Database Schema Mapping

### New Tables to Create:
1. `lead_categories`:
   - `id` (bigint unsigned, primary key)
   - `name` (varchar 120, unique)
   - `created_at`, `updated_at`
2. `lead_scraper_batches`:
   - `id` (bigint unsigned, primary key)
   - `user_id` (bigint unsigned, nullable, foreign key -> `users.id` on delete set null)
   - `search_id` (bigint unsigned, nullable, foreign key -> `searches.id` on delete set null)
   - `source` (varchar 60, default 'google_maps')
   - `query` (json/text, nullable)
   - `location` (json/text, nullable)
   - `total_jobs` (int unsigned, default 0)
   - `completed_jobs` (int unsigned, default 0)
   - `failed_jobs` (int unsigned, default 0)
   - `found_leads` (int unsigned, default 0)
   - `total_requested` (int unsigned, default 50)
   - `status` (enum: 'pending', 'processing', 'completed', 'failed', default 'pending')
   - `started_at` (timestamp, nullable)
   - `completed_at` (timestamp, nullable)
   - `created_at`, `updated_at`
   - Indexes: `user_id`, `status`, `search_id`
3. `lead_scraper_logs`:
   - `id` (bigint unsigned, primary key)
   - `lead_scraper_batch_id` (bigint unsigned, foreign key -> `lead_scraper_batches.id` on delete cascade)
   - `level` (enum: 'debug', 'info', 'warning', 'error', default 'info')
   - `message` (text)
   - `context` (json, nullable)
   - `created_at`, `updated_at`
   - Indexes: `[lead_scraper_batch_id, level]`, `created_at`

### Existing Tables Modified:
1. `leads`:
   - Add column: `lead_scraper_batch_id` (bigint unsigned, nullable, index, foreign key -> `lead_scraper_batches.id` on delete set null)

---

## 4. Execution Phases & Milestones

- [x] **Phase 1: Source Project Analysis** (Completed)
- [x] **Phase 2: Target Project Analysis** (Completed)
- [x] **Phase 3: Feature Mapping & Migration Plan** (Completed)
- [x] **Phase 4: Database & Migrations** (Completed)
  - Created migration `2026_06_01_000001_create_lead_categories_table.php`
  - Created migration `2026_06_01_000002_create_lead_scraper_batches_table.php`
  - Created migration `2026_06_01_000003_create_lead_scraper_logs_table.php`
  - Created migration `2026_06_01_000004_add_lead_scraper_batch_id_to_leads_table.php`
  - Migrated tables with foreign keys and indexes.
  - Created models `LeadCategory`, `LeadScraperBatch`, `LeadScraperLog`, updated `Lead` model.
  - Created and executed `LeadCategorySeeder` with standard business categories.
  - Created `ScraperBatchCompletedNotification`.
- [x] **Phase 5: Python Scraper Integration** (Completed)
  - Cloned modular Python scraping engine to `scripts/scraper/` (`main.py`, `config.py`, `scrapers/`, `models/`, `utils/`).
  - Created isolated virtual environment `.venv` with `playwright`, `greenlet`, `pyee`, and headless Chromium.
  - Created `config/scraper.php` configuration with environment fallback.
  - Created `app/Services/PythonProcessService.php` to bridge PHP and Python via Symfony Process.
  - Created `app/Services/ScraperService.php` for batch management and data mapping.
  - Created `app/Jobs/RunLeadScraperJob.php` for asynchronous background job execution.
- [x] **Phase 6: Laravel Admin Integration (`admin/generator-new`)** (Completed)
  - Created Filament v3 page `App\Filament\Pages\GeneratorNew` routed at `/admin/generator-new`.
  - Configured access control so that `/admin/generator-new` is accessible by both admins AND authenticated clients/users (`status === 'active'`).
  - Added user isolation for clients: clients only view and export batches and leads created by their account, while admins retain visibility across all batches.
  - Built Blade template with keyword chip selection, search filtering, custom category adder, and Australian states selector.
  - Integrated real-time 2s polling progress bar, status metrics cards, and background execution guard.
  - Added batch execution history table with live worker logs modal drawer.
  - Implemented CSV export for batch-generated leads.
- [x] **Phase 7: Data Integration & Deduplication** (Completed)
  - Mapped Python scraper extracted fields to Lead Radius `leads` schema.
  - Integrated with `LeadDeduplicator` using Google Place ID and MD5 fingerprint.
  - Applied defensive field lengths and type casting to prevent SQL truncation errors.
  - Integrated AI Scoring via `LeadScoringService` (`ai_score`, `ai_category`).
  - Implemented user assignment through `lead_user` pivot table.
  - Integrated background email enrichment job dispatch (`EnrichLeadJob`).
- [x] **Phase 8: Automated & Workflow Testing** (Completed)
  - Added Pest test suite `tests/Feature/Lead/ScraperIntegrationTest.php` covering:
    - Admin authorization & guest/user restriction for `/admin/generator-new`.
    - Batch creation & structured log dispatch.
    - Result normalization, AI scoring, and deduplication.
    - Error handling, batch status finalization, and failure logging.
    - CSV export streaming.
  - Tested live end-to-end scraper execution with real Google Maps search via Playwright Chromium.
  - Verified live deduplication: identical business extracted in subsequent scrape updated in place without duplicate database entries.
  - Verified full test suite passes (58 tests, 180 assertions).

---

## 5. Local Windows Setup Instructions

1. **Python Environment**:
   - Location: `scripts/scraper/.venv`
   - Python Version: Python 3.12+ (or 3.14)
   - Packages:
     ```powershell
     cd C:\laragon\www\lead-radius-main\scripts\scraper
     python -m venv .venv
     .\.venv\Scripts\pip.exe install "greenlet>=3.2.0" --pre playwright==1.60.0 pyee
     .\.venv\Scripts\playwright.exe install chromium
     ```
2. **Environment Configuration (`.env`)**:
   ```env
   PYTHON_BIN="C:\\laragon\\www\\lead-radius-main\\scripts\\scraper\\.venv\\Scripts\\python.exe"
   SCRAPER_SCRIPTS_PATH="C:\\laragon\\www\\lead-radius-main\\scripts\\scraper"
   SCRAPER_OUTPUT_PATH="C:\\laragon\\www\\lead-radius-main\\storage\\scraper\\output"
   SCRAPER_TIMEOUT=1800
   SCRAPER_HEADLESS=true
   SCRAPER_QUEUE=default
   ```
3. **Queue Worker Execution**:
   To process background scraper jobs, run:
   ```powershell
   php artisan queue:work --queue=default,scraper --timeout=1980
   ```
4. **Accessing the Generator**:
   - URL: `http://127.0.0.1:8000/admin/generator-new`
   - Credentials:
     - Admin Email: `demo@customernearme.com` (assigned admin role) or `admin@customernearme.com`
     - Password: `password`

---

## 7. Client Portal Integration (`/leads/search` & `/leads/generator`)

The Python Google Maps Lead Generator is available directly inside the Inertia.js / Vue 3 client portal:

1. **Client Routes**:
   - `GET /leads/search` and `GET /leads/generator` (`leads.search.create` / `leads.generator`): Renders Vue generator interface.
   - `POST /leads/generator/start` (`leads.generator.start`): Dispatches scraper batch across selected keywords & locations.
   - `GET /leads/generator/batches/{batch}/status` (`leads.generator.batches.status`): Real-time polling of status, progress bar, live execution logs, and scraped results table.
   - `GET /leads/generator/batches/{batch}/export` (`leads.generator.batches.export`): Direct CSV stream download of leads generated by that batch.
   - `POST /leads/generator/batches/{batch}/cancel` (`leads.generator.batches.cancel`): Cancel running batch.

2. **Client Portal UI Features (`resources/js/Pages/Leads/Search.vue`)**:
   - Predefined category chips from `lead_categories` database with 1-click addition.
   - Multi-keyword custom tags with Enter/comma keyboard support.
   - Australian States checkboxes grid (NSW, VIC, QLD, WA, SA, TAS, ACT, NT) + "Select All" toggle.
   - Custom global location input for any city, suburb, or country worldwide.
   - Live execution panel: real-time progress bar, live Playwright stderr log stream, live lead results table.
   - One-click CSV Export button for the batch.
   - Batch history table with previous runs, lead counts, and CSV download links.
   - Classic single-location search preserved in secondary tab.
   - "Lead Generator" shortcut with Sparkles icon in the client sidebar (`AuthenticatedLayout.vue`).

3. **Filament `/admin/generator-new` Access**:
   - Unrestricted for active clients and users (`EnsureAdmin` middleware and `User::canAccessPanel` allow `/admin/generator-new*` and associated Livewire requests for any active account).


1. **Install System Dependencies**:
   ```bash
   sudo apt-get update && sudo apt-get install -y python3 python3-pip python3-venv libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libasound2
   ```
2. **Setup Scraper Virtualenv**:
   ```bash
   cd /var/www/lead-radius/scripts/scraper
   python3 -m venv .venv
   source .venv/bin/activate
   pip install "greenlet>=3.2.0" playwright==1.60.0 pyee
   playwright install chromium
   ```
3. **Production Environment Configuration (`.env`)**:
   ```env
   PYTHON_BIN="/var/www/lead-radius/scripts/scraper/.venv/bin/python"
   SCRAPER_SCRIPTS_PATH="/var/www/lead-radius/scripts/scraper"
   SCRAPER_OUTPUT_PATH="/var/www/lead-radius/storage/scraper/output"
   SCRAPER_TIMEOUT=1800
   SCRAPER_HEADLESS=true
   SCRAPER_QUEUE=scraper
   ```
4. **Supervisor Worker Configuration (`/etc/supervisor/conf.d/lead-radius-scraper.conf`)**:
   ```ini
   [program:lead-radius-scraper]
   process_name=%(program_name)s_%(process_num)02d
   command=php /var/www/lead-radius/artisan queue:work --queue=scraper,default --sleep=3 --tries=2 --timeout=1980
   autostart=true
   autorestart=true
   user=www-data
   numprocs=2
   redirect_stderr=true
   stdout_logfile=/var/www/lead-radius/storage/logs/scraper_worker.log
   ```
   Reload supervisor:
   ```bash
   sudo supervisorctl reread
   sudo supervisorctl update
   sudo supervisorctl start lead-radius-scraper:*
   ```

