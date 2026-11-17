> Historical v1 review retained for source provenance. The current mixed curriculum and revised
> absent/degraded-light interpretation are reviewed in [mixed-incident-review.md](mixed-incident-review.md).
> Old round mappings and lesson sequencing below do not describe schema 2.

# NOC Ninja — Sources, Model Limits and Curriculum Review

**Date:** 2026-11-17. **Reviewer:** Codex.
**Content revision:** `noc-v1-2026-11-17`.

## What this game teaches

Three methods: combine operational state with receive light; subtract timestamped CRC counters;
count actual state transitions within a stated window. IPv6 addresses are correctly configured
context. Choosing a diagnosis does not repair the incident or establish a failed component.
Four changes in an inclusive 60-second window is this game's teaching threshold, not a universal
EOS definition. Unlimited retries/help have no penalty; completion is not proof of mastery.

## Independently expected results

| Round | Authored evidence | Expected condition |
| --- | --- | --- |
| L1-R1 | leaf-gw1 Et51/1 enabled, down; four Rx rows at -30 dBm | Down with absent receive light at leaf-gw1 |
| L1-R2 | spine-gw1 Et3/15/1 enabled, down; four Rx rows at -30 dBm | Down with absent receive light at spine-gw1 |
| L2-R1 | leaf-gw1 120 → 145 CRC, up at both observations, 60 seconds | 25 new receive CRC errors at leaf-gw1 |
| L2-R2 | leaf-gw1 900 → 900; spine-gw1 5 → 17, both up | 0 at leaf-gw1; 12 new errors at spine-gw1 |
| L3-R1 | Initially up; down10/up20/down40/up60 | Four changes, ending up; flapping |
| L3-R2 | Initially down; up5/down15/up35/down55 | Four changes, ending down; flapping |

These expectations come from the specification and arithmetic, not from evaluator output.
Incorrect causal claims exceed the evidence. Healthy-because-up and old-total comparisons are
explicitly corrected. Every level has a distinct worked example and each round has method,
worked-step and solution assistance. The final solution names the same endpoint as the above
independent expectation. Choice order varies and is not an answer key.

## Evidence register

- [User CLI examples](user-samples.md): U1/U2 originals and U4 working command formats.
- [ColorChip reference](colorchip-reference.md): U3's unchanged limits and U5's confirmed units
  and -30 dBm no-light interpretation.
- [Deployment review](release-platform-review.md): user selections and explicit U4 source confirmation.
- [Optical review](optical-interpretation-review.md): mapping from supplied interpretation to L1.
- [Output review](output-semantics-review.md): captured formats versus authored incident values.

The spine-gw1 captures' platform/EOS/card/optic context was explicitly confirmed by the user during
implementation. leaf-gw1 outputs are same-release format adaptations for the user-selected
endpoint, not independent captures. No live switch is contacted. No manufacturer certification
of third-party compatibility is claimed. Simulated snapshots have synthetic absolute UTC times;
the original MAC-detail system time has no inferred timezone. A local/remote MAC fault counter
is never counted as an interface up/down transition.

## Verification and review status

Codex checked the six authored cases, source mappings, threshold values, choices, hints and
computed explanation paths. JSON review metadata records this review and its revision; it is
not proof by itself. Pending or stale required reviews cause whole-document rejection.
Automated checks and actual browser observations are recorded in [verification.md](../verification.md).
An external technical review, a representative learner review and unavailable browser/accessibility
checks are not claimed as completed. Release completion remains separate from a working build.
