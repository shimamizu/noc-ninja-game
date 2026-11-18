# NOC Ninja Training Constitution

## Current scope amendment — version 1.5.0, 2026-11-18

The owner explicitly replaces all simulated training evidence and separate modes with one guided
NOC patrol based only on supplied U10–U12 captures. This amendment supersedes conflicting original
scope, fixed-deployment, three-category classifier, arcade and separate-track requirements below.
C1–C7 still apply: validate literal captures and review bounded reasoning questions; teach
uncertainty without inventing readings or outcomes. Preserve each supplied platform and release.
No learner-facing sanitization labels. Intentional transmitter disable is excluded from all current and future
training incidents by owner instruction. Do not teach it as an alternative diagnosis or required
check, and do not invent status readings to establish this scenario assumption. Keep evidence coverage, hints, feedback, handoffs and honest
outcome reporting. Retired simulated datasets and their runtime paths must be removed. Future
examples must be supplied captures, never generated telemetry. Preview with Safari.

Specification, plan, acceptance and consistency review: `specs/001-noc-ninja-training/guided-patrol.md`.
Historical rules and amendment records below document superseded versions, not extra play modes.

## Core Principles

### C1 · Technical truth is a release requirement

The game MUST never reward a technically incorrect answer. Grading MUST be reproducible from a
documented rule and the challenge inputs. Unsupported or ambiguous content is an authoring error:
show an explanation that the challenge is unavailable and prevent grading it.

Document the model being taught:
Protocol/vendor context: The original synthetic dojo’s command syntax, simulated show-command
output, and troubleshooting behavior MUST model Arista EOS 4.36.3M. The owner-authorized real
incident track preserves each supplied platform and EOS version, and grades bounded evidence
reasoning rather than applying the synthetic classifier to incomplete real captures. Devices connect through point-to-point Ethernet links using
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
mastery. The specification MUST say exactly what advances a round, finishes a level, and resets a
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

All three methods run for every incident. Exactly one primary diagnosis must be supported; a complete shared flap history can include corroborating receive errors, and a bad transmitter with bad peer Rx is one optical path; matching flaps at both endpoints count as one link condition;
missing, contradictory, or ambiguous evidence prevents grading. Learners choose the category;
feedback derives the affected endpoint. No diagnosis establishes a specific failed component.

## Development Workflow and Quality Gates

The project MUST follow constitution → specify → clarify → plan → tasks → analyze → implement.
Clarification MUST resolve material ambiguity before it becomes an implementation assumption.
`StarterKit/CONSTITUTION.md`, `StarterKit/SPEC.md`, and `StarterKit/PLAN.md` are planning inputs;
this constitution governs the working specification, plan, tasks, and implementation.

- The specification MUST define learning outcomes, supported diagnoses, evidence requirements,
  acceptance cases, round advancement, level completion, and session reset behavior.
- The plan MUST explain how content validation, deterministic evaluation, rendering, and progress
  tracking satisfy C1–C7. Tasks MUST trace to the agreed scope and acceptance criteria.
- Before implementation, cross-artifact analysis MUST identify and resolve contradictions with
  this constitution. Any material scope change MUST update the affected artifacts and rerun analysis.
- Before a challenge becomes playable, its networking rules, command syntax, simulated output,
  and platform-specific interpretations MUST have reviewed source support for EOS 4.36.3M and
  the modeled hardware/transceiver combination. Exact references and output captures are pending
  in the starter specification; this document does not certify them. Unverified or ambiguous
  challenges MUST remain unavailable for grading.
- Release evidence MUST cover independently established correct, incorrect, and boundary cases;
  malformed input and content; retries, hints, repeated Submit, completion, and reset; and a
  fresh-start browser playthrough, keyboard operation, narrow layout, and reduced motion.
- Each required check MUST record pass, fail, or not run, with its date, environment, and supporting
  evidence in the README or a linked verification record. Failed and untested checks MUST remain
  visible, and release completion MUST NOT be claimed until required acceptance criteria pass.
- When the workshop budget is insufficient, the team MUST explicitly revise scope and dependent
  artifacts. Incorrect teaching and broken core interactions MUST be fixed before visual effects.

## Governance

This constitution is the governing authority for project specifications, plans, tasks, reviews,
and implementation. A conflicting artifact or implementation MUST be corrected or addressed
through an explicit amendment; a build agent MUST NOT weaken a principle to make its work pass.

A material amendment MUST record the proposed change, its reason, affected principles, and impact
on existing content and verification. The project owner or collaborating team MUST agree to the
change. The amendment MUST update this constitution's version and last-amended date, update
any affected specification and plan, align tasks and README as needed, and rerun cross-artifact
analysis and affected checks before the changed behavior is treated as compliant.

Versions MUST follow semantic versioning: MAJOR for incompatible principle removals or
redefinitions; MINOR for new principles, sections, or materially expanded guidance; PATCH for
clarifications, wording, or corrections that do not change obligations. Version 1.0.0 is the first
adoption of the supplied project principles. The original ratification date MUST remain unchanged
on later amendments; the last-amended date MUST reflect the date of each amendment.

Every specification, plan, and implementation review MUST check C1–C7 and the agreed release
scope, record unresolved violations, and identify the evidence needed to close them. Runtime AI,
generated questions, and free-text AI grading require an explicit constitution, specification,
and verification change before implementation. A scope exception MUST NOT silently bypass a
principle.

**Version**: 1.5.0 | **Ratified**: 2026-11-17 | **Last Amended**: 2026-11-18

## Amendment record — 2026-11-17

Version 1.1.0 implements the owner's explicit correction: the three “levels” mean competing
problem categories, not lessons that disclose and repeat the answer. C2 and release scope now
require mixed investigations and graphical shuriken submission. C1 and C3–C7 remain binding.
The spec, plan, data and interaction contracts, authored evidence, tests, tasks, and README are
updated together. Automated checks are rerun; unavailable browser checks stay visibly pending.

## Amendment record — version 1.2.0, 2026-11-17

Version 1.2.0 expands shared-event evidence guidance and clarifies the paired-flap diagnosis.

For these authored incidents, both endpoints MUST use one synchronized link-state timeline.
Uptime/downtime and MAC Interface State event ages MUST agree across endpoints
at the same snapshot time. PHY and local/remote fault rows have independent event histories;
a PHY-up endpoint may have Interface State down with Remote Fault True. Stable-up examples align all four MAC row ages; down/flapping
examples retain consistent endpoint-specific PHY and fault histories. Full-interface link-change
counts since clear MUST be modeled separately from MAC row change totals. Device-local counter-clear ages
and accumulated counts may differ. Matching flap observations describe one link condition.
This is the simulation convention requested by the owner, not a claim about all hardware behavior.

## Amendment record — version 1.2.1, 2026-11-17

Correct the overbroad shared-MAC-row rule using the owner’s paired down-link capture: only
Interface State follows the shared link timeline. PHY/fault events and counter-clear histories
remain independent. This corrects evidence modeling without changing the release scope.

## Flap and telemetry clarification — 2026-11-17

In the authored flapping cases, Remote Fault False MUST share the link event’s Last Change
age, with a consistent fault-change history. Endpoint transceiver profiles MUST be distinct,
with source-derived normal ranges and explicitly authored fault values. This does not override
the directional PHY/fault histories in the owner’s static down-link examples.

Version 1.2.2 records the owner’s flap timestamp and distinct endpoint telemetry corrections;
the diagnosis rules and selected deployment remain unchanged.

## Drag aiming and technician runbook — 2026-11-17

The owner authorizes optional direct manipulation: drag the ninja onto a diagnosis target and
release to throw. Release outside a target or cancel without an attempt. Keep equivalent native
controls and reduced-motion behavior. Use original illustrated ninja/shuriken assets.

After a correct diagnosis, show the destination switch, port and optic under the owner’s U9
training runbook: receive CRC → opposite optic; down with Remote Fault True → same optic;
flapping → use receive errors or observed Remote Fault assertions to select the side; alarm-level
Tx → same transmitter. Multiple clues must agree. Recommendations are not proof of a failed
component, a live dispatch or a completed repair. Tx uses the supplied −9.00/+3.30 dBm alarms.
Version 1.3.0 expands the interaction and replacement-learning scope while retaining technical
evidence, accessibility and honest-progress obligations.

## Real incident extension — 2026-11-18

Version 1.4.0 records the owner’s explicit instruction to make the three supplied real cases
playable. This extends the deployment scope for a separate reasoning track while retaining C1–C7.
The 10G/100G captures retain their original releases, ports, optics and incomplete histories.
Questions may grade supported direction, counter interpretation, uncertainty and proposed next
steps with source-reviewed choices; they MUST NOT invent measurements, transfer optic limits,
or certify component failure from a flag alone. Case outcomes are revealed only after evidence
review and successful decisions, and MUST distinguish recovery, intervention-only confirmation
and combined repairs. No live network writes or runtime AI are added.

Original dojo progression remains unchanged. Real-case decisions, attempts and hints are tracked
separately; completion records practice, not independent mastery. New browser acceptance remains
explicitly pending. Specification, plan, interaction contract, tasks, sources and README document
the extension and its verification limits.
