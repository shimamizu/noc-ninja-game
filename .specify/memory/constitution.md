<!--
Sync Impact Report — temporary review material; remove before committing.
Version change: unratified template → 1.0.0 (initial adoption).
Modified principles: generic template slots replaced with StarterKit/CONSTITUTION.md principles:
- Slot 1 → C1 · Technical truth is a release requirement
- Slot 2 → C2 · Every round teaches through a decision
- Slot 3 → C3 · Progress is honest and retry is safe
- Slot 4 → C4 · Access is part of the core game
- Slot 5 → C5 · The first version is deterministic and self-contained
Added principles:
- C6 · Content and logic can be reviewed separately
- C7 · Done is demonstrated
Added sections: First-Release Scope and Technical Boundaries; Development Workflow and Quality
Gates.
Governance: defined amendment procedure, semantic versioning, and compliance review.
Removed sections: none; instructional template comments removed.
Deferred placeholders: none.
Follow-up: verify EOS 4.36.3M command/output sources and hardware/transceiver support
before enabling any challenge for grading; starter specification records this as pending.
Dependent templates and StarterKit inputs were not modified.
-->

# NOC Ninja Training Constitution

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

Use this learning sequence: Recognize a down link and use optical diagnostics to identify absent
receive light → Compare timestamped counters to identify increasing CRC errors on an operational
link → Analyze timestamped state changes to recognize a flapping link, even when its current status
is up.

Across all three levels, players MUST distinguish what the evidence demonstrates from possible
underlying causes. Each level introduces its diagnostic method before asking the player to apply
it.

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

**First release:** one core mechanic, three short levels, a browser, and a 60-minute workshop
build. Change this budget only by updating the agreed scope.

All three levels use the same core mechanic: select show commands,
inspect evidence, and submit a diagnosis.

1. **Link down with absent optical receive signal**
   Inspect interface status and transceiver diagnostics to identify
   absent receive light at a specified interface. The accepted diagnosis
   describes the observed condition without claiming that a particular
   cable, optic, or remote device has failed.

2. **Link up with increasing CRC errors**
   Compare two timestamped interface-counter snapshots to identify
   increasing receive CRC errors while the link remains operational.
   The accepted diagnosis identifies the affected receiving interface
   and ongoing frame corruption, without claiming that a specific
   component has failed.

3. **Link flapping**
   Inspect timestamped interface-state history or log messages to
   identify repeated transitions between operationally up and down.
   Each challenge defines the observation window and the number of
   transitions that qualifies as flapping. The accepted diagnosis
   identifies the affected link and repeated state changes, without
   claiming a specific underlying cause unless the evidence proves it.

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

**Version**: 1.0.0 | **Ratified**: 2026-11-17 | **Last Amended**: 2026-11-17
