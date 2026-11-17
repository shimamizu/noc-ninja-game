# Data Model: Mixed Incident Dojo

**Updated:** 2026-11-17 · **Schema:** 2 · **Revision:** noc-v2.1-2026-11-17
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
`observations`, `choices`, `hints`, `sourceIds`, `review`. Both interfaces are always in scope.

There is no `conditionType`, `targetInterfaceId`, or correct-choice flag. Those old routing/key
fields are rejected. Runtime derives the single supported endpoint/category from all observations.

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

Each endpoint has exactly one output of each `kind`: `status`, `optics`, `counters`, `history`.
Each output has `id`, `deviceId`, `interfaceIds`, `command`, `label`, plain `text`, UTC `observedAt`,
`origin`, `sourceIds`, and review. Output identity is unique within the round.

`status` is the later interface snapshot; `counters` is the earlier one. The CRC tool displays
both together and a structured comparison. Optical diagnostics are current. History is labeled
a complete authored snapshot series, not an invented vendor log. All tools exist in every case.

## Observations

An object with three arrays, each containing exactly one record per scoped interface:

- **light:** interfaceId, administrativeState, operationalState, observedAt, outputIds,
  interpretationSourceIds, and four opticalReadings (unique channel, rx_power metric, finite
  value, dBm unit, sourceIds). Receive-signal classification is computed, not an authored answer.
- **counters:** interfaceId, noReset=true, sourceIds, and two snapshots. Each snapshot records
  observedAt, operationalState, counterKind (same crc/fcs), safe nonnegative integer count and
  outputIds. Times increase; counts do not decrease. A reset or rollover violates this model.
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
