# NOC Ninja — Guided NOC Patrol specification

Updated 2026-11-19. This describes the current app and replaces the earlier six-incident
simulation specification. Detailed change history is in the [current scope](../specs/001-noc-ninja-training/guided-patrol.md).
See [CONSTITUTION.md](CONSTITUTION.md), [PLAN.md](PLAN.md) and [ARCADE.md](ARCADE.md).

## Learning experience

A NOC employee investigates two real Arista EOS incidents, four decisions per incident.
The goal is to identify the failed optic, justify the replacement using both endpoints,
and distinguish observed state, increasing counters and confirmed repair outcomes.

| Case | Link | Evidence and reported repair |
| --- | --- | --- |
| U13 — The DMZ handoff | spine-gw1 Et6/2/1 ↔ dmz-gw2 Et6/21/1 | Down interfaces, spine Remote Fault True, DMZ Local Fault True and four −30 dBm Rx rows; spine optic replacement restored the link |
| U14 — The unstable fourth lane | leaf-gw2 Et55/1 ↔ spine-gw1 Et4/28/1 | Leaf errors increase, lane 4 Rx stays −14.91 dBm, leaf Local Fault and spine Remote Fault Changes each rise by eight despite False current flags; spine optic replacement fixed the problem |

Each case has 14 recorded outputs. All endpoints run EOS 4.31.10M and use ColorChip
C100Q020CWDM403H optics. Inventory belongs to each case; do not inherit missing line-card
information from a different incident. Neither case includes numerical post-repair captures.

## Required behavior

1. Offer one Guided NOC Patrol. Derive counts from the library: two incidents, eight decisions.
2. Shuffle scenario order, questions within scenarios, and answer choices once per new session.
   Preserve order during investigation, hints, retries and rerenders. Confirmed restart resets
   progress and reshuffles; cancellation preserves the session.
3. Show only the four interface-scoped commands: status, transceiver, mac detail, counters errors.
   Changing switch or command displays available readings immediately, with repeat samples
   together. No observation dropdown or request button is required.
4. Preserve captured readings, original timing and per-channel detail. Display personal aliases
   as full standard commands while retaining original prompts in source records. Missing captures
   remain explicitly missing; do not fabricate normal results or recovery readings.
5. Keep inventory, method and detailed notes expandable. Use the compact evidence/question layout
   and a smaller arena to reduce laptop scrolling; support narrow screens without clipping controls.
6. Answer by dragging the shuriken from the ninja's hand to A/B/C and releasing. Text and target
   clicks do not submit. Off-target release or Escape cancels without recording an attempt.
   Keyboard users pick up with Space, move with arrows and drop with Space; reduced motion is supported.
7. Grade by stable answer identity, not displayed letter. Incorrect answers give feedback and
   allow unlimited retries. Hints and attempts are recorded; there is no timing or precision score.
8. Require all decisions correct and all available evidence reviewed before revealing the outcome.
   Keep after-repair recordings gated until outcome review. Do not infer understanding from views alone.
9. Reveal the operator-confirmed intervention with its measurement limits. Offer a text handoff
   with evidence, reasoning, attempts, hint use and verification needs. Retain both handoffs at the end.
10. Use only static local assets. No accounts, backend, switch connection, external fonts,
    runtime AI, analytics, API keys or build step. Session progress resets on reload.

## Teaching constraints

Intentional transmitter disable is excluded. Current fault flags and historical Changes are
separate observations. Counter categories can overlap; do not sum them into unique errors.
MAC timestamps do not timestamp separate error or transceiver commands. Last Update is telemetry
age. Pair fault histories and optical readings rather than treating one fault flag as a universal
component diagnosis. Report confirmed repair separately from unmeasured recovery levels or stability.

The supplied optics YAML is an authoring reference. The runtime does not load it or apply its
thresholds to grading. Earlier simulated telemetry, fixed IPv6 topology, category classifier
and alternative modes are outside the current specification.

## Verification status

Application revision `guided-v17`: 48 Node checks and 56 Safari checks pass. Coverage includes
source fidelity, both-case progression, gating, retries, shuffle stability and answer mapping,
restart, handoff contents and keyboard/drag behavior. Current Safari desktop visual review exists.
Dedicated screen-reader, narrow-layout, full manual playthrough and download-click acceptance
remain pending. A hosted deployment and hosted smoke test have not been performed.
