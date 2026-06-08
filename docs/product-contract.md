# Product Contract

Last audited: 2026-06-01

This file is the shared source of truth between design and backend work.
It summarizes what is currently confirmed from the local project files:

- `index.html`
- `src/App.jsx`
- `src/gameLogic.js`
- `src/styles.css`
- `cloudflare/retention-worker.js`
- `cloudflare/schema.sql`
- `cloudflare/README.md`
- `PROJECT_IMPORTANT_FILES.md`

Update this file whenever a UI decision affects data, APIs, permissions, analytics, or state behavior.

## Current Scope

- Product area: Prefrontal Lab cognitive training web app.
- Primary user: ordinary visitors training attention, inhibition, working memory, visual counting, and logic.
- Secondary user: owner/admin viewing hidden retention and click analytics.
- Main workflow: user opens app, chooses language and mode, starts a task, daily challenge, endless practice, or arena run, completes or abandons a session, and sees score/result.
- Analytics workflow: app records local fallback analytics and sends anonymous event data to Cloudflare D1 through a Worker.
- Out of scope for current code: login accounts, payment, user profiles, server-side game state, social features, and editor/admin content management.

## Screens And Flows

| Screen | Purpose | Entry point | Success result | Notes |
| --- | --- | --- | --- | --- |
| Home | Landing surface for score, language, mode, and task selection. | Default `view = home`. | User starts one training task, endless practice, daily challenge, or arena mode. | Uses responsive app navigation: mobile bottom nav and desktop top nav. Basic/Advanced/Endless remain as mode tabs inside training; Daily Challenge and Arena are primary nav entries. Analytics is not shown in normal navigation. |
| Daily Challenge | Shows the current date's fixed challenge theme, goal, today's best score, completion status, Monday-first weekly check-in row, and local streak. | Home nav `mode = daily`. | User starts today's generated task and can complete today's check-in. | MVP uses a shared weekday-rotation pool of six Daily challenges, so every user gets the same challenge on the same day. Monday starts from the first challenge in the pool. Stores local daily progress only. |
| Update note modal | Shows version/update announcement. | First visit without `prefrontal_lab_v6.1.2_update`, or URL has `showUpdate`. | User dismisses and app stores seen flag. | Not shown while analytics page is active. |
| Info modal | Explains task goal/rules/effect. | User taps info icon on a task card. | User closes modal or starts task from context. | Content changes by language and mode. |
| Schulte Grid | Visual search task from 1 to 25. | Home task card or arena rotation. | User clicks all numbers in order. | 60s solo; arena uses shared 90s timer. Hard mode hides/changes clicked-number behavior. |
| Stroop Test | Inhibition task: answer by physical word color. | Home task card or arena rotation. | User chooses the correct color option. | Normal shows color dots; hard/arena asks through text labels. |
| N-Back Task | Working memory task. | Home task card or arena rotation. | User answers match/different correctly. | Normal is 1-back, hard/arena is 2-back. Logic lives in `src/gameLogic.js`. |
| Set Logic | Select 3 cards whose properties are all same or all different. | Home task card or arena rotation. | User finds a valid set. | Normal uses shape/color; hard/arena also includes fill opacity, but current fill logic is constrained by only two fill values. |
| Neuron Counting | Count target shapes among distractors. | Home task card or arena rotation. | User submits exact count. | Hard/arena adds more items, rotations, scale variation, and moving distractors. |
| Arena mode | Mixed-task challenge. | Home mode `comp`, then arena card. | User plays rotating tasks under 90s timer. | Errors subtract time in arena. Analytics task name is `arena`. |
| Endless mode | Free practice without timer pressure. | Training mode tab `infinite`, then any task card. | User practices until tapping back, then sees the session result. | Uses basic task difficulty, shows `∞` instead of a timer, and does not update personal best, per-task best, hard unlock, Daily streak, or arena best. |
| Result | Shows final score and feedback. | Timer ends or solo task completes. | User returns home or starts again. | Updates best scores and unlock state. |
| Hidden analytics | Owner-only retention and click dashboard. | `?owner=1&analytics` for the current URL only. | Owner loads local or cloud summary and can export/reset/lock. | No normal user navigation entry. |

## Training Tasks

| Task key | UI name | Mode timing | Main answer data | Scoring | Hard/arena difference |
| --- | --- | --- | --- | --- | --- |
| `schulte` | Schulte Grid | 60s solo; 90s arena pool | `grid`, `next` | +10 per correct click; completing 25 adds `10 + timeLeft * 10`. | Hard changes clicked-number visibility; arena does not use the exact same blind behavior as hard. |
| `stroop` | Stroop Test | 60s solo; 90s arena pool | `textZh`, `textEn`, `color`, `opts` | +30 correct. | Normal options display color dots; hard/arena display color words. |
| `nback` | N-Back Task | 60s solo; 90s arena pool | `current`, `isMatch`, `isReady`, `nbackSeq` | +30 correct, -10 wrong. | Normal level 1; hard/arena level 2. |
| `setgame` | Set Logic | 60s solo; 90s arena pool | `cards`, `selected` | +100 valid set, -20 invalid set. | Hard/arena adds `fill` checks, though only true/false fill values exist. |
| `neuroncount` | Neuron Counting | 60s solo; 90s arena pool | `items`, `target`, `targetCount`, `currentCount` | +80 correct submit. | Hard/arena increases target/distractor counts and visual difficulty. |
| `arena` | Arena Mode | 90s total | Current task state from the rotating task | Uses per-task scoring; wrong answers can subtract 5s. | Randomly rotates among all five tasks. |
| `infinite` | Endless Mode | No timer; UI shows `∞` | Current selected task state | Uses per-task scoring for the current session only. | Basic difficulty. Back button ends the session and shows result, but scores are not persisted as best scores. Schulte automatically starts a new grid after 25. |
| `daily` | Daily Challenge | Challenge-defined timer: 90s for finish-grid Schulte, 60s for timed-score tasks | Weekday-rotation current challenge state | Uses per-task scoring; final score is stored as today's best. | First pool order starts Monday: `schulte-forward`, `schulte-reverse`, `stroop-color`, `nback-2step`, `set-triad`, `neuron-storm`. Sunday currently wraps to the first challenge until a seventh challenge exists. MVP completion rules are `finish-grid` for Schulte and `timed-score` for the other four tasks. Local streak increments by completed calendar days. |

## Data Fields

| Field | Type | Required | Shown in UI | Source | Notes |
| --- | --- | --- | --- | --- | --- |
| `brain_train_pro_v5.bestScore` | number | yes | Home score card | Browser `localStorage` | Best solo score. Used for hard-mode unlock threshold. |
| `brain_train_pro_v5.bestCompScore` | number | yes | Home score card in arena mode | Browser `localStorage` | Best arena score. |
| `brain_train_pro_v5.isHardUnlocked` | boolean | yes | Mode tabs / unlock pill | Browser `localStorage` | Hard mode unlocks when solo best score reaches 500. |
| `brain_train_pro_v5.taskBestScores` | object | yes | Game top bar | Browser `localStorage` | Per-task bests for `schulte`, `stroop`, `nback`, `setgame`, `neuroncount`. |
| `brain_train_pro_data` | object | no | Not directly | Legacy `localStorage` | Migrated into `brain_train_pro_v5` when v5 data does not exist. |
| `prefrontal_lab_lang` | string | no | Whole app | Browser `localStorage` | `zh` or `en`; new visitors default to Chinese only when the browser language starts with `zh`, otherwise English. |
| `prefrontal_lab_v6.1.2_update` | string flag | no | Update note visibility | Browser `localStorage` | Stored after user closes update note. |
| `prefrontal_lab_owner_token` | string | no | Analytics password input memory | Browser `localStorage` | Stores owner analytics token locally after successful cloud load. Owner page itself is only reachable with the hidden `?owner=1&analytics` URL. |
| `prefrontal_lab_daily_v4` | object | yes for Daily Challenge | Daily card and score card | Browser `localStorage` | Stores per-day completion, challenge id, daily instance id, task key, variant, completion rule, duration, best score, last score, and completion timestamp. Streak is recalculated from completed days. |
| `prefrontal_lab_visitor_id` | string | yes for analytics | Not shown | Browser `localStorage` | Anonymous local visitor id; hashed before D1 storage. |
| `prefrontal_lab_retention_v1` | object | yes for local analytics | Analytics page | Browser `localStorage` | Local fallback analytics summary, sessions, active days, and recent events. |
| `analytics_events.visitor_id` | text | yes | Aggregated only | Cloudflare D1 | SHA-256 hash of local visitor id plus `VISITOR_SALT`. |
| `analytics_events.event_name` | text | yes | Aggregated only | Cloudflare D1 | Examples: `session_start`, `session_end`, `view_change`, `click`, `game_start`, `game_complete`, `game_abandon`. |
| `analytics_events.event_day` | text date | yes | Analytics charts | Cloudflare D1 | Used for active days, D1/D7/D30, and last 7 days. |
| `analytics_events.event_at` | ISO string | yes | Not directly | Cloudflare D1 | Event timestamp. |
| `analytics_events.path` | text | no | Not directly | Frontend event payload | Current pathname. |
| `analytics_events.session_id` | text | no | Not directly | Frontend event payload | Session id generated in app runtime. |
| `analytics_events.task` | text | no | Top task / clicks | Frontend event payload | Task key, `daily`, or `arena`. |
| `analytics_events.mode` | text | no | Aggregated indirectly | Frontend event payload | `normal`, `hard`, `infinite`, `daily`, or `comp`. |
| `dailyTask` | text | no | Not directly | Frontend event payload | Underlying task key for Daily Challenge completions/abandons; sent in analytics payload but not currently stored as a separate D1 column. |
| `dailyDay` | text date | no | Not directly | Frontend event payload | Local day key for Daily Challenge events; sent in analytics payload but not currently stored as a separate D1 column. |
| `dailyVariant` | text | no | Not directly | Frontend event payload | Variant key for the Daily Challenge, such as `reverse`, `two-back`, or `storm`. |
| `dailyCompletion` | text | no | Daily card rule label | Frontend event payload and local daily record | MVP values: `finish-grid` and `timed-score`. |
| `dailyDuration` | integer | no | Daily card rule label | Frontend event payload and local daily record | Challenge-defined timer in seconds. |
| `analytics_events.score` | integer | no | Completion metrics indirectly | Frontend event payload | Present for `game_complete`. |
| `analytics_events.duration_seconds` | integer | no | Not directly | Frontend event payload | Present for `game_complete` when start time exists. |
| `analytics_events.source` | text | no | Not directly | Frontend event payload | `direct` or `referral` for session starts. |
| `analytics_events.click_label` | text | no | Top clicked games | Frontend click tracking | Human-readable game label. |
| `analytics_events.click_role` | text | no | Click totals | Frontend click tracking | Currently `game_card`. |
| `analytics_events.click_x`, `click_y` | integer | no | Not directly | Frontend click tracking | Viewport click coordinates. |
| `analytics_events.click_x_percent`, `click_y_percent` | integer | no | Not directly | Frontend click tracking | Position inside clicked task card. |
| `analytics_events.user_agent` | text | no | Not directly | Browser | Stored for events. |
| `analytics_events.language` | text | no | Not directly | Browser | Browser language, not the app language toggle. |
| `analytics_events.screen_width`, `screen_height` | integer | no | Not directly | Browser screen | Used only as stored event context right now. |

## API Contract

| Action | Method | Path | Request | Response | Error cases |
| --- | --- | --- | --- | --- | --- |
| Record analytics event | POST | `/api/retention/events` | JSON with `visitorId`, `name`, optional event fields listed above | `{ "ok": true }` | `400` when `visitorId` or `name` is missing; `404` for wrong path/method. |
| Load owner summary | GET | `/api/retention/summary` | `Authorization: Bearer <ANALYTICS_READ_TOKEN>` | `{ ok: true, summary: { ... } }` | `401` when token is missing/invalid; frontend falls back to local analytics on request failure. |
| CORS preflight | OPTIONS | any Worker route | Browser preflight headers | `{ "ok": true }` | None currently defined. |

## Analytics Summary Shape

| Field | Type | Meaning |
| --- | --- | --- |
| `source` | string | `cloud` for Worker summary; local summary may omit or differ. |
| `firstDay` | date string | First recorded active day. |
| `activeDays` | string array | Unique active days. |
| `totalUsers` | number | Distinct anonymous visitors in D1. |
| `totalVisits` / `totalSessions` | number | Count of `session_start` events. |
| `totalStarts` | number | Count of `game_start` events. |
| `totalCompletions` | number | Count of `game_complete` events. |
| `completionRate` | number | Percent of completions over starts. |
| `currentStreak` | number | Consecutive active days ending today. |
| `averageReturnGap` | string or number | Average day gap between visits. |
| `d1`, `d7`, `d30` | boolean | Whether any user returned on day 1, 7, or 30. |
| `d1Value`, `d7Value`, `d30Value` | string | Return percentages. |
| `topTask`, `topTaskCount` | string, number | Most completed task. |
| `totalClicks` | number | Count of game-card clicks. |
| `topClicks` | array | Top 6 clicked game card labels with counts. |
| `last7Days` | array | Seven day records: `day`, `visits`, `users`, `active`. |

## UI States

| Area | Loading | Empty | Error | Disabled | Success |
| --- | --- | --- | --- | --- | --- |
| Home | None currently. | Task list is always generated from `TASK_DATA`; Daily Challenge shows one weekday-rotation task. | None currently. | Hard tab is disabled until `isHardUnlocked`. | Task card starts a run; mode selection updates immediately; training supports Basic, Advanced, and Endless; Daily shows today's best, local streak, total check-ins, the completion rule, duration, and Monday-first weekly check-in dots. |
| Update note | None currently. | Hidden after seen flag exists. | None currently. | None currently. | Close stores `prefrontal_lab_v6.1.2_update`. |
| Task info | None currently. | Hidden when `showInfo` is null. | None currently. | None currently. | Modal displays selected task guide. |
| Game top bar | Timer active while in timed games; Endless shows `∞`. | N/A. | Wrong answer can flash timer/error state. | Buttons may be disabled while feedback is shown. | Score increments and task advances. |
| Schulte | N/A. | N/A. | Wrong number flashes error / arena penalty. | N/A. | Correct sequence advances; final number ends solo task, starts a new grid in Endless, or rotates arena. |
| Stroop | N/A. | N/A. | Wrong answer feedback. | Options disabled while feedback is shown. | Correct answer adds score and advances. |
| N-Back | First rounds may show continue before comparison is ready. | N/A. | Wrong answer feedback and score penalty. | Buttons disabled while feedback is shown. | Correct answer adds score and advances. |
| Set Logic | N/A. | N/A. | Invalid set clears selection and may subtract score. | Cards disabled while feedback is shown. | Valid set adds score and generates next set. |
| Neuron Counting | N/A. | Count starts at 0. | Wrong submit resets current count. | Submit disabled while feedback is shown. | Correct submit adds score and advances. |
| Result | N/A. | N/A. | N/A. | N/A. | Shows score feedback and persists history. |
| Daily result | N/A. | N/A. | N/A. | N/A. | Shows daily check-in confirmation, updated streak, final score, and tomorrow reminder. |
| Analytics | Cloud button shows `...` while loading. | Top clicks shows empty message when none exist. | Wrong/missing owner token shows locked message; failed cloud load uses local data. | Owner token required for cloud load. | Cloud summary badge appears after successful load. |

## Permissions

| Role | Can view | Can create | Can edit | Can delete | Notes |
| --- | --- | --- | --- | --- | --- |
| Ordinary visitor | Home, tasks, result. | Local scores and anonymous analytics events. | Own local language, scores, and local analytics state through app behavior. | Can clear only own browser data outside app. | Cannot see an analytics shortcut in normal navigation. |
| Owner | All visitor screens plus hidden analytics page. | Same as visitor; can also request cloud summary. | Can store/remove local owner token. | Can reset local analytics data from dashboard; cannot delete D1 data from app. | Owner page requires the hidden `?owner=1&analytics` URL each time; cloud summary still requires Worker secret token. |
| Cloudflare Worker | No UI. | Inserts analytics events into D1. | Does not update existing event rows. | Does not delete rows. | Requires `ANALYTICS_DB`, `VISITOR_SALT`, and `ANALYTICS_READ_TOKEN` environment config/secrets. |

## Deployment And Runtime Notes

- Public site listed in project map: `https://prefrontal-lab.com`.
- Owner analyzer URL: `https://prefrontal-lab.com/?owner=1&analytics`.
- Frontend is a static React app loaded by `index.html` with React, ReactDOM, Babel, Tailwind, lucide, and KaTeX from CDNs.
- `index.html` currently cache-busts `styles.css`, `gameLogic.js`, and `App.jsx` with `v=seo-en-default-20260608`.
- Default analytics endpoint is `/api/retention`, overrideable by `window.PFL_ANALYTICS_ENDPOINT`.
- Cloudflare Worker name used by Git builds: `prefrontal`.
- Cloudflare Worker routes listed in the project map are `prefrontal-lab.com/api/retention*` and `www.prefrontal-lab.com/api/retention*`.
- D1 table name from schema: `analytics_events`.
- Cloudflare database name from project map: `prefrontal-lab-analytics`.

## Open Questions

- Should this local folder or `C:\Codex related\Neuroscience-Training-publish` be treated as the deployment source of truth?
- Should the product contract be kept in English, Chinese, or bilingual form?
- Should owner analytics token stay in `localStorage`, or should future design use a session-only memory model?
- Should D1 have a data retention policy or deletion/export path for privacy maintenance?
- Should game click coordinates remain stored, or are aggregate click counts enough?
- Should Set Logic hard mode use three fill states instead of boolean fill so "all different" can be represented cleanly?
- Should arena completion be counted only when the full 90s run ends, or also when the user exits after partial play?
- Should browser language and app-selected language both be tracked?

## Decisions

| Date | Decision | Owner | Reason |
| --- | --- | --- | --- |
| 2026-06-01 | Use this file as the cross-chat design/backend contract. | Project | Keeps decisions visible when design and backend work happen in separate chats. |
| 2026-06-01 | Treat confirmed local code as the current snapshot, not as a final product spec. | Project | Prevents accidental mismatch between implementation and future intended behavior. |
| 2026-06-01 | Keep hidden analytics owner-only at the UI level and token-protected at the cloud API level. | Existing implementation | Ordinary users should not see analytics, and cloud summary requires `ANALYTICS_READ_TOKEN`. |
| 2026-06-01 | Use a responsive app shell: bottom nav on mobile and top nav on desktop. | Product | Keeps the web usable on desktop while preserving an app-like mobile/PWA experience. |
| 2026-06-01 | Ship Daily Challenge first as local-only progress with weekday-rotation tasks. | Product | Validates the retention loop before adding login or cloud sync complexity. |
| 2026-06-01 | Make Daily Challenge feel like a check-in habit, not just another task card. | Product | Theme, goal, weekly progress, and dedicated result feedback give users a clearer reason to return. |
| 2026-06-01 | Use the same Daily Challenge for all users on the same day. | Product | Makes Daily feel like a shared event and keeps future leaderboards/sharing viable. |
