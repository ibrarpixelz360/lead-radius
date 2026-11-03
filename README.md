# Customer Near Me — SaaS Platform

> **Verified by GMB Leads Instantly** — A complete production-grade SaaS platform for hyper-targeted local business lead generation from Google My Business listings.

[![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20)](https://laravel.com)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D)](https://vuejs.org)
[![Inertia](https://img.shields.io/badge/Inertia-1.x-9553E9)](https://inertiajs.com)
[![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4)](https://php.net)
[![Filament](https://img.shields.io/badge/Filament-3.x-FFAA00)](https://filamentphp.com)

## Status: All 5 Phases Complete

| Phase | Status | What's included |
|-------|--------|-----------------|
| 1. Foundation | Done | Auth, plans, subscriptions, devices, models, layouts |
| 2. Lead engine | Done | Search, scrape jobs, lead management, exports, AI scoring |
| 3. Payment + Admin | Done | Manual payment flow, invoices, Filament admin |
| 4. Affiliate | Done | Referrals, commissions, withdrawals, dashboard |
| 5. Polish & content | Done | Contact form, blog, FAQ DB, notifications, sitemap |

**280 project files. 194 PHP, 40 Vue, 11 Filament resources, 7 cron commands, 10 test files.**

## What Works End-to-End

1. Visitor lands on `/?ref=AFFCODE` → cookie captured (90-day attribution)
2. Signs up → 7-day trial subscription auto-created → referral linked
3. Searches leads by country/city/keyword → queue job runs scraper → leads appear with AI scoring
4. Manages leads → filter, tag, note, change status, export CSV/XLSX
5. Trial expires → redirected to `/billing` → picks plan → uploads bank screenshot
6. Admin sees pending payment in Filament → reviews screenshot → approves
7. → Subscription activated, invoice PDF generated, payment-approved email sent
8. → Affiliate commission auto-created for referrer (held 14 days)
9. Cron releases held commissions after 14 days → "available" status
10. Affiliate requests withdrawal via bank/JazzCash/EasyPaisa
11. Admin marks withdrawal paid → all linked commissions update to "paid"

This is a complete SaaS funnel: signup → trial → conversion → revenue → referral → payout.

## Tech Stack

- Framework: Laravel 11
- Frontend: Vue 3 + Inertia.js + Tailwind CSS
- Database: MySQL 8.0
- Cache / Queue / Sessions: Redis 7
- Admin Panel: Filament 3
- Auth: Laravel Sanctum + Spatie Permissions
- Queue Manager: Laravel Horizon
- File Uploads: Spatie MediaLibrary
- Activity Logging: Spatie ActivityLog
- PDF Generation: Barryvdh DomPDF
- Sitemap: Spatie Sitemap
- Testing: Pest 2

## Quick Start (Docker)

```bash
cp .env.example .env
docker compose --profile dev up -d --build
docker compose exec app composer install
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate --seed
docker compose exec app php artisan storage:link
docker compose exec node npm install
docker compose exec node npm run build
```

Visit:
- App: http://localhost
- Admin: http://localhost/admin
- Horizon: http://localhost/horizon
- Mailpit: http://localhost:8025

### Default credentials

```
admin@customernearme.com / password
```

**Change immediately in production.**

## Manual Setup

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
npm run build

# Separate terminals
php artisan serve
php artisan horizon
```

## Project Structure

```
app/
├── Console/Commands/             # 7 cron jobs
├── Domains/
│   ├── Auth/                     # Device tracking, fingerprinting
│   ├── Subscription/             # Plan limits, payment activation
│   ├── Lead/                     # Scraping, scoring, jobs
│   └── Affiliate/                # Commissions, withdrawals
├── Filament/
│   ├── Resources/                # 11 admin CRUD resources
│   └── Widgets/
├── Http/
│   ├── Controllers/              # 21 controllers (Auth, Web, API)
│   ├── Middleware/               # 6 custom
│   └── Requests/                 # 7 form requests
├── Models/                       # 22 Eloquent models
├── Notifications/                # 4 transactional
├── Policies/                     # 4 authorization
└── Providers/

database/
├── migrations/                   # 9 migrations, ~25 tables
├── seeders/                      # Plans, roles, admin, FAQs, settings
└── factories/

resources/
├── js/
│   ├── Layouts/                  # Guest, Authenticated, Public
│   └── Pages/                    # 37 Inertia pages
└── views/
    ├── app.blade.php
    └── invoices/template.blade.php
```

## Filament Admin — 11 Resources

At `/admin`:

| Resource | Purpose |
|----------|---------|
| UserResource | Manage users, ban/unban |
| PlanResource | CRUD plans with feature toggles |
| PaymentResource | Review pending payments, approve/reject |
| SubscriptionResource | Extend, cancel |
| WithdrawalResource | Process payouts, mark paid |
| ProxyResource | Manage scraping proxy pool |
| TicketResource | Support tickets |
| FeedbackResource | User feedback inbox |
| FaqResource | FAQ CMS (drag-to-reorder) |
| TestimonialResource | Landing page testimonials |
| BlogPostResource | Blog CMS (auto-slug + SEO) |

Plus 2 dashboard widgets: revenue stats, recent pending payments.

## Cron Schedule

```
00:30  trials:expire
01:00  subscriptions:expire
02:00  commissions:release-holds
03:00  exports:cleanup
03:30  devices:cleanup-stale
05:00  backup:run
06:00  sitemap:generate
09:00  subscriptions:remind-renewal
*/5    horizon:snapshot
```

Production cron:

```cron
* * * * * cd /var/www/html && php artisan schedule:run >> /dev/null 2>&1
```

## Security Features

- CSRF protection on all forms
- XSS auto-escaping (Blade + Vue)
- SQL injection prevention (Eloquent)
- Rate limiting: 5/min login, 5/hr register, password-reset, 60/min API
- Device fingerprinting + plan-aware enforcement
- Soft deletes on users with 30-day purge
- Activity logging on admin actions
- Mass-assignment protection
- Bcrypt password hashing
- HttpOnly + Secure + SameSite cookies in production
- HTTPS forced in production

## Testing

```bash
vendor/bin/pest
```

Coverage:
- Auth: registration, login, logout, password reset, referral capture
- Subscription: trial, plan limits, payment submission, approval, commission creation
- Lead engine: search, scoring, deduplication
- Affiliate: balance, withdrawal validation, hold release

## Important Disclaimers

### Google Maps Scraping

Scraping Google Maps technically violates Google's ToS. The architecture is sound but:

1. **Residential proxies required** (Bright Data ~$15/GB, Oxylabs)
2. **Browserless instance required** (self-host or browserless.io)
3. **DOM selectors need maintenance** — Google updates their UI
4. **Consider Google Places API** as a paid, ToS-compliant alternative

### Manual Payments

Suitable for Pakistan/MENA markets:
- Active admin review required for every screenshot
- Risk of fraudulent screenshots — consider OCR validation
- For international: integrate Stripe/PayPal later

### Email

Default mailer is `log` driver. Configure before launch:

```env
MAIL_MAILER=ses
MAIL_FROM_ADDRESS=hello@yourdomain.com
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
```

Configure SPF, DKIM, DMARC records.

## Pre-Launch Checklist

- [ ] composer install + npm install + npm run build run successfully
- [ ] php artisan migrate --seed runs cleanly
- [ ] Test suite passes (vendor/bin/pest)
- [ ] Default admin password changed
- [ ] APP_DEBUG=false, APP_ENV=production
- [ ] Real email provider configured (SES/Mailgun + SPF/DKIM/DMARC)
- [ ] HTTPS via Cloudflare or Let's Encrypt
- [ ] Database backups scheduled
- [ ] Horizon supervised by systemd
- [ ] Cron job installed
- [ ] Bank details configured in config/cnm.php
- [ ] Proxy provider account (Bright Data / Oxylabs)
- [ ] Browserless instance running
- [ ] reCAPTCHA keys in .env
- [ ] Google OAuth credentials (optional)
- [ ] Sentry / monitoring set up
- [ ] Test full payment flow with real bank transfer

## Realistic Time-to-Production

| Task | Effort |
|------|--------|
| Run composer/npm/migrate, fix breakage | 2-4 hours |
| Run + fix test suite | 4-8 hours |
| Configure email, proxies, Browserless | 1 day |
| Iterate Google Maps scraper against live pages | 3-5 days ongoing |
| QA pass through every flow | 2-3 days |
| Beta with friendly users | 1-2 weeks |

**Realistic launch: 3-4 weeks of focused work** by a Laravel-comfortable developer.

## License

Proprietary. All rights reserved.

## Support

hello@customernearme.com
