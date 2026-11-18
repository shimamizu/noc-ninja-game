# Mixed Incident Source-to-Simulation Review

**Date:** 2026-11-17 · **Revision:** noc-v3-2026-11-17
**Reviewer:** Codex — source-to-simulation review
**Basis:** Owner-requested mixed diagnoses and graphical shuriken submission, Constitution 1.1.0.

This review replaces the original curriculum's category-per-level mapping. The original technical
source records remain provenance; their old round IDs/results are historical, not v2 expectations.
This is a modeling review, not independent hardware qualification or an external technical review.

## Source applicability retained

- [User captures](user-samples.md), U4a–c: working transceiver, MAC detail and interface formats.
  The owner explicitly confirmed the selected spine-gw1 chassis/card/slot, EOS image and optic setup.
- [Deployment review](release-platform-review.md): selected platforms, architectures, ports,
  multi-agent configuration and corrected line card. Leaf optics/MAC-history use a same-release
  format adaptation; complete interface layouts now follow U6 for each endpoint.
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
| L1-R2 | Both endpoints down; leaf-gw1 Rx −30 on four rows; counts unchanged, stable history | Light levels, leaf-gw1, absent |
| L2-R1 | Both endpoints down→up→down→up→down at 5/15/35/55s; normal Rx, no new CRC | Link flapping, both endpoints, four shared changes |
| L2-R2 | leaf-gw1 145−120=25; spine-gw1 2400−2400=0; both up, normal Rx, stable | CRC / errors, leaf-gw1 |
| L3-R1 | Both endpoints down; spine-gw1 −17.20, −16.80, −17.00, −16.90 are each <−15.70; none equals −30; no counter increase or transitions | Light levels, spine-gw1, degraded |
| L3-R2 | Both endpoints up→down→up→down→up at 10/20/40/60s; normal Rx, no new CRC | Link flapping, both endpoints, four shared changes |

Reviewed current status against the final history state; both counter states against the interval
boundaries; Rx values against terminal rows; cumulative CRC values against interface excerpts;
help solutions against this table. All sample timelines are authored UTC, not an inferred timezone
for a capture. Ports, units and selected optic thresholds are retained. Output/observation agreement
also has a regression assertion. Normal optical values use the supplied working sample.

## Learning and interaction review

One briefing introduces all three methods. Every incident offers the same three category targets;
no title, group, choice index, hint availability or tool set preselects an answer. The same six
findings are computed for every incident, and exactly one diagnosis must be supported. Matching flap histories at both endpoints describe one link condition.
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

## Full interface update — noc-v2.2-2026-11-17

[U6 full interface examples](full-interface-samples.md) now supply both platforms' layouts.
Reviewed all 24 interface snapshots: field inventory, peer descriptions, MTU/MRU and uni-link
variation, counter-clear style, CRC consistency, state age and cumulative changes versus history,
and background traffic totals. All six independent expected diagnoses above remain unchanged.
The leaf prompt follows its supplied form without the spine's session marker. Scenario values
and MACs remain simulated; source-to-simulation details and limits are recorded with U6.

## Error and MAC format update — noc-v2.3-2026-11-17

[U7](error-mac-samples.md) supplies counters-errors, MAC-detail and compact status layouts.
Reviewed explicit earlier/later error-table pairing, FCS-to-CRC mapping, all current/archived MAC
rows, system times, cumulative changes/ages and status/port identities. Full U6 interface detail
remains accessible separately. The five tools are identical at both endpoints. The supplied
FCS=3→3 / Rx=1323→1324 pair is retained as source evidence, not mislabeled as rising FCS or
used as a new graded case. All six independent diagnoses and optical references are unchanged.

## Shared timeline correction — noc-v2.4-2026-11-17

The owner requires one synchronized link timeline. Stable-up cases now show 21 days,
5:58:29 at both ends at 12:01:00; stable-down optical cases show 11 minutes down at both
ends, with poor Rx evidence specific to the identified receiver. Flapping cases reproduce
the same four transitions at both ends, finishing down for 5 seconds or up for 0 seconds.
Corresponding MAC event ages match throughout the history, including unchanged fault rows.
All tools use the same event times. Device-local counter reset ages/totals are independent.
Original source captures retain their historical timestamps; simulation dates are authored.

## Directional fault correction — noc-v2.5-2026-11-17

[U8](paired-down-link.md) supersedes the v2.4 requirement to match every MAC row across
endpoints. Interface State event times remain shared. PHY and fault rows retain their own
event times. Both optical incidents now show PHY up/Interface down/Local False/Remote True
at the normal-light peer, while the affected receiver shows PHY down/Local True/Remote False.
The degraded variant is authored. L1-R2 demonstrates zero post-clear link-change counts with
nonzero MAC history; no reset occurs during its observation window. All six diagnoses remain
unchanged. The sample’s port-channel and different platform layout are not adopted.

## Flap timestamps and endpoint telemetry — noc-v2.6-2026-11-17

The owner requested aligned Remote Fault False ages for flapping and distinct readings at
each switch. All flap MAC snapshots now align that row with the shared Interface State event.
Supporting authored assert/clear pulses add two fault changes per link transition; only four
Interface State changes count toward the diagnosis. This models the requested exercise, not
a newly captured hardware behavior. Static-down directional examples are preserved.

Leaf transceiver background readings and normal Rx now follow a separate profile adapted
from the normal-light peer in U8. Spine retains the U4 profile. All normal readings remain
within the supplied warning limits; receive powers do not exceed the peer’s transmit values.
The four −30 leaf values and four degraded spine values remain unchanged. Automated checks
compare numeric columns at both endpoints, displayed/structured readings and all six diagnoses.

## v3 superseding review

[U9](technician-runbook.md) is the current independent six-case table. It supersedes older
no-CRC statements for L2-R1, normal-Tx statements for L3-R1 and all-False leaf Remote Fault
statements for L3-R2. Category answers remain the same; the visible secondary evidence now
supports a unique replacement recommendation. Runbook actions are not proven component causes.
