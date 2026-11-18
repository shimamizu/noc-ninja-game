# Feature Specification: NOC Ninja — Mixed Incident Dojo

**Branch:** main · **Created / amended:** 2026-11-17
**Status:** Revised to the owner's gameplay correction; implemented, browser acceptance pending.
**Governance:** [Constitution 1.3.0](../../.specify/memory/constitution.md).
**Original input:** [StarterKit/SPEC.md](../../StarterKit/SPEC.md).

The engineer investigates six mixed incidents and identifies whether each is a light-level,
CRC/error, or link-flapping problem. These are competing diagnoses, not sequential lesson levels.
Every incident offers the same tools at both switches. After inspecting evidence, the player aims
at a labeled target and explicitly throws a shuriken. There is no reflex or precision requirement.

## Owner clarifications

- Replace category-specific lessons and repeated same-category questions with mixed investigations.
- Add graphical, traditional-game presentation and shuriken answer targets.
- Preserve the selected 100G single-mode fiber deployment in D-001 below.
- Owner naming/address update: DCS-7050SX3-48YC8 is leaf-gw1; DCS-7808-CH is spine-gw1.
  Use the shared 2001:db8:51::/126 link, with ::1 on leaf-gw1 and ::2 on spine-gw1.
- The owner confirmed the latest working Et3/15/1 samples came from that exact spine-gw1 setup.
- Preserve all supplied ColorChip thresholds and units. −30 dBm is no light; below low alarm is
  very bad light, without necessarily being absent. CWDM4 from the supplied model reference is
  authoritative over the earlier informal LR4 description.
- Only fictional device names may appear. Source samples remain sanitized.

## User stories and acceptance criteria

### US1 — Investigate and diagnose (P1)

As a new NOC engineer, I inspect all relevant evidence and decide which of three problem
categories it supports. I learn from an explanation tied to the measurements.

- **AC1:** One opening briefing teaches all three methods, terminology, and a distinct worked
  example before the first incident. No per-category briefing announces the next answer.
- **AC2:** For operational-down with four −30 dBm Rx rows, selecting Light levels and throwing
  completes the incident; feedback identifies the receiving interface and absent light.
- **AC3:** A wrong category records one throw, explains the unsupported reasoning using its
  measurements, and keeps the same incident retryable. It never awards progress.
- **AC4:** Empty, malformed, or unknown selections give guidance without counting a throw.
- **AC11:** Both endpoints always expose Interface now, Port status, Optics, Error snapshots, and MAC / history.
  Topology, IPv6 context, units, timestamps, counter pairs, and history window are available.
  Inspecting a tool or aiming at a target never submits or advances.
- **AC12:** All six independent cases below and boundary cases match their expected diagnoses.
  Choice labels/order and incident titles cannot determine correctness.
- **AC13:** Wrong feedback gives a useful next step; correct feedback names the condition and
  affected endpoint. Neither claims repair, IPv6 connectivity, or a proven failed component.

- **AC23:** Both current and earlier interface snapshots retain the complete supplied field set:
  hardware/MAC, peer description, MTU/MRU, duplex/uni-link, state age, link-change total,
  counter-clear age, rates, packets/bytes, broadcast/multicast, runts/giants, errors/discards,
  collisions and PAUSE. Preserve each platform's layout. Ages, changes and counters must agree
  with the incident's timed evidence; fields must not be shortened to only diagnostic clues.

- **AC24:** Error snapshots show paired `show interfaces … counters errors` tables with all
  seven error columns. MAC / history shows system time and all four rows with Current State,
  Changes and Last Change; earlier snapshots remain inspectable separately. Port status uses
  the supplied table format. FCS must match graded CRC/FCS observations; an Rx/runts increase
  must not be called an FCS increase. Fault flags describe direction, not proven failed components.

### US2 — Practice safely and finish (P1)

- **AC5:** Help reveals method, worked step, then solution; each records assistance without a throw
  or completion. Reopening a hint does not duplicate assistance.
- **AC6:** Each valid throw while unsolved counts once. Success completes once. Repeated submission
  after success changes neither attempts, completion, nor assistance.
- **AC7:** Explicit Next advances a solved incident directly to the next mixed incident. No
  intermediate category summary or briefing occurs. After incident six, Finish opens the summary.
- **AC8:** Restart opens confirmation. Confirm clears all state and returns to the opening briefing;
  Cancel and Escape preserve the session.
- **AC14:** Reload starts a fresh session; no progress survives page reload.
- **AC15:** Completion, throws, assisted completion and unassisted completion are separate measures.
  Assisted completion is not independent mastery; neither completion measure certifies mastery.
- **AC16:** No timer, lives, points, streak, leaderboard, speed rewards, or retry/help penalties.

### US3 — Aim and throw accessibly (P1)

- **AC9:** Endpoint/tool inspection, target aiming, Throw, hints, Next and Restart are keyboard
  operable, visibly focused, and named. Native radio arrows choose a target; Throw submits.
- **AC10:** Feedback is persistent text and announced. Motion never delays controls or evaluation.
- **AC17:** At 1366 × 768 and 375 × 812, evidence and actions remain available. Dense output scrolls
  in a labeled region. Diagrams/gauges have text equivalents; no essential value requires hover.
- **AC18:** A decorative shuriken travels toward the selected target on a valid throw. A static
  impact mark and feedback retain meaning with reduced motion, which disables the projectile.
  Selection alone never launches; correctness is not determined by animation position or timing.

### US4 — Trust the evidence (P1)

- **AC19:** Missing/unreviewed evidence, contradictory tool states, or zero/multiple supported
  independent diagnoses disable grading (identical paired flap histories count once) with a content error, never a learner penalty.
- **AC20:** Sources identify exact supported claims and deployment applicability. Simulations are
  labeled; displayed values, observations, hints and explanations agree. Source review does not
  claim independent hardware qualification. See the [mixed review](evidence/mixed-incident-review.md).
- **AC21:** Six incidents play using static files only, with no account, live device, external
  content service, or AI grading. Same observations and answer always yield the same result.
- **AC22:** Record pass/fail/not-run with date and environment. README describes the actual game
  and how to run it. Release completion requires all acceptance checks, including manual ones.

## Independent authored cases

Each case includes all tools for both endpoints. Other evidence does not support another category.
The sequence is fixed and interleaved; neutral incident titles do not name the fault.

| Incident | Decisive evidence | Target | Expected feedback |
| --- | --- | --- | --- |
| L1-R1 | leaf-gw1 CRC 900→900; spine-gw1 5→17, both up; normal Rx, stable history | CRC / errors | spine-gw1 gained 12 errors in 60s |
| L1-R2 | leaf-gw1 down; four Rx rows −30 dBm; unchanged CRC and stable down history | Light levels | leaf-gw1 absent receive light |
| L2-R1 | Both endpoints initially down; up at 5s, down 15s, up 35s, down 55s; normal Rx, spine FCS 0→12 | Link flapping | Four changes, ending down; replace leaf optic |
| L2-R2 | leaf-gw1 CRC 120→145, up; spine-gw1 2400→2400; normal Rx, stable history | CRC / errors | leaf-gw1 gained 25; old peer total is irrelevant |
| L3-R1 | spine-gw1 down; Rx −17.20, −16.80, −17.00, −16.90 dBm; leaf Tx below −9.00; no CRC increase or transitions | Light levels | Bad Tx at leaf and degraded Rx at spine; replace leaf optic |
| L3-R2 | Both endpoints initially up; down 10s, up 20s, down 40s, up 60s; normal Rx, leaf Remote Fault asserts during down intervals | Link flapping | Four changes, ending up; replace leaf optic |

Boundary checks include same-state reports, inclusive history boundaries, out-of-window events,
unchanged high counters, invalid/decreasing counters, resets, incomplete evidence, mismatched
endpoint references, conflicting current states, absent vs degraded light, invalid input, and
ambiguous diagnoses. Exact low-alarm equality is not “below”; this is not a general alarm classifier.

## Functional requirements

- **FR-001:** Six authored mixed incidents, two per neutral content group, all requiring success.
- **FR-002:** Teach all three diagnostic methods before the first incident.
- **FR-003:** Show the specified two-switch topology; aim at one category, explicitly throw.
- **FR-004:** Offer identical tool sets at both endpoints in every incident; retain all evidence.
- **FR-005:** Derive light issues from the selected optic's supplied Rx interpretation. Four −30
  readings support absent receive light; values below −15.70 support very bad light. Show state.
- **FR-006:** Derive CRC issues from a positive same-interface delta with up states and no reset.
- **FR-007:** Derive flapping from ≥4 actual changes inside an inclusive 60-second window; disclose
  that this is a teaching threshold, not a universal EOS definition.
- **FR-008:** Evaluate all three methods at both endpoints, requiring exactly one supported
  diagnosis; matching paired flap histories count once. No conditionType, targetInterfaceId, title, choice index, or correct-answer flag selects it.
- **FR-009:** Explain the chosen diagnosis using computed values, with no unsupported causal claim.
- **FR-010:** Safe retry, invalid-input guidance, one completion, and no duplicate scoring.
- **FR-011:** Ordered assistance remains separate from submission and completion.
- **FR-012:** Final summary distinguishes completion, throws, and assistance.
- **FR-013:** Direct explicit Next between mixed incidents; final summary after six successes.
- **FR-014:** Confirmed restart resets; Cancel preserves; reload starts fresh.
- **FR-015:** No penalties or speed/score mechanics.
- **FR-016:** Keyboard controls, meaningful names, and visible focus.
- **FR-017:** Text/announcement equivalents; reduced motion; immediate feedback and controls.
- **FR-018:** Usable laptop and narrow layouts, internally scrolling dense evidence.
- **FR-019:** Graphical night dojo, ninja, three labeled targets, deliberate shuriken throw,
  switch topology and investigation console. Graphics illustrate, never alter, the diagnosis.
- **FR-020:** Preserve D-001 hardware/software and source applicability; authored faults are not captures.
- **FR-021:** Whole-document validation prevents grading unsupported or inconsistent content.
- **FR-022:** Native static frontend; no backend, external grading, account, or runtime AI.
- **FR-023:** Document simplifications, source limits and actual acceptance results.

- **FR-024:** Use complete platform-specific interface output in every snapshot. Preserve the
  supplied leaf MTU 9214/uni-link n/a format and spine MTU 10218/MRU 10240/uni-link disabled
  format. Include non-diagnostic background fields, while keeping all values consistent with
  observed state, counter pairs and history. Fictional MACs and authored measurements are labeled
  as simulation. Source layouts are recorded in full-interface-samples.md. (AC23)

- **FR-025:** Use the supplied counters-errors, MAC-detail and status command layouts (U7).
  Keep full interface detail available. Explicitly pair earlier/later error-command outputs;
  separate authored timeline aids from CLI text. Keep per-column counters and MAC row times
  consistent with the observations and distinguish receive-path evidence from component cause. (AC24)

- **FR-026 / AC25:** All authored command snapshots share one link timeline. At the same observation time, both endpoints show matching Interface State, Up/Down duration and MAC Interface State Last Change ages. Stable-up histories align all four MAC rows. Down/flapping histories retain independent PHY and fault events at each endpoint; PHY up does not imply Interface State up. Compare absolute event times when snapshot clocks differ. Reconcile system timestamps, full interface output, port status, counters and historical MAC snapshots. Matching flaps at both ends count once. Device-local counter-clear ages and accumulated totals may differ; full-interface counts since clear are independent of MAC row totals.

- **FR-027 / AC26:** In the authored flapping examples, Remote Fault False has the same Last Change age as the shared link event in every current and historical snapshot. Supporting fault-change totals must remain temporally consistent. Give both endpoints distinct transceiver profiles, with matching displayed/structured Rx values; preserve the intended absent/degraded readings and all supplied thresholds.

- **FR-028 / AC27:** Drag the ninja using mouse, pen or touch. Highlight the answer under it and show the aiming line. Release on a target selects and submits exactly once. Off-target release, Escape and pointer cancellation produce no attempt. Retain click-to-aim, Throw and keyboard equivalents; solved incidents cannot throw again.
- **FR-029 / AC28:** After a correct diagnosis, show the technician destination, switch/port and optic, with evidence explaining U9. Support CRC→peer, down/Remote Fault True→same side, corroborated flapping, and alarm-level Tx→same side. Conflicting or insufficient clues block playable content. These are training replacement recommendations, not proven causes.
- **FR-030 / AC29:** Persist original transparent ninja/shuriken sprites locally. Compare structured Tx and Rx with displayed output. Four shared interface flaps take precedence over corroborating CRC; one bad transmitter and peer Rx form a single optical diagnosis.

## Success criteria

- **SC-001:** Representative learner completes in a target 5–10 minutes; timing is observed,
  never enforced. Record duration and assistance.
- **SC-002:** Every independent correct/wrong/boundary case agrees with the documented rules.
- **SC-003:** Retries, invalid input, repeated success, assistance and reset preserve honest progress.
- **SC-004:** Keyboard-only playthrough of all incidents and controls, including reduced motion.
- **SC-005:** Required values and actions remain usable at both specified viewport sizes.
- **SC-006:** A representative learner can explain the three methods and limits on inferred causes.
- **SC-007:** All six cases have reviewed support and invalid content blocks grading.
- **SC-008:** Every acceptance result is recorded; another attendee can run and complete the game.

## D-001 — Fixed deployment and boundaries

| Endpoint | Platform | EOS | Port |
| --- | --- | --- | --- |
| leaf-gw1 | DCS-7050SX3-48YC8 | 4.36.3M, 32-bit | Et51/1 |
| spine-gw1 | DCS-7808-CH, 7800R3-48CQ-LC in slot 3 | 4.36.3M, 64-bit | Et3/15/1 |

Both use `service routing protocols model multi-agent` and COLORCHIP C100Q020CWDM403B,
manufacturer “ColorChip ltd”, QSFP28 100G CWDM4, four lanes, over single-mode fiber. Preserve all
20 supplied optical limits and confirmed units. IPv6 is correctly configured context: leaf-gw1 uses `2001:db8:51::1/126` and spine-gw1
uses `2001:db8:51::2/126`. Counters
have no reset/rollover; complete history uses a shared authored UTC time basis.

The user confirmed the working spine-gw1 capture's source setup and subsequently supplied full
interface examples for both named switches. Each interface layout follows its own supplied
sample; leaf optics and MAC-history layouts remain explicit same-release adaptations. The evidence package distinguishes captures, user reference, authored
arithmetic and simulations; it does not claim independent hardware or vendor qualification.

No configuration changes, repairs, IPv6 faults, routing, VLANs, port channels, MLAG, spanning tree,
accounts, multiplayer, persistence, live CLI, or generated questions. The initial workshop scope
is extended by the owner's subsequent graphical/mixed-investigation request.
