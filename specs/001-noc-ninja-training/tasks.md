> **Current scope (2026-11-19):** One guided NOC patrol using U13–U15: three incidents, twelve decisions. See [guided-patrol.md](guided-patrol.md). Conflicting six-case, simulation and separate-mode details below are historical and superseded.

# Tasks: NOC Ninja Training — First Playable

**Input**: [spec.md](spec.md), [plan.md](plan.md), [research.md](research.md), [data-model.md](data-model.md), [contracts](contracts/), [quickstart.md](quickstart.md), and [constitution](../../.specify/memory/constitution.md).
**Date**: 2026-11-17
**Status**: Guided patrol U13–U15 implemented on guided-v20; documentation reconciled with constitution 1.7.1. Current verification: 53 Node / 62 Safari checks pass. Dedicated manual and hosted acceptance remain open. Earlier numbered tasks below are historical execution records, not current scope. See [verification.md](verification.md).

> T001–T042 below are the original build execution history. Their category-specific levels,
> causal distractors, schema 1 and intermediate summaries are superseded by T043 onward and
> the current spec/contracts. Checked historical tasks do not certify the redesigned browser UI.

Tasks use repository-root paths. All four stories are P1 and retain specification order.
Tests are included because AC12, AC19, AC22 and C1/C7 require independent cases and recorded verification.
Write the corresponding automated cases first, observe meaningful failures, then implement and rerun.
Expected results must be hand-derived, never obtained from the evaluator under test.

`[P]` means work can overlap with the explicitly listed peer tasks once prerequisites are complete;
it does not override phase dependencies or permit simultaneous edits to shared files.
Every task has one checkbox, a sequential ID, a story tag only in story phases, and concrete paths.

Field citations below resolve to the canonical section of `data-model.md`. For its prose records,
`ContentDocument` means Content Document; `ReferenceLimit` means each of the five groups in
`Optic.referenceLimits`; `DownObservation`, `CRCPair`, `CRCSnapshot`, `FlapHistory`, and `StateReport` mean
the records in the corresponding Observations subsections; `HelpItem`, `Session`, and
`RoundProgress` mean the help item, session, and round progress records. These are citation
qualifiers, not additional entities or altered constraints. Unnamed prose properties remain
covered by their linked section and contract; implementation must give them consistent names.

**Evidence dependency**: T014–T016 now record source-to-simulation reviews, including the user-confirmed U4 deployment context. These establish the modeling basis for T017; independent hardware qualification is not claimed. During future content changes, those reviews must establish support before T017
creates dependent platform-specific playable content. If proof is unavailable, record the gap,
leave the affected task incomplete, and continue independent engineering work with test-only
domain fixtures. Never invent source review, vendor output, or a playable-content bypass.
The application must validate all six rounds before starting; an isolated test fixture is not
a one-round production curriculum. Cross-artifact analysis is required before implementation.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the native static application, test runner, and honest verification record.

- [X] T001 Create the semantic application shell and native-module entry in `index.html`, `style.css`, and `main.js`, with planned `engine/`, `ui/`, and `data/` module boundaries and relative resource paths; keep the agreed framework-free, build-free stack.
- [X] T002 [P] Create the dependency-free browser runner in `tests/index.html` with a minimal shared assertion/registration module in `tests/harness.js`; report discovered/passed/failed counts and case IDs, and fail on zero tests, import errors, or uncaught exceptions.
- [X] T003 [P] Create `specs/001-noc-ninja-training/verification.md` with AC1–AC22 and SC-001–SC-008 rows, separate technical-source and browser/accessibility review sections, and date/environment/revision/evidence fields initially marked Not run; link it from `README.md` without claiming implemented behavior.

**Checkpoint**: Shell, runner, and result-recording locations exist. T002 and T003 can overlap after T001.

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared domain rules, content validation, and a load boundary that never grades invalid content.
All stories depend on this phase. Exact vendor-content production is a separate dependency in US1.

### Independent checks before implementation

- [X] T004 [P] Write independent domain cases in `tests/rules.test.js` for both absent-Rx endpoints, unsupported causes, missing evidence, CRC deltas 25/0/12, bad counts/reset/kind/identity/times, four transitions ending up/down, three below threshold, inclusive boundaries, repeated/outside-window reports, incomplete history, invalid choices, ambiguous diagnoses, reordering and purity, missing scoped observations, duplicate observation interfaces, endpoint mismatches, reviewed all-four-Rx -30 dBm absent-light mapping versus below-low-alarm/mixed-channel readings, and missing/false `CRCPair.noReset`; use test-only fixtures under the evaluator contract.
- [X] T005 [P] Write structural/review/reference validation cases in `tests/content.test.js` covering all data-model sections, the preserved U3 limits, invalid IPv6, unknown versions, wrong curriculum shape, missing/pending/rejected/stale reviews, identity mismatches and unresolved references, missing/duplicate scoped observations, missing/false `CRCPair.noReset`, round/document revision mismatches, and separately stale source/output/round reviews; assert no playable result on any error and distinguish synthetic validator fixtures from certified vendor content.

### Shared implementation

- [X] T006 Implement document, source, and revision-aware review validation in `engine/content.js`, returning structured errors per `contracts/content.md`; apply [data-model.md — `ContentDocument.schemaVersion`, `ContentDocument.contentRevision`, `ContentDocument.sources`, `ContentDocument.levels`](data-model.md#content-document) and [data-model.md — `Source.id`, `Source.kind`, `Source.title`, `Source.locator`, `Source.section`, `Source.supportedClaims`, `Source.applicability`, `Source.review`, `Review.status`, `Review.reviewer`, `Review.reviewedOn`, `Review.contentRevision`, `Review.notes`](data-model.md#source-and-review), including document-wide revision matching and claim/applicability checks under the canonical review rules rather than a bare verified flag; also apply [data-model.md — `Round.contentRevision`](data-model.md#round).
- [X] T007 Extend topology and optical-reference validation in `engine/content.js` using [data-model.md — `Device.id`, `Device.label`, `Device.platform`, `Device.eosVersion`, `Device.imageArchitecture`, `Device.routingModel`, `Device.lineCard`, `Device.lineCard.model`, `Device.lineCard.slot`, `Device.interfaces`, `Interface.id`, `Interface.deviceId`, `Interface.name`, `Interface.displayAlias`, `Interface.ipv6Address`, `Interface.optic`, `Optic.vendor`, `Optic.manufacturer`, `Optic.model`, `Optic.formFactor`, `Optic.speedGbps`, `Optic.lanes`, `Optic.classification`, `Optic.referenceLimits`, `Optic.referenceLimits.temperature`, `Optic.referenceLimits.voltage`, `Optic.referenceLimits.bias_current`, `Optic.referenceLimits.tx_power`, `Optic.referenceLimits.rx_power`, `Optic.sourceIds`, `ReferenceLimit.low_alarm`, `ReferenceLimit.low_warn`, `ReferenceLimit.high_warn`, `ReferenceLimit.high_alarm`, `ReferenceLimit.unit`, `ReferenceLimit.scope`, `ReferenceLimit.comparisonRule`, `Link.id`, `Link.endpointInterfaceIds`, `Link.speedGbps`, `Link.medium`](data-model.md#topology); validate both link endpoint references, all five named limit groups and their source references, explicit aliases, structural IPv6 addressing, and measurement interpretation applicability without converting unknown values to zero.
- [X] T008 Extend evidence validation in `engine/content.js` using [data-model.md — `CommandOutput.id`, `CommandOutput.deviceId`, `CommandOutput.interfaceIds`, `CommandOutput.command`, `CommandOutput.observedAt`, `CommandOutput.origin`, `CommandOutput.text`, `CommandOutput.sourceIds`, `CommandOutput.review`](data-model.md#commandoutput), [data-model.md — `DownObservation.interfaceId`, `DownObservation.administrativeState`, `DownObservation.operationalState`, `DownObservation.receiveSignal`, `DownObservation.observedAt`, `DownObservation.outputIds`, `DownObservation.interpretationSourceIds`, `DownObservation.opticalReadings`](data-model.md#down-link-with-absent-receive-signal), [data-model.md — `CRCPair.interfaceId`, `CRCPair.snapshots`, `CRCPair.noReset`, `CRCPair.sourceIds`, `CRCSnapshot.observedAt`, `CRCSnapshot.operationalState`, `CRCSnapshot.counterKind`, `CRCSnapshot.count`, `CRCSnapshot.outputIds`](data-model.md#increasing-crc-errors), and [data-model.md — `FlapHistory.interfaceId`, `FlapHistory.windowStart`, `FlapHistory.windowEnd`, `FlapHistory.minimumTransitions`, `FlapHistory.stateBeforeHistory`, `FlapHistory.historyStart`, `FlapHistory.historyComplete`, `FlapHistory.reports`, `FlapHistory.sourceIds`, `StateReport.observedAt`, `StateReport.operationalState`, `StateReport.outputIds`](data-model.md#link-flapping); enforce endpoint/output/source relationships, optional reading channel/value/unit/limit consistency, the reviewed no-reset assertion, and complete history support.
- [X] T009 Extend curriculum and teaching-record validation in `engine/content.js` using [data-model.md — `Level.id`, `Level.title`, `Level.learningOutcome`, `Level.difficulty`, `Level.briefing`, `Level.sourceIds`, `Level.rounds`](data-model.md#level), [data-model.md — `Round.id`, `Round.contentRevision`, `Round.prompt`, `Round.conditionType`, `Round.topology`, `Round.scopeInterfaceIds`, `Round.targetInterfaceId`, `Round.commandOutputs`, `Round.observations`, `Round.choices`, `Round.hints`, `Round.sourceIds`, `Round.review`](data-model.md#round), and [data-model.md — `Choice.id`, `Choice.label`, `Choice.diagnosis`, `Choice.feedback`, `Diagnosis.deviceId`, `Diagnosis.interfaceId`, `Diagnosis.condition`, `Diagnosis.claimedCause`, `HelpItem.id`, `HelpItem.kind`, `HelpItem.text`](data-model.md#choice-and-help); resolve diagnosis endpoint and help source references and require complete briefing, distinct worked example, corrective feedback and ordered help.
- [X] T010 Implement pure `evaluate(challenge, answer)` in `engine/rules.js` against `contracts/evaluator.md` and the observation/diagnosis definitions cited in T008–T009; derive endpoint/condition and numeric evidence within the explicit scope before checking the target assertion, validate domain invariants before answer input, apply documented reason precedence, and keep exactly-one-answer/target checks independent of labels and order. Pass T004 without DOM, state, timers, storage, randomness, or networking.
- [X] T011 Integrate rule-derived semantic validation into `engine/content.js` after T006–T010: evaluate every choice, reject zero or duplicate supported meanings and inconsistent target assertions, preserve corrective unsupported-cause distractors, and return a read-only normalized view only when the entire document passes `contracts/content.md`; pass T005 without claiming machine validation certifies arbitrary CLI prose.
- [X] T012 Implement module-relative fetch, HTTP/JSON error handling and the full-content start boundary in `main.js`, with minimal loading/unavailable text in `ui/render.js`; connect T011 so no session or Submit/Next can exist on load/validation failure, and preserve structured locations without disclosing source identities. Test failure paths using temporary content fixtures through `tests/content.test.js`.

**Checkpoint**: Shared rules and the full-content gate pass independent tests. A missing/unreviewed
curriculum remains unavailable. This checkpoint does not require or certify EOS evidence.

## Phase 3: User Story 1 — Make and understand a diagnosis (Priority: P1) — MVP

**Goal**: Teach a method, inspect evidence, make a diagnostic decision, and understand/retry the result.
**Independent test**: With a fully validated curriculum, play one reviewed round from briefing
through empty input, a wrong causal claim, retry and success; check identities, evidence and explanation.
Other rounds and rule boundaries are exercised independently through the runner (AC1–AC4, AC11–AC13).

### Tests for User Story 1

- [X] T013 [P] [US1] Add independently expected feedback assertions to `tests/rules.test.js` and initial-submit/selection/inspection state cases to `tests/state.test.js`; cover all evaluator outcomes, the 25-error explanation and both endpoint deltas, patient guidance, stable prior-answer feedback, and no repair/connectivity/cause claims.

### Implementation for User Story 1

- [X] T014 [P] [US1] Resolve R-01 in `specs/001-noc-ninja-training/evidence/release-platform-review.md` using exact applicable sources or sanitized captures for each requested EOS image/platform, multi-agent mode, corrected slot/card and selected interfaces; record source sections, supported claims, reviewer/date and unresolved gaps. Do not mark this task complete without the required support.
- [X] T015 [P] [US1] Resolve R-02 in `specs/001-noc-ninja-training/evidence/optical-interpretation-review.md` against `specs/001-noc-ninja-training/evidence/colorchip-reference.md`: preserve the supplied CWDM4 identity and all 20 values, incorporate U5-confirmed units and the -30 dBm no-light interpretation together with U4a's transceiver format, and review scenario applicability with recorded provenance/reviewer/date. Use all four Rx rows at -30 dBm for authored L1 cases; do not treat low alarm as absent light. Do not request the supplied units/interpretation again or gate this mechanic on unused alarm-boundary comparisons.
- [X] T016 [P] [US1] Resolve R-03 in `specs/001-noc-ninja-training/evidence/output-semantics-review.md` against `specs/001-noc-ninja-training/evidence/user-samples.md`: incorporate U4a/U4b/U4c working optical/MAC-detail/interface formats and headers, check deployment provenance and remaining scenario/history semantics and timing support; keep source samples separate from simulations and use only fictional device labels. Do not relabel the headerless rows as the selected port or use cumulative changes as timed history.
- [X] T017 [US1] After T014–T016 close the applicable evidence gaps, author all six reviewed rounds and three distinct briefings in `data/levels.json` under T006–T011 and `contracts/content.md`, including topology/IPv6 context, labeled simulated outputs, observations, choices, feedback, three help items and complete source/review records; implement the exact L1/L2/L3 fixtures in `spec.md` with both endpoints in L2-R2 scope, preserve U3 values, and update the evidence-status register in `specs/001-noc-ninja-training/research.md` with actual supporting review paths and revisions.
- [X] T018 [P] [US1] Implement `explain(result, challenge, choice)` in `engine/feedback.js` against `contracts/evaluator.md`, consuming computed evidence and reviewed [data-model.md — `Choice.feedback`](data-model.md#choice-and-help); explain the misconception and next method without mutating status or progress, and pass T013 feedback cases.
- [X] T019 [US1] Implement reusable briefing/challenge rendering in `ui/render.js` using the validated Level/Round records from T009: show the two labeled devices, link and IPv6 context, selectable command evidence through `textContent` in a preformatted region, timestamps/units, side-by-side counters and static history, native unselected radios, explicit Submit/Next and a persistent textual explanation area. Preserve selection and label which prior answer feedback describes.
- [X] T020 [US1] Implement initial session, inspection, selection, submission and retry transitions in `engine/state.js` from [data-model.md — `Session.view`, `RoundProgress.attempts`, `RoundProgress.completed`](data-model.md#session-state-and-lifecycle) and `contracts/interaction.md`; retain current IDs, inspected outputs, selection and feedback as session state, reject invalid events, isolate content errors from learner attempts, and guard submissions after success. Pass the corresponding T013 state cases.
- [X] T021 [US1] Wire Begin, command inspection, radio selection, Submit and solved-round readiness through `ui/controls.js` and `main.js`, connecting T018–T020 only to T012 validated content; selection must not submit and a result must not mutate or repair the displayed incident.
- [ ] T022 [US1] Run the US1 independent round and all T004/T013 cases using `tests/index.html` and `specs/001-noc-ninja-training/quickstart.md`; record AC1–AC4 and AC11–AC13 results in `specs/001-noc-ninja-training/verification.md`, fixing failures in their owning files before marking this story complete.

**Checkpoint**: US1 can be demonstrated independently once T017 passes the full gate. Test-only
arithmetic or UI harnesses are useful earlier but cannot stand in for the reviewed-round demo.

## Phase 4: User Story 2 — Learn with help and finish the session (Priority: P1)

**Goal**: Offer penalty-free help, honest progress, explicit navigation, summaries, and safe restart.
**Independent test**: Drive the state module with independent event sequences, then use reviewed
rounds to check help, duplicate actions, all summaries, restart/cancel and reload (AC5–AC8, AC14–AC16).

### Tests for User Story 2

- [X] T023 [US2] Add full lifecycle assertions to `tests/state.test.js` for ordered help and repeated help IDs, no completion from solutions, valid wrong retries, duplicate success, frozen assistance, invalid/unsolved Next, summaries after rounds two/four/six, restart cancel/confirm and a fresh initialized session; expected progress totals must be independent of reducer output.

### Implementation for User Story 2

- [X] T024 [US2] Extend assistance transitions in `engine/state.js` using [data-model.md — `RoundProgress.assistanceIds`, `RoundProgress.assistedAtCompletion`](data-model.md#session-state-and-lifecycle) and [data-model.md — `HelpItem.id`, `HelpItem.kind`, `HelpItem.text`](data-model.md#choice-and-help); retain readable revealed help after success without revealing new help that changes completed assistance history, and pass T023 assistance cases.
- [X] T025 [US2] Extend explicit navigation, level/session summaries and restart-confirmation transitions in `engine/state.js` using [data-model.md — `Session.view`, `RoundProgress.attempts`, `RoundProgress.completed`, `RoundProgress.assistanceIds`, `RoundProgress.assistedAtCompletion`](data-model.md#session-state-and-lifecycle); implement all allowed events in `contracts/interaction.md`, cancel without changing session data, and reset all current IDs, selections, inspected outputs, feedback and progress on confirmation. Pass the remaining T023 cases.
- [X] T026 [US2] Render ordered help, per-round assistance and level/session summaries in `ui/render.js` from T024–T025, distinguishing assisted/unassisted completion and valid attempts without a mastery claim or penalty; include final-level results in the final session summary.
- [X] T027 [US2] Wire help, explicit Next and named restart confirmation/Cancel/Confirm controls in `ui/controls.js`, and fresh-load initialization in `main.js`, following `contracts/interaction.md`; keep progress in memory with no persistence and preserve previously revealed help/feedback during inspection.
- [ ] T028 [US2] Run all state cases and the six-round help/navigation/restart/reload procedure from `specs/001-noc-ninja-training/quickstart.md`; record AC5–AC8 and AC14–AC16 with observed progress totals in `specs/001-noc-ninja-training/verification.md` and fix discrepancies before completion.

**Checkpoint**: Session behavior passes independently in the runner and through the integrated UI.
The six-round curriculum is complete; accessibility and final trust/release reviews remain required.

## Phase 5: User Story 3 — Play with accessible controls and evidence (Priority: P1)

**Goal**: Make every decision and session control available without depending on pointer, color or motion.
**Independent test**: Use keyboard only for all controls and six rounds; review announcements,
focus, both specified viewports and reduced motion using the quickstart procedure (AC9–AC10, AC17–AC18).

### Tests for User Story 3

- [X] T029 [US3] Define reproducible keyboard/focus/announcement, narrow-evidence-scroll and reduced-motion checks in `specs/001-noc-ninja-training/verification.md`, naming the required control sequences, expected focus destinations and actual browser/screen-reader pairing fields; record initial failures or Not run before applying accessibility refinements.

### Implementation for User Story 3

- [X] T030 [P] [US3] Implement the ninja-themed NOC workstation layout in `style.css` with readable non-color status cues, visible focus and labeled technical-data scrolling that leaves actions usable at the quickstart viewports; honor reduced motion and use static history without introducing optional playback work.
- [X] T031 [P] [US3] Complete semantic presentation in `index.html` and `ui/render.js`: native fieldset/legend/radios, named evidence regions, visible text equivalents for topology, accessible headings and one persistent polite feedback status region; preserve all evidence without hover and avoid recreating/announcing the terminal on selection changes.
- [X] T032 [US3] Complete focus management in `ui/controls.js`: new-view focus, invalid-input guidance, stable retry focus, accessible restart dialog containment, Escape/Cancel and focus return; preserve native radio behavior and never delay controls for animation. Depends on T031 and the US2 controls.
- [ ] T033 [US3] Execute T029 checks and a full keyboard-only six-round playthrough from `specs/001-noc-ninja-training/quickstart.md`; record exact environments, announcements, both viewport results, reduced-motion behavior, AC9–AC10/AC17–AC18 and SC-004/SC-005 in `specs/001-noc-ninja-training/verification.md`; fix observed defects and retain honest Not run entries for unavailable environments.

**Checkpoint**: Every core control and essential value is usable through the required access paths.
Static history satisfies the optional-playback condition without adding animation.

## Phase 6: User Story 4 — Trust the teaching content (Priority: P1)

**Goal**: Demonstrate that supported content is consistent, defects cannot be graded, and recovery is safe.
The preventive gate already exists in Phase 2; this phase verifies it end to end and completes recovery.
**Independent test**: Load a reviewed valid document and each defective variant, check the whole-game
availability error and unchanged progress, then correct/retry; independently review all six rounds (AC19–AC21).

### Tests for User Story 4

- [X] T034 [P] [US4] Extend `tests/content.test.js` with semantic/adversarial cases for one pending round among five reviewed rounds, stale source/output/round reviews after a document revision change, a round revision differing from the document revision, continued rejection until every required review matches, review-bookkeeping updates that do not force another revision, generic sources posing as exact support, inconsistent target/output mappings, duplicate correct meanings, valid unsupported-cause distractors, null/low optical readings, incomplete/conflicting history and invalid load outcomes; verify zero playable content on failures and source/schema checks remain distinct from human review.

### Implementation for User Story 4

- [X] T035 [US4] Complete Retry loading and located availability-error recovery in `main.js`, `ui/render.js`, and `ui/controls.js` under `contracts/content.md` and `contracts/interaction.md`; preserve the Phase 2 gate, never create progress from a failed load, and create a fresh session only after corrected content passes. Exercise transport/HTTP/JSON/schema/source failures and fix any T034 failures in `engine/content.js` or `engine/rules.js` without relaxing review requirements.
- [X] T036 [P] [US4] Independently audit `data/levels.json` against the three evidence review files and `specs/001-noc-ninja-training/evidence/colorchip-reference.md`; record command-to-observation mappings, all 20 exact limits, U5-confirmed units/no-light interpretation and scenario applicability, expected diagnoses, every briefing/choice/help explanation, content revisions and reviewer/date in `specs/001-noc-ninja-training/evidence/curriculum-review.md`. Check fictional labels throughout and re-review any corrected content; this audit must not merely trust authored review flags.
- [X] T037 [US4] Demonstrate content/logic separation with a temporary same-mechanic replacement round fixture in `tests/content.test.js`, preserving the whole-document shape and existing screen/rule paths; verify a valid replacement needs no evaluator or screen change, an unreviewed replacement fails, and test fixtures cannot enter `data/levels.json` as certified content.
- [ ] T038 [US4] Run the valid/defective/recovered-load procedure and a clean static-only six-round session from `specs/001-noc-ninja-training/quickstart.md`; inspect network activity for external grading/equipment dependencies, verify deterministic repeated results, and record AC19–AC21 plus SC-007 in `specs/001-noc-ninja-training/verification.md` with the T036 audit linked.

**Checkpoint**: Source audit, content rejection and corrected-load recovery have recorded evidence.
Incomplete technical support remains an open task and cannot be reported as a completed release.

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Complete the reproducible handoff and acceptance evidence for the agreed scope.

- [X] T039 Update `README.md` to describe actual game behavior, Python static-server and browser-test commands, supported file layout, exact modeled topology/EOS/optic selection, source links, authored flapping threshold, exclusions, memory-only reset behavior and limitations; link `specs/001-noc-ninja-training/verification.md` and distinguish pending results from passes.
- [ ] T040 Run `tests/index.html`, the fresh-start playthrough and repository-subpath check from `specs/001-noc-ninja-training/quickstart.md` on available target browsers; record nonzero test counts, failures, console/resource errors, responsiveness and exact OS/browser/revisions in `specs/001-noc-ninja-training/verification.md`, and fix failures before rerunning affected checks.
- [ ] T041 Conduct the representative new-NOC-engineer completion/learning review and another-attendee README handoff from `specs/001-noc-ninja-training/quickstart.md`; record actual duration, assistance, explanation of all three diagnostic methods and causal limits, and SC-001/SC-006/SC-008 results in `specs/001-noc-ninja-training/verification.md`. If participants are unavailable, retain Not run and leave the task incomplete.
- [ ] T042 Audit the final AC1–AC22/SC-001–SC-008 evidence and C1–C7 alignment across `specs/001-noc-ninja-training/spec.md`, `specs/001-noc-ninja-training/plan.md`, `specs/001-noc-ninja-training/tasks.md`, and `README.md`; record AC22 in `specs/001-noc-ninja-training/verification.md`, resolve contradictions and rerun affected checks. Mark release complete only when all required cases pass; no deployment or commit is implied.

## Dependencies & Execution Order

### Phase dependencies

```text
Setup T001–T003
  └─ Foundation T004–T012
       ├─ US1 engineering T013, T018–T021
       ├─ US1 evidence T014 / T015 / T016 → content T017
       │    └─ engineering + content → US1 acceptance T022 (MVP)
       ├─ US2 state tests/implementation T023–T025 (after T020)
       │    └─ US1 UI + T025 → T026–T028
       ├─ US3 preparation/style T029–T030
       │    └─ US1 + US2 UI → T031–T033
       └─ US4 negative tests T034
            ├─ US1 + US2 UI → recovery T035
            └─ T017 → audit T036 → T037–T038
All four accepted stories → final verification T039–T042
```

All stories are P1. Default integrated completion order is US1 → US2 → US3 → US4 → final
verification. Shared rule/source protections are deliberately implemented before any story,
not deferred until the trust story. US2 can be tested in isolation using event sequences;
US3 can inspect controls/layout independently; US4 can exercise defective fixtures independently.
Their integrated acceptance runs still require the reviewed curriculum and relevant UI.

Within Foundation, T004 and T005 are independent. T006–T009 edit the same validator and are
sequential; T010 follows T004 and those domain definitions; T011 follows T010 and all structural
validation; T012 follows T011. Do not import the loader into the pure evaluator or create a cycle.

Within US1, T013–T016 can overlap. T017 requires T014–T016; T018 follows T013 and can overlap
T017. T019 follows T018; T020 follows T013; T021 requires T019–T020; T022 requires T017–T021.
Within US2, T023 → T024 → T025 → T026 → T027 → T028. Within US3, T029 precedes the refinements;
T030 and T031 can overlap, then T032 and T033. Within US4, T034 precedes T035/T037; T036 can
overlap T035 after T017, and T038 requires T035–T037. Final tasks run in numbered order.

### Parallel examples per user story

| Story | Safe concurrent work | Prerequisite / restriction |
| --- | --- | --- |
| US1 | T013 independent tests; T014 release/platform review; T015 optic review; T016 output review | Foundation complete; each owns separate files. Later T017 content and T018 feedback can overlap after their own dependencies. |
| US2 | T024–T025 state work alongside US1 T017 content preparation | T020 and T023 complete; separate `engine/state.js` and `data/levels.json`. US2 UI and acceptance wait for US1 integration. No parallel edits within the state file. |
| US3 | T030 layout and T031 semantic rendering | T029 and US1/US2 controls/views ready; `style.css` versus `index.html`/`ui/render.js`. |
| US4 | T035 error recovery and T036 independent curriculum audit | T034 and T017 complete; runtime files versus `evidence/curriculum-review.md`. Queue audit-driven content fixes to avoid simultaneous edits. |

Do not concurrently edit `ui/render.js`, `ui/controls.js`, `main.js`, `engine/content.js`, test
files, `data/levels.json`, or the shared verification record across stories. `[P]` describes
possible scheduling; it does not request autonomous sub-agents or authorize external actions.

## Implementation Strategy

1. Run cross-artifact analysis before implementation, as required by the constitution.
2. Complete Setup/Foundation, then prove rules with independent test-only cases while evidence
   preparation proceeds. A validator failure is expected for incomplete source material.
3. Deliver **US1 as the MVP**: one reviewed diagnostic journey from briefing through retry and
   explanation, with all six rounds validated before the application opens. Do not loosen the
   curriculum gate to demo one round. Evidence preparation may determine this milestone's timing.
4. Add US2 and verify full-session lifecycle; complete US3 access checks and US4 independent
   source/error/recovery review. Each milestone keeps earlier checks passing.
5. Complete the README, actual browser checks, learner review and acceptance ledger. Record
   missing environments/evidence/participants honestly and leave dependent tasks incomplete.

This list creates no additional mechanics, runtime AI, backend, persistent storage, package
pipeline, optional animation, hosting deployment, or configuration-changing gameplay. The
60-minute workshop budget does not waive evidence or acceptance checks; any scope change must
be explicit and reflected in the governing documents.

## Acceptance Coverage

| Criteria | Primary implementation / evidence tasks |
| --- | --- |
| AC1–AC4, AC11–AC13; SC-002 | T004, T006–T022 |
| AC5–AC8, AC14–AC16; SC-003 | T020, T023–T028 |
| AC9–AC10, AC17–AC18; SC-004–SC-005 | T019, T027, T029–T033 |
| AC19–AC21; SC-007 | T005–T012, T014–T017, T034–T038 |
| AC22; SC-008 | T003, T039–T042 |
| SC-001, SC-006 | T041 |

Checked tasks reflect completed engineering/source-to-simulation review and automated checks.
Open tasks retain the full browser, accessibility, learner and release obligations described in
[verification.md](verification.md). A working build is not a completed release or deployment.

## Owner-requested redesign — current implementation tasks

The owner corrected the mechanic on 2026-11-17: discover which of three problem categories is
present, using mixed incidents; make diagnosis submission a graphical shuriken throw. This
supersedes conflicting details of historical tasks above, without closing outstanding manual checks.

- [X] T043 [US1] Amend `.specify/memory/constitution.md`, `spec.md`, `plan.md` and contracts for mixed investigations, all-method evidence, category-only answers and direct six-incident progression.
- [X] T044 [US1] Author six interleaved cases in `data/levels.json`, preserving deployment and optical limits, giving both switches identical tools, and recording independently derived results in `evidence/mixed-incident-review.md`.
- [X] T045 [US4] Implement schema 2 and all-method evaluation in `engine/content.js` and `engine/rules.js`; reject old answer-routing keys, incomplete/contradictory evidence and ambiguous findings; verify actual displayed counter/Rx values.
- [X] T046 [US2] Update `engine/state.js` for one briefing and direct explicit Next through six mixed incidents; preserve invalid-input behavior, safe retries, ordered assistance, duplicate-success prevention and restart.
- [X] T047 [US3] Build graphical dojo, labeled native radio targets, deliberate shuriken submission, static impact feedback, optical gauges and uniform investigation console in `ui/`, `style.css`, `main.js` and `index.html`; keep motion decorative and reduced-motion equivalent.
- [X] T048 [US1] Revise `engine/feedback.js` and independent tests for category diagnosis, derived receiving endpoint, absent/degraded distinction and wrong-category guidance; run the complete automated suite.
- [X] T049 [US4] Align README, quickstart, research status and verification with the current build; rerun consistency/syntax/whitespace checks and retain browser limitations explicitly.
- [ ] T050 [US3] Follow `quickstart.md` to observe all six incidents, wrong retry, every tool, hints, target/throw interaction, restart, keyboard focus, announcements, 1366×768 and 375×812 layouts and reduced motion in a browser. Browser/native control is unavailable; do not infer these results from Node tests. Original representative-learner checks also remain open.

- [X] T051 Apply the owner's switch-name and /126 update across `data/levels.json`, `engine/content.js`, `ui/render.js`, fixture identities, README, specifications and sanitized source aliases. Use leaf-gw1 / 2001:db8:51::1/126 and spine-gw1 / 2001:db8:51::2/126. Verify all six mappings and CLI prompts, matching source/review revision, the existing 103 checks, and rejection of the wrong deployment prefix.

- [X] T052 [US1] Replace abbreviated interface excerpts with full U6 layouts for both endpoints and both snapshots in `data/levels.json`; preserve platform differences, fictional MACs, peer descriptions and timeline-consistent state ages, link-change totals, traffic/error counters and clear ages. Record sources in `evidence/full-interface-samples.md`, align specs/plans, and run `tests/interface-output.test.js` with the existing suite. All 109 checks pass; browser verification remains in T050.

- [X] T053 [US1] Replace the Error snapshots command display with paired counters-errors tables; restore full MAC state/fault rows and separately inspectable historical captures; add the supplied port-status format while retaining full interface detail. Update U7 sources, data model, validation, tests, specifications and plans. All 115 checks pass; current browser controls/layout remain pending in T050.

- [X] T054 Align all four MAC Last Change ages for stable-up authored histories in `data/levels.json`, including earlier snapshots. Preserve down/flapping event ages, change totals and fault states; record the fixture convention in data-model/U7 review notes. Verified 16 updated snapshots, 15 preserved snapshots and 115 passing checks.

- [X] T055 Reconcile every current/historical command example with one shared link timeline in `data/levels.json`. Validate endpoint state, Up/Down duration, MAC event ages, system clocks and change increments in `engine/timeline.js`; count identical paired flap histories once in evaluation and feedback. Update constitution/spec/plan/contracts and add `tests/link-timeline.test.js`. All 126 automated checks pass; T050 remains open.

- [X] T056 Incorporate U8 paired down-link evidence: distinguish Interface State from directional PHY/fault rows, maintain independent MAC row event clocks, and separate full-interface counts since clear from MAC totals. Adapt both optical examples, feedback, validation and regression tests; correct constitution/spec/plan/contracts. All 130 checks pass; browser checks remain in T050.

- [X] T057 Align cleared Remote Fault Last Change ages and supporting change histories throughout both flap cases; give leaf and spine distinct transceiver profiles without altering intended Rx faults. Update specifications, plans and content review; verify all 133 automated checks.

- [X] T058 Generate and locally save original ninja/shuriken sprites; implement mouse/touch/pen drag aiming with cancellation, keyboard equivalents and decorative projectile.
- [X] T059 Implement U9 technician destinations from CRC direction, Remote Fault current/history and Tx alarms; author corroborating cases, Tx observations and matched CLI outputs; preserve one primary diagnosis and fail closed on conflicting destinations.
- [X] T060 Update constitution/spec/plan/contracts/source review and validate 144 automated checks plus isolated Chrome desktop/mobile interaction checks. Representative learner and screen-reader acceptance remain separate.
- [X] T061 Read the owner's linked skill, platform index and Arista procedure; document source/version gaps and map the safe educational adaptation.
- [X] T062 Add guided patrol with both-end evidence coverage, computed reasoning questions, misconception feedback, guarded advancement and separate attempt accounting.
- [X] T063 Add local text handoffs with literal evidence, uncertainty and verification steps; retain downloads in the final review.
- [X] T064 Reconcile spec/plan/interaction/README and run 163 automated checks, module syntax checks and whitespace review.
- [ ] T065 Accept the guided UI in a fresh browser: keyboard, report download, narrow viewport, reduced motion and representative learner review. Browser connector unavailable and native Safari in active use; see evidence/skill-adaptation.md.

- [X] T066 Reconcile owner-authorized real-case scope with constitution 1.4.0, source reviews and spec.
- [X] T067 Preserve U10–U12 in versioned JSON; validate inventory, literal evidence, reviewed questions and outcome confidence.
- [X] T068 Add playable real patrol with evidence panels, 15 decisions, safe retries/hints, gated outcomes, summary and downloads.
- [X] T069 Preserve original dojo progress and restart semantics; verify 191 checks including exact source fidelity and every distractor.
- [ ] T070 Complete fresh-browser keyboard, narrow-layout, screen-reader and download-click acceptance for real patrol. Browser connector unavailable; native browser attempt stalled/interrupted. See evidence/real-case-integration.md.


## Single guided patrol — owner correction, 2026-11-18

- [X] T071 Amend current scope and constitution 1.5.0: only supplied incident captures, one guided patrol, no learner-facing sanitization copy.
- [X] T072 Remove simulated datasets, threshold/dispatch classifier, alternate-mode paths and obsolete tests. Load only validated U10–U12.
- [X] T073 Integrate briefing, both-end evidence notebook, fifteen decisions, shuriken submission, hints, retry feedback, gated outcomes, verification steps and handoffs into the sole patrol.
- [X] T074 Verify 39 Node checks including every distractor and capture fidelity; add Safari DOM/control checks; update assets' cache revisions, README and collection guidance.
- [ ] T075 Complete Safari DOM/control suite, fresh visual playthrough, keyboard/screen-reader review, narrow layout and download-click acceptance. Safari input was interrupted by user activity; old cached screens were observed, not accepted as new-build verification.

T050/T065/T070 are historical requirements for retired flows; T075 tracks current browser acceptance.

- [X] T076 Remove below-circle captions, radio selectors and separate Throw button; require shuriken pickup/drop with circular hit testing, cancellation and keyboard drag equivalent. All 42 Node checks pass; browser UI tests updated, Safari visual review remains pending after concurrent browser activity interrupted preview.

- [X] T077 Apply the owner’s standing exclusion of intentional transmitter disable across briefing, U10 questions/feedback, authoring instructions and future-example guidance; preserve all captured readings.

## Recorded command investigations — 2026-11-18

- [X] T078 Review Arista check-interface-health as an authoring reference; document workflow adaptation and corrections to generic optical guidance in capture-collection-guide.md and guided-patrol.md.
- [X] T079 Add finite endpoint/command/observation selection, literal replay, explicit summary/missing states, request history and gated after-repair inspection. Preserve all existing evidence and shuriken decisions.
- [X] T080 Add case-specific command hints, capture priorities, exact collection lists and handoff capture manifests; support source-checked future recordings without generated readings.
- [X] T081 Verify 49/49 Node and 55/55 Safari browser checks, capture fidelity, native selection/history, missing-output rendering and desktop workbench appearance.
- [ ] T082 Finish current narrow-layout, full manual keyboard/screen-reader playthrough and download-click acceptance. T075's DOM/control portion is now satisfied; other manual checks remain open after browser activity interrupted further inspection.

## Four commands and the DMZ case — owner update

- [X] T083 Restrict the catalog, hints and collection guide to per-interface status, transceiver, MAC detail and counters errors; remove full detail and the three requested trailing options.
- [X] T084 Preserve U13's 14 raw command captures, original prompts/units/categories and repeat samples; support unknown inventory and absence of a script assessment without manufacturing either.
- [X] T085 Add five reviewed U13 decisions covering direction, PHY/interface distinctions, zero errors, 41s/39s MAC intervals and recommended spine optic replacement; keep repair confirmation separate.
- [X] T086 Verify 53/53 Node checks and 60/60 Safari checks; align four-case/twenty-decision totals, optional diagnosis review, exact scoped commands, source fidelity and collection documentation. Remaining manual acceptance is tracked by T082.

## Start afresh with U13 only — owner correction

- [X] T087 Remove U10–U12 from the playable data, progression and active collection guidance; retain their source records as explicitly archived history. Show one incident and five decisions.
- [X] T088 Record the owner's confirmed spine optic replacement and link recovery; preserve all 14 captures and leave numerical recovery measurements and concurrent fiber work unspecified.
- [X] T089 Adapt regression tests to the sole active case, verify 42/42 Node and 49/49 Safari checks, and observe the single-case opening screen in Safari. Four-command selection, drag answers, gated outcome and handoff remain intact. T082 still tracks remaining manual acceptance.


### U14 addition — completed 2026-11-18

- [x] Add 14 literal leaf/spine captures, supplied inventory and confirmed spine-optic repair outcome.
- [x] Add four decisions covering replacement, current state versus health, increasing errors, and paired fault-count increases.
- [x] Preserve the supplied senz error-table prompt with narrowly validated alias support.
- [x] Verify U13 remains unchanged; check two-case progression, evidence gating, reports and reset.
- [x] Validate 45/45 Node checks and 52/52 Safari checks; return the existing game tab to the two-incident patrol.


### U15 addition — completed 2026-11-19

- [x] Preserve the supplied 7508N/7050SX3 inventory, 403B optics and all 12 interface recordings in the source record and case data.
- [x] Add four standalone questions with leaf-first replacement, inter-lane bias interpretation, unchanged MAC histories/missing leaf counters and the exact AND condition for spine replacement.
- [x] Support absent error recordings and the supplied `show int` abbreviation; retain strict host/port/command matching and evidence/outcome gates.
- [x] Verify all three cases, every distractor, exact source fidelity, conditional escalation, missing recordings, diagnosis review and handoffs: 52/52 Node and 61/61 Safari checks.
- [x] Align current scope, README, collection guide, Arcade totals and rendered listing card; inspect the U15 layout in Safari. Manual acceptance still tracked by T082.


### Bias current variance clarification — completed 2026-11-19

- [x] Define the highest-minus-lowest lane range, show the 36.02 mA calculation and operator-supplied 10–20 mA comparison before the relevant questions; align hints, answers, feedback and handoffs.
- [x] Retain leaf-first replacement and require both unresolved link failure and persistent high bias current variance between lanes before considering the spine-gw1 optic.
- [x] Verify 52/52 Node and 61/61 Safari checks on guided-v19, including teaching context before submission and unchanged literal captures.


### Current-document and Arcade reconciliation — completed 2026-11-19

- [x] Verify `index.html`/host root opens the player briefing directly; `/tests/` is a separate developer runner with no game import or redirect.
- [x] Synchronize both ARCADE files with three cases, twelve decisions, forty captures, current revisions, operator-scoped variance teaching and explicit public launch instructions.
- [x] Replace active synthetic spec/plan/constitution text with the current build; retain original documents in `history/`. Constitution 1.6.0 preserves C1–C7 and records the expanded scope.
- [x] Synchronize StarterKit SPEC/CONSTITUTION/PLAN with governing documents; review counts, inventory, outcomes, gates, input, missing data and publication requirements against code/data.
- [ ] Verify the actual hosted Arcade Play target after a hosting URL exists. Existing manual acceptance gaps remain open.


### Complete U15 counters and enforce future intake — 2026-11-19

- [x] Preserve both owner-supplied leaf zero-counter tables in the U15 source and playable data; update its question, hint, feedback, handoff and count to 14 recordings (42 overall).
- [x] Require one status plus incident/follow-up transceiver, MAC and error recordings at each endpoint; reject every required omission and test all 42 removal cases.
- [x] Record the owner's ask-and-wait intake rule in AGENTS.md, constitution 1.7.0, spec, plan, content contract, collection guide and both ARCADE copies.
- [x] Preserve the command-specific U14 prompt and the simplified homepage; refresh current content/cache revisions.
- [x] Verify 53/53 Node and 62/62 Safari checks on guided-v20, return preview to the game briefing and synchronize the final handoff documents.

## Publishing handoff — 2026-11-19

- [x] Add local Himeji Castle arena and quiz-only Fuji/red maple page artwork.
- [x] Enlarge ninja, retain target clearance and make incident badge/capture notes opaque.
- [x] Reconcile constitution 1.7.1, spec, plan, ARCADE and StarterKit mirrors.
- [x] Rerun Node (53/53) and Safari (62/62); leave preview at game briefing.
- [ ] Publisher: configure hosted URL and complete hosted/manual acceptance already listed above.
