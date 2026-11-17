# Mixed Incident Source-to-Simulation Review

**Date:** 2026-11-17 · **Revision:** noc-v2.1-2026-11-17
**Reviewer:** Codex — source-to-simulation review
**Basis:** Owner-requested mixed diagnoses and graphical shuriken submission, Constitution 1.1.0.

This review replaces the original curriculum's category-per-level mapping. The original technical
source records remain provenance; their old round IDs/results are historical, not v2 expectations.
This is a modeling review, not independent hardware qualification or an external technical review.

## Source applicability retained

- [User captures](user-samples.md), U4a–c: working transceiver, MAC detail and interface formats.
  The owner explicitly confirmed the selected spine-gw1 chassis/card/slot, EOS image and optic setup.
- [Deployment review](release-platform-review.md): selected platforms, architectures, ports,
  multi-agent configuration and corrected line card. leaf-gw1 is a same-release format adaptation.
- [ColorChip reference](colorchip-reference.md), U3/U5: all 20 limits and units; −30 means no light,
  and values below the low alarm mean very bad light. Rx low alarm is −15.70 dBm.
- [Output review](output-semantics-review.md): distinguish authored faults/timestamps from working
  captures; complete authored snapshot series is not a captured vendor event log.

No new hardware behavior or vendor compatibility claim is introduced. No additional user evidence
was required. The optical interpretation now exercises the already supplied below-low-alarm rule.
Low readings are not silently converted to “absent.” Exact equality is not “below,” and no broader
alarm severity classifier is claimed.

## Independently derived results

Every incident shows status, optics, paired counters and complete 60-second state history at both
endpoints. Unaffected counters are unchanged; unaffected histories have zero transitions. All four
optical rows and both counter observations are available regardless of the incident category.

| Case | Hand calculation / observation | Single supported result |
| --- | --- | --- |
| L1-R1 | leaf-gw1 900−900=0; spine-gw1 17−5=12; both up, normal Rx, no transitions | CRC / errors, spine-gw1 |
| L1-R2 | leaf-gw1 down, Rx −30 on four rows; counts unchanged, stable history | Light levels, leaf-gw1, absent |
| L2-R1 | spine-gw1 down→up→down→up→down at 5/15/35/55s; normal Rx, no new CRC | Link flapping, spine-gw1, four changes |
| L2-R2 | leaf-gw1 145−120=25; spine-gw1 2400−2400=0; both up, normal Rx, stable | CRC / errors, leaf-gw1 |
| L3-R1 | spine-gw1 −17.20, −16.80, −17.00, −16.90 are each <−15.70; none equals −30; no counter increase or transitions | Light levels, spine-gw1, degraded |
| L3-R2 | leaf-gw1 up→down→up→down→up at 10/20/40/60s; normal Rx, no new CRC | Link flapping, leaf-gw1, four changes |

Reviewed current status against the final history state; both counter states against the interval
boundaries; Rx values against terminal rows; cumulative CRC values against interface excerpts;
help solutions against this table. All sample timelines are authored UTC, not an inferred timezone
for a capture. Ports, units and selected optic thresholds are retained. Output/observation agreement
also has a regression assertion. Normal optical values use the supplied working sample.

## Learning and interaction review

One briefing introduces all three methods. Every incident offers the same three category targets;
no title, group, choice index, hint availability or tool set preselects an answer. The same six
findings are computed for every incident, and exactly one endpoint/category must be supported.
Wrong feedback explains why the selected category is unsupported. Correct feedback derives the
receiver and excludes repair, causal certainty and IPv6 proof. Help is explicitly assisted practice.

Shuriken graphics illustrate an explicit submission. They cannot alter a rule, score by timing,
or postpone feedback. Keyboard/reduced-motion implementation is present, but browser behavior
and visual quality remain unverified while computer-use tools are unavailable.

## Owner naming and addressing update

Revision noc-v2.1-2026-11-17 applies the requested fictional names: DCS-7050SX3-48YC8 is
leaf-gw1 and DCS-7808-CH is spine-gw1. The training link uses 2001:db8:51::/126,
with ::1 on leaf-gw1 and ::2 on spine-gw1. Device/output references, CLI prompt aliases,
hints and documentation were checked for the same mapping. Source hardware, measurements,
thresholds and the six expected diagnoses are unchanged. The /126 is the owner's selected
training configuration; no claim about deployment prevalence is needed for grading.
