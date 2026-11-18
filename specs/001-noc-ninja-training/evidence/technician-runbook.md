# U9 — Technician dispatch training runbook

**Authority:** owner requirements, 2026-11-17. **Revision:** noc-v3-2026-11-17.
This is the requested replacement policy for authored exercises, not a vendor guarantee that
CRC or a fault flag proves an optic has failed. No real dispatch or replacement is performed.

| Evidence | Game recommendation |
| --- | --- |
| New received FCS/CRC errors | Diagnose at the receiver; replace the optic at the opposite endpoint. |
| Interface down, Remote Fault True | Replace the optic at that same endpoint. |
| Link flapping | Inspect new receive errors and observed Remote Fault assertions during the window; use the same direction rules. Flapping alone selects no endpoint. |
| Tx outside supplied alarm limits | Replace that transmitting endpoint's optic. |

“Really bad Tx” is implemented using the supplied ColorChip alarm thresholds: strictly below
−9.00 dBm or above +3.30 dBm. Equality is not outside. Normal warning values are not replacement
triggers. Both Tx and Rx are shown, stored as four structured channel readings and checked against
CLI output. The bad-Tx case uses leaf −16.00/−15.70/−15.90/−15.80 dBm and lower received powers
at spine. These are authored values and preserve positive path loss.

A complete synchronized flap history takes diagnosis precedence over corroborating CRC errors.
One bad transmitter plus its peer's bad Rx is a single optical-path diagnosis. Unrelated conflicting
categories remain content errors. Dispatch collects every directional clue: all must agree on one
endpoint. Missing or contradictory destination evidence blocks playable content rather than guessing.
Historical cumulative MAC changes alone do not establish Remote Fault assertions during the window.

## Independent scenario results

| Case | Diagnosis | Replacement destination | Supporting evidence |
| --- | --- | --- | --- |
| L1-R1 | CRC / errors at spine | leaf-gw1 Et51/1 | spine FCS 5 → 17 |
| L1-R2 | No receive light at leaf | spine-gw1 Et3/15/1 | spine Interface down, Remote Fault True |
| L2-R1 | Link flapping | leaf-gw1 Et51/1 | Four shared interface transitions; spine FCS 0 → 12 |
| L2-R2 | CRC / errors at leaf | spine-gw1 Et3/15/1 | leaf FCS 120 → 145 |
| L3-R1 | Bad leaf Tx / degraded spine Rx | leaf-gw1 Et51/1 | leaf Tx below −9.00 and Remote Fault True agree |
| L3-R2 | Link flapping | leaf-gw1 Et51/1 | leaf Remote Fault False→True→False→True→False at 0/10/20/40/60 seconds |

L3-R2 now shows actual Remote Fault True snapshots on leaf during down intervals, not just hidden
assert/clear pulses. Current False retains the aligned event age requested earlier. Static down-link
PHY/fault distinctions remain unchanged. Completion records the diagnosis; the dispatch panel teaches
where to send the technician and what to replace. Recheck optical levels, error deltas and stability
after a real maintenance action; the game does not simulate a repair result.
