# Cloudflare Retention Analytics

This folder contains the cloud version of the retention analyzer.

## What It Does

- `retention-worker.js` receives anonymous events at `/api/retention/events`.
- It stores those events in Cloudflare D1.
- Your analyzer page reads the aggregate report from `/api/retention/summary`.
- The summary endpoint requires `ANALYTICS_READ_TOKEN`.
- It tracks retention plus top clicked game entry cards.
- It also tracks product-detail metrics: mode mix, Daily starts/completions, task completion health, scores, accuracy, device size, and selected app language.

## Deploy Steps

1. Create a D1 database in Cloudflare named `prefrontal-lab-analytics`.
2. Run `cloudflare/schema.sql` against that D1 database.
3. Create a Worker using `cloudflare/retention-worker.js`.
4. Bind the D1 database to the Worker as `ANALYTICS_DB`.
5. Add two Worker secrets:
   - `ANALYTICS_READ_TOKEN`
   - `VISITOR_SALT`
6. Route the Worker to your domain path:
   - `https://your-domain.com/api/retention*`
7. Open your analyzer:
   - `https://your-domain.com/?owner=1&analytics`
8. Enter your owner password once. The browser will remember it locally.

If you already created the D1 table before click tracking was added, run `migration-clicks.sql` once against the same D1 database.

If you already deployed analytics before product-detail metrics were added, run `migration-analytics-detail.sql` once against the same D1 database before deploying the updated Worker.

Keep `ANALYTICS_READ_TOKEN` private. Do not commit it to GitHub.
