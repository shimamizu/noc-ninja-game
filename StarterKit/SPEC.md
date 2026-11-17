# NOC Ninja Training · First playable specification

## The pitch

A new NOC engineer investigates single mode fiber link incidents by inspecting
Arista EOS evidence, identifying the supported diagnosis, and completing
three ninja training missions.

The player is a trainee network operations center engineer at a
ninja-themed NOC workstation. Each round presents a two-device topology
and selectable show-command evidence. The player identifies the affected
interface and its observed condition.

A correct decision marks the incident as diagnosed and enables
advancement. An incorrect decision explains the specific reasoning
mistake and allows another attempt. Diagnosing an incident does not
repair the simulated link.

The session ends when the player has correctly completed all six rounds.

## Who this is for

- **Learner:** A new NOC engineer with basic networking knowledge and
  limited experience troubleshooting Arista EOS interfaces.
- **Assumed knowledge:** Single mode fiber links connect interfaces on two devices;
  interfaces have names; show commands display operational information.
  Basic familiarity with a command-line interface is helpful.
- **What the briefing teaches:** Administrative versus operational state,
  transmit versus receive direction, optical receive-signal evidence,
  cumulative CRC counters, timestamp comparisons, and link-state history.
  Each level teaches its diagnostic method before testing it.
- **Why interaction helps:** The game exposes the misconception that
  an interface's current up/down state tells the whole story or that
  a symptom proves which physical component has failed.
- **Session target:** 5–10 minutes for a first playthrough, with
  unlimited thinking time.

## Learning outcomes and evidence

| ID | After playing, the learner can… | The game asks them to… | Evidence of success |
| --- | --- | --- | --- |
| LO1 | Identify a down interface with absent optical receive signal | Inspect interface status and optical diagnostics, then select the supported diagnosis | Correctly identify the receiving interface and condition without asserting an unsupported component failure |
| LO2 | Identify increasing receive CRC errors on an operational interface | Compare timestamped cumulative counters and select the affected interface | Correctly distinguish increasing errors from an unchanged historical count |
| LO3 | Identify repeated link-state changes during a defined observation window | Inspect timestamped state history and apply the stated transition threshold | Correctly identify flapping even when the interface is currently up |

## The technical model

### Rule being taught

Diagnoses must follow from the supplied evidence:

1. **Link down with absent receive signal:** Accept this diagnosis only
   when operational status establishes that the target interface is
   down and optical diagnostics establish absent receive signal.
   A down state alone is insufficient.

2. **Increasing CRC errors:** Compare cumulative receive CRC counts
   for the same interface at two timestamps. A positive difference,
   with no counter reset or rollover, establishes additional CRC errors
   during that interval. A nonzero but unchanged count does not establish
   additional errors during the interval.

3. **Link flapping:** Count actual operational up/down transitions
   within the stated observation window. For this game's challenges,
   at least four transitions within an inclusive 60-second window
   qualifies as flapping. This is a teaching threshold, not a universal
   EOS definition. Current up status does not erase earlier transitions.

A diagnosis identifies an observed condition. It must not assert a
failed cable, optic, or transmitter unless additional evidence proves
that cause.

### Context

All command syntax, simulated output, and troubleshooting behavior
must model Arista EOS 4.36.3M.

The topology consists of two devices connected through a point-to-point
optical Ethernet link. Both endpoints use routed physical interfaces
with correctly configured IPv6 addresses.

Each challenge identifies its modeled hardware platform and optical
transceiver type. Platform-specific commands, counters, and diagnostic
interpretations require verification for that combination.

IPv6 addressing provides network context and is not graded.

### Assumptions

- Each round has one target condition.
- Both interfaces are administratively enabled.
- IPv6 addressing is correct.
- Evidence consists of predefined snapshots and timestamped history.
- Counter comparisons refer to the same interface, with no counter
  reset, rollover, device restart, or interface replacement.
- Timestamps use one consistent time basis.
- State history is complete for the specified observation window.
- Each diagnostic choice has exactly one defensibly correct answer.
- The player can inspect all evidence needed to reach that answer.

### Excluded behavior

The first release does not model IPv6 addressing faults, Neighbor
Discovery, routing protocols, VLAN trunks, port channels, MLAG,
spanning tree, configuration changes, or automated remediation.

It does not reproduce a complete EOS terminal or connect to live
equipment. Only the authored command selections are available.

Physical link availability does not establish successful IPv6
connectivity. CRC errors and flapping do not, by themselves, identify
a specific failed physical component.

### Authoritative references

Use the Arista EOS documentation portal as the starting point:
https://www.arista.com/en/support/product-documentation

Before any round becomes playable, its source records must identify:

- The exact document URL and section supporting each command and
  interpretation.
- Support for the modeled EOS release and hardware platform.
- Applicable transceiver documentation for optical signal indicators
  and any power thresholds.
- Sanitized, reviewed EOS 4.36.3M captures where documentation does
  not establish the exact output format.

The arithmetic rule for CRC comparison and the game's flapping
threshold must be documented separately from vendor behavior.
The flapping threshold is an authored teaching rule.

Exact release-specific references and output captures are pending
verification. Do not invent citations, command output, or platform
support. Unverified rounds remain unavailable for grading.

These boundaries appear in briefings and the README in plain language.

## The repeatable game loop

1. **Brief:** Introduce one concept, its terms, and a worked example
   different from the challenge.
2. **Inspect:** Show the labeled two-device topology, interface names,
   IPv6 addresses, and selectable command evidence. Command output
   includes timestamps and units where relevant.
3. **Choose:** The player selects one diagnostic answer and explicitly
   submits it.
4. **Explain:** Display the result, relevant evidence, and the rule
   connecting that evidence to the diagnosis.
5. **Retry or advance:** A wrong answer leaves the round playable.
   A correct answer enables Next.
6. **Reflect:** The level summary shows completed rounds, valid
   attempts, and assistance used.

### Worked interaction

The player investigates leaf-a Ethernet1 connected to leaf-b Ethernet1.

Two evidence snapshots for leaf-a Ethernet1 show:

- 10:00:00 UTC: operationally up; receive CRC count 120.
- 10:01:00 UTC: operationally up; receive CRC count 145.
- No counter reset occurred between snapshots.

The player selects:
“The interface is healthy because it is up.”

Feedback:
“The interface is up in both snapshots, but its receive CRC count
increased from 120 to 145. That is 25 additional CRC errors in
60 seconds. Compare counter changes as well as current link status.”

The player retries and selects:
“leaf-a Ethernet1 has increasing receive CRC errors.”

Feedback:
“Correct. The receive CRC count increased by 25 during the observation
interval. This identifies receive frame errors at leaf-a Ethernet1;
it does not establish which physical component caused them.”

The round is marked complete and Next becomes available.

## Required stories and acceptance criteria

### US1 · Make and understand a decision — P1

As a learner, I want to apply the rule to visible evidence and
understand the result.

- **AC1:** Given a fresh session, when I start, then I see the first
  briefing before answering a challenge.
- **AC2:** Given leaf-a Ethernet1 is administratively up,
  operationally down, and verified optical diagnostics establish
  absent receive signal, when I select “leaf-a Ethernet1 is down
  with absent optical receive signal,” then the round completes,
  Next becomes available, and feedback cites both observations.
- **AC3:** Given that challenge, when I select “The cable has
  definitely failed,” then feedback explains that the evidence
  establishes absent receive signal but does not isolate a failed
  cable. Completion stays unchanged and I can retry.
- **AC4:** Given no selection or malformed input, when I submit,
  then input guidance appears and attempts/completion remain
  unchanged.

### US2 · Learn from help and finish the game — P1

As a learner, I want help when stuck and a clear view of my progress.

- **AC5:** A hint first explains the method. Further help can show
  a worked step or solution. Assistance is recorded without marking
  the round complete.
- **AC6:** Each valid submission counts as one attempt until the
  round is solved. Correct submission completes it once; repeated
  submission after success has no effect.
- **AC7:** A level completes after both of its rounds are solved.
  Next opens the following round or level; advancing from the final
  solved round opens a session summary.
- **AC8:** Restart asks for confirmation, then clears the current
  session and returns to the first briefing. Cancel preserves
  the session.

### US3 · Play with accessible controls — P1

As a keyboard user, I want to inspect the challenge, choose, submit,
get help, and advance without a mouse.

- **AC9:** All core controls have visible focus and accessible names;
  keyboard interaction reaches every core action.
- **AC10:** Correct/incorrect feedback includes text, remains available
  to read, and is announced to assistive technology. Motion can be
  reduced without losing information.

## Version-one content

Three levels, two rounds per level, six rounds total.
Each round uses a new example and the same core mechanic.

| Level | New concept | Prerequisite | Misconception to expose |
| --- | --- | --- | --- |
| 1 | Down link with absent optical receive signal / LO1 | Basic interface and link terminology | A down link or absent light proves a particular cable or optic failed |
| 2 | Increasing receive CRC errors / LO2 | Level 1 | An up interface is necessarily healthy, or a nonzero counter proves ongoing errors |
| 3 | Repeated link-state transitions / LO3 | Level 2 | A currently up interface cannot be flapping |

### Round coverage

- **L1-R1:** Identify absent receive signal at leaf-a Ethernet1.
- **L1-R2:** Identify absent receive signal at leaf-b Ethernet1,
  reinforcing receive direction at the opposite endpoint.
- **L2-R1:** Identify an increase from 120 to 145 receive CRC errors
  over 60 seconds on leaf-a Ethernet1.
- **L2-R2:** Compare leaf-a Ethernet1 remaining at 900 CRC errors
  with leaf-b Ethernet1 increasing from 5 to 17 over 60 seconds.
  Identify leaf-b as the interface accumulating additional errors.
- **L3-R1:** Identify four transitions within 60 seconds on an
  interface that ends the window up.
- **L3-R2:** Identify four transitions within 60 seconds on an
  interface that ends the window down.

**Progression:** Sequential on first playthrough; retry without
penalty. Completion requires a correct submission in every round.
Hints remain available. No points, lives, timer, leaderboard,
or streak mechanic in v1.

**Session behavior:** Progress is held for the current page session;
reload starts again. Saving across reloads is a stretch feature
and must be specified before it is added.

## Cases the implementation must satisfy

These are authored acceptance fixtures, not claimed EOS captures.
Displayed command output must be independently verified and must
agree with these structured observations.

| Case | Input state | Player action | Expected result | Why / source |
| --- | --- | --- | --- | --- |
| L1-R1 correct | leaf-a Ethernet1 administratively up, operationally down, receive signal absent | Select down link with absent receive signal at leaf-a Ethernet1 | Complete round; explain both observations | Verified EOS interface and transceiver evidence required |
| L1-R2 correct | leaf-b Ethernet1 administratively up, operationally down, receive signal absent | Select down link with absent receive signal at leaf-b Ethernet1 | Complete round; identify receiving endpoint | Verified EOS interface and transceiver evidence required |
| Plausible physical diagnosis mistake | Same evidence as L1-R1 | Select definitely failed cable | Reject; explain that the specific failed component is not established | Evidence does not isolate the cable |
| L2-R1 correct | Same interface up at both snapshots; CRC 120 then 145, 60 seconds apart | Select increasing receive CRC errors | Complete round; show increase of 25 | Counter interpretation requires verified source; 145 minus 120 equals 25 |
| L2-R2 correct | leaf-a CRC 900 then 900; leaf-b CRC 5 then 17; both up | Select increasing errors at leaf-b Ethernet1 | Complete round; show leaf-a delta 0 and leaf-b delta 12 | Timestamped counter comparison |
| CRC boundary | CRC 900 then 900 with no reset | Select increasing errors | Reject; explain that no additional CRC errors are shown during the interval | Counter delta is zero |
| L3-R1 correct | Initially up; down at 10s, up at 20s, down at 40s, up at 60s | Select flapping | Complete round despite current up state | Four transitions in the inclusive 0–60s teaching window |
| L3-R2 correct | Initially down; up at 5s, down at 15s, up at 35s, down at 55s | Select flapping | Complete round; distinguish repeated transitions from continuously down | Four transitions in the 0–60s teaching window |
| Flapping boundary | Three transitions within the 60-second window | Select meets the game's flapping threshold | Reject; explain that four transitions are required by this challenge rule | Authored teaching threshold |
| Unsupported content | Missing optical evidence, contradictory snapshots, unverified output, or multiple defensible answers | Load content | Visible content error identifying level/round; no grading, attempts, or progress | Authoring error, not learner failure |

## Experience direction

- **Visual metaphor:** A ninja-themed NOC workstation with two labeled
  Arista devices, their Ethernet link, selectable show-command
  controls, a simulated terminal, and a persistent explanation area.
- **One memorable moment:** A timestamped link-history playback
  reveals repeated up/down transitions before ending on an up
  indicator, showing why current status alone is insufficient.
  Equivalent static history remains available.
- **Always visible:** Device and interface labels, connection endpoints,
  IPv6 context, current evidence timestamp, measurement units, and
  the observation window and threshold when applicable. Counter
  comparisons appear side by side. Previously inspected evidence
  remains available.
- **Feedback voice:** Patient and specific; explain the observed
  choice before offering the next step.
- **Layout:** Challenge first, action next, explanation beside or
  below it. Do not hide technical values behind hover-only
  interactions.
- **Motion:** Optional and consistent with the evidence. Respect
  reduced-motion preferences and provide equivalent text.
- **Theme:** Ninja imagery decorates the workstation and progress
  indicators without obscuring technical evidence.

## Non-goals

No user accounts, multiplayer, backend, live infrastructure access,
runtime AI, leaderboard, or level editor.

No simulation of IPv6 Neighbor Discovery, routing protocols,
VLAN behavior, spanning tree, MLAG, port channels, configuration
changes, or physical repair.

No complete EOS command parser, continuous network simulation,
or requirement to identify a failed component from inconclusive
evidence. Visual polish must fit the existing mechanic.

## Open decisions for clarify

- Which hardware platform and optical transceiver type will be
  modeled? Select a combination for which EOS 4.36.3M commands
  and diagnostic output can be verified before implementation.
- Which exact documentation sections and sanitized captures support
  the shipped commands, CRC counter interpretation, and absent
  receive-signal evidence? Record them before enabling grading.

Resolved scope decisions:

- Three levels, two rounds per level.
- Diagnosis uses single-select choices with exactly one supported
  answer per round.
- No configuration changes or simulated repairs.
- Flapping means at least four operational state transitions
  within an inclusive 60-second observation window for this game.
- All hints and worked solutions are recorded as assistance.
  Assisted completion is distinguished from unassisted completion.

Unresolved source and hardware decisions must not become silent
implementation guesses.

## Release evidence

All required acceptance criteria must have a recorded result.
All six rounds, their command outputs, and their explanations must
be checked against the verified sources and modeled platform.

Expected diagnoses and numeric results must be recorded independently
of the evaluator implementation.

A teammate must complete the core flow using only the keyboard.
The README must describe implemented behavior, exact run/test
commands, the EOS version and hardware modeled, the game's flapping
threshold, source references, and any remaining limits.