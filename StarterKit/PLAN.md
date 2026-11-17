> **Editor note — personalize, then remove this note.**
> This is the input to **plan**, after **clarify** has resolved the specification.
> Keep the simple defaults unless your mechanic needs a different choice.
> Replace every bracketed field. This is a design contract for code the agent
> will write; files and test commands described below do not exist yet.

# NOC Ninja Training · Implementation plan

## Build target

Implement the clarified specification for NOC Ninja Training within the workshop build block. First deliver one complete round with correct grading, explanatory feedback, retry, and advance. Then add content and polish through the same implementation.

**Hardest behavior to get right:** Deterministically grade diagnoses from the available evidence across all three conditions: a down link with absent optical receive signal, an operational link with increasing CRC errors, and a flapping link. Distinguish current status from timestamped historical evidence, and never accept a specific failed component as the cause unless the evidence establishes it.

**First evidence we'll check:** A hand-verified Level 1 case from the specification in which interface status shows the link is down and supported transceiver diagnostics establish absent optical receive signal. Accept the diagnosis that the specified interface is down with absent receive light. Reject an unsupported claim that the cable or optic has definitely failed. Verify that feedback explains the evidence, an incorrect answer permits retry, and a correct answer permits advancement.

## Stack and serving

- Semantic HTML, CSS, and native JavaScript modules. No framework, bundler, backend, or runtime model.
- DOM controls plus SVG only where a diagram helps teach the concept. No rendering dependency by default. If choosing Three.js or another library, record its version, loading strategy, reason, and accessible alternative here before implementation.
- `data/levels.json` for authored content; load it over HTTP using a relative URL.
- In-memory session state. Reload starts a fresh session, as specified. No persistence in v1.
- Static hosting, including a repository subpath such as GitHub Pages. Use relative asset paths and case-correct filenames.

Preview from the repository root after implementation creates `index.html`:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open **http://127.0.0.1:8000**. On Windows use `py` in place of `python3`. Native modules and JSON fetching need a web server; opening the HTML with `file://` is not the supported run path. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

## Proposed files and responsibilities

```text
index.html                   Semantic page shell and module entry point
style.css                    Layout, focus, feedback states, reduced motion
main.js                      Load → validate → start; render loading/errors
engine/
  rules.js                   Pure domain evaluation; no DOM or progress changes
  content.js                 Validate authored level data and source references
  state.js                   Session transitions, attempts, completion, restart
  feedback.js                Explain structured evaluation results
ui/
  render.js                  Briefing, challenge, feedback, and summary views
  controls.js                Input events and keyboard/focus behavior
data/
  levels.json                Briefings, challenges, hints, source records
tests/
  index.html                 Browser test runner with visible pass/fail summary
  rules.test.js              Independent expected results from the specification
  state.test.js              Attempts, assistance, duplicate submit, progression
  content.test.js            Invalid/missing/ambiguous authored data
README.md                    Actual run instructions, behavior, and evidence
```

Use `data/` and `tests/` at the root alongside `engine/` and `ui/`. Keep modules small enough to understand; combine view files if separate files add no value.

## Data contract

Define one document containing `schemaVersion`, `sources`, and `levels`. Each level has a unique ID, title, learning outcome, briefing, source IDs, and ordered rounds. Each round has a unique ID, domain-specific challenge, stable choice IDs where applicable, and ordered hints.

**Domain fields:**

- `conditionType`: enum: `linkDownNoRx`, `crcIncreasing`, or
  `linkFlapping`.
- `deviceId` and `peerDeviceId`: nonempty strings referencing devices
  in the challenge topology.
- `interfaceName` and `peerInterfaceName`: nonempty strings identifying
  the connected physical Ethernet (fiber) interfaces.
- `eosVersion`: string, exactly `4.36.3M`.
- `hardwarePlatform`: nonempty string identifying the modeled platform.
- `ipv6Address` and `peerIpv6Address`: valid IPv6 interface addresses
  with prefix lengths from 0 through 128, consistent with the documented
  point-to-point design.
- `commandOutputs`: ordered array of records containing a unique ID,
  device ID, command string, UTC capture timestamp, and verified
  simulated output text.
- `observations`: structured evidence associated with command-output
  IDs, using the fields appropriate to the condition:
  - Link down: administrative state (`up` or `down`), operational state
    (`up` or `down`), and receive-signal state (`present`, `absent`,
    or `unknown`). Optical power, when included, is a finite number
    in dBm; an unavailable reading is null, never an invented value.
    Interpret readings using documented transceiver-specific limits.
  - CRC errors: at least two ordered snapshots containing a UTC
    timestamp, operational state, and cumulative receive CRC count.
    Counts are nonnegative safe integers in frames. Counter resets
    and rollover are excluded from first-release challenges.
  - Flapping: initial operational state and an ordered array of
    timestamped transitions to `up` or `down`, plus observation-window
    start and end timestamps. `minimumTransitions` is an integer
    of at least 2 and defines the challenge's teaching threshold,
    not a universal EOS definition of flapping.
- `targetInterface`: device ID and interface name identifying where
  the learner must diagnose the condition.

**Choice representation:** Each round provides an array of choices
with unique, stable `id` values, learner-facing `label` text, and a
structured diagnosis containing `deviceId`, `interfaceName`, and
`condition` (`linkDownNoRx`, `crcIncreasing`, `linkFlapping`, or
`insufficientEvidence`). A choice may additionally assert a
`claimedCause`, such as a failed cable or optic. The learner submits
`{ "choiceId": "<stable-choice-id>" }`. Each choice has authored
explanatory feedback. The evaluator checks its diagnosis against
the structured evidence; answer positions and label wording never
determine correctness.

**Validation rules:**

Reject the content file for any of the following:

- Missing required fields, incorrect types, unknown condition types,
  or an EOS version other than `4.36.3M`.
- Duplicate level IDs, globally duplicated round IDs, or duplicate
  choice, hint, or command-output IDs within a round.
- Broken device, interface, source, or command-output references.
- Invalid IPv6 addresses, timestamps, numeric values, or units.
- Missing source support for command behavior, diagnostic
  interpretations, or platform-specific limits.
- Structured observations that contradict displayed command output,
  topology, briefings, hints, or explanations.
- Missing condition-specific evidence or an undefined target interface.
- CRC snapshots with non-increasing timestamps, decreasing counters,
  or a counter delta inconsistent with the accepted diagnosis.
- Flapping evidence with unordered or out-of-window transitions,
  repeated states that do not represent actual transitions, or an
  invalid observation window or transition threshold.
- A link-down/no-receive-signal diagnosis without evidence establishing
  both conditions, or optical measurements interpreted without their
  applicable documented limits.
- Choices that claim an underlying component failure unsupported
  by the evidence.
- Zero or multiple defensibly correct choices, including choices
  that express equivalent correct diagnoses.
- Missing explanatory feedback, unordered hints, or hints and
  worked solutions that contradict the accepted diagnosis.

Validate that each round's expected answer agrees with the documented
evaluation rule and its independently hand-verified acceptance case.

The loader must validate the whole content file before starting. Show a useful content error with the level/round ID; do not count it as a learner attempt. Briefings and hints reference source records with a title, URL, section, and supported claim. Fixed wording and per-level content live in data; numeric reasoning may be assembled from evaluator results.

Do not invent a universal quiz schema that discards the domain's real structure. Adapt the [worked example's plan](https://github.com/automateyournetwork/NAF_AC6/blob/main/WORKSHOP/LAB/Examples/PrefixQuest/PLAN.md) only if it fits your game.

## Domain evaluation contract

```text
evaluate(challenge, answer) → {
  status: "correct" | "incorrect" | "invalid-input" | "content-error",
  expected: domain-specific canonical result, or null,
  reasonCode: stable identifier for the rule/misconception,
  evidence: structured values used to explain the decision
}
```

- This is a pure function: same inputs, same result; no DOM, timer, network, random choice, or score changes.
- Compute the result from [EXPLICIT DOMAIN ALGORITHM]. The UI must not choose the correct answer by position, label, or animation destination.
- Distinguish a learner's incorrect decision from invalid input and broken authored content.
- Define accepted equivalent answers and reject unsupported ambiguity explicitly.
- Expected answers in tests come from independently reviewed cases. Don't calculate them by calling the same evaluator being tested.

**Feedback example:** [A WRONG CHOICE, THE REASON CODE, AND THE EXACT EXPLANATION WITH RELEVANT VALUES].

## Session transitions

```text
loading → briefing → awaiting-answer
                     ├─ invalid input → guidance → awaiting-answer
                     ├─ incorrect → feedback → retry same round
                     └─ correct → feedback → Next → next round/briefing/summary
loading/content failure → error screen → retry loading
confirmed Restart → fresh first briefing
```

The state module owns attempts, assistance, completed round IDs, current round, and current view. Selection and hints do not submit an answer. Count valid submissions only while a round is unsolved. Disable Submit after success; guard in state logic as well. Advance only through explicit Next. Restart requires confirmation; cancellation changes nothing.

## Interaction and visual direction

Translate a ninja-themed NOC workstation into a compact challenge area showing two labeled Arista devices and their connecting singl mode fiber link, labeled show-command controls, a simulated terminal displaying command output, and a persistent explanation area. Keep the ninja theme in decorative elements and progress indicators; preserve technical clarity in all evidence and controls.

Use a clear type hierarchy and one consistent visual language. Motion should reveal a consequence: a link indicator changes state alongside timestamped up/down events, or a CRC counter highlights the increase between two snapshots. Every effect must correspond to the displayed evidence and include an equivalent text description.

Use native controls where possible, move focus deliberately after screen changes, and announce feedback through a live region. Respect `prefers-reduced-motion`. Display textual values alongside diagrams. A learner must not need animation, color vision, pointer precision, or hover to reason about the answer.

## Implementation order

| Slice | Deliverable | Evidence before the next slice |
| --- | --- | --- |
| 1 · Prove the rule | Pure evaluator plus the spec's correct/wrong/boundary cases | Expected results pass independently of the UI |
| 2 · Complete one round | Briefing, challenge, feedback, retry, Next | One correct and one wrong path work in the browser |
| 3 · Add the curriculum | All scoped levels, validation, hints, session summary | Each shipped round agrees with its reviewed cases |
| 4 · Make it usable | Keyboard/focus, reduced motion, narrow layout, clear error states | Manual checks are recorded |
| 5 · Package the result | README, screenshot if available, optional hosting | Another attendee can run and explain the game |

Generate `tasks.md` from these slices and the actual acceptance criteria. Do not create a large task tree for hypothetical stretch features.

## Verification and reporting

Implement a dependency-free browser test runner at `tests/index.html` that imports the pure modules, runs all assertions, and shows totals plus failed case IDs. It must report zero discovered tests as failure. Open **http://127.0.0.1:8000/tests/** after starting the same server.

| Check | What must be established |
| --- | --- |
| Domain cases | Correct, plausible wrong, and boundary outcomes for the supported model |
| Input/content failures | Invalid submissions do not consume attempts; malformed content cannot be graded |
| State transitions | Retry, hints, duplicate submission, level completion, final summary, restart/cancel |
| Source review | Each briefing and explanation agrees with the cited technical rule |
| Browser playthrough | Fresh start to summary, keyboard-only core actions, readable feedback |
| Layout/motion | Typical laptop, narrow viewport, reduced motion |
| Hosting, if used | Assets and data load under the published repository path |

For each required acceptance criterion, record **pass / fail / not run**, the date, environment, and evidence in the README or a linked verification note. The test runner checks code behavior; a human still reviews the teaching content and actual interaction.

## Scope controls

No persistence, multiplayer, runtime AI, procedural scenario generator, editor, or audio in v1. If time runs short, propose the smallest coherent reduction to the specification and update the tasks. Do not hide skipped checks or silently weaken correctness.
