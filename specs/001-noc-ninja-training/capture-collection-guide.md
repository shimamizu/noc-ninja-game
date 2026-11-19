# Capture collection guide — four-command investigations

The current guided patrol has two real cases and eight decisions. The exercise uses only:

- show interfaces ethernet <port> status
- show interfaces ethernet <port> transceiver
- show interfaces ethernet <port> mac detail
- show interfaces ethernet <port> counters errors

Full interface detail, rates, discards and logging are outside the command menu and collection
workflow for this exercise. The owner narrowed the scope to these four commands. Additional
operator notes about timing, resets, interventions and service verification are still useful;
do not invent command output for them.

## Available recordings

U13 (spine-gw1 Et6/2/1 ↔ dmz-gw2 Et6/21/1) remains playable alongside U14 below. The owner confirmed
that spine optic replacement fixed the link. The 14 supplied pre-repair recordings comprise
status once, and transceiver/MAC/errors twice, at each endpoint. No script summary is used.
Chassis: spine Arista DCS-7808-CH; DMZ Arista DCS-7804-CH. Both run EOS 4.31.10M with
7800R3-48CQ-LC line cards. Both endpoints use ColorChip C100Q020CWDM403H optics.

Missing: follow-up status, numerical after-repair captures. The replacement and
link recovery themselves no longer need confirmation. Whether cleaning/reseating accompanied
the replacement remains unspecified.

## Timing and follow-up

Collect the four commands at both ends during the incident, during a follow-up observation and
again after each authorized intervention when possible. Include actual command capture timestamps,
timezone, reset/reboot history and intervention order. MAC Current System Time establishes timing
for that MAC command only; transceiver Last Update is telemetry age, not capture time. Do not
borrow another command's timestamp or turn two untimed counters into a measured error rate.

U13 has MAC intervals of 41 seconds on spine and 39 seconds on DMZ across midnight. Its repeat
optics/errors are separate follow-up captures with unspecified times. The unchanged MAC Changes
rows support a persistent condition during those intervals, not a new flap rate. Zero error totals
on a down link do not establish healthy traffic. No post-repair capture exists yet for U13.

Preserve a baseline before work; no clear or reboot is required to collect comparable observations.
Confirm reset continuity before interpreting deltas. State whether cleaning/reseating occurred with
an optic replacement. If intermediate readings were never captured, preserve the combined action
rather than claiming which step fixed the fault. Old incident gaps stay missing; new captures from
unrelated events belong to a new case.

## Sharing format

Provide plain text, original command prompts and output, case ID, endpoint/port and observation.
Remove sensitive identifiers before sharing and use consistent aliases. Keep values, units,
headings, optical rows, error categories, timestamps and Last Change fields intact. Do not add
invented output to fill missing sections. Learners do not see sanitization-process labels.

The command selector uses the full scoped spelling. Captured equivalent spellings, capitalization,
spaces and the supplied (s1) prompt suffix remain untouched in the output. Supply the supported
transceiver output with all channels and bias/units/alarms that it actually provides; model-specific
limits must not be invented. Inventory or follow-up facts may be supplied as operator notes.

## U13 — The DMZ handoff

- Add actual post-repair readings if available, and clarify whether fiber cleaning or reseating accompanied the confirmed spine optic replacement. Link recovery is already confirmed.
- Collect the same four interface-specific commands at both endpoints after repair, then repeat them over a stated monitoring interval. Preserve timestamps and reset/intervention history.
- If retained, provide actual capture timestamps for the repeated counters/transceiver outputs. Their Last Update ages are not capture timestamps.

### spine-gw1 Et6/2/1 · EOS 4.31.10M

```text
show interfaces ethernet 6/2/1 status
show interfaces ethernet 6/2/1 transceiver
show interfaces ethernet 6/2/1 mac detail
show interfaces ethernet 6/2/1 counters errors
```

### dmz-gw2 Et6/21/1 · EOS 4.31.10M

```text
show interfaces ethernet 6/21/1 status
show interfaces ethernet 6/21/1 transceiver
show interfaces ethernet 6/21/1 mac detail
show interfaces ethernet 6/21/1 counters errors
```

Coverage: 14 literal recordings, 0 summary-only requests, 10 missing requests across the two endpoints and three observations.

## Authoring and source review

Add literal captures to the case's reviewed evidence source first. A case evidence item can contain
literal text for status, optics, MAC or errors, with endpointId, observationId (incident/monitoring),
capturedAt and an explanatory note. The alternative rows format is for the original script tables;
never display a generated table as raw CLI. Preserve every repeated capture separately. MAC text
must retain its Current System Time and all state/fault rows. No script assessment is required when
none was supplied. Unknown inventory fields are explicitly null and displayed as not captured.

Additional commandCaptures records contain endpointId, commandId, observationId, capturedAt, source
and text. They cannot shadow existing literal evidence. After-repair records are gated until case
review; they must not be placed in pre-review evidence. One record per endpoint/command/observation
is supported; more observation points require a reviewed schema extension. Validate against the
original source and run the Node/browser suites. Every added recording must be actual supplied text.

Workflow reference: [Arista check-interface-health](https://github.com/aristanetworks/eos-mcp-server/blob/main/skills/check-interface-health/SKILL.md).
We use its evidence-first approach within the owner's four-command scope, without an MCP server.
We do not import generic alarm cutoffs or its incorrect no-light interpretation of 0 dBm (1 mW).
Fault semantics were reviewed against the [Arista Layer 1 Debug Guide](https://arista.my.site.com/AristaCommunity/s/article/Layer-1-T-shooting-TOI).
Remote Fault reports the peer's receive problem; it does not itself cause low receive power or
uniquely identify a failed component. The U13 operator diagnosis selects the spine optic as the
first replacement; the owner subsequently confirmed that replacing it fixed the link. Numerical
post-repair readings remain missing. Intentional transmitter disable remains excluded.

## U14 — The unstable fourth lane

The technician replaced the spine-gw1 Et4/28/1 optic and fixed the problem. Both endpoints
use ColorChip C100Q020CWDM403H optics and EOS 4.31.10M. Leaf is DCS-7050SX3-48YC8-R;
spine is DCS-7808-CH. The spine line card was not specified for this incident.

Fourteen supplied captures: status once and errors/transceiver/MAC twice per endpoint.
The initial leaf error capture uses `senz`; preserve this original prompt. Leaf MAC spans
93 seconds and spine MAC spans 85 seconds. Counter and transceiver timestamps are unknown.

Useful additions: actual post-repair readings, a stated monitoring interval, error-counter
reset history, timezone, and whether any cleaning/reseating accompanied replacement.

### leaf-gw2 Et55/1

```text
show interfaces ethernet 55/1 status
show interfaces ethernet 55/1 transceiver
show interfaces ethernet 55/1 mac detail
show interfaces ethernet 55/1 counters errors
```

### spine-gw1 Et4/28/1

```text
show interfaces ethernet 4/28/1 status
show interfaces ethernet 4/28/1 transceiver
show interfaces ethernet 4/28/1 mac detail
show interfaces ethernet 4/28/1 counters errors
```
