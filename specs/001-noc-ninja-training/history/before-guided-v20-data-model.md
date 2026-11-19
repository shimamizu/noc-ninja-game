> Historical document archived on 2026-11-19 from `specs/001-noc-ninja-training/data-model.md`. Superseded by the current file; relative links retain original context.

> **Current scope (2026-11-18):** One guided NOC patrol using only U10–U12. See [guided-patrol.md](guided-patrol.md). Conflicting six-case, simulation and separate-mode details below are historical and superseded.

# Data Model: Mixed Incident Dojo

**Updated:** 2026-11-17 · **Schema:** 2 · **Revision:** noc-v3-2026-11-17
This supersedes the single-condition schema used in the initial build.

## Content Document

`schemaVersion`, `contentRevision`, `sources`, `levels`. Exactly three neutral groups (`L1`–`L3`),
two rounds each. The six cases are interleaved; group identity has no diagnostic meaning. Valid
content is deeply frozen. A structural, review or domain error prevents the entire session.

## Source and Review

Sources retain `id`, `kind`, `title`, `locator`, `section`, `supportedClaims`, `applicability`, and
`review`. Allowed kinds distinguish vendor documents, reviewed captures, user examples/references
and authored rules. Locators are public HTTPS URLs or project evidence paths.

Non-rule applicability records EOS 4.36.3M, both platform names, 32/64-bit architectures, corrected
line card and slot, and the selected optic. Review records contain verified `status`, named
`reviewer`, valid `reviewedOn`, matching `contentRevision`, and `notes`. A verified flag alone is
not evidence; authored output must actually be reviewed. No bypass exists.

## Level

`id`, neutral `title`, `tagline`, `learningOutcomes: [LO1, LO2, LO3]`, ordinal `difficulty`, `briefing`,
`sourceIds`, and two `rounds`. Difficulty is retained authoring order, not a claim of increasing
clinical/network complexity. The common briefing teaches all three methods and has definitions,
a distinct worked example and source references. Only the opening briefing is shown.

## Round

`id`, neutral `title`, `contentRevision`, `prompt`, `topology`, `scopeInterfaceIds`, `commandOutputs`,
`observations`, `linkTimeline`, `choices`, `hints`, `sourceIds`, `review`. Both interfaces are always in scope.

There is no `conditionType`, `targetInterfaceId`, or correct-choice flag. Those old routing/key
fields are rejected. Runtime derives the single supported diagnosis from all observations; identical paired flap histories describe one link condition.

## Topology

Two devices retain exact ID/label, platform, EOS version, image architecture, routing model,
line card and interface. Each interface has ID, owning device, full name/alias, IPv6 address and
optic. Link endpoints are unique known interfaces; speed is 100 Gbps; medium is single-mode fiber.
See spec.md D-001 for exact hardware. Device IDs/labels are `leaf-gw1` and `spine-gw1`.
IPv6 addresses must be distinct and in the same /126 subnet. The authored link uses
`2001:db8:51::1/126` on leaf-gw1 and `2001:db8:51::2/126` on spine-gw1.

Optics retain vendor, manufacturer, model, form factor, classification, four lanes, speed,
source references and all five `referenceLimits` groups. Each includes the four supplied limits,
unit, sourceIds, and explicit nullable scope/comparisonRule metadata. All 20 supplied values are
unchanged; unknown broader alarm semantics are not invented.

## CommandOutput

Each endpoint has one visible output of each `kind`: `status`, `port-status`, `optics`, `counters`, `history`.
Each output has `id`, `deviceId`, `interfaceIds`, `command`, `label`, plain `text`, UTC `observedAt`,
`origin`, `sourceIds`, and review. Output identity is unique within the round.

`status` is current full interface detail. `counters` is the earlier counters-errors table and
`pairedOutputId` references a hidden later `counter-snapshot`. The Error snapshots tool displays
both tables and a per-column comparison. The earlier full interface detail is retained as a hidden
`interface-snapshot`. `history` is current full MAC detail; `historicalOutputIds` reference hidden
`mac-snapshot` records shown in an expandable area. `toolVisible: false` suppresses duplicate tool
buttons, not evidence access. `port-status` is the compact status table. All tools exist in every case. Interface text retains the complete U6 field inventory and each
platform’s format; state age, change totals, counter-clear age and traffic totals must agree
with the interval/history. Full output remains plain authored text, with source review and
regression checks; there is no general EOS parser.

## Observations

An object with three arrays, each containing exactly one record per scoped interface:

- **light:** interfaceId, administrativeState, operationalState, observedAt, outputIds,
  interpretationSourceIds, and four opticalReadings (unique channel, rx_power metric, finite
  value, dBm unit, sourceIds). Receive-signal classification is computed, not an authored answer.
- **counters:** interfaceId, noReset=true, sourceIds, and two snapshots. Each snapshot records
  observedAt, operationalState, counterKind (same crc/fcs), safe nonnegative integer FCS count, `errorCounters` with FCS/Align/Symbol/Rx/Runts/Giants/Tx,
  and outputIds for the error table plus corresponding full interface detail. FCS must equal count. Times increase; counts do not decrease. A reset or rollover violates this model.
- **history:** interfaceId, windowStart/windowEnd exactly 60 seconds apart, historyStart no later
  than the window start, known stateBeforeHistory, historyComplete=true, minimumTransitions=4,
  sourceIds and strictly time-ordered reports (observedAt, operationalState, outputIds).

All referenced outputs belong to the same endpoint. Optical/counter observation times match
outputs. Counter start/end times equal the history window; current light/status time equals its
end. Current states and counter snapshot states agree with the history at those times.

## Choice and Help

Exactly three choices, one per condition: `opticalIssue`, `crcIncreasing`, `linkFlapping`.
Each has unique `id`, `label`, `diagnosis: {condition}`, and explanatory feedback text/method.
No device, interface or causal claim in the submitted answer: this mechanic tests category
selection; feedback supplies the derived endpoint. Method, worked-step and solution hints have
unique IDs, text and sourceIds, in that order.

## Session State and Lifecycle

State retains view, levelIndex, roundIndex, selection, inspectedOutputIds, activeOutputId,
activeHelpId, feedback, restartConfirmation, and per-round progress. RoundProgress tracks attempts,
completed, unique assistanceIds and assistedAtCompletion. A valid throw is one attempt.

Views are loading, content-error, briefing, challenge, session-summary. Feedback persists while
inspecting or changing aim. Next directly advances after success, including across content groups.
The sixth success leads to a final summary. Restart confirmation/cancel is orthogonal; confirmed
restart and reload create fresh in-memory state. No level-summary view is used.

MAC histories additionally contain `macSnapshots`: observedAt, outputId and four named rows with
state, cumulative changes and nonnegative lastChangeSeconds. Source review and regression tests
check them against displayed MAC tables and the known timeline. The raw command output contains
only command-format text; authored time labels and the timeline are rendered outside it.

For stable-up authored histories (initially up with no down reports), all four MAC rows share the
Interface State Last Change age in every snapshot. Static-down histories retain directional event-specific ages. In authored flapping histories,
Remote Fault False aligns with the Interface State age, with consistent supporting changes.

## Shared link timeline

`linkTimeline` contains UTC `windowStart`, `windowEnd`, `initialState`, `initialStateSince`
and ordered `transitions: [{observedAt, operationalState}]`. Both endpoint histories
use this same 60-second window, preceding state and transitions. Full interface Up/Down ages
and Interface State Last Change ages derive from the latest shared event at each snapshot.
PHY and fault rows have independent per-endpoint states, counts and event times. An unchanged
row retains its absolute event time as the observation clock advances. Stable-up fault row
ages still match the link event by the owner’s authored convention. MAC row totals and full
interface counters since clear have separate histories. Each counter snapshot includes a
nonnegative integer `linkStatusChanges`; its delta must follow shared interface transitions
without a reset, and its displayed value must match. It need not equal a MAC change total. `engine/timeline.js` rejects inconsistent authored displays.

The flap fixture models a brief Remote Fault assertion one second before each interface
transition, cleared at that transition. Snapshots show False; each assert/clear pair adds two
fault changes. These synthetic pulses explain updated Last Change ages and are not additional
Interface State flaps or a claim that every real link behaves this way. Stable-down directional
examples retain their independent fault clocks.

Leaf telemetry uses 32.32 °C / 3.27 V with lane-specific bias and Tx from the U8 working
peer; normal Rx is −0.30, 1.26, 1.20, 1.14 dBm. Spine keeps its distinct U4 working profile.
The absent leaf and degraded spine Rx values are preserved. Display and structured Rx agree.

## v3 Tx and dispatch

Every light observation has four `txReadings` with channel, metric `tx_power`, finite value,
unit `dBm` and sourceIds. Both optical columns must match CLI text. `technicianDispatch`
returns status `ready`, `insufficient` or `conflicting`, a computed interfaceId/endpoint when
ready, and reasons. No target ID or answer key is stored. Dispatch is instructional feedback
after a correct diagnosis; it does not add a second graded attempt or a real maintenance action.
