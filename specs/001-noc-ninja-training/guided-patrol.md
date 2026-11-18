# Guided NOC patrol — current scope

Owner correction, 2026-11-18. This replaces the six simulated incidents and the separate
real-incident/arcade modes. Historical specifications and verification records remain as history;
this document governs the current implementation together with constitution 1.5.0.

## Specification

One opening screen offers **Start guided NOC patrol**. The only playable evidence is U10, U11
and U12, in that order, with five reviewed decisions per incident. No simulated readings,
fixed fictional deployment, generated command output or alternative mode is available.
Learner-facing screens and downloads do not discuss sanitization. Actual supplied switch,
port, optical model, EOS, counters, MAC timestamps and script text remain unchanged.

Teach observe → reason → explain → hand off → verify. Introduce directionality, optical
channels, cumulative counters and fault/history interpretation before the first case; retain
case-specific methods, a both-end evidence notebook, specific distractor feedback, optional
reasoning hints, retries, gated outcomes, and downloadable learning handoffs. Do not force
incomplete captures into a single component diagnosis or fabricate a second counter sample.
Use reported repair outcomes with explicit confidence limits. A completed practice session
is not independent certification or a live repair.

## Plan

Use one validated cases.json data file, engine/cases.js for case validation, deterministic
reviewed decisions, reporting and progression, and engine/state.js for session/restart guards.
main.js loads only that library; failure makes the patrol unavailable, with no sample fallback.
ui/patrol.js provides the briefing, evidence notebook, questions and results. ui/render.js
provides shared navigation and accessibility; ui/controls.js binds native controls. Preserve
NOC Ninja artwork and styling. Require shuriken pickup and drop onto an answer circle to submit each reviewed decision.
Answer descriptions and target circles are not clickable selectors; no separate submit button
or below-circle captions. Keyboard users pick up, move and drop through the same shuriken control. Remove
retired simulation data, classifier, coaching and alternate-mode modules and their obsolete tests. No backend, runtime AI, storage or network writes.

## Acceptance and consistency review

- Only one start action and one case progression; three cases, fifteen decisions today.
- Every deployed measurement and literal MAC capture matches its recorded source.
- No simulated evidence assets, old mode links or sanitization labels in runtime UI/reports.
- Invalid content fails closed. Empty answers do not count; wrong choices retry; hints cannot
  complete a question. Outcome/report requires all decisions and evidence views.
- Restart cancel preserves and confirm clears; all handoffs remain available after completion.
- Automated tests cover all reviewed distractors, capture fidelity, loading and progression.
- Safari is the preview browser. Browser/keyboard/narrow-layout/download acceptance must be
  recorded as observed or pending, never inferred from Node checks.

The earlier six-case, fixed-deployment and alternate-mode requirements are superseded. C1–C7
remain applicable with bounded evidence reasoning replacing the retired threshold classifier.
Additional cases require actual supplied captures, reviewed answers and documented outcomes;
missing evidence is an explicit lesson, never an invitation to generate readings.


## Verification — 2026-11-18

42/42 dependency-free Node checks pass, including all reviewed choices, exact inventory/table/MAC
source fidelity, invalid content, confidence limits, evidence gates, hints, retries, all-three-case
completion, downloads as text, restart, drag/keyboard submission, cancellation, reduced motion and removal of the old dataset and runtime paths. Syntax,
module-reference and whitespace checks pass. The new Safari test page adds six rendering/control
checks to the shared case tests; its execution remains pending.

Safari native control was interrupted by browser activity. A previously cached dual-mode screen
was observed; it does not certify the new build. Entry module/dependency and stylesheet URLs now
carry the guided-v4 revision to avoid the stale UI on reload. No Chrome preview was launched.
Fresh Safari visual review, keyboard/screen-reader, narrow layout and download-click checks remain
open. The local preview server uses port 8001 for the owner's review.


## GUI correction — 2026-11-18

Removed redundant Answer A/B/C captions and aligned the letters within the target boards. Read-only
answer descriptions replace radios. Drag release onto the visible circular board submits; release
elsewhere, Escape and pointer cancellation do not count. Hit testing follows the dragged star’s
center even when grabbed at an edge. Keyboard accessibility uses pickup → arrow movement → drop;
a direct click or pickup/drop without movement cannot submit. Reduced motion retains immediate
feedback without flight animation. Regression tests cover these interactions. Safari preview was
interrupted by concurrent browser activity; no new visual acceptance is claimed.


## U10 diagnostic confidence correction — 2026-11-18

Weight zero spine bias, Tx -30.00 and corroborating leaf Rx -26.78 as strong actionable evidence
for spine optic replacement. U10 decisions 1/4/5 teach the replacement target, corrective action
and accurate handoff. The owner excludes intentional transmitter disable from every game incident. It is not
a required check or alternative diagnosis in questions, hints, feedback or handoffs. Outcome gating and all original captures
remain unchanged. This does not promote the different evidence in U11/U12 to the same confidence.


## Standing scenario constraint — 2026-11-18

Intentional transmitter disable is outside the scope of every current and future game incident.
State this assumption once in the briefing. Do not invent enabled-state telemetry to support it,
and do not ask learners to rule out intentional disable. This supersedes the earlier U10 caveat.
Future case authoring must respect the same assumption. Original captured readings are unchanged.


## Monitoring and fault history — 2026-11-18

U10 questions 2/3 now require timed monitoring to distinguish ongoing errors/flaps from accumulated
history. Question 4 includes both-end Remote Fault totals and Last Change ages, retaining current
False flags and avoiding equating transitions with separate failures. Zero spine bias, absent Tx,
low leaf Rx and asymmetric fault history jointly support the spine replacement. A shared note in
MAC/error panels and exported handoffs distinguishes interface counter clears from MAC history.
Reboot-only history reset is scoped to owner-reported training-environment behavior, not asserted
as universal EOS behavior. No new telemetry is generated. Original captures and answer IDs remain
unchanged; source review records the vendor documentation and its limits.
