# Feature Specification: NOC Ninja Training — First Playable

**Feature Branch**: `main` (existing branch; no branch-creation hook configured)

**Created**: 2026-11-17

**Status**: Draft — specification quality reviewed; technical evidence dependencies remain open

**Input**: User description: "Please reference the StarterKit/SPEC.md file for your specifications"

**Source**: [StarterKit specification](../../StarterKit/SPEC.md)

**Governance**: [Project constitution v1.0.0](../../.specify/memory/constitution.md)

A new network operations center (NOC) engineer investigates Ethernet link incidents at a
ninja-themed workstation. The learner inspects predefined Arista EOS evidence and identifies
an interface and its observed condition. Three sequential levels contain two rounds each.
Diagnosing an incident enables advancement; it does not repair the simulated link.

## Clarifications

### Session 2026-11-17

- Q: Should the game model specific Arista hardware you use, or should planning select a switch and optical transceiver with verifiable EOS 4.36.3M evidence? → A: Use DCS-7050SX3-48YC8 with EOS 4.36.3M (32-bit) on one side and DCS-7808-CH with EOS 4.36.3M (64-bit) on the other. Both use `service routing protocols model multi-agent`, not ribd. Both optics are vendor COLORCHIP, model C100Q020CWDM403B, described by the user as 100G LR4, over single-mode fiber. Exact compatibility and optical classification remain subject to source verification.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Make and understand a diagnosis (Priority: P1)

As a new NOC engineer, I want to inspect link evidence, choose a supported diagnosis, and
understand why it is correct or incorrect so I can improve my troubleshooting decisions.

**Why this priority**: Evidence-based diagnosis is the core learning activity in every round.

**Independent Test**: Play one reviewed round from briefing through an incorrect answer and
retry to a correct answer. Confirm that the feedback teaches the evidence-to-diagnosis rule.

**Acceptance Scenarios**:

1. **AC1 — Given** a fresh session, **When** the learner starts, **Then** the first briefing
   introduces its concept, terms, method, and a worked example distinct from the challenge
   before the learner can answer. Each subsequent level also starts with its own briefing.
2. **AC2 — Given** leaf-a selected 100G interface is administratively enabled, operationally down, and verified
   optical evidence establishes absent receive signal, **When** the learner submits that
   diagnosis for leaf-a selected 100G interface, **Then** the round completes, Next becomes available, and
   feedback identifies both observations without asserting a particular failed component.
3. **AC3 — Given** that evidence, **When** the learner submits "The cable has definitely failed,"
   **Then** feedback explains why the cause is unproven, one valid attempt is counted,
   completion stays unchanged, and the learner can retry the same round.
4. **AC4 — Given** no selection or a malformed or unavailable choice, **When** submitted,
   **Then** input guidance appears and attempts and completion remain unchanged.
5. **AC11 — Given** an available round, **When** the learner inspects command evidence,
   **Then** the labeled topology, endpoints, IPv6 context, timestamps, units, and applicable
   observation window and threshold are available; counter comparisons appear side by side,
   and previously inspected evidence remains accessible without submitting an answer.
6. **AC12 — Given** the six authored rounds and boundary cases below, **When** the learner
   submits the listed choices, **Then** each outcome and explanation matches its independently
   recorded expectation. Changing a choice's wording or display order does not change its meaning
   or the diagnosis accepted as correct.
7. **AC13 — Given** a wrong answer, **When** feedback appears, **Then** it names the specific
   reasoning mistake, relevant evidence, and useful next step. Correct feedback explains the
   supported diagnosis. Neither result claims the link was repaired or IPv6 connectivity proved.

---

### User Story 2 - Learn with help and finish the session (Priority: P1)

As a learner, I want penalty-free help and retries, clear progress, and a reliable end to the
session so I can practice without confusing assisted completion with independent mastery.

**Why this priority**: Safe practice and honest progress are required to complete the curriculum.

**Independent Test**: Use reviewed rounds to exercise hints, wrong answers, duplicate submission,
Next, completion, restart cancellation, confirmed restart, and reload; inspect progress after each.

**Acceptance Scenarios**:

1. **AC5 — Given** an unsolved round, **When** the learner asks for help, **Then** the first hint
   explains the method, further help offers a worked step and solution, and all help is recorded
   as assistance for that round. Help neither submits an answer nor completes the round.
2. **AC6 — Given** an unsolved round, **When** a valid answer is submitted, **Then** attempts
   increase once for that submission. A correct answer completes the round once. Further
   submissions after success have no effect on attempts, completion, or assistance history.
3. **AC7 — Given** both rounds of a level have been solved, **When** the learner advances,
   **Then** a level summary shows completed rounds, valid attempts, and assistance; explicit Next
   continues to the next level's briefing. Within a level, Next moves to the next round only
   after success. Advancing after the sixth solved round opens the final session summary.
4. **AC8 — Given** a session in progress or its final summary, **When** Restart is selected,
   **Then** confirmation is required. Confirming clears selections, feedback, attempts,
   assistance, and completion and returns to the first briefing. Cancel preserves the session.
5. **AC14 — Given** any page-session progress, **When** the page is reloaded, **Then** the
   learner starts a fresh session at the first briefing with no retained progress.
6. **AC15 — Given** a solved round where any hint or solution was viewed before success,
   **When** progress is shown, **Then** it is identified as assisted completion. A solved round
   with no assistance is identified as unassisted completion; neither is labeled proof of mastery.
7. **AC16 — Given** any round, **When** the learner takes time, retries, or requests help,
   **Then** there is no timeout or penalty and no points, lives, speed bonus, streak, or leaderboard.

---

### User Story 3 - Play with accessible controls and evidence (Priority: P1)

As a learner using a keyboard or assistive technology, I want to inspect evidence, choose,
submit, receive feedback, get help, and advance without depending on a mouse, color, or motion.

**Why this priority**: Access to the evidence and decisions is part of the core learning experience.

**Independent Test**: Complete a reviewed round and exercise all session controls using only
keyboard input; check feedback announcements, reduced motion, and narrow-window presentation.

**Acceptance Scenarios**:

1. **AC9 — Given** the game, **When** navigating by keyboard, **Then** every core action is
   reachable in an understandable order with visible focus and a readable, accessible name,
   including command inspection, choice selection, Submit, help, Next, and restart confirmation.
2. **AC10 — Given** correct or incorrect feedback, **When** it appears, **Then** explanatory
   text remains available and is announced to assistive technology. Reduced motion preserves
   all evidence, and animation never delays feedback or controls.
3. **AC17 — Given** a laptop or narrow window, **When** inspecting evidence and answering,
   **Then** labels and action controls remain usable, essential diagrams have text equivalents,
   no essential value requires hover, and dense technical evidence scrolls within its own
   labeled region without hiding the action buttons.
4. **AC18 — Given** optional link-history playback, **When** it runs or motion is reduced,
   **Then** its changes agree with the timestamped evidence and equivalent static history
   remains available, including when the link ends the window up.

---

### User Story 4 - Trust the teaching content (Priority: P1)

As a learner, I want only supported, unambiguous challenges to be graded so that authored
mistakes cannot teach me an incorrect rule or count against my progress.

**Why this priority**: Technical truth is a release requirement under constitution C1.

**Independent Test**: Present independently reviewed valid content and then content with each
specified defect; confirm that defects produce a content error without grading or progress.

**Acceptance Scenarios**:

1. **AC19 — Given** missing evidence or sources, unverified output, conflicting observations,
   or zero or multiple supported choices, **When** content is loaded for play, **Then** it is
   unavailable for grading and a visible content error identifies the affected level and round.
   No learner attempt or completion is recorded for that error.
2. **AC20 — Given** any shipped round, **When** its teaching material is reviewed, **Then**
   each command and interpretation has an exact source and section supporting the modeled
   EOS release and image architecture, hardware including the selected line card, physical ports,
   multi-agent configuration, and transceiver. Displayed output agrees with the observations,
   choices, hints, and explanations. Missing proof fails review; a requested configuration
   alone is not evidence of compatibility.
3. **AC21 — Given** a clean browser session and the delivered game files, **When** the learner
   plays all six reviewed rounds, **Then** no account, live equipment, external content service,
   or AI decision is required, and the same evidence and answer always produce the same result.
4. **AC22 — Given** a release candidate, **When** it is reviewed, **Then** every required
   acceptance case has a recorded pass, fail, or not-run result with date, environment, and
   evidence; the README describes the actual game, how to run and verify it, its modeled
   platform, sources, teaching threshold, and limits. Release completion requires all cases pass.

### Edge Cases

- An empty, malformed, or unknown selection produces guidance without consuming an attempt (AC4).
- A wrong choice remains retryable; repeated submission after success cannot add progress (AC3, AC6).
- Help is not a submission; viewing the solution cannot itself complete a round (AC5, AC15).
- A nonzero but unchanged CRC count does not establish additional errors during the interval.
- A currently up interface can satisfy the game's flapping threshold; three transitions do not.
- Both ends of the 60-second observation window are inclusive. A transition exactly at either
  boundary counts if it is a real change from the known preceding state. A repeated report of
  the same state is not a transition. Events outside the window do not contribute to its count.
- Missing optical evidence cannot establish absent receive signal from link-down status alone.
- Counter resets, rollover, mismatched interfaces, inconsistent timing, incomplete state history,
  or contradictory output violate the challenge model and prevent grading (AC19).
- Unsupported failure claims may appear as deliberately incorrect choices with corrective
  feedback; they must never be accepted as true. No defensibly correct choice, or two equivalent
  correct choices, is an authoring error (AC3, AC19).
- Canceling Restart preserves state; confirming it or reloading starts fresh (AC8, AC14).
- Missing or unreadable challenge content produces an availability explanation, not a learner
  failure. A fresh load after the content is corrected can begin a new session (AC19).

#### Authored acceptance cases

These are authored acceptance fixtures, not claimed EOS captures.
Displayed command output must be independently verified and must
agree with these structured observations.

| Case | Input state | Player action | Expected result | Why / source |
| --- | --- | --- | --- | --- |
| L1-R1 correct | leaf-a selected 100G interface administratively up, operationally down, receive signal absent | Select down link with absent receive signal at leaf-a selected 100G interface | Complete round; explain both observations | Verified EOS interface and transceiver evidence required |
| L1-R2 correct | leaf-b selected 100G interface administratively up, operationally down, receive signal absent | Select down link with absent receive signal at leaf-b selected 100G interface | Complete round; identify receiving endpoint | Verified EOS interface and transceiver evidence required |
| Plausible physical diagnosis mistake | Same evidence as L1-R1 | Select definitely failed cable | Reject; explain that the specific failed component is not established | Evidence does not isolate the cable |
| L2-R1 correct | Same interface up at both snapshots; CRC 120 then 145, 60 seconds apart | Select increasing receive CRC errors | Complete round; show increase of 25 | Counter interpretation requires verified source; 145 minus 120 equals 25 |
| L2-R2 correct | leaf-a CRC 900 then 900; leaf-b CRC 5 then 17; both up | Select increasing errors at leaf-b selected 100G interface | Complete round; show leaf-a delta 0 and leaf-b delta 12 | Timestamped counter comparison |
| CRC boundary | CRC 900 then 900 with no reset | Select increasing errors | Reject; explain that no additional CRC errors are shown during the interval | Counter delta is zero |
| L3-R1 correct | Initially up; down at 10s, up at 20s, down at 40s, up at 60s | Select flapping | Complete round despite current up state | Four transitions in the inclusive 0–60s teaching window |
| L3-R2 correct | Initially down; up at 5s, down at 15s, up at 35s, down at 55s | Select flapping | Complete round; distinguish repeated transitions from continuously down | Four transitions in the 0–60s teaching window |
| Flapping boundary | Three transitions within the 60-second window | Select meets the game's flapping threshold | Reject; explain that four transitions are required by this challenge rule | Authored teaching threshold |
| Unsupported content | Missing optical evidence, contradictory snapshots, unverified output, or multiple defensible answers | Load content | Visible content error identifying level/round; no grading, attempts, or progress | Authoring error, not learner failure |

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The game MUST provide three sequential levels with two distinct rounds each,
  covering absent receive light, increasing receive CRC errors, and link flapping in that order.
  All six require a correct submission for session completion. (AC7, AC12)
- **FR-002**: Each level MUST teach its diagnostic method and terminology before testing it,
  with a worked example different from its rounds. (AC1)
- **FR-003**: Each round MUST present a two-device optical Ethernet topology with labeled routed
  physical interfaces, correctly configured IPv6 addresses as context, and predefined selectable
  show-command evidence. The link MUST operate at 100 Gb/s over single-mode fiber using the
  endpoint and optic selections in D-001. The learner MUST choose one diagnosis and explicitly
  submit it. (AC11, AC20)
- **FR-004**: The learner MUST have all evidence needed for the decision, including device and
  interface identity, timestamps, units, and any applicable window and threshold. Previously
  inspected evidence MUST remain available and counter comparisons MUST be side by side. (AC11)
- **FR-005**: An accepted absent-receive-signal diagnosis MUST identify the receiving interface
  and be supported by both operational-down status and optical evidence of absent receive signal.
  Down status alone MUST NOT prove a cable, optic, or remote-device failure. (AC2, AC3, AC12)
- **FR-006**: An accepted increasing-CRC diagnosis MUST identify the receiving interface and a
  positive change between timestamped cumulative counts for that same interface, with the link
  operational at both snapshots and no reset or rollover. Feedback MUST show the change;
  an unchanged count MUST NOT be presented as additional errors. (AC12, acceptance cases)
- **FR-007**: Flapping MUST mean at least four actual operational up/down transitions within
  an inclusive 60-second window for this game. Feedback MUST show the count and window and
  state that this is a teaching threshold, not a universal EOS definition. (AC12, acceptance cases)
- **FR-008**: Diagnosis MUST be determined by evidence and the documented rule, with exactly
  one defensibly correct choice per round, regardless of choice order or wording. The same
  evidence and answer MUST produce the same outcome. (AC12, AC19, AC21)
- **FR-009**: Feedback MUST explain the selected answer using relevant values and the rule;
  incorrect answers MUST identify a specific mistake and useful next step. A correct diagnosis
  MUST NOT imply repair, working IPv6 connectivity, or an unproven physical cause. (AC3, AC13)
- **FR-010**: Invalid submissions MUST provide guidance without increasing attempts or progress.
  Each valid submission while unsolved MUST count once; incorrect answers MUST permit retry;
  correct submissions MUST complete the round once and prevent further scoring. (AC3, AC4, AC6)
- **FR-011**: Help MUST reveal the method first, then offer a worked step and solution. All help
  MUST be recorded separately from attempts and completion and MUST NOT complete a round. (AC5)
- **FR-012**: Progress summaries MUST show completed rounds, valid attempts, and assistance
  separately, including assisted versus unassisted completion without a mastery claim. (AC7, AC15)
- **FR-013**: Advancement MUST require explicit Next after a solved round. A level MUST finish
  only when both rounds are solved; its summary precedes the next briefing, and the final solved
  round leads to a session summary. Unsolved rounds MUST NOT be skipped. (AC7)
- **FR-014**: Restart MUST request confirmation; acceptance MUST clear the session and return
  to the first briefing, while cancellation MUST preserve it. Reload MUST start fresh. (AC8, AC14)
- **FR-015**: The game MUST impose no penalty for hints, retries, or elapsed time and MUST have
  no points, lives, timer, speed bonus, leaderboard, or streak mechanic. (AC16)
- **FR-016**: Every core control MUST support keyboard use, visible focus, accessible names,
  and understandable navigation order. (AC9)
- **FR-017**: Feedback MUST be persistent text as well as any color cue and MUST be announced
  to assistive technology. Essential diagrams MUST have text equivalents. Reduced motion MUST
  retain all information; animation MUST NOT delay interactions or feedback. (AC10, AC17, AC18)
- **FR-018**: Laptop and narrow-window layouts MUST keep evidence and actions usable, with
  labeled scrolling for dense data and no hover-only essential information. (AC17)
- **FR-019**: The experience MUST use a ninja-themed NOC workstation with two labeled devices,
  a link, command controls, a simulated terminal, and a persistent explanation area. Decorative
  imagery and any optional history playback MUST preserve technical clarity. (AC11, AC17, AC18)
- **FR-020**: Every shipped command, output, and interpretation MUST model the selected
  DCS-7050SX3-48YC8 with EOS 4.36.3M (32-bit) and DCS-7808-CH with EOS 4.36.3M (64-bit).
  Both switches MUST have `service routing protocols model multi-agent` configured, not ribd.
  Both endpoints MUST identify COLORCHIP C100Q020CWDM403B optics and their verified optical
  classification. Content MUST identify the actual line card where applicable and physical
  interface at each endpoint. Exact source sections and, where necessary, sanitized reviewed
  captures MUST support those claims before grading is enabled. Arithmetic and the game's
  flapping threshold MUST be distinguished from vendor behavior. (AC20)
- **FR-021**: Missing, unsupported, ambiguous, or inconsistent content MUST be unavailable
  for grading, explain the problem with level/round identity, and never count as learner failure.
  Evidence, hints, and explanations MUST agree with the documented diagnosis rule. (AC19, AC20)
- **FR-022**: The first release MUST be self-contained for the learner, requiring no account,
  backend, live device connection, runtime AI, or API key. Authored content MUST determine
  the available scenarios; external services MUST NOT decide answers. (AC21)
- **FR-023**: Briefings and README MUST explain the model's simplifications, exclusions, and
  limits on inferred causes. Release evidence MUST record actual results for all acceptance
  criteria, including independent expected answers and browser/accessibility checks. (AC20, AC22)

### Key Entities *(include if feature involves data)*

- **Level**: Ordered learning unit with a concept, learning outcome, prerequisite, briefing,
  worked example, two rounds, and a completion summary.
- **Round**: One incident with a unique identity, topology, target condition, evidence, diagnostic
  choices, hints, explanation, and source support. A round belongs to exactly one level.
- **Topology**: Two connected devices, their platform, EOS version and image architecture,
  routing-agent mode, applicable line card, optical transceiver vendor/model and verified type,
  named physical interfaces, IPv6 context, and the 100 Gb/s single-mode fiber link.
  For fixture identity, leaf-a denotes the DCS-7050SX3-48YC8 and leaf-b the DCS-7808-CH.
- **Evidence**: Selectable command observations and timestamped counter or state history,
  tied to an interface and source support, with units and observation window where applicable.
- **Diagnostic choice**: A single-select answer identifying an interface and observed condition,
  possibly with a deliberately unsupported causal claim to expose a misconception.
- **Assistance**: Method hint, worked step, or worked solution viewed for a round; independent
  of whether that round is solved and of how many valid submissions were made.
- **Session**: Current level and round, valid attempts, assistance history, completed rounds,
  and current progress; ends in a summary and does not survive reload.
- **Source record**: Exact reference and section, supported claim, applicable EOS release,
  platform/transceiver, and any supporting reviewed capture; distinguishes verified evidence
  from pending authoring work.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A representative new NOC engineer can complete all six rounds and reach the final
  summary in a target first-play session of 5–10 minutes, with unlimited thinking time available.
  Record observed duration and assistance; exceeding the target identifies a usability issue,
  not a learner failure.
- **SC-002**: Every authored correct, incorrect, and boundary case produces its independently
  specified diagnosis and explanation; zero technically unsupported answers receive completion.
- **SC-003**: Across all six rounds, wrong answers remain retryable, invalid input changes no
  progress, and repeated submission after success yields zero additional attempts or completions.
- **SC-004**: A keyboard-only reviewer completes all six rounds and exercises every core control
  without pointer input; feedback remains understandable with reduced motion and without color.
- **SC-005**: Every required label, evidence value, and core action remains available at the
  agreed laptop and narrow-window review sizes, with no essential information hidden by hover
  or animation and no action button obscured by technical-data scrolling.
- **SC-006**: After completing the game, a representative learner can explain all three diagnostic
  methods and why the observed symptoms do not identify a particular failed component. Record
  the explanation separately from assistance and completion; gameplay alone is not mastery proof.
- **SC-007**: All six shipped rounds have reviewed evidence supporting their output and teaching
  claims, and every deliberately invalid-content case prevents grading without learner penalty.
- **SC-008**: Every required acceptance criterion has a dated result and evidence, and another
  attendee can follow the README to start a fresh session and complete the core flow.

## Assumptions

- Learners know that Ethernet links connect named interfaces and that show commands display
  operational information; prior troubleshooting expertise is not required. Briefings teach
  administrative versus operational state, receive direction, optical diagnostics, cumulative
  counters, timestamp comparison, and state history.
- Each round has one target condition. Both endpoints are administratively enabled and IPv6
  addressing is correct. IPv6 is context, not a graded fault.
- Evidence is authored and fixed. Counter comparisons have no reset, rollover, restart, or
  interface replacement; timestamps share a time basis; state history covers the entire window
  and establishes the preceding state needed to count transitions.
- The starter's three levels, two rounds each, single-select diagnoses, session-only progress,
  and four-transitions-in-60-seconds rule are retained without scope changes.
- Review defaults, made explicit for repeatability: laptop viewport 1366 × 768 and narrow
  viewport 375 × 812 in browser layout pixels; at least one representative new NOC engineer
  participates in the first-play and explanation checks. These are initial usability evidence,
  not a statistical claim of educational efficacy or accessibility certification.
- Assistance history records which help was viewed for each round; reopening the same help
  does not create an additional distinct help item. Level summaries are shown before advancing
  into the next level. These details make the starter's progress behavior testable.
- The first build retains the constitution's 60-minute workshop scope budget. Any reduction
  requires an explicit scope update; missing checks or content cannot be reported as complete.

### Scope boundaries

No accounts, multiplayer, live infrastructure, runtime AI, leaderboard, editor, persistent saves,
complete EOS command parser, continuous network simulation, configuration changes, or repair.
No diagnosis of IPv6 addressing, Neighbor Discovery, routing protocols, VLAN trunks, port channels,
MLAG, or spanning tree. Optional visual motion must fit the existing diagnostic mechanic.

### Dependencies and open technical decisions

- **D-001 — Modeled hardware and optics**: The user selected DCS-7050SX3-48YC8 with
  EOS 4.36.3M (32-bit) as leaf-a and DCS-7808-CH with EOS 4.36.3M (64-bit) as leaf-b.
  Both switches use `service routing protocols model multi-agent`, not ribd. Both endpoints
  use vendor COLORCHIP, model C100Q020CWDM403B, over a 100 Gb/s single-mode fiber link.
  The user describes these optics as 100G LR4; the exact optical classification and applicable
  limits require verification rather than inference from that description or the model name.
  The 7808 line-card model and both physical interface names remain to be specified. The
  starter's Ethernet1 labels are replaced by descriptive endpoint references until those
  identities are established; no fabricated EOS port names may appear in shipped content.
- **D-002 — Technical evidence**: Exact documentation sections and sanitized release-specific
  captures remain pending. Content review must establish support for the selected platforms,
  32-bit/64-bit EOS images, line card, ports, multi-agent mode, and exact COLORCHIP optics,
  including optical classification, commands, CRC interpretation, optical indicators and any
  power limits, and displayed output. No output,
  citation, or release support may be invented. The authored numerical cases above are not
  vendor captures. Unverified rounds remain unavailable for grading, and the six-round release
  cannot be accepted until all six rounds meet the evidence requirement.

The device, software-mode, optic-model, and medium selections in D-001 are user requirements,
not claims of verified compatibility. Remaining endpoint details and D-002 evidence must be
resolved before dependent content is implemented or released. Routing-agent mode is fixed
configuration context, not an additional diagnostic topic. The learner flow, round count,
and physical-link diagnostic rules remain unchanged.
