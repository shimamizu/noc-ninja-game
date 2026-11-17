> Historical v1 review retained for source provenance. The current mixed curriculum and revised
> absent/degraded-light interpretation are reviewed in [mixed-incident-review.md](mixed-incident-review.md).
> Old round mappings and lesson sequencing below do not describe schema 2.

# Command Output and Scenario Review

**Review date:** 2026-11-17. **Reviewer:** Codex.
**Content revision:** `noc-v1-2026-11-17`.

## Source-to-display mapping

| Game evidence | Source | Adaptation |
| --- | --- | --- |
| Interface detail | U1 and U4c | Selected interface, fictional label, incident state and CRC count; abbreviated lines, explicitly simulated |
| Four-row transceiver output | U4a | Preserve column meaning/units; use authored -30 Rx values under U5 for L1 |
| MAC interface state | U4b | Repeated authored snapshots; interface state changes only, not MAC fault counts |
| 60-second history | Spec's independently stated fixtures | Explicitly labeled simulated snapshot series; no claim this is a vendor log export |

The user confirms U4's exact selected spine-gw1 deployment. leaf-gw1 uses a reviewed same-release
format adaptation with its explicitly selected interface; no leaf-gw1 capture is invented.
The commands are predefined read-only choices, not an interactive EOS parser. Only diagnostic
excerpts are displayed. Synthetic UTC times label observations; they are not conversions of
U4b's timezone-unspecified system time. U4's original working values remain in user-samples.md.

The state history declares a known preceding state and complete authored observations. The
four-transition decision does not use cumulative Changes or Last Change as a substitute.
Counter pairs use one endpoint and one explicit CRC counter kind with no resets, rollover,
restart or interface replacement. Input errors are not substituted for CRC.

## Display review limits

These are teaching simulations grounded in supplied formats and user-provided optical meaning.
Review is source-to-simulation consistency, not an independent hardware qualification. Down
states and fault counter values are authored incidents, not fault captures. A separate production
leaf-gw1 capture and external technical reviewer remain useful additional release evidence; neither
is claimed here. No unsupported component-failure answer is accepted.
