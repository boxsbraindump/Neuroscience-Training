# Prefrontal Lab v6.1.2 Release Notes

Date: 2026-06-01

## Short Update Announcement

### 中文

前额叶实验室 v6.1.2

- 新增每日挑战：固定周节奏、今日最好、连续打卡、本周打卡进度。
- 新增无限模式：无倒计时自由练习，不影响历史最高分。
- 优化网页/移动端导航、设置入口、Daily 与竞技页视觉层级。
- 优化 Stroop、SET 等任务反馈，让答对状态更清楚。

### English

Prefrontal Lab v6.1.2

- Added Daily Challenge with weekday rotation, today best, streaks, and weekly check-ins.
- Added Endless Mode for no-timer free practice without changing personal bests.
- Refined responsive navigation, settings, Daily layout, and Arena visual consistency.
- Improved Stroop and SET feedback so correct answers feel clearer.

## Full Change Summary

### Daily Challenge

- Added a Daily Challenge primary nav entry.
- Daily uses the same challenge for all users on the same calendar day.
- Daily challenge order now starts on Monday.
- The first Daily challenge pool:
  - Monday: `schulte-forward`
  - Tuesday: `schulte-reverse`
  - Wednesday: `stroop-color`
  - Thursday: `nback-2step`
  - Friday: `set-triad`
  - Saturday: `neuron-storm`
  - Sunday: wraps to Monday's challenge until a seventh Sunday challenge is added.
- Added challenge-specific completion rules:
  - Schulte Daily tasks use `finish-grid` with a 90s timer.
  - Other Daily tasks use `timed-score` with a 60s timer.
- Added local Daily progress storage through `prefrontal_lab_daily_v4`.
- Added local streak, total check-ins, today best score, and Monday-first weekly check-in row.
- Daily card no longer starts when clicking the whole container; only the CTA starts the game.
- Daily completion writes challenge id, daily instance id, task, variant, completion rule, duration, score, and completion timestamp.
- Daily results show a dedicated check-in confirmation and tomorrow reminder.
- Daily scores do not update normal personal bests.

### Daily Visual Design

- Moved streak into the top Daily summary card beside today's best score.
- Changed the top Daily summary into a lighter white card so the Daily challenge card remains the main visual surface.
- Added a solid orange flame icon for active streaks.
- Moved total check-ins back into the Daily challenge card as a lightweight row.
- Changed rule badges into icon + text labels.
- Added a Monday-first weekly progress panel.
- Added a subtle today highlight/pulse for the current weekday dot.
- Changed completed Daily replay CTA into a secondary outlined button.
- Increased subtitle and goal text contrast for better readability.

### Endless Mode

- Added `Endless` as a third training mode beside Basic and Advanced.
- Endless mode has no countdown and shows `∞` in the game top bar.
- Endless mode uses basic task difficulty.
- Endless scores are session-only and do not update:
  - personal best
  - per-task best
  - hard-mode unlock
  - Daily streak
  - arena best
- Back button ends an Endless session and opens the result screen.
- Schulte in Endless starts a new grid after completing 25 numbers.

### Navigation And Settings

- Desktop now uses a top navigation bar; mobile keeps an app-like bottom nav.
- Added Daily and Arena as primary nav items.
- Added a settings button in place of the standalone language toggle.
- Settings menu currently contains:
  - language selector
  - data and sync placeholder
- Reduced desktop nav shadow and adjusted spacing so selected buttons have more breathing room.

### Gameplay Feedback

- Stroop:
  - Fixed a visual jump where the correct button appeared to move after a correct answer.
  - Correct state now uses a lighter green treatment, not a saturated full-green fill.
  - Added better contrast between green color choices and correct-answer feedback.
- SET Logic:
  - Correct sets now highlight all three selected cards together.
  - `+100` feedback is anchored to the grid rather than feeling tied only to the third card.
  - Success feedback stays slightly longer before refreshing the next board.

### Arena And Design System Polish

- Arena score card shadow now uses a lighter orange-tinted shadow, matching the Daily card's softer airiness.
- Arena task card uses a subtle pale-yellow border and softer orange shadow.
- Arena lightning icon background was softened to match the pastel icon treatment used in training cards.
- Arena side icon alignment now matches training card right-side icon alignment.
- Arena subtitle text uses neutral slate gray instead of hue-shifted text.

## Notes For Future Work

- Add a seventh Sunday Daily challenge instead of wrapping to Monday.
- Decide whether completed Daily should eventually offer share/statistics actions.
- Consider moving Daily progress to cloud sync once login/account work begins.
- Evaluate whether Endless mode needs elapsed time and answer-count metrics on the result screen.
