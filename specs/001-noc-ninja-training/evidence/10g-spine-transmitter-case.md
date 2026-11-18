# U10 — 10G link down with suspected spine transmitter failure

**Received:** 2026-11-18, owner-supplied, sanitized example.
**Status:** playable in Guided NOC patrol; preserved source evidence and instructor notes below.
**Outcome:** owner confirms replacement of the spine-gw1 Et9/34 optic restored the link,
transmit power and stable error counters. Post-replacement captures and observation duration
have not been supplied.

The owner supplied pre-repair observations, a separate automated assessment and a subsequent
confirmation of recovery. Preserve those stages: the script alone did not establish the repair
result; recovery is owner-reported rather than independently measured here. Identifiers below use
the existing fictional endpoint aliases; serials, locations, asset/RFID identifiers and ticket
numbers are omitted. Whitespace is normalized. Values and endpoint-specific histories are retained.

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
| leaf-gw1 | DCS-7010T-48-R | 4.28.12M | Et52 | FINISAR CORP. | FTLX8574D3BCL |
| spine-gw1 | DCS-7808-CH | 4.31.10M | Et9/34 | FINISAR CORP. | FTLX8574D3BCL |

The owner identifies this as a 10G link. The spine line-card model, fiber grade/length, administrative
state, configured speed and module alarm thresholds have not been supplied. Do not borrow those
facts from the existing 100G exercises. Voltage and Bias units were not included in the pasted
headers; preserve the headers until the original tool output confirms them.

## Supplied observations

The counter and optics tables have no explicit observation timestamps or original command names.
The MAC snapshots have device-local timestamps one second apart; timezone and clock synchronization
are unknown. Do not silently convert these timestamps to UTC.

| Endpoint / port | FCS | Align | Sym | RX | TX |
| --- | ---: | ---: | ---: | ---: | ---: |
| leaf-gw1 Et52 | 24,786 | 0 | 4,686 | 24,834 | 0 |
| spine-gw1 Et9/34 | 0 | 0 | 0 | 0 | 0 |

| Endpoint / port | Temp (°C) | Voltage | Bias | Tx (dBm) | Rx (dBm) |
| --- | ---: | ---: | ---: | ---: | ---: |
| leaf-gw1 Et52 | 57.75 | 3.36 | 9.90 | -4.34 | -26.78 |
| spine-gw1 Et9/34 | 25.73 | 3.33 | 0.00 | -30.00 | -5.61 |

```text
leaf-gw1# show interfaces Ethernet52 mac detail
    Current System Time: Wed Nov 18 10:11:24 2026

    Ethernet52
                            Current State   Changes     Last Change
    PHY State               linkDown        114503      0:18:14 ago
    Interface State         linkDown        57617       0:18:20 ago
    MAC Rx Local Fault      True            428027      0:18:14 ago
    MAC Rx Remote Fault     False           622         16:09:16 ago

spine-gw1# show interfaces Ethernet9/34 mac detail
    Current System Time: Wed Nov 18 10:11:25 2026

    Ethernet9/34
                            Current State   Changes     Last Change
    PHY State               linkDown        742         0:18:14 ago
    Interface State         linkDown        145521      0:18:15 ago
    MAC Rx Local Fault      True            1485        0:18:15 ago
    MAC Rx Remote Fault     False           1204820     0:18:15 ago
```

## Owner's script assessment, kept separate from measurements

- Issue label: Link Down & Input Errors.
- Summary: Optic Issue on spine-gw1.
- Root Cause Device field: spine-gw1.
- Evidence cited: spine Tx -30.00 dBm and leaf Rx -26.78 dBm; remote Tx failure suspected.
- Historical claim: 38,732 status changes in 4 months, 30 days, 1 hour, 23 minutes, reported as
  10.6/hour and described as link flapping.
- Recommendation: replace the optic on spine-gw1 Et9/34.

The owner confirms that the script uses “flap” to mean **each link-state transition**, up to down
or down to up; a complete down/up cycle therefore contains two transitions. The owner tentatively
recalls that the interval starts at the last counter clear, but has not checked the script.

The underlying counter/baseline and timestamps for 38,732 are absent. It is not either displayed
MAC Interface State total. A different counter or reset interval could account for that, so retain
it as an unverified script summary rather than asserting a contradiction. Clarify whether the
interval actually starts at the last counter clear and how calendar months become elapsed hours.
For teaching, label the reported rate **10.6 state transitions/hour (script-reported; calculation
unverified)**, not 10.6 complete down/up cycles per hour.

## Evidence interpretation for the case

**Supported current condition:** both displayed interfaces and PHYs are down. The optical telemetry
strongly prioritizes investigation of the spine-to-leaf transmit direction.

| Direction | Reported transmit power | Reported peer receive power | Interpretation |
| --- | ---: | ---: | --- |
| spine → leaf | -30.00 dBm | -26.78 dBm | Spine reports very low output and Bias 0.00; leaf reports very low received power. Investigate spine transmitter operation first. |
| leaf → spine | -4.34 dBm | -5.61 dBm | Light is reported in the reverse direction; this alone does not prove valid frames, an operational PHY or service recovery. |

**Operational diagnosis:** high-confidence spine optic transmit failure. Zero reported bias,
Tx -30.00 and peer Rx -26.78 strongly support replacing the spine-gw1 Et9/34 optic under the
incident runbook. The reverse direction still reports light. Treating this only as an unspecified
path hypothesis underweights the transmitter's own telemetry.

**Standing training assumption:** intentional transmitter disable is excluded from every
incident in this game. It is not an alternative diagnosis or a prerequisite check in this lesson.
This is an owner-defined scenario constraint, not an additional captured command or reading.
MAC Rx Local Fault remains distinct from the module's transmitter-fault signal.

The zero spine error counters do not exonerate its transmitter: the leaf is the receiver for that
direction. Conversely, leaf FCS 24,786 is an accumulated observation, not a measured rate or proof
that errors are increasing now. Keep FCS, Sym and RX separate; do not sum overlapping counters or
infer an exact field relationship without the source tool's definitions.

Neither endpoint's last interface change is recent within a 60-second exercise window: each reports
about 18 minutes. This snapshot supports a sustained current down state, not the existing game's
four-changes-in-60-seconds flapping diagnosis. Historical instability may still be relevant.
Do not reinterpret cumulative PHY, interface, Local Fault and Remote Fault changes as one shared
flap counter, or treat Remote Fault False as proof that the peer transmitter is healthy.

The MAC state ages differ between endpoints and between rows. Preserve them as captured; do not
fabricate synchronized events to satisfy the current game's authored timeline convention.

## Optic-specific source review

[Coherent's product page](https://www.coherent.com/networking/transceivers/datacom/FTLX8574D3BCL)
identifies this model as an 850 nm, duplex-multimode SFP+ for 10GBASE-SR/SW. This is a different
optical profile from the game's four-channel 100G CWDM4 module.

[Finisar product specification, June 2015 Rev. B, hosted by DigiKey](https://mm.digikey.com/Volume0/opasdata/d220001/medias/docus/1034/FTLX8574D3BCL.pdf):

- Section I documents a separate transmitter-fault indication and transmitter-disable capability.
  Intentional disable is excluded by the game’s standing scenario assumption.
- Section IV lists informative average launch power of -5 to -1 dBm and off-transmitter power
  no greater than -30 dBm. These are not this device's captured DOM alarm thresholds.
- Section IX rates Tx diagnostic accuracy over -9 to -2.5 dBm and Rx over -20 to 0 dBm.
  The incident's extreme readings fall outside those accuracy ranges; do not calculate physical
  path gain from -30.00 Tx and -26.78 Rx, or treat the displayed decimals as calibrated precision.
- Receiver sensitivity specified in OMA is not a drop-in alarm threshold for average Rx DOM power.

The manufacturer-hosted datasheet was discoverable in search but direct retrieval failed; the
readable Finisar-authored Rev. B document above supplies the reviewed details. Exact installed
module revision, platform reporting-floor behavior and EEPROM thresholds still require confirmation.

## Source questions and instructor feedback

These questions are scored for evidence reasoning in Guided NOC patrol; the retired synthetic classifier is not used. Supply the
introductory direction diagram/table and explain cumulative counters before asking them. Present
the questions using only the pre-repair evidence; reveal the owner-confirmed outcome afterward.

### 1. Which optic does the combined evidence identify as the replacement target?

- A. leaf-gw1, solely because it records the most FCS errors.
- **B. spine-gw1 Et9/34: Tx -30.00 and Bias 0.00 correlate with leaf Rx -26.78.**
- C. Neither endpoint, because spine's error counters are zero.

Feedback: Bias 0.00 and Tx -30.00 show no reported laser drive and essentially absent transmit light at the spine; leaf Rx -26.78 corroborates the same direction. This is strong, actionable evidence of spine optic transmit failure, not merely a guess based on receive errors.

### 2. What does the leaf's FCS count establish?

- A. There are 24,786 new errors per second.
- **B. The snapshot reports 24,786 accumulated FCS errors; the current trend is unknown. Monitor timed samples to see whether the count is still increasing or reflects historical errors.**
- C. The leaf optic must be replaced.

Feedback: Preserve the current reading and collect further timestamped samples from the same interface. Compare deltas with the elapsed time and record any counter clear, rollover or reboot. Increasing counts show new errors; an unchanged total shows no new errors during that interval. Because this link is currently down, repeat the check after recovery under traffic before judging it healthy. Monitoring complements the supported optic replacement; it does not require delaying it.

### 3. Does this snapshot prove the link is flapping now?

- A. Yes; the large MAC totals establish frequent changes in the last minute.
- B. No; it proves the link has never flapped.
- **C. No current flap rate is established. Both interfaces are down and last changed roughly 18 minutes ago. Monitor link state and MAC change counts over a timed interval to see whether bouncing continues or the recorded changes are historical.**

Feedback: Save both endpoints’ MAC detail with timestamps, then poll again and inspect event logs for new up/down transitions. Compare each row with its own earlier value; Interface State changes and Remote Fault changes are different histories. One up or down transition is one flap in this runbook. The script’s 10.6/hour rate still needs its source counter and interval checked; do not assume its baseline matches the MAC history or the last interface-counter clear. In the training environment, interface counter clears leave MAC state/fault change histories intact; those histories reset with a switch reboot. Monitor their deltas rather than rebooting to obtain a zero baseline.

### 4. Which corrective action is best supported by the optical readings and MAC fault history?

- **A. Replace the optic on spine-gw1 Et9/34, preserving the baseline and checking both-end link state, optical readings and new errors afterward.**
- B. Replace the leaf-gw1 Et52 optic because that interface has the larger FCS count.
- C. Clean only the fiber and leave the spine optic in place; the low leaf Rx alone explains all the readings.

Feedback: Spine MAC Rx Remote Fault has 1,204,820 changes and last changed 0:18:15 ago; leaf has 622 changes and last changed 16:09:16 ago. The leaf has no comparably recent Remote Fault transition in this capture. Both flags are currently False: these are historical changes, not active alarms or counts of separate failures. Remote Fault at the spine means the leaf reported trouble receiving the spine-to-leaf signal. Repeated Remote Fault transitions on a flapping link are a useful clue to a possible transmitting-optic fault; here that directional history combines with zero spine bias, Tx -30.00 and very low leaf Rx to make the spine optic almost certainly bad under the game’s assumptions. Replace spine-gw1 Et9/34’s optic, then verify optical recovery, both-end state, new errors under traffic and continued stability.

### 5. Which handoff records the diagnosis and next action without claiming an unperformed repair?

- A. Spine optic failure; replacement has already restored service, so close the incident now.
- **B. High-confidence spine optic transmit failure: zero bias, Tx -30.00, low leaf Rx and the spine’s more recent Remote Fault history agree. Replace spine-gw1 Et9/34’s optic and verify recovery before closure.**
- C. Confirmed leaf receive failure; the spine is healthy because its receive power is higher.

Feedback: A strong diagnosis supports action; it does not mean the action has already succeeded. Record the spine optic replacement recommendation now, then document the actual intervention and both-end optical readings, link state, comparable error deltas, stability and service checks afterward.

## Outcome reveal and debrief

The owner confirms that the optic on **spine-gw1 Et9/34 was replaced**, after which the link and
transmit power recovered and error counters were stable. This confirms successful repair following the
spine-side optic replacement and reinforces the high-confidence pre-repair diagnosis.
No numeric post-repair readings, monitoring interval or separate service-test results were supplied;
do not invent them or describe the error counters as cleared to zero.

Reveal this outcome after learners commit to the pre-repair questions. Ask them to distinguish
what was justified before the intervention from what the recovery adds. The initial evidence
supported a high-confidence spine optic transmit-failure diagnosis; the owner-reported outcome supports successful recovery
after replacement. It is not component-level laboratory proof of the internal failure mechanism.

## Outstanding information and integration boundary

1. Optional post-action captures, observation duration and affected-service verification to supplement
   the owner's confirmed link/transmit-power/error-counter recovery.
2. Source counter and exact interval behind the script's 38,732 / 10.6-per-hour claim. Transition
   meaning is confirmed; use of time since last clear is tentative until the script is reviewed.
3. Original optics/counter commands, units, timestamps, reset history and module alarm/fault output.
4. Administrative state, speed, spine line card, fiber details and timezone/clock context as needed
   for an accurate platform-specific playable case.

This capture supports the playable reasoning questions above. Future threshold-based diagnosis
needs a separate 10G platform/optic profile and explicit handling of incomplete evidence. Do not
insert it into `data/levels.json`, manufacture a second sample, reuse ColorChip limits, or claim
verification on EOS 4.36.3M. Current runtime validation intentionally expects the original deployment.


## Teaching correction — 2026-11-18

Owner feedback: the combination of zero spine bias, Tx -30.00 and very low peer Rx should teach
a confident spine optic replacement decision. Decisions 1, 4 and 5 now distinguish actionable
diagnostic confidence from a repair outcome that has not yet occurred. Intentional transmitter disable is excluded by the owner’s subsequent standing game assumption. No readings or outcomes were invented.
Manufacturer specification rechecked: Finisar Rev. B, sections I and IV, at the linked PDF above.


## Monitoring, reset scope and Remote Fault teaching — 2026-11-18

Owner instruction adds timed monitoring of accumulated FCS and MAC state changes, rather than
ending at “trend unknown.” The MAC history corroborates the replacement target: spine Remote
Fault Changes 1,204,820 / Last Change 0:18:15, versus leaf 622 / 16:09:16. Both current values
are False. Preserve this distinction: changes count transitions of the fault indication, not
individual failed optics, current assertions, or a measured recent fault frequency. Remote Fault
at spine describes the peer detecting a receive problem in the spine-to-leaf direction.

Reset behavior is owner-supplied operational guidance for the training environment: interface
counter clearing leaves MAC state/fault histories intact; reboot resets those histories. This is
not independently verified as the only possible reset mechanism on every EOS version/platform.
No counter-clear or reboot output is fabricated. Teach timestamped deltas, not reboot-to-reset.

[Arista’s Layer 1 Debug Guide](https://arista.my.site.com/AristaCommunity/s/article/Layer-1-T-shooting-TOI)
defines Local/Remote Fault directionality and advises repeat MAC captures. Its PHY section says
PHY counters cannot presently be cleared, but does not establish a universal reboot-only rule for
all MAC history. Reviewed via the indexed article; direct page retrieval returned a CSS error.

[EOS clear counters documentation](https://www.arista.com/en/um-eos/eos-data-transfer)
describes interface counter resets and session-relative baselines, with SNMP counters excluded.
Use “traffic/error counters” (including packet/byte statistics), not “only rates and errors.” Rates
are measurements over time; a counter clear is not evidence that the link has recovered.
