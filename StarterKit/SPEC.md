<!-- Synchronized handoff copy of specs/001-noc-ninja-training/spec.md; paths in code are repository-relative. -->
# NOC Ninja — Guided NOC Patrol specification

Updated 2026-11-19. Application `guided-v20`; content `guided-cases-u13-u14-u15-v3`;
constitution 1.7.1. This is the current specification for the implemented game.
[Change history](../specs/001-noc-ninja-training/guided-patrol.md) records owner decisions; the former mixed-simulation
specification is [archived](../specs/001-noc-ninja-training/history/spec-before-guided-v19-reconciliation.md).

## Purpose and player entry

Teach NOC employees to investigate optical-link failures using supplied Arista EOS captures,
justify the first repair, interpret follow-up evidence and distinguish recommendations from
reported recovery. One patrol has **three incidents, twelve decisions and forty-two recordings**.

The public game starts at repository-root `index.html`, or `/` on a host configured to serve
that file. After a brief content load, show the game briefing with **Start guided NOC patrol**.
There is no test-results screen in the player flow. `/tests/index.html` is a separate developer
test runner; it is not imported by the game and MUST NOT be the Arcade launch URL.

## Incident inventory and learning outcomes

All endpoints run EOS 4.31.10M. Inventory is scoped to the incident, even when hostnames repeat.

| Case | Hostname | Switch model | Port | Optic model | Line card |
| --- | --- | --- | --- | --- | --- |
| U13 — The DMZ handoff | spine-gw1 | Arista DCS-7808-CH | Et6/2/1 | ColorChip C100Q020CWDM403H | 7800R3-48CQ-LC |
| U13 | dmz-gw2 | Arista DCS-7804-CH | Et6/21/1 | ColorChip C100Q020CWDM403H | 7800R3-48CQ-LC |
| U14 — The unstable fourth lane | leaf-gw2 | Arista DCS-7050SX3-48YC8-R | Et55/1 | ColorChip C100Q020CWDM403H | Not supplied |
| U14 | spine-gw1 | Arista DCS-7808-CH | Et4/28/1 | ColorChip C100Q020CWDM403H | Not supplied |
| U15 — The persistent down link | spine-gw1 | Arista DCS-7508N | Et8/10/1 | ColorChip ltd C100Q020CWDM403B | Not supplied |
| U15 | leaf-gw2 | Arista DCS-7050SX3-48YC8-R | Et53/1 | ColorChip ltd C100Q020CWDM403B | Not supplied |

| Case | Supplied evidence and four decisions | Outcome |
| --- | --- | --- |
| U13 | 14 recordings. Down link; spine Remote Fault True and DMZ Local Fault True; all four DMZ Rx channels −30 dBm. Teach first replacement, PHY versus operational interface state, repeated zero errors and unchanged MAC histories over 41/39 seconds. | Operator confirms spine Et6/2/1 optic replacement fixed the link. |
| U14 | 14 recordings. Leaf lane 4 Rx −14.91 dBm; FCS 4→22, Symbol 4→22, Rx 6→26, Runts 2→4. Local Fault Changes on leaf and Remote Fault Changes on spine each rise by eight despite current False flags. Teach replacement direction, linkUp versus health, increasing errors and paired fault histories. | Operator confirms spine Et4/28/1 optic replacement fixed the problem. |
| U15 | 14 recordings. Spine Rx −13.87 dBm, spine Local Fault True, leaf Remote Fault True and leaf lane 1 Tx −5.36 dBm. Teach leaf-first replacement, bias current variance between lanes, repeated down state with unchanged MAC Changes and zero counters at both ends, and conditional second replacement. | Recommended action only; no replacement or recovery reported. |

Every case has status once and optics/MAC/errors twice at each endpoint. The owner supplied
U15’s two leaf error tables in a follow-up; all seven counters are zero in both samples,
matching the zero spine samples. No case has numerical post-repair readings. Preserve capture/reset timing gaps,
original Last Change ages and telemetry Last Update ages without inventing intervals.

### Required evidence before adding a case

Before quiz admission, require one status and two transceiver, MAC-detail and error-counter
captures per endpoint: 14 original interface outputs. If anything expected is omitted,
ask the owner for that exact endpoint, port, command and sample and wait before adding the
case to the playable library. Draft intake notes may remain outside it. Runtime validation
rejects incomplete sets. Do not generate or infer a missing recording. Ask for any additional
evidence needed to support a proposed question. Post-repair data remains optional for a
recommended-action case, and missing timing/reset history limits the conclusions taught.

### U15 bias current variance and repair sequence

Define **bias current variance between lanes** as the highest-to-lowest range in mA used
by this lesson, not statistical variance. In the spine-gw1 Bias Current column, the values
are 63.35, 44.00, 39.24 and 27.33 mA: **63.35 − 27.33 = 36.02 mA**. The next capture
has **63.39 − 27.30 = 36.09 mA**. Individual lanes change little between samples;
the approximately 36 mA difference is between lanes within a sample.

The operator normally sees at most about **10–20 mA** between the four lanes in this
environment; 36 mA is a very large spread. Attribute this comparison to the operator's
environment, not a universal manufacturer threshold. Show the definition, calculation and
comparison above the answer choices for the variance and second-replacement questions.

Replace **leaf-gw2 Et53/1 first**. After the swap, collect fresh readings at both ends.
Consider replacing **spine-gw1 Et8/10/1** only if the link remains down **AND** the bias
current variance between lanes remains high. A recovered link with high variance, or a
down link with normal variance, does not satisfy this second-replacement rule. Record each
intervention separately and verify optics, faults, new error deltas, stability and service.

## Required player behavior

1. Offer one guided patrol; derive incident and decision counts from the validated library.
2. Shuffle scenario order, questions and answer choices once per session using stable IDs.
   Preserve that order through evidence selection, hints, retries and rerenders. Confirmed
   restart clears progress and reshuffles; cancelled restart preserves the session.
3. Offer four interface-scoped commands: status, transceiver, mac detail and counters errors.
   Changing switch or command immediately shows all available incident/follow-up readings.
   No observation dropdown, request button, live connection or command execution is exposed.
4. Keep unsupplied optional observations explicitly Not captured; required captures must
   already be present before admission. Original source prompts and output bodies
   remain intact. The U14 `senz` alias displays as its full counters-errors command; U15's
   supplied `show int` status abbreviation remains literal and is validated against its endpoint.
5. Keep inventory, method and capture notes expandable, with evidence beside the question and
   ninja on desktop. Allow dense terminal output to scroll within its labeled region. The ninja figure is
   145×165 CSS pixels in a 300-pixel-tall arena, with clear space below the answer targets.
   A decorative Himeji Castle-inspired twilight courtyard fills the arena behind the ninja and
   targets; contrast shading keeps the character, target letters and instructions readable.
   Bundle the background locally; it does not add a runtime service or interaction.
   During quiz incidents only, a separate Mount Fuji and red maple landscape fills the
   page behind the panels. Keep the homepage background unchanged. Dark shading and
   panel surfaces preserve text readability; the decorative layer cannot intercept input.
   The incident badge and capture notes/limits panel have solid dark backgrounds,
   including both collapsed and expanded capture notes.
6. Require shuriken pickup and release onto a circular A/B/C target. Text and target clicks,
   off-target releases, Escape and pickup/drop without movement do not submit an answer.
   Keyboard: Space to pick up, arrows to move, Space to drop, Escape to cancel.
7. Grade stable answer IDs, not displayed letters. Each question has exactly three choices
   and one supported answer. Wrong answers receive explanatory feedback and unlimited retries;
   record attempts and hint use. Reduced motion removes flight animation without delaying feedback.
8. Require all four decisions correct and all available evidence viewed before revealing that
   incident's outcome or diagnosis. Missing recordings never block progress or grant coverage.
9. Label U13/U14 as reported outcomes and U15 as diagnosis review. Keep after-repair readings
   gated until completion and explicitly missing when unsupplied. Never manufacture recovery.
10. Provide a text handoff after each case, including inventory, evidence, supported answers,
    attempts, hint use, requests, outcome limits and verification needs. Retain all three handoffs
    in the final summary. Completion records practice, not independent mastery.
11. Keep progress in memory only. Reload starts a fresh session. Content loading/validation
    failure shows Training unavailable with a reload action and no fallback incidents.

## Teaching and technical constraints

Intentional transmitter disable is excluded from all cases. A fault flag alone is not a
universal component diagnosis. Separate current flags, cumulative histories and timed changes;
do not count state transitions as complete down/up cycles, sum overlapping error categories,
or assign MAC timestamps to other commands. Zero errors on a down link do not establish health.
The counter-clear versus MAC-history guidance is scoped to the supplied training environment.

Use only local HTML, CSS, ES modules, authored JSON and artwork. No accounts, backend, runtime
AI, analytics, API keys, external fonts, package install or build step. The optics YAML is an
authoring reference, not a runtime threshold classifier. Retired simulated cases, fixed IPv6
topology, separate modes and generic diagnosis categories are outside the current scope.

## Acceptance and verification

| Acceptance | Evidence |
| --- | --- |
| Game URL opens the briefing without running tests | Root entry/module review and Safari launch check; production URL still pending |
| All 42 literal captures match their sources and inventory | Node source-fidelity checks |
| All 12 supported answers and distractors behave correctly | Node progression, retry and shuffled-session checks |
| Both supplied leaf error tables render and export; incomplete cases are rejected | U15 capture lookup, source fidelity, admission-gate and Safari rendering checks |
| Variance definition/calculation precedes answers and both escalation conditions are required | U15 content and Safari context-before-submit checks |
| Outcome/export gates, three handoffs and restart preserve honest progress | Node and Safari checks |
| Pointer/keyboard cancellation, answer mapping and reduced motion work | Shared aiming suite and Safari controls checks |

Current guided-v20 result (2026-11-19): **53/53 Node and 62/62 Safari browser checks pass**.
The publishing handoff rerun passed both suites with stylesheet `guided-v20-fuji2`.
Safari visual checks verified the quiz-only Fuji backdrop, Himeji Castle arena, larger ninja
with target clearance, and opaque incident badge/capture notes. Dedicated narrow-layout, screen-reader, full manual
playthrough and download-click acceptance remain pending. No hosted deployment or hosted smoke
test is claimed. See [verification.md](../specs/001-noc-ninja-training/verification.md) for dated evidence and historical runs.
