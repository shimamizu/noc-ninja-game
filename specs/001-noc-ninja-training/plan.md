# Implementation Plan: Mixed Incident Dojo

**Updated:** 2026-11-17 · **Branch:** main
**Governance:** Constitution 1.2.2 · **Content revision:** noc-v2.6-2026-11-17
**Status:** Implementation and automated checks complete; manual browser acceptance pending.

## Result and owner-authorized change

Replace sequential diagnosis-specific lessons with six interleaved investigations. All three
methods are taught once, and every incident has identical tools at both endpoints. The engineer
selects a diagnosis category by aiming at a target, then explicitly throws a shuriken. The game
derives the affected endpoint from evidence. The graphical dojo adds no reflex or timing test.

This revises the initial workshop build at the owner's explicit request. Hardware, source review,
static architecture, honest progress, safe retry and accessibility obligations remain unchanged.
The subsequent owner-selected topology names are leaf-gw1 (7050SX3) and spine-gw1 (7808),
using 2001:db8:51::1/126 and 2001:db8:51::2/126 respectively.

## Architecture

Use native HTML/CSS/ES modules and editable JSON. No framework, install/build step, backend,
external assets, persistence, live device connection or runtime AI. Serve through localhost HTTP.

| Module | Responsibility |
| --- | --- |
| index.html / main.js | Shell, load boundary, dispatch, live announcements, dialog and focus |
| engine/content.js | Schema 2, source/revision, topology, units/limits, uniform-tool and domain validation |
| engine/rules.js | Pure optical, counter and history findings at both endpoints; exactly one diagnosis |
| engine/state.js | Aim/inspect, explicit submit, attempts, assistance, safe retry and six-incident progression |
| engine/feedback.js | Explanations from computed evidence, specific to the selected category |
| ui/render.js / ui/controls.js | Semantic native inputs, graphical arena, console and responsive display |
| style.css | Night dojo, targets, shuriken animation, gauges and reduced-motion alternative |
| data/levels.json | Three neutral groups, six mixed incidents, source-backed authored observations |
| tests/ | Independent rule, content and state assertions; Node and browser runners |

The retained `levels` container is an authoring grouping, not a diagnosis progression. One briefing
leads directly through six challenges to a final summary. Do not introduce an intermediate lesson
view or use group identity to select a rule. Choice identities name categories, never correctness.

## Evaluation and data flow

1. Load and validate the whole document before starting. Review metadata must match its revision.
2. Every incident contains `observations.light`, `observations.counters`, and `observations.history`
   for both interfaces, plus the same five display tools at both switches.
3. Compute all six findings. Check endpoint identities, window alignment and current states across
   tools. Zero or multiple supported findings are content errors.
4. Match only the selected category to the computed condition. Feedback identifies the receiver.
5. Only explicit Throw submits. Evaluate and expose feedback/Next immediately; decorative motion
   has no callback or timer that can affect state. Reduced motion hides the projectile.
6. A wrong throw retains the incident. A correct throw completes once. Explicit Next moves onward.

## Visual and interaction design

A night dojo with inline vector ninja, moon, gate and three targets sits beside the investigation
console. Clicking/tapping a target or using native radio arrows aims; the separate Throw button
commits the answer. A projectile moves toward the selected target; a static impact mark and text
carry the result. No lives, countdowns, points or aim precision.

Endpoint buttons preserve the selected diagnostic tool. Tool buttons offer Interface now, Port status, Optics,
Error snapshots and MAC / history in a fixed order on every incident. Optical gauges supplement
numeric dBm rows; counter pairs remain side by side; static history lists the initial state and
reports. Terminal text uses textContent, labeled scrolling, and no HTML interpretation.

## Constitution check

| Principle | Design / evidence |
| --- | --- |
| C1 Technical truth | Independent expectations, source-to-simulation review, all-method evaluation and content rejection |
| C2 Decision learning | Unknown category per incident, equal evidence access, category targets, reasoned feedback |
| C3 Honest progress | Explicit submit/Next, no penalties, unique completion, separate assistance |
| C4 Access | Native radios/buttons, visible focus, live text, no motion dependency; manual checks pending |
| C5 Determinism | Fixed interleaved cases and pure rules; static local assets |
| C6 Separation | JSON content, independent domain engine, renderer and session state |
| C7 Demonstrated done | Automated report and explicit manual gaps in verification.md |

## Implementation and validation sequence

1. Amend scope/specification and independent expected case table for the owner's correction.
2. Replace single-method observations with complete mixed evidence and review all displayed values.
3. Compute all diagnoses and reject contradictions/ambiguity; update content schema and tests.
4. Replace lesson transitions with direct incident progression; preserve help/reset/attempt semantics.
5. Build native target controls, deliberate throws, graphical dojo and console; retain motion fallback.
6. Run rule/content/state checks, inspect source/display agreement, check syntax and whitespace.
7. Open index.html through the local server; conduct full pointer/keyboard playthrough, laptop/narrow
   layouts, reduced motion and announcements. Record unavailable checks as Not run.

## Traceability

FR-001–008 → rules/content/data; FR-009–015 → feedback/state; FR-016–019 → render/controls/styles;
FR-020–023 → review gate, evidence package, README and verification. AC1–AC24 and SC-001–SC-008
remain explicit in spec.md and verification.md. Historical T001–T042 describe the original build;
new tasks T043 onward cover this replacement behavior and current validation.

## Full interface realism update

Both current and earlier interface views use complete platform-specific samples rather than
reduced excerpts. Preserve the supplied prompt, peer description, MTU/MRU, uni-link and
counter-clear differences. Populate all background fields and reconcile uptime/downtime,
link-change totals and traffic/error counters with the complete incident timeline. Keep generated
traffic averages distinct from the counter interval. No extra fault category or scoring path is
introduced. Review U6 and run `tests/interface-output.test.js` through the existing test runner.
FR-024 / AC23 cover completeness and consistency; source and browser limitations remain explicit.

## Error-table and MAC-detail update

Use explicit earlier/later counters-errors tables with FCS, Align, Symbol, Rx, Runts, Giants and
Tx; validate the pair reference and FCS mapping. Current MAC detail and every archived snapshot
retain system time and four complete state/fault rows. Render the authored timeline outside the
CLI text. Add the supplied Port status command consistently on both switches, and preserve current
and expandable earlier full interface detail. U7 records the supplied port mismatch and the
unchanged FCS versus rising Rx/runts example; no new causal conclusion or grading rule is inferred.

## Shared event timeline implementation

Store each round’s `linkTimeline` once and reconcile both endpoints against it in
`engine/timeline.js`, called by the content gate. Validate command timestamps, link state,
Up/Down durations, MAC row ages and cumulative transition increments. The evaluator accepts
identical paired flap histories as one diagnosis and feedback names both endpoints without
doubling the event count. `tests/link-timeline.test.js` covers synchronized histories and
rejects contradictory ages, clocks, states and independent faults. Raw source captures remain
evidence; their unrelated historical uptimes are not copied into a simulated shared link.

U8 refines the shared timeline: reconcile Interface State across endpoints, retain independent
PHY/local-fault/remote-fault clocks, and validate each row over time. Keep full-interface
`linkStatusChanges` separate from MAC change totals. Optical cases model the directional
fault observations in `evidence/paired-down-link.md`; hardware and routed-port scope are unchanged.

For the owner’s flap display convention, align cleared Remote Fault ages with each shared
interface event and keep supporting fault changes consistent. Use separate authored transceiver
profiles for each endpoint, derived from the supplied working examples. Validate normal values
against the supplied warning ranges and preserve intended optical faults and diagnoses.
