## Fuji and red maple quiz-page backdrop — 2026-11-19

The owner requested Mount Fuji and red maple branches/leaves behind the quiz panels,
excluding the homepage. A local WebP is applied through a fixed, noninteractive CSS
layer scoped to `.compact-patrol`. Dark shading preserves readability. The Himeji
Castle arena remains separate. ARCADE and spec/plan mirrors include this asset.

## Himeji Castle arena — 2026-11-19

The owner requested a Himeji Castle-inspired backdrop inside the ninja arena. The local
WebP illustration shows a twilight castle, pines and stone courtyard. Existing 145×165
ninja sizing, 300px arena height and clearance below target B are retained. CSS supplies
contrast shading and replaces the previous grid/floor decoration. Artwork provenance and
the final generation prompt are recorded in `assets/README.md`.

## Required capture completion and intake gate — 2026-11-19

The owner supplied both leaf-gw2 Et53/1 counters-errors samples for U15. All seven counters
are zero in both. U15 now has 14 recordings; the patrol has 42 recordings and 12 decisions.
Its counter lesson compares zero counters at both ends with the unchanged down-link MAC
state. Original capture timestamps/reset history and repair results remain unknown.

Future cases MUST include status once and optics/MAC/errors twice per endpoint before quiz
admission. Ask the owner for missing required host/port/command/sample output and wait for it;
do not add an incomplete case to the quiz. Runtime validation enforces this gate. Optional
post-repair data remains separate. The U14 fault-count prompt now names
`show interfaces ethernet XX mac detail` on each device, and the homepage no longer includes
the generic missing-recording sentence. Current revisions: guided-v20, content v3,
constitution 1.7.0. Older entries below describe earlier states of the library.

> **Document role (2026-11-19):** Owner-decision and implementation history. The consolidated
> current requirements are [spec.md](spec.md), [plan.md](plan.md) and constitution 1.6.0 at
> `.specify/memory/constitution.md`. Older scope sections below record superseded stages.

## Bias current variance teaching clarification — 2026-11-19

Use “bias current variance between lanes” and explicitly define it here as the
highest-to-lowest range in mA. Show the 63.35 − 27.33 = 36.02 mA calculation and the
operator’s usual 10–20 mA maximum spread before the relevant answer choices, including
when shuffled. Consider the spine-gw1 optic only after leaf replacement if the link
remains down AND the high bias current variance between lanes persists. Hints, feedback,
review and handoffs use the same terminology. Guided-v19: 52 Node / 61 Safari checks pass.

## Third incident — U15 (2026-11-19)

Current scope: U13–U15, four decisions each (12 total), with 40 supplied interface recordings.
U15 links spine-gw1 Et8/10/1 (DCS-7508N) and leaf-gw2 Et53/1 (DCS-7050SX3-48YC8-R),
EOS 4.31.10M and ColorChip C100Q020CWDM403B optics. Preserve the original inventory and
all 12 interface recordings. Leaf error counters and all post-repair evidence are missing.

Specification: teach leaf optic replacement first using spine Rx -13.87 dBm, spine Local
Fault True, leaf Remote Fault True and leaf lane 1 Tx -5.36 dBm. Bias current variance between lanes means highest minus lowest in this lesson:
63.35 − 27.33 = 36.02 mA, then 63.39 − 27.30 = 36.09 mA on spine-gw1.
The operator normally sees at most about 10–20 mA between the four lanes in this environment;
36 mA is a very large spread. This is operator guidance, not a universal alarm threshold.
Show the definition, calculation and comparison before the variance/second-swap questions.
Only recommend the spine optic after the leaf replacement AND a still-down link AND
persistently high bias current variance between lanes on spine-gw1. Recovery with persistent spread does not satisfy this
rule; continued link failure with normalized spread does not satisfy it either. No repair
result has been supplied: reveal a diagnosis review, not confirmed recovery.

Plan: add source-backed U15 data and four independent questions (replacement target, bias
interpretation, repeated state/counter interpretation, conditional escalation). Permit absent
incident error counters while continuing to require both-end optics/MAC evidence. Accept the
captured `show int` abbreviation without altering its literal text. Reuse existing missing
capture handling, shuffled progression, diagnosis review and export. Update totals and assets.

Consistency review (C1–C7): owner-supplied captures and the explicit case-specific runbook
support the answer key; no universal threshold/Remote Fault rule, generated telemetry, live
commands or fabricated outcome is added. Missing outputs do not block evidence completion.
Four questions must stand alone under shuffling. Validate source fidelity, all distractors,
missing counters, conditional escalation, three-case completion and browser rendering.

Verification: 52/52 Node checks and 61/61 Safari browser checks pass on guided-v18.
Safari visual review confirmed three incidents/twelve decisions and the U15 investigation
layout. The listing card was regenerated and visually checked. Dedicated narrow-layout,
screen-reader, full manual playthrough and download-click acceptance remain pending.

## Session randomization — 2026-11-19

Shuffle scenario order, question order within each scenario, and answer-choice order when
creating a patrol. Keep that order stable through evidence selection, hints, retries and
rerenders. Confirmed restart creates a fresh shuffle; cancellation preserves the session.
Use stable case/question/answer IDs for grading and progress, with visible A/B/C assigned
from the shuffled positions. Review and handoff question order follows the session.
Source evidence and the incident library remain unchanged. Validated with 48 Node checks
and 56 Safari checks, including completion across shuffled sessions and answer-label mapping.

## Second incident added — 2026-11-18

Current scope: U13 and U14, four decisions each (eight total). U14 uses the supplied
leaf-gw2 Et55/1 ↔ spine-gw1 Et4/28/1 recordings: increasing leaf error counters, lane 4
Rx -14.91 dBm, leaf Local Fault and spine Remote Fault Changes each increasing by eight.
Current fault flags remain False. The technician's spine optic replacement fixed the
problem. Preserve all 14 original outputs, including the first leaf `senz` error table;
only that explicitly marked shortcut is accepted, with matching host/port/table validation.
The existing four-command dropdown, automatic paired readings and drag-to-answer remain.
U13's questions and captures are unchanged. No post-repair measurements are generated.

## Four-decision curriculum — 2026-11-18

Owner correction: combine the former first and fifth questions into a direct diagnosis
and replacement decision for the failed spine-gw1 Et6/2/1 optic, supported by spine Remote
Fault True and DMZ Rx -30.00 dBm. Keep questions 2 and 4 unchanged. Question 3 teaches that
no actively incrementing errors are visible in the repeated zero-counter readings.
The active case now contains four decisions. Original command captures remain unchanged.

## Compact command investigation — 2026-11-18

Latest owner direction: changing the switch/interface or command immediately displays all
available recordings for that pair. Remove the observation selector and request button.
Show incident and follow-up samples together with their literal outputs and labels; repair
recordings remain gated until outcome review. Missing recordings remain explicit in capture
notes. Automatic display records the evidence coverage without changing answer attempts.

Use a compact laptop workspace: smaller header/title, collapsed device details and teaching
notes, question/targets/ninja beside the readings, and an independently scrolling capture
area for long outputs. Preserve drag-to-answer and keyboard-equivalent submission.

Validated in guided-v13: 43 Node checks and 50 Safari browser checks pass. Safari visual
review confirms the paired MAC readings and ninja fit together at the current window size;
dedicated narrow-layout and screen-reader acceptance remain pending.

# Guided NOC patrol — current scope

Owner correction, 2026-11-18. This replaces the six simulated incidents and the separate
real-incident/arcade modes. Historical specifications and verification records remain as history;
this document governs the current implementation together with constitution 1.5.2.

## Specification

### Latest owner correction — U13 only

Inventory follow-up: spine-gw1 is Arista DCS-7808-CH and dmz-gw2 is Arista DCS-7804-CH.
Both use EOS 4.31.10M and 7800R3-48CQ-LC line cards. Display these in endpoint cards and
exported handoffs; remove them from missing-capture requests. Both endpoints use ColorChip C100Q020CWDM403H optics, as subsequently supplied by the owner. Original command captures are unchanged. Inventory revision guided-v12 passes
42/42 Node checks; the 49/49 Safari run below predates this inventory-only update.

This supersedes the four-case scope below. Remove U10–U12 from data/cases.json and all playable
progression. Only U13 is active: one incident, five decisions and fourteen unchanged original
captures. Keep the four interface-scoped commands and the drag-to-answer mechanic. Old source
files are historical records, not runtime content. New examples will be supplied separately.

The owner confirms that replacing the spine optic fixed the link. Outcome status is now
confirmed-recovery. Numerical after-repair readings, stability interval and any cleaning/reseating
remain unspecified. Do not expose the repair outcome before the evidence/decision gate or invent
recovery measurements. Collection guidance requests only the remaining gaps.

Single-case progression must finish directly at the session summary and retain one handoff.
Tests must cover source fidelity, five reviewed choices and every distractor, fourteen-panel gate,
confirmed outcome with missing verification, four-command replay, reset and exclusion of old cases.
Current results: 42/42 Node and 49/49 Safari browser checks pass. Safari opening screen
shows 1 incident / 5 decisions for guided-v10. Remaining manual narrow-layout, screen-reader
and download acceptance is unchanged.


### Current four-command scope and U13 — owner update

The owner narrows every case to interface-scoped status, transceiver, MAC detail and counters
errors. Remove full-interface detail, rates, discards and logging from the menu and collection
workflow. Earlier broader command-workbench wording below is historical and superseded.

Add U13 spine-gw1 Et6/2/1 ↔ dmz-gw2 Et6/21/1 as the fourth case: 20 decisions total. Replay
all 14 literal supplied captures, including two MAC, optics and error observations per endpoint.
Only MAC samples have absolute timestamps (41s spine / 39s DMZ across midnight). Unknown device
and optic inventory remains null; no fabricated script assessment is required. Per-case evidence
counts replace the fixed seven-panel copy. The operator recommends spine optic replacement;
repair/recovery is unconfirmed. Teach fault direction and combined evidence, never that the
Remote Fault flag causes low light. The standing transmitter-disable exclusion is unchanged.

Implementation: strict command/endpoint matching accepts the equivalent spellings present in
captures while preserving original prompts, whitespace, units and values. Literal evidence
supports incident/follow-up observations; after-repair recordings stay gated. Outcome status
recommended-action exposes diagnosis review without inventing a completed repair. C1–C7 remain
applicable; source fidelity and reviewed answer choices cover the new case.

Verification: 53/53 Node and 60/60 Safari browser checks passed. Safari shows four incidents /
20 decisions. Browser DOM tests verify the four-option menu, all raw U13 output, unknown inventory,
repeat-sample lookup, source fidelity, all 20 decisions and outcome gating. Full manual narrow
layout, screen-reader and download acceptance remain pending. Runtime revision: guided-v9.


### Recorded command investigation — 2026-11-18

Owner authorizes a static command workbench within the same patrol. Choose an endpoint,
show command and observation (incident, later monitoring, after repair), then request the
recording. Use Arista's check-interface-health workflow as an authoring reference: status/errors,
targeted interface/optics, conditional rates/discards. Add our existing both-end MAC history,
timed comparisons and outcome verification. Do not import generic optical thresholds or the
upstream incorrect interpretation of 0 dBm as no light.

Literal MAC captures are replayable. Existing optics/error tables are script summaries with
unknown original command provenance; label them accordingly, never wrap them as raw CLI.
Unrecorded requests return an explicit absence, not zero counters, generated output or a live
command failure. Record requests separately from viewed evidence. Missing requests neither
block completion nor award evidence coverage. After-repair recordings stay locked until the
reported outcome is revealed. Keep the seven-panel evidence review and all fifteen decisions,
shuriken answering, confidence limits and no-intentional-disable assumption.

Plan: engine/investigation.js owns the finite command catalog, lookup and collection manifest;
data/cases.json stores case-specific capture needs and optional literal commandCaptures with
endpoint, command, observation, timestamp, source and text. Validate provenance and unique keys.
ui/patrol.js adds native selectors, purpose/status feedback, request history and existing evidence
shortcuts. Handoffs include requests and missing captures. A repository collection guide lists
exact endpoint commands, per-case priorities and how to provide independently timed recordings.

Consistency review: C1/C5/C6 remain satisfied by finite local replay and no invented values;
C2 gains command/evidence selection; C3 keeps unavailable captures separate from required views;
C4 retains native keyboard controls and the drag answer mechanic. Existing exact-source tests
must remain green. Add lookup, missing/summary handling, wrong-endpoint/timepoint, post-repair
gating, invalid capture validation, report and DOM/control tests. Safari and narrow-layout
checks must be reported as observed or pending. No MCP server, live shell or runtime AI is added.

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

Latest recorded-command update: 49/49 Node checks and 55/55 Safari browser checks passed.
The latter includes rendering of every literal evidence panel, endpoint/command selection,
request history reopening, missing/summary/locked responses, question progression and keyboard
shuriken submission. Safari desktop visual inspection confirmed the new controls, readable
targets, missing-output response and native command menu. Further manual interaction was
interrupted by browser activity. Narrow-layout, screen-reader, full manual playthrough and actual
download-click acceptance remain pending. This supersedes the earlier browser-suite status below.
The runtime cache revision is guided-v8. Collection instructions and per-case priorities are in
[capture-collection-guide.md](capture-collection-guide.md).

Earlier verification record:

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
