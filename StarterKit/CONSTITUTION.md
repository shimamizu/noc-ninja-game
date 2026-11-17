> **Editor note — personalize, then remove this note.**
> This is the input to the **constitution** step. Replace the bracketed fields,
> keep the principles you intend to enforce, and agree on any changes with your
> group. Each principle includes evidence: your agent should know how to check it.
> Read the lab guide before running commands. A completed example is available
> in `WORKSHOP/LAB/Examples/PrefixQuest/` in the workshop repository.

# NOC Ninja Training · Project constitution

**Purpose:** Help a new network operations center (NOC) engineer practice troubleshooting physical Ethernet links between Arista EOS switches and routers using show commands, with IPv6 addressing shown as network context.

**First release:** one core mechanic, three short levels, a browser, and a 60-minute workshop build. Change this budget only by updating the agreed scope.

## First-release levels

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

## C1 · Technical truth is a release requirement

The game must never reward a technically incorrect answer. Grading must be reproducible from a documented rule and the challenge inputs. Unsupported or ambiguous content is an authoring error: show an explanation that the challenge is unavailable and prevent grading it.

Document the model being taught:  
Protocol/vendor context: All command syntax, simulated show-command output, and troubleshooting behavior must model Arista EOS 4.36.3M. Devices connect through point-to-point Ethernet links using routed physical interfaces with explicitly configured IPv6 addresses. Each challenge provides the relevant topology, intended configuration, and operational evidence. Any platform-specific behavior must identify the modeled hardware platform. Command availability and output must be verified against documentation or captured output for this release; unsupported behavior must not be invented.

Assumptions: Each challenge presents one intentional physical-link condition affecting link availability, frame integrity, or stability. IPv6 addressing is correctly configured and provided as context, not as a fault to diagnose. Players identify the condition using predefined show-command output and, where needed, timestamped logs or snapshots. Counter comparisons use the same interface with no counter resets between observations. Historical evidence includes enough timing information to distinguish ongoing errors or repeated state changes from isolated past events. All evidence needed to distinguish the correct diagnosis is available.

Important exclusions: The first release does not cover IPv6 addressing faults, Neighbor Discovery, routing protocols, VLAN trunks, port channels, MLAG, or spanning tree. Players inspect evidence and select a diagnosis; they do not change configuration. A physical link being up does not establish that IPv6 connectivity works. A link-down indication alone does not prove a failed cable, optic, or remote device. Challenges require additional evidence before accepting a specific component as the cause.

Simplifications must appear in the briefing and README wherever they affect what the player can conclude. Fictional worlds and animations may illustrate a rule; they must not change it.

**Evidence:** hand-checked correct, incorrect, and boundary cases; a source link and section for each networking rule; review of all shipped briefings and explanations. Expected results are recorded independently of the implementation under test.

## C2 · Every round teaches through a decision

The player's main action must exercise the target skill. Introduce a concept before testing it, and show the values needed to reason about the answer. A wrong answer explains the specific mistake and gives the player a useful next step. A correct answer explains why it works.

Use this learning sequence: Recognize a down link and use optical diagnostics to identify absent receive light → Compare timestamped counters to identify increasing CRC errors on an operational link → Analyze timestamped state changes to recognize a flapping link, even when its current status is up.

Across all three levels, players must distinguish what the evidence demonstrates from possible underlying causes. Each level introduces its diagnostic method before asking the player to apply it.

Hints reveal a method first, then a worked step. Worked solutions are available when a learner is stuck; viewing one is recorded as assistance, never as independent mastery.

**Evidence:** a teammate can connect each player action to a learning outcome and describe what they learned from a deliberately wrong choice.

## C3 · Progress is honest and retry is safe

A round completes only on a valid, correct submission. Incorrect answers keep the challenge available. Empty or malformed submissions give input guidance without counting as a wrong attempt. Repeated Submit actions cannot award progress twice.

No lives, countdown, or speed bonus in this first version. Hints and retries have no penalty. Show completed rounds, attempts, and assistance separately; completion is not proof of independent mastery. The specification must say exactly what advances a round, finishes a level, and resets a session.

**Evidence:** wrong-answer, repeated-submit, hint, completion, and reset checks match the specification.

## C4 · Access is part of the core game

All core actions must be usable by keyboard with visible focus, readable labels, and an understandable order. Explain success and failure with text as well as color. Provide a text equivalent for essential diagrams. Respect reduced-motion preferences; animation must never delay the availability of feedback or controls.

Keep the challenge usable on a typical laptop and a narrow browser window. Dense technical data may scroll within its own labeled container, without hiding the action buttons.

**Evidence:** a keyboard-only playthrough, a narrow-window check, and a reduced-motion check. Record what was actually checked; do not claim full accessibility certification.

## C5 · The first version is deterministic and self-contained

Ship authored content and deterministic domain logic. The game requires no account, backend, live device connection, model, or API key. AI may help write code and assets during development; its output receives the same review as any other contribution.

Runtime AI tutoring, generated questions, and free-text AI grading are stretch work. Adding them requires an explicit change to the constitution, specification, and verification approach before implementation.

**Evidence:** a clean browser session can play using only the project's static files; no external content service decides an answer.

## C6 · Content and logic can be reviewed separately

Store level content, hints, sources, and difficulty in editable data. Keep domain rules separate from rendering and progress tracking. Validate data before presenting a challenge. Feedback must agree with the evaluator's reasoning; a hand-authored answer key cannot silently override the rule engine.

Adding another challenge that uses the existing mechanic should require a data change and its checks, not a new scoring path or a new screen implementation.

**Evidence:** inspect one level's data, trace one answer through the evaluator, and add a trial challenge without modifying the rule engine.

## C7 · Done is demonstrated

Ship only the agreed scope. Requirements, plan, tasks, and README must describe the same game. A feature is complete when its acceptance criteria pass and its actual status is recorded. A screenshot, a checked task box, or the agent saying “done” is insufficient by itself.

When time is short, reduce scope explicitly. Fix incorrect teaching and broken core interactions before adding visual effects. Keep failed and untested checks visible.

**Evidence:** reproducible run/test commands, recorded verification results, a fresh-start playthrough, and a README another attendee can follow.

## How we change these rules

For any material change, record the reason, update the affected spec and plan, and rerun analysis. A conflict with this constitution is resolved openly; the build agent must not weaken a principle merely to make its implementation pass.
