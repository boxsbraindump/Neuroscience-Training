# Prefrontal Lab Important Files

Last updated: 2026-05-30

This file is a recovery map for the Prefrontal Lab website, retention analyzer, click analyzer, and Cloudflare analytics setup.

## Live Site

- Public site: `https://prefrontal-lab.com`
- Owner analyzer page: `https://prefrontal-lab.com/?owner=1&analytics`
- Cloud analytics API:
  - Event intake: `https://prefrontal-lab.com/api/retention/events`
  - Owner summary: `https://prefrontal-lab.com/api/retention/summary`

## GitHub Repository

- Repository: `https://github.com/boxsbraindump/Neuroscience-Training`
- Main local Git working copy: `C:\Codex related\Neuroscience-Training-publish`
- Current design/dev working folder: `C:\Codex related\前额叶`

## Core Website Files

- `index.html`
  - Loads the static React app.
  - Includes cache-busting query strings for `styles.css`, `gameLogic.js`, and `App.jsx`.
  - Important because Cloudflare/browser cache may otherwise keep serving an old app.

- `src/App.jsx`
  - Main React app.
  - Contains all screens, game UI, language switching, local scores, hidden owner analyzer access, retention tracking, click tracking, and cloud summary loading.
  - Important analyzer keys/constants:
    - `RETENTION_STORAGE_KEY`
    - `RETENTION_VISITOR_KEY`
    - `OWNER_ACCESS_KEY`
    - `OWNER_TOKEN_KEY`
    - `CLOUD_ANALYTICS_ENDPOINT`

- `src/gameLogic.js`
  - Shared game logic used by the React app.
  - Currently includes N-back round generation.

- `src/styles.css`
  - Main custom CSS for layout, mobile sizing, animations, and game screens.

## Analytics And Retention Files

- `cloudflare/retention-worker.js`
  - Cloudflare Worker.
  - Receives anonymous events from the frontend.
  - Writes events to D1.
  - Returns aggregate owner-only summary data.
  - Tracks:
    - visits
    - active days
    - D1 / D7 / D30 retention
    - game starts
    - game completions
    - top completed task
    - total clicks
    - top clicked elements

- `cloudflare/schema.sql`
  - D1 table creation script.
  - Use this when creating a brand-new analytics database.

- `cloudflare/migration-clicks.sql`
  - Adds click-tracking columns to an older analytics database.
  - Only needed if the D1 table existed before click tracking was added.

- `cloudflare/wrangler.toml`
  - Real Cloudflare Worker deployment config.
  - Contains Worker name, route patterns, and D1 database binding.
  - Does not contain secrets.

- `cloudflare/wrangler.toml.example`
  - Template config for rebuilding the Worker setup from scratch.

- `cloudflare/README.md`
  - Short Cloudflare deployment instructions.

## Cloudflare Resources

- Worker name: `prefrontal-lab-retention`
- D1 database name: `prefrontal-lab-analytics`
- D1 database id: `c89ddc21-ddcc-4df2-9d5b-e22cfada1f67`
- Worker routes:
  - `prefrontal-lab.com/api/retention*`
  - `www.prefrontal-lab.com/api/retention*`

## Cloudflare Secrets

These are stored in Cloudflare Worker secrets, not in GitHub:

- `ANALYTICS_READ_TOKEN`
  - Owner password used by the analyzer page to read cloud summary data.
  - Do not commit this value to GitHub.

- `VISITOR_SALT`
  - Salt used to hash anonymous visitor IDs before saving to D1.
  - Do not commit this value to GitHub.

To reset either secret:

```powershell
cd "C:\Codex related\Neuroscience-Training-publish\cloudflare"
npx wrangler secret put ANALYTICS_READ_TOKEN
npx wrangler secret put VISITOR_SALT
npx wrangler deploy
```

## How Data Flows

1. User opens `https://prefrontal-lab.com`.
2. `src/App.jsx` creates an anonymous local visitor id.
3. The frontend records local fallback analytics in browser `localStorage`.
4. The frontend sends anonymous events to `/api/retention/events`.
5. Cloudflare Worker receives the event.
6. Worker hashes the visitor id with `VISITOR_SALT`.
7. Worker writes the event to D1.
8. Owner opens `/?owner=1&analytics`.
9. Owner enters `ANALYTICS_READ_TOKEN`.
10. Analyzer reads `/api/retention/summary` and displays cloud data.

## What Ordinary Users Can See

- They see the normal training app.
- They do not see the analyzer button.
- Opening `?analytics` alone does not show the analyzer.

## What Owner Can See

Open:

```text
https://prefrontal-lab.com/?owner=1&analytics
```

The browser will unlock the hidden analyzer for that device.

To hide owner access again on that browser:

```text
https://prefrontal-lab.com/?owner=0
```

## Deployment Commands

Frontend deploy:

```powershell
cd "C:\Codex related\Neuroscience-Training-publish"
git status
git add index.html src/App.jsx src/gameLogic.js src/styles.css cloudflare/ docs/ .gitignore
git commit -m "Your message"
git push origin main
```

Worker deploy:

```powershell
cd "C:\Codex related\Neuroscience-Training-publish\cloudflare"
npx wrangler deploy
```

D1 schema setup for a new database:

```powershell
cd "C:\Codex related\Neuroscience-Training-publish\cloudflare"
npx wrangler d1 execute prefrontal-lab-analytics --remote --file=./schema.sql
```

## Quick Health Checks

Check public site:

```text
https://prefrontal-lab.com
```

Check analyzer:

```text
https://prefrontal-lab.com/?owner=1&analytics
```

Check API should reject without password:

```text
https://prefrontal-lab.com/api/retention/summary
```

Expected: `401 Unauthorized`

Check Worker logs:

```powershell
cd "C:\Codex related\Neuroscience-Training-publish\cloudflare"
npx wrangler tail
```

## Do Not Delete Without Replacing

- `index.html`
- `src/App.jsx`
- `src/gameLogic.js`
- `src/styles.css`
- `cloudflare/retention-worker.js`
- `cloudflare/schema.sql`
- `cloudflare/migration-clicks.sql`
- `cloudflare/wrangler.toml`
- `cloudflare/README.md`

## Recovery Notes

If the analyzer disappears online:

1. Confirm GitHub has the latest `src/App.jsx`.
2. Confirm `index.html` includes cache-busting query strings.
3. Wait for Cloudflare Pages deployment.
4. Purge Cloudflare cache if needed.
5. Open `https://prefrontal-lab.com/?owner=1&analytics`.

If cloud data does not load:

1. Confirm Worker route exists for `prefrontal-lab.com/api/retention*`.
2. Confirm D1 binding is named `ANALYTICS_DB`.
3. Confirm `ANALYTICS_READ_TOKEN` is set in Cloudflare.
4. Confirm the analyzer password matches `ANALYTICS_READ_TOKEN`.
5. Confirm `/api/retention/summary` returns `401` without password and `200` with password.
