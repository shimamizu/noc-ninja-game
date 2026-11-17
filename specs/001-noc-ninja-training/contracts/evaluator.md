# Diagnostic Evaluator Contract

**Updated:** 2026-11-17 · Mixed evidence, schema 2

`evaluate(challenge, {choiceId})` is pure and returns `status`, `expected`, `evidence`, `reasonCode`.
No DOM, clock, random number, stored answer key, source network request or mutable global is used.
Source applicability and revision checks belong to the content validator.

Evaluate light, counters and history at both scoped endpoints. Reject missing/duplicate records,
invalid numbers/times/states, contradictory tool states, and unsupported schema/key fields.

| Method | Supported condition |
| --- | --- |
| Light | Administratively enabled and at least one finite Rx value strictly below the supplied −15.70 dBm low alarm. All four −30 readings classify absence; other below-alarm readings classify degraded light, never blanket absence. |
| Counters | Later minus earlier >0, same counter/interface, up at both timestamps, no reset/rollover. |
| History | At least four actual up/down transitions in the inclusive 60-second window, using the known preceding state. Repeated states and events outside the window add no transitions. |

The light rule is restricted to the supplied ColorChip reference; it is not a universal alarm
classifier. The history threshold is authored teaching policy, not EOS's universal definition.
Absent light with a current up state is contradictory and prevents grading.
History state at each counter timestamp and final light state must agree. Equal-time spellings in
shipped data use canonical UTC strings. Exactly one supported endpoint/category is required.

`expected` contains the computed condition, interfaceId and deviceId. Choices contain category
only. Exactly three uniquely named choices with one of each category are required. Display order,
label, incident title and group cannot alter evaluation. Source/evidence errors precede input errors.

| Status | Reason codes / effect |
| --- | --- |
| content-error | invalid-challenge, incomplete-evidence, contradictory-evidence, ambiguous-diagnosis; never grade |
| invalid-input | selection-required, invalid-selection; no throw counted |
| incorrect | condition-not-supported; one valid throw, retry remains available |
| correct | observed-condition-supported; one valid throw and one completion |

Feedback describes computed measurements. Wrong feedback addresses the selected category and
suggests the next investigation; correct feedback identifies the receiver and rules out the other
categories. Neither asserts repair, a specific failed component, nor IPv6 connectivity.

Independent cases cover all categories/endpoints, absent versus degraded light, invalid optical
numbers, exact low-alarm boundary, CRC deltas and stale totals, counter invariants, flapping ending
up/down, window boundaries, repeated/outside reports, conflicting methods, ambiguity, invalid
choices, purity and display-order independence. The spec case table supplies the six runtime
expectations independently of the evaluator.
