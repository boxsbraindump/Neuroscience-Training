# Brainstorm Ideas

Last updated: 2026-06-01

This document captures ideas that are not fully implemented yet. Keep the product contract focused on confirmed behavior; use this file for future gameplay and retention ideas.

## Daily Challenge Direction

- Daily Challenge should feel like a shared daily ritual, not a random training shortcut.
- Recommended rule: every user gets the same challenge on the same calendar day.
- Reason: shared daily tasks make future leaderboards, sharing, and user discussion easier.
- Random-per-user challenges can still be useful later for practice mode, but they are weaker for social comparison and anticipation.

## Daily Challenge Formula

Daily Challenge = weekday rotation + challenge pool

The initial rule is simple and predictable: Monday starts from the first challenge in the pool, Tuesday uses the second, and so on. Because the MVP pool currently has six challenges, Sunday wraps back to the first challenge until a seventh Sunday-specific challenge is added.

Each challenge should define:

- `id`
- underlying task key
- display theme
- short description
- target or goal text
- difficulty/variant settings
- completion rule
- duration
- scoring notes

## Initial Daily Challenge Pool

| ID | Theme | Task | Rule idea | Status |
| --- | --- | --- | --- | --- |
| `schulte-forward` | Visual Lightning | Schulte Grid | Click 1 to 25 as fast as possible. Completion: `finish-grid`, 90s. | First batch |
| `schulte-reverse` | Reverse Radar | Schulte Grid | Click 25 to 1. Completion: `finish-grid`, 90s. | First batch |
| `stroop-color` | Color Override | Stroop | Choose the real color, ignore word meaning. Completion: `timed-score`, 60s. | First batch |
| `nback-2step` | Memory Loop | N-Back | 2-back challenge. Completion: `timed-score`, 60s. | First batch |
| `set-triad` | Logic Calibration | Set Logic | Hard/three-property SET-style challenge. Completion: `timed-score`, 60s. | First batch |
| `neuron-storm` | Neural Storm | Neuron Counting | More distractors and moving targets. Completion: `timed-score`, 60s. | First batch |
| `schulte-odd-even` | Odd-Even Relay | Schulte Grid | Click odd numbers first, then even numbers. | Future |
| `schulte-even-odd` | Even-Odd Relay | Schulte Grid | Click even numbers first, then odd numbers. | Future |
| `stroop-streak` | Conflict Streak | Stroop | Complete a correct-answer streak. | Future |
| `nback-hit-chain` | Hit Chain | N-Back | Maintain a correct-answer streak. | Future |
| `set-speed` | Timed Set Hunt | Set Logic | Find a target number of valid sets. | Future |
| `neuron-precision-chain` | Precision Chain | Neuron Counting | Submit several exact counts in a row. | Future |

## Suggested Weekly Rhythm

Use a predictable weekly training rhythm while still rotating details through the challenge pool:

| Day | Challenge | Focus |
| --- | --- | --- |
| Monday | `schulte-forward` | Visual search |
| Tuesday | `schulte-reverse` | Reverse visual search |
| Wednesday | `stroop-color` | Inhibition control |
| Thursday | `nback-2step` | Working memory |
| Friday | `set-triad` | Logic |
| Saturday | `neuron-storm` | Visual counting |
| Sunday | wraps to `schulte-forward` for now | Future light recovery or bonus challenge |

## Future Daily Features

- Dedicated completion condition instead of always waiting for the timer.
- Clearer "today's goal" per challenge, such as "finish one reverse Schulte grid" or "score 10 correct Stroop answers."
- Shareable result card.
- Cloud sync for streak and daily history.
- Optional leaderboard after login or anonymous nickname.
- Missed-day recovery item or "streak freeze" if the product becomes more game-like.

## Roguelike Direction

Roguelike mode can reuse Daily variants as encounter modifiers.

Potential structure:

- A run contains multiple floors.
- Each floor has one task plus one modifier.
- After some floors, user chooses a buff.
- Wrong answers can reduce time, score, or lives.
- Daily variants become reusable challenge modules.

Potential buffs:

- Focus Shield: reduce one mistake penalty.
- Time Bank: add seconds after a clean round.
- Memory Preview: briefly show previous N-Back sequence.
- Calm Mode: reduce visual movement for one round.

Potential modifiers:

- Reverse order.
- Odd/even filter.
- Hidden clicked numbers.
- More moving distractors.
- Higher N-Back level.
- Extra SET property.
