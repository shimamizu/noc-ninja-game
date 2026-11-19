> Archived by owner request. This example is not in the playable library; the current patrol uses U13 only. The record below is historical.

# U12 — 100G link up with a low receive channel and recorded errors

**Received:** 2026-11-18, owner-supplied, sanitized example.
**Status:** playable in Guided NOC patrol; preserved source evidence and instructor notes below.
**Intervention/outcome:** owner reports that cleaning and replacing the optic on leaf-gw1 resolved
the issue. Exact post-action optical values, error-counter samples and monitoring duration have
not been supplied. This combined intervention does not isolate which action caused recovery.

This is a separate incident from U11: the spine port is Et8/5/1, not Et4/23/1. Reuse of fictional
leaf-gw1 Et56/1 does not make the captures successive observations of the same incident.
Serials, locations, asset/RFID identifiers and ticket numbers are omitted. Values and state ages
below retain the supplied content; whitespace is normalized.

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
| spine-gw1 | DCS-7808-CH | 4.31.10M | Et8/5/1 | ColorChip ltd | C100Q020CWDM403H |
| leaf-gw1 | DCS-7050SX3-48YC8-R | 4.31.10M | Et56/1 | ColorChip ltd | C100Q020CWDM403H |

The owner identifies a 100G link. Spine line-card identity, fiber path details, installed-module
thresholds, counter reset history and original counter/optics commands are not supplied.
Voltage/Bias units are not explicit in these table headers. The owner confirms both endpoints were
polled at the same time, consistent with the identical printed MAC timestamps. Timezone is unknown.
That confirmation does not identify the raw reads or calculation that produced each of the script's
differing error totals; preserve those separately until their provenance is checked.

## Supplied observations

| Endpoint / port | FCS | Align | Sym | RX | TX |
| --- | ---: | ---: | ---: | ---: | ---: |
| spine-gw1 Et8/5/1 | 236 | 0 | 40 | 277 | 0 |
| leaf-gw1 Et56/1 | 0 | 0 | 0 | 0 | 0 |

| Endpoint / optical row | Temp (°C) | Voltage | Bias | Tx (dBm) | Rx (dBm) |
| --- | ---: | ---: | ---: | ---: | ---: |
| spine-gw1 Et8/5/1 | 38.43 | 3.27 | 56.59 | 0.76 | 0.56 |
| spine-gw1 Et8/5/2 | 38.43 | 3.27 | 56.42 | 0.57 | -15.21 |
| spine-gw1 Et8/5/3 | 38.43 | 3.27 | 56.76 | 1.40 | 0.21 |
| spine-gw1 Et8/5/4 | 38.43 | 3.27 | 56.51 | 0.70 | 0.33 |
| leaf-gw1 Et56/1 | 47.81 | 3.33 | 58.18 | 1.26 | -0.00 |
| leaf-gw1 Et56/2 | 47.81 | 3.33 | 57.60 | 1.34 | 0.14 |
| leaf-gw1 Et56/3 | 47.81 | 3.33 | 57.60 | 1.30 | 0.74 |
| leaf-gw1 Et56/4 | 47.81 | 3.33 | 53.32 | 1.07 | 0.41 |

Preserve the displayed -0.00 spelling; it is not a no-light indication. Optical row labels are not
evidence of four independently configured Ethernet links. The supplied table has no Runts column.

```text
spine-gw1# show interfaces Ethernet8/5/1 mac detail
    Current System Time: Wed Nov 18 10:23:55 2026

    Ethernet8/5/1
                            Current State   Changes     Last Change
    PHY State               linkUp          8           0:05:44 ago
    Interface State         linkUp          8           0:05:45 ago
    MAC Rx Local Fault      False           22          0:05:49 ago
    MAC Rx Remote Fault     False           10          0:05:49 ago

leaf-gw1# show interfaces Ethernet56/1 mac detail
    Current System Time: Wed Nov 18 10:23:55 2026

    Ethernet56/1
                            Current State   Changes     Last Change
    PHY State               linkUp          8           0:05:45 ago
    Interface State         linkUp          10          0:05:45 ago
    MAC Rx Local Fault      False           22          0:05:52 ago
    MAC Rx Remote Fault     False           12          0:05:45 ago
```

## Owner's automated assessment — separate source

- Issue: Link Issue; summary: Optic Issue on leaf-gw1; Root Cause Device: leaf-gw1.
- Headline: leaf-gw1 Et56/1 TX failure causing **533 RX errors** on spine-gw1 Et8/5/1 since ports
  were enabled approximately five minutes ago; labeled “ROOT CAUSE IDENTIFIED.”
- Breakdown: **267 RX errors: 227 FCS, 39 Symbol, 1 Runts**.
- Recommended sequence: replace leaf optic; if unresolved, clean all fiber connectors; check/clean
  LIU ports; if still unresolved, replace the spine optic.

This is an owner-supplied recommendation sequence, not proof of a failed leaf transmitter or a
universally required repair order. The excerpt is pre-intervention evidence; the owner's subsequent
confirmation of cleaning/replacement and resolution is recorded in the outcome reveal below.

## What the measurements establish

Both interfaces and PHYs currently report up; all displayed Local/Remote Fault flags are False.
Nevertheless, spine optical row 2 has Rx **-15.21 dBm**, 15.42–15.77 dB below its other Rx channels,
and spine records nonzero receive-error counters. These observations warrant investigation of
the **leaf → spine** direction. Current up/False status is not a complete health assessment.

If row 2 maps to the corresponding channel at both ends, reported leaf Tx +1.34 minus spine Rx
-15.21 is **16.55 dB**. Treat that as a difference in reported telemetry, not a calibrated path-loss
measurement. Confirm channel mapping and fresh captures before interpreting it physically.
The suspect direction includes leaf transmit/module optics, the intervening path and spine receive/
module optics; the captured Tx power alone neither proves nor rules out a leaf optic problem.

The installed optic is **403H**. The [existing 403B reference](colorchip-reference.md) does not
establish its alarm thresholds. Even under that other model's -13.70/-15.70 Rx warning/alarm values,
-15.21 falls between warning and alarm. Do not treat the game's below--15.70 rule as a universal
criterion or lower it merely to make this sample fit. The channel imbalance and receive errors
are useful observations independently of an unverified model-specific alarm classification.

As reviewed in [U11](100g-single-channel-receive-case.md),
[ColorChip's family description](https://www.color-chip.com/products/100g-qsfp28-cwdm4/)
uses four wavelength channels and integrated optical multiplexing/demultiplexing over duplex
single-mode connections. A low channel does not identify a separate external fiber strand to replace.
The family source does not independently qualify this exact suffix, hardware or EOS release.

## Counter provenance and possible aggregation problem

Keep the displayed counters, script breakdown and script headline distinct:

| Source | FCS | Symbol | Runts | RX / reported total |
| --- | ---: | ---: | ---: | ---: |
| Displayed spine table | 236 | 40 | Not shown | 277 |
| Script breakdown | 227 | 39 | 1 | 267 |
| Script headline | Not specified | Not specified | Not specified | 533 |

The breakdown arithmetic is **227 + 39 + 1 = 267**. Also, **267 + 227 + 39 = 533** exactly.
This suggests a possible aggregation bug: adding an RX total to FCS/Symbol categories already
included in that total. It is a hypothesis to verify in the script and underlying counter semantics,
not an established bug. Both endpoints were polled together according to the owner; do not explain
the discrepancy as polling the leaf and spine at different times. The relationship between the
script's internal reads, breakdown and rendered table remains unverified.

Between the breakdown and displayed values, the numerical differences are FCS +9, Symbol +1 and
RX +10. Numerical differences alone do not establish that one set is a later sample or that reset
continuity holds. Do not grade those differences as an observed ongoing-error delta. Do not
invent a displayed Runts count from 277 minus 236 minus 40, or combine this incident with U11.

The roughly 5:45 interface-state age is not a timestamp for counters being cleared or proof of
when an operator enabled the port. The script's “since enabled” claim requires its baseline/source.
Do not calculate an errors-per-second rate from these cumulative counts and uptime. Obtain two
ordered, timestamped reads of the same counters with known reset/rollover continuity and traffic
context. Preserve each counter separately unless a documented, non-overlapping aggregation is used.

The [earlier counter source review](error-mac-samples.md) likewise keeps FCS and aggregate Rx
separate. Its example is not evidence that the field relationship is identical on this exact setup.

## State-history interpretation

Both Interface State ages are 5:45, but change totals differ (spine 8, leaf 10); PHY and fault ages
also differ. Preserve those distinctions. A current cleared fault flag does not establish that
receive quality is good, and cumulative Changes do not reveal the count of transitions in the
last minute. No recent four-transition window or root-cause sequence can be reconstructed here.
Do not rewrite the raw history to satisfy the retired simulation’s timeline conventions.

## Five source learner questions

Present raw observations first. Reveal the script assessment for question 4, then any confirmed
intervention/outcome after learners commit to their handoff. Explain cumulative counters and
per-channel readings before grading reasoning about them.

### 1. Does linkUp with both fault flags False establish a healthy link?

- A. Yes; those fields rule out all physical-layer issues.
- **B. No; spine has a conspicuously low receive channel and recorded receive errors to investigate.**
- C. No; this proves the link is flapping four times per minute.

Feedback: current link state, optical measurements, counter trends and service performance answer
different questions. This snapshot warrants investigation without establishing an ongoing error rate.

### 2. Which direction and optical row deserve attention first?

- **A. leaf → spine, particularly spine Et8/5/2 Rx -15.21 dBm.**
- B. spine → leaf because spine is where errors are displayed.
- C. All channels are equally impaired because they share a module temperature.

Feedback: the spine receives from the leaf. Compare individual channels and preserve the endpoint
reporting each measurement; do not infer component failure merely from where symptoms appear.

### 3. What additional evidence establishes whether FCS errors are increasing now?

- A. Divide 236 by the interface-state age.
- B. Add FCS, Symbol and RX together to get a larger total.
- **C. Obtain ordered timestamped samples of the same FCS counter, establish reset continuity and
  note traffic conditions.**

Feedback: neither uptime nor a single accumulated count supplies a valid current error rate.

### 4. How should you handle the script's 533-error headline?

- A. Accept it because an automated analysis must be more accurate than raw output.
- **B. Verify its source and aggregation: the breakdown totals 267, and 533 equals 267 + 227 + 39,
  which may count overlapping categories twice. Trace the script's source reads and calculation.**
- C. Replace every value with 277 and discard the original observations.

Feedback: both endpoints were polled together. Retain provenance and check the code before
declaring either an aggregation bug or a counter trend from the differing table/breakdown values.
Neither the largest number nor the newest-looking number automatically resolves the discrepancy.

### 5. Before the intervention, which initial handoff is supported?

- A. Confirmed failed leaf transmitter; the link has accumulated exactly 533 new errors in five minutes.
- **B. Link currently up with recorded spine receive errors and low channel-2 Rx; leaf-to-spine
  impairment suspected. Leaf optic is the script's first replacement candidate; cause, trend and
  repair result require verification.**
- C. Incident resolved because both fault flags are False.

Feedback: record the owner's replacement/cleaning/LIU/spine-fallback sequence as a proposed runbook,
not completed work. Preserve pre-action evidence and document each intervention and its result.
After authorized work, check per-channel optics, both-end state, new error deltas under traffic,
stability over an appropriate interval and the affected service. LinkUp alone is insufficient here.

## Outcome reveal — combined intervention resolved the issue

The owner identifies **cleaning and replacing the optic on the leaf gateway** as the work that
resolved this Et8/5/1 incident. Reveal that result after the initial evidence questions. It supports
the usefulness of investigating and intervening on the leaf side, but cannot distinguish the effect
of cleaning from optic replacement or accompanying reconnection. The cleaned surfaces and order
of actions were not specified; do not invent LIU work or a spine replacement.

The owner has not supplied separate post-repair readings or a measured no-new-errors interval.
Record the overall resolution as owner-reported without assigning a new Rx value, assuming counters
were cleared to zero, or asserting laboratory confirmation of a failed transmitter.

Debrief prompt: **What can you conclude after two changes resolve an incident?** Expected answer:
the combined intervention resolved the reported problem; attributing recovery exclusively to the
removed optic requires additional isolation evidence. Capture before/after measurements and each
action's result when available.

## Pending information and integration boundary

- Optional post-action channel-2 readings, comparable counter samples and monitoring duration to
  supplement the owner-reported resolution; exact cleaning scope and intervention order if known.
- Source code or raw, timestamped reads behind 533, 267 and 277; the aggregation and baseline used.
- Installed 403H threshold output, channel mapping, exact platform/card and relevant configuration.

This is playable as an evidence-reasoning case. The guided patrol grades channel-specific evidence, uncertain counter trends and
hypothesis-versus-outcome reasoning. The original synthetic classifier has been removed. Do not fabricate a second snapshot, transfer 403B limits, or label the data as EOS 4.36.3M.
