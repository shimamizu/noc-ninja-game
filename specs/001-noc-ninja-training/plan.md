# NOC Ninja — Implementation and publishing plan

Updated 2026-11-19. Application `guided-v21`; content `guided-cases-u13-u14-u15-v3`;
constitution 1.7.1. This describes the implemented architecture and remaining publication checks.
See [spec.md](spec.md), [tasks.md](tasks.md) and [verification.md](verification.md).
The previous simulation plan is [archived](history/plan-before-guided-v19-reconciliation.md).

## Architecture

| File | Responsibility |
| --- | --- |
| `index.html` | Public player entry; mounts the app, styles, accessible announcements and restart dialog |
| `main.js` | Loads/validates cases, dispatches actions, manages focus and downloads plain-text handoffs |
| `data/cases.json` | U13–U15: 42 captures, 12 decisions, inventory, teaching context, sources, limits and outcomes |
| `data/optics-reference.yaml` | Authoring reference only; not fetched or used to grade |
| `engine/state.js` | Fisher–Yates shuffling of session arrays, stable identities and guarded restart |
| `engine/cases.js` | Library validation, frozen source data, progression, reviewed-answer grading and handoff generation |
| `engine/investigation.js` | Finite four-command catalog, endpoint/command matching, capture lookup, grouped readings, missing/locked states and alias display |
| `ui/patrol.js` | Briefing, compact command workbench, pre-answer teaching context, questions, outcome review and summary |
| `ui/aim.js` | Pointer and keyboard pickup/move/drop, circular hit testing, cancellation and decorative flight |
| `ui/render.js`, `ui/controls.js` | Rendering, navigation, native command selectors and control bindings |
| `style.css`, `assets/` | Responsive layout; 145×165 ninja in a 300px arena with target clearance and a local Himeji Castle twilight background; quiz-only Fuji/red maple page layer; separate Arcade listing card |
| `tests/run.mjs` | Developer Node test runner |
| `tests/index.html` | Separately addressed developer browser test page; never part of the public entry graph |

## Loading, validation and sessions

`index.html` imports `main.js`; the loader fetches the relative versioned `data/cases.json`.
Schema version 1 requires unique cases/evidence/questions, consistent content revisions,
case-local source paths, two endpoints, complete required capture sets at each end and exactly
one correct choice among three. Optional question context must be nonempty. Validate literal
command host/port/kind, observation uniqueness, capture provenance and allowed outcome status.
Require literal status once and optics/MAC/errors twice per endpoint. Validation rejects any
missing required command/sample with its case, endpoint and port. The author must ask the owner
for omitted outputs and wait before publishing the case. Optional observations may still resolve
to missing; this is not a bypass of the admission gate.

Successful loading freezes the library, copies/shuffles scenario/question/answer arrays and
enters the briefing. Stable IDs govern grading and progress. Evidence and source values remain
unchanged. Failed loading or validation enters a nonplayable content-error view. No fallback.
A confirmed restart creates a new shuffled session; cancellation retains existing state.

## Investigation, teaching and outcomes

Selection of an endpoint and one of four commands shows all available incident/follow-up
readings immediately. Capture requests and viewed evidence are tracked separately from answers.
Original literal output remains in the evidence source and data. Display expansion is limited
to the reviewed U14 `senz` alias; U15 `show int` is accepted as captured with endpoint validation.

All three cases have 14 recordings each. U15 includes the owner-supplied pair of zero leaf
error tables, with unknown capture times/reset baseline. No after-repair
recordings are supplied. Display explicit missing states; gate any future after-repair output
until outcome review. Available-evidence coverage controls completion, not a fixed panel count.

U15's variance and second-replacement questions include context rendered before choices:
highest minus lowest is 63.35 − 27.33 = 36.02 mA, compared with the operator's usual 10–20 mA
maximum range between lanes. Keep the explanation valid regardless of question order.
The reviewed answer requires leaf replacement first, then continued down link AND persistently
high bias current variance between lanes before considering spine replacement. This is case
reasoning, not a new numeric classifier or an automatic repair action.

Every decision must be correct and every available evidence item viewed before reveal/export.
U13/U14 show confirmed-recovery reports; U15 shows recommended-action diagnosis review. Handoffs
include evidence, reasoning, attempts/hints, inventory and verification gaps; all three remain
available at the end. No result claims unmeasured service health.

## Visual presentation

Stylesheet revision: `guided-v20-fuji2`. The 145×165 ninja and its hand control sit in a
300px Himeji Castle arena with clearance below the answer targets. The fixed Fuji/red maple
page layer is scoped to quiz incidents through `.compact-patrol`, so the homepage keeps
its original appearance. Decorative layers cannot intercept input. Capture notes/limits
(including expanded notes) and the incident badge use opaque `#191d36` backgrounds.
Both scenic WebP assets are local files listed in the publishing manifest.

## Local verification

From the repository root:

```sh
node tests/run.mjs
python3 -m http.server 8001 --bind 127.0.0.1
```

Player preview: `http://127.0.0.1:8001/index.html` (or the server root).
Developer browser checks: `http://127.0.0.1:8001/tests/`.
Keep these URLs distinct; the test page is not an intermediate player screen.

Publishing handoff rerun (2026-11-19), guided-v21 with stylesheet guided-v20-fuji2: **53/53 Node and 62/62 Safari checks pass**.
Coverage includes source fidelity, supported/distractor choices, missing captures, teaching
context before answers, shuffled grading, three-case progression, gates, reports and restart.
Shared aiming tests and Safari controls cover pointer/keyboard behavior and reduced motion.
Pending: dedicated narrow-layout, screen-reader, full manual playthrough and actual download-click
acceptance. Browser DOM checks are not a claim that those manual acceptance tasks are complete.

## Publication handoff

1. Use root `ARCADE.md` as the canonical listing metadata; keep `StarterKit/ARCADE.md` synced.
   Share the repository, current documentation and evidence with the publisher. The StarterKit
   directory by itself is not the application.
2. Serve the repository root on an HTTP(S) static host, preserving relative paths and revision
   queries. Configure the Arcade Play destination to the hosted `index.html`, or host root with
   that default document. Never use `/tests/`, `/tests/index.html` or `/StarterKit/` as Play.
3. Deploy `index.html`, `style.css`, `main.js`, `engine/`, `ui/`, `data/cases.json`,
   `assets/ninja.png`, `assets/shuriken.png`, `assets/himeji-castle.webp`, `assets/fuji-maple.webp` and `LICENSE.md`. Supply the root metadata and
   `assets/arcade-card.webp` for the listing. No package installation, build, backend or secrets.
4. The public playable subset does not require `tests/` or source documentation. Keep them in
   the source handoff; omit them from the public upload if a player-only deployment is wanted.
   If tests are hosted, their explicit developer URL still does not enter the game flow.
5. On the actual hosted URL, verify the Play target, briefing, asset MIME types, all three
   cases, input, missing-output states, outcome gates and handoff downloads. Invalidate stale
   cached files on updates. Repeat appropriate manual acceptance checks.
6. Fill `runtime.hosted_url` in both ARCADE files only when the hosted URL is known. No Arcade
   upload or hosted validation is part of this documentation update; the field remains blank.

## Extension and consistency rules

Inventory the required 14 captures before quiz admission. Ask the owner for any missing
endpoint/port/command/sample and wait; draft outside the playable library in the meantime.
Add only complete supplied capture sets with source-reviewed choices and honest outcome status. Preserve
unknown timing and inventory; never borrow line cards or optic variants across cases.
Retain the four-command mechanic unless the owner approves a scope change. New data shapes
require validation and relevant checks. Keep all listing counts, card text, README, StarterKit
summaries, spec, plan, constitution and verification records in sync.

C1–C7 review: source evidence and operator-scoped guidance support the curriculum; context precedes
questions; retries/gates are honest; keyboard/reduced motion are implemented with manual checks
still pending; runtime is static; content is separated from logic; public entry and documentation
match the current build. Historical tasks and archived documents are not active requirements.
