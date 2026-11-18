# U11 — 100G link down with one low receive channel

**Received:** 2026-11-18, owner-supplied, sanitized example.
**Status:** playable in Guided NOC patrol; preserved source evidence and instructor notes below.
**Intervention:** owner confirms the leaf-gw1 Et56/1 optic was replaced.
**Outcome:** link recovery, recovery of the low spine receive channel and any accompanying
fiber work have not yet been explicitly confirmed.

The observations, script assessment and subsequent repair outcome are separate evidence stages.
Fictional endpoint aliases are retained; serials, locations, asset/RFID identifiers and ticket
numbers are omitted. Whitespace is normalized without changing reported values or state ages.

## Playable adaptation — 2026-11-18

This source is now represented in `data/cases.json` and the Guided NOC patrol. Its five
questions grade evidence interpretation and uncertainty, not a universal fault classifier. The
original captures are preserved; no missing timestamps, thresholds or repair measurements are
invented. The original integration cautions below apply to any future automatic diagnosis or
threshold-grading expansion. They do not block these bounded reasoning questions. See
[current implementation and verification](../guided-patrol.md).

## Supplied environment

| Endpoint | Switch | EOS | Port | Optic manufacturer | Optic model |
| --- | --- | --- | --- | --- | --- |
| leaf-gw1 | DCS-7050SX3-48YC8-R | 4.31.10M | Et56/1 | ColorChip ltd | C100Q020CWDM403H |
| spine-gw1 | DCS-7808-CH | 4.31.10M | Et4/23/1 | ColorChip ltd | C100Q020CWDM403H |

The owner identifies a 100G link. Preserve the **403H** suffix; the retired simulated reference was
**403B**, on different ports and EOS 4.36.3M. The spine line card, fiber length/path, administrative
state, port configuration and installed-module alarm thresholds are not supplied here.

## Supplied observations

The optics and counter tables have no original command names or individual capture timestamps.
Voltage and Bias header units are not shown in this excerpt. MAC timestamps are device-local,
one second apart; timezone and clock synchronization are not established. Keep the optical row
labels as supplied; do not model them as four independently configured Ethernet links.

| Endpoint / port | FCS | Align | Sym | RX | TX |
| --- | ---: | ---: | ---: | ---: | ---: |
| leaf-gw1 Et56/1 | 0 | 0 | 0 | 0 | 0 |
| spine-gw1 Et4/23/1 | 0 | 0 | 0 | 0 | 0 |

| Endpoint / optical row | Temp (°C) | Voltage | Bias | Tx (dBm) | Rx (dBm) |
| --- | ---: | ---: | ---: | ---: | ---: |
| leaf-gw1 Et56/1 | 48.09 | 3.30 | 57.51 | 0.47 | -0.97 |
| leaf-gw1 Et56/2 | 48.09 | 3.30 | 57.51 | 0.74 | -1.33 |
| leaf-gw1 Et56/3 | 48.09 | 3.30 | 57.85 | 0.89 | -0.45 |
| leaf-gw1 Et56/4 | 48.09 | 3.30 | 57.51 | 0.43 | -1.39 |
| spine-gw1 Et4/23/1 | 43.34 | 3.27 | 56.93 | -0.74 | -0.91 |
| spine-gw1 Et4/23/2 | 43.34 | 3.27 | 56.93 | -0.57 | -0.43 |
| spine-gw1 Et4/23/3 | 43.34 | 3.27 | 56.84 | 0.05 | 0.25 |
| spine-gw1 Et4/23/4 | 43.34 | 3.27 | 56.84 | -0.50 | -14.09 |

```text
leaf-gw1# show interfaces Ethernet56/1 mac detail
    Current System Time: Wed Nov 18 10:24:35 2026

    Ethernet56/1
                            Current State   Changes     Last Change
    PHY State               linkDown        1           7 days, 16:11:36 ago
    Interface State         linkDown        3           7 days, 16:11:34 ago
    MAC Rx Local Fault      False           4           0:05:09 ago
    MAC Rx Remote Fault     True            1           0:05:11 ago

spine-gw1# show interfaces Ethernet4/23/1 mac detail
    Current System Time: Wed Nov 18 10:24:36 2026

    Ethernet4/23/1
                            Current State   Changes     Last Change
    PHY State               linkDown        3           96 days, 19:13:15 ago
    Interface State         linkDown        3           96 days, 19:13:15 ago
    MAC Rx Local Fault      True            9           83 days, 19:06:59 ago
    MAC Rx Remote Fault     False           4           96 days, 19:13:15 ago
```

## Owner's automated assessment

- Port Issue Type: Link Down.
- Summary: Optic Issue on leaf-gw1.
- Root Cause Device: leaf-gw1.
- Script conclusion: leaf-gw1 Et56/1 TX failure, based on Remote Fault = True; labeled
  “ROOT CAUSE IDENTIFIED.”
- Recommendation: replace the leaf-gw1 Et56/1 optic.

Retain that as the script's assessment. The initial evidence supports a directional hypothesis
and a runbook-selected replacement candidate; it does not establish an isolated failed component.

## Interpretation and source boundaries

[Arista's Layer 1 Debug Guide](https://arista.my.site.com/AristaCommunity/s/article/Layer-1-T-shooting-TOI)
describes MAC Rx Local Fault as an incoming-signal issue detected locally and MAC Rx Remote Fault
as an incoming-signal issue detected by the peer. Those descriptions were available in indexed
official content; direct page rendering returned a loading/CSS error. They support directionality,
not a claim that either flag uniquely identifies a failed optic on these exact releases.

Together, **leaf Remote Fault True**, **spine Local Fault True**, and the low spine receive row
prioritize the **leaf → spine** direction. Investigate the leaf transmitter/module optical path,
intervening connectors/fiber and spine receiver/module path. The flags alone do not distinguish
among those components. A nonzero local Tx power reading does not independently verify the signal
at the far receiver or clear every transmit-side component.

The fourth spine Rx value is 13.18, 13.66 and 14.34 dB below the other three Rx values respectively.
Keep all four channels visible; an aggregate would hide the diagnostic contrast.

If corresponding row numbers represent the same optical channels, the displayed leaf Tx minus
spine Rx differences are:

| Channel row | Leaf Tx (dBm) | Spine Rx (dBm) | Difference (dB) |
| --- | ---: | ---: | ---: |
| 1 | 0.47 | -0.91 | 1.38 |
| 2 | 0.74 | -0.43 | 1.17 |
| 3 | 0.89 | 0.25 | 0.64 |
| 4 | 0.43 | -14.09 | 14.52 |

These are arithmetic differences between reported telemetry, not calibrated insertion-loss
measurements. Confirm channel mapping, fresh simultaneous readings and measurement tolerances
before assigning physical path loss. The fourth-row difference identifies an investigation target,
not a proven cable defect or a confirmed failed laser.

[ColorChip's CWDM4 product page](https://www.color-chip.com/products/100g-qsfp28-cwdm4/)
describes four wavelength channels with integrated optical multiplexing/demultiplexing and Tx/Rx
monitoring over two single-mode LC connections. It provides general family information, not a
verified C100Q020CWDM403H threshold table. The displayed per-channel anomaly therefore does not
imply a separate external fiber strand for channel 4. Do not turn the page's OMA sensitivity
specification into an average-power DOM alarm threshold.

The [existing 403B owner reference](colorchip-reference.md) has Rx warning/alarm limits of
-13.70/-15.70 dBm. Even if those values applied, -14.09 would be below the warning but above the
low alarm. Their applicability to **403H** has not been established. The current game's strict
below--15.70 rule must not be used as a universal healthy-link test or silently widened for this
case. Obtain the installed optic's thresholds and a review of single-channel diagnosis first.

Zero FCS/other counters in one snapshot do not establish a healthy link or clean traffic under load.
The interfaces are down; elapsed time, traffic and counter-clear history are absent. No positive
error delta or current flap rate can be derived from these snapshots.

The state histories are materially different: leaf Interface State last changed about seven days
ago, spine about 96 days ago, and leaf Remote Fault changed about five minutes ago. Preserve those
rows. They do not establish a common link-down event five minutes ago or prove that the leaf's
last fault change caused the entire outage. Obtain logs and reset/configuration/connection history
before reconstructing chronology. Do not normalize this evidence into the game's synthetic shared
timeline or interpret MAC Changes as complete down/up cycles.

## Source learner questions

Present the observations before the script conclusion and any later repair outcome. Introduce
the fault-flag meanings and the distinction between average optical power and link operation.

### 1. Which direction should the next investigation prioritize?

- A. spine → leaf because the leaf is reporting Remote Fault.
- **B. leaf → spine: the spine reports Local Fault and one low Rx channel; the leaf receives
  the peer's fault indication.**
- C. Neither direction because all error counters are zero.

Feedback: read fault flags from the reporting endpoint's perspective and corroborate them with
the peer's optics. Directionality does not by itself identify a failed component.

### 2. Which observation is easiest to miss in a module-level summary?

- A. All four spine receive channels have no light.
- **B. Spine Et4/23/4 Rx is -14.09 dBm, while the other three Rx values are near 0 dBm.**
- C. Leaf Et56/4 reports zero transmit power.

Feedback: inspect individual channels. The leaf fourth-row Tx is +0.43 dBm; this case differs from
the 10G example with reported Tx -30.00 and Bias 0.00. Do not average away the outlier.

### 3. What does leaf Remote Fault True prove about the leaf optic?

- A. Its transmitter has definitely failed.
- B. Its receiver has definitely failed.
- **C. It reports a peer-side receive problem; further evidence is needed to isolate the component.**

Feedback: the leaf optic is a candidate under the owner runbook. The flags and telemetry prioritize
the direction, while transmitter/module, optical path and receiver/module causes remain to be isolated.

### 4. Which statement about counters and timestamps is justified?

- A. Zero errors prove the 100G link is healthy.
- B. Both endpoints went down when the leaf Remote Fault changed five minutes ago.
- **C. Both interfaces are currently down; neither clean traffic nor one common outage start is
  established by the counters and differing state ages.**

Feedback: distinct rows record distinct histories. Preserve observations and request the missing
logs/baselines rather than inventing a matching timeline.

### 5. What should the initial handoff say?

- **A. Leaf-to-spine optical/signal-path issue suspected, with low spine channel-4 Rx. Leaf optic
  replacement is the script/runbook recommendation; component failure and repair outcome are unconfirmed.**
- B. Confirmed leaf Tx failure solely because Remote Fault is True; no further verification needed.
- C. Confirmed spine receiver failure because the low reading is displayed on spine.

Feedback: preserve fresh per-channel readings, relevant logs and module thresholds. Record every
intervention separately where possible. After an authorized repair, verify both-end link state,
per-channel Rx/Tx, fault flags, traffic/error deltas, stability and the affected service. If cleaning,
reseating or changing fiber accompanies optic replacement, record it before attributing recovery
exclusively to the removed module.

## Intervention reveal — replacement confirmed; recovery pending

The owner replied, “yes it was replaced,” confirming replacement of the leaf-gw1 Et56/1 optic.
This establishes the action taken, not its measured result. The reply does not explicitly establish
whether the link and low spine receive channel recovered, or whether fibers were cleaned, reseated
or replaced at the same time. Those details remain open; do not infer that no other work occurred.

Present this intervention after learners answer the initial handoff question. A useful debrief is:
what evidence would establish that the replacement resolved the incident? Request post-action
link state and per-channel readings, the observation interval, and accompanying work when available.
Do not borrow the confirmed recovery of U10 for this case or invent post-repair measurements.

## Integration boundary

Keep this case out of automatic threshold-based diagnosis until 403H limits, the single-channel
mechanism, actual EOS/platform provenance and handling of incomplete histories are reviewed. Original counters and
state ages remain evidence, even where they do not meet the existing simulation's grading contract.
A future staged exercise should grade the supported direction and uncertainty before revealing
the actual intervention/outcome. It must not reward “Remote Fault means confirmed Tx failure.”
