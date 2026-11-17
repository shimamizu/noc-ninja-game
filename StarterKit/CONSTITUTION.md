# NOC Ninja Training · Project constitution

**Updated:** 2026-11-17. This StarterKit document reflects the owner's current requirements and
[governing constitution 1.2.2](../.specify/memory/constitution.md). The detailed learning and
acceptance requirements are in [SPEC.md](SPEC.md); implementation follows [PLAN.md](PLAN.md).

## First-Release Scope and Technical Boundaries

**Purpose:** Help a new network operations center (NOC) engineer practice troubleshooting physical
Ethernet links between Arista EOS switches and routers using show commands, with IPv6 addressing
shown as network context.

**First release:** one core mechanic, six mixed incidents, and a browser. The initial
60-minute workshop build is followed by the owner's requested graphical redesign on 2026-11-17.
Three neutral content groups organize two incidents each; they do not disclose diagnostic categories
or interrupt play with category-specific lessons. One opening briefing teaches all methods.

Every incident offers interface status, transceiver diagnostics, two timestamped receive-counter
snapshots, and complete state history at both endpoints. The three answer targets are:

1. **Light levels**: identify absent or very poor receive light using the supplied ColorChip
   interpretation. All four Rx rows at −30 dBm mean absent receive light; readings strictly below
   the supplied −15.70 dBm low alarm indicate very bad light, not necessarily absence. Current
   interface state is also shown. These are setup-specific interpretations, not universal cutoffs.
2. **CRC / errors**: identify new receive CRC errors by a positive same-interface counter delta
   while up at both observations, with no reset or rollover.
3. **Link flapping**: identify at least four actual operational changes in an inclusive
   60-second window, even when the final state is up. This is an authored teaching threshold.

All three methods run for every incident. Exactly one diagnosis must be supported; matching flaps at both endpoints count as one link condition;
missing, contradictory, or ambiguous evidence prevents grading. Learners choose the category;
feedback derives the affected endpoint. No diagnosis establishes a specific failed component.

## Selected deployment

| Switch name | Platform | EOS | Interface | IPv6 address |
| --- | --- | --- | --- | --- |
| leaf-gw1 | DCS-7050SX3-48YC8 | 4.36.3M, 32-bit | Et51/1 | `2001:db8:51::1/126` |
| spine-gw1 | DCS-7808-CH; 7800R3-48CQ-LC in slot 3 | 4.36.3M, 64-bit | Et3/15/1 | `2001:db8:51::2/126` |

The 100G link uses single-mode fiber and the shared `2001:db8:51::/126` subnet. Both switches
use `service routing protocols model multi-agent`. Both optics are COLORCHIP C100Q020CWDM403B,
manufacturer “ColorChip ltd”, QSFP28 100G CWDM4, four lanes. Preserve all 20 supplied optical
thresholds and confirmed units. IPv6 addressing is context, not a fault to diagnose.

Use these fictional switch names consistently in diagrams, CLI prompts, hints and feedback.
No production hostname is retained. The confirmed working spine-gw1 captures and supplied optic
reference establish the documented modeling basis; authored faults and timestamps are simulations.
See the [source-to-simulation review](../specs/001-noc-ninja-training/evidence/mixed-incident-review.md).

## Core Principles

### C1 · Technical truth is a release requirement

The game MUST never reward a technically incorrect answer. Grading MUST be reproducible from a
documented rule and the challenge inputs. Unsupported or ambiguous content is an authoring error:
show an explanation that the challenge is unavailable and prevent grading it.

Document the model being taught:
Protocol/vendor context: All command syntax, simulated show-command output, and troubleshooting
behavior MUST model Arista EOS 4.36.3M. Devices connect through point-to-point Ethernet links using
routed physical interfaces with explicitly configured IPv6 addresses. Each challenge provides the
relevant topology, intended configuration, and operational evidence. Any platform-specific behavior
MUST identify the modeled hardware platform. Command availability and output MUST be verified
against documentation or captured output for this release; unsupported behavior MUST not be
invented.

Assumptions: Each challenge presents one intentional physical-link condition affecting link
availability, frame integrity, or stability. IPv6 addressing is correctly configured and provided
as context, not as a fault to diagnose. Players identify the condition using predefined
show-command output and, where needed, timestamped logs or snapshots. Counter comparisons use the
same interface with no counter resets between observations. Historical evidence includes enough
timing information to distinguish ongoing errors or repeated state changes from isolated past
events. All evidence needed to distinguish the correct diagnosis is available.

Important exclusions: The first release does not cover IPv6 addressing faults, Neighbor Discovery,
routing protocols, VLAN trunks, port channels, MLAG, or spanning tree. Players inspect evidence and
select a diagnosis; they do not change configuration. A physical link being up does not establish
that IPv6 connectivity works. A link-down indication alone does not prove a failed cable, optic, or
remote device. Challenges require additional evidence before accepting a specific component as the
cause.

Simplifications MUST appear in the briefing and README wherever they affect what the player can
conclude. Fictional worlds and animations may illustrate a rule; they MUST not change it.

**Evidence:** hand-checked correct, incorrect, and boundary cases; a source link and section for
each networking rule; review of all shipped briefings and explanations. Expected results are
recorded independently of the implementation under test.

### C2 · Every round teaches through a decision

The player's main action MUST exercise the target skill. Introduce a concept before testing it, and
show the values needed to reason about the answer. A wrong answer explains the specific mistake and
gives the player a useful next step. A correct answer explains why it works.

Introduce all three diagnostic methods before the first incident: interpret receive-light
levels, compare timestamped CRC counters, and count timed up/down transitions. Then interleave
incidents so the learner must identify which category the evidence supports. A level title,
briefing, available tool, or authored answer key MUST NOT preselect the diagnosis.

Each incident exposes the same tools for both endpoints. Players aim at one of three diagnosis
targets and explicitly throw a shuriken to submit. The throw illustrates the decision; it is not a
timing or aiming-skill test. Feedback identifies the affected interface and distinguishes observed
conditions from possible underlying causes.

Hints reveal a method first, then a worked step. Worked solutions are available when a learner is
stuck; viewing one is recorded as assistance, never as independent mastery.

**Evidence:** a teammate can connect each player action to a learning outcome and describe what
they learned from a deliberately wrong choice.

### C3 · Progress is honest and retry is safe

A round completes only on a valid, correct submission. Incorrect answers keep the challenge
available. Empty or malformed submissions give input guidance without counting as a wrong attempt.
Repeated Submit actions cannot award progress twice.

No lives, countdown, or speed bonus in this first version. Hints and retries have no penalty. Show
completed rounds, attempts, and assistance separately; completion is not proof of independent
mastery. The specification MUST say exactly what advances an incident, finishes the patrol, and resets a
session.

**Evidence:** wrong-answer, repeated-submit, hint, completion, and reset checks match the
specification.

### C4 · Access is part of the core game

All core actions MUST be usable by keyboard with visible focus, readable labels, and an
understandable order. Explain success and failure with text as well as color. Provide a text
equivalent for essential diagrams. Respect reduced-motion preferences; animation MUST never delay
the availability of feedback or controls.

Keep the challenge usable on a typical laptop and a narrow browser window. Dense technical data may
scroll within its own labeled container, without hiding the action buttons.

**Evidence:** a keyboard-only playthrough, a narrow-window check, and a reduced-motion check.
Record what was actually checked; do not claim full accessibility certification.

### C5 · The first version is deterministic and self-contained

Ship authored content and deterministic domain logic. The game requires no account, backend, live
device connection, model, or API key. AI may help write code and assets during development; its
output receives the same review as any other contribution.

Runtime AI tutoring, generated questions, and free-text AI grading are stretch work. Adding them
requires an explicit change to the constitution, specification, and verification approach before
implementation.

**Evidence:** a clean browser session can play using only the project's static files; no external
content service decides an answer.

### C6 · Content and logic can be reviewed separately

Store level content, hints, sources, and difficulty in editable data. Keep domain rules separate
from rendering and progress tracking. Validate data before presenting a challenge. Feedback MUST
agree with the evaluator's reasoning; a hand-authored answer key cannot silently override the rule
engine.

Adding another challenge that uses the existing mechanic MUST require a data change and its checks,
not a new scoring path or a new screen implementation.

**Evidence:** inspect one level's data, trace one answer through the evaluator, and add a trial
challenge without modifying the rule engine.

### C7 · Done is demonstrated

Ship only the agreed scope. Requirements, plan, tasks, and README MUST describe the same game. A
feature is complete when its acceptance criteria pass and its actual status is recorded. A
screenshot, a checked task box, or the agent saying “done” is insufficient by itself.

When time is short, reduce scope explicitly. Fix incorrect teaching and broken core interactions
before adding visual effects. Keep failed and untested checks visible.

**Evidence:** reproducible run/test commands, recorded verification results, a fresh-start
playthrough, and a README another attendee can follow.

## How we change these rules

Record the reason for a material change, update the governing constitution and affected spec,
plan, tasks and README, and rerun consistency analysis and affected checks. Follow the amendment
and versioning procedure in the governing constitution. An implementation must not silently
weaken correctness, source review, accessibility or evidence requirements.

The owner-authorized changes replace diagnosis-specific lessons with mixed investigations and
explicit graphical shuriken submission, and select the switch names and /126 addressing above.
The initial workshop build has been extended by these subsequent requests. This document no
longer leaves those decisions open or requires another hardware/threshold confirmation.

Automated results and remaining browser/learner checks are tracked in the
[verification record](../specs/001-noc-ninja-training/verification.md). Documentation alignment
does not imply that outstanding manual acceptance checks have passed.

## Shared link timeline clarification — 2026-11-17

For these authored incidents, both endpoints MUST use one synchronized link-state timeline.
Uptime/downtime and MAC Interface State event ages MUST agree across endpoints
at the same snapshot time. PHY and local/remote fault rows have independent event histories;
a PHY-up endpoint may have Interface State down with Remote Fault True. Stable-up examples align all four MAC row ages; down/flapping
examples retain consistent endpoint-specific PHY and fault histories. Full-interface link-change
counts since clear MUST be modeled separately from MAC row change totals. Device-local counter-clear ages
and accumulated counts may differ. Matching flap observations describe one link condition.
This is the simulation convention requested by the owner, not a claim about all hardware behavior.

## Flap and telemetry clarification — 2026-11-17

In the authored flapping cases, Remote Fault False MUST share the link event’s Last Change
age, with a consistent fault-change history. Endpoint transceiver profiles MUST be distinct,
with source-derived normal ranges and explicitly authored fault values. This does not override
the directional PHY/fault histories in the owner’s static down-link examples.
