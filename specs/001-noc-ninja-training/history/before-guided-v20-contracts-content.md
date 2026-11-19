> Historical document archived on 2026-11-19 from `specs/001-noc-ninja-training/contracts/content.md`. Superseded by the current file; relative links retain original context.

> **Current guided contract (2026-11-19):** `data/cases.json`, schemaVersion 1,
> revision `guided-cases-u13-u14-u15-v3`, governs U13–U15. See
> [guided-patrol.md](../guided-patrol.md) and `engine/cases.js` for validation.
> Questions may include a nonempty `context` paragraph displayed before the answer choices.
> Each endpoint requires literal status once and incident/follow-up optics, MAC and errors
> (14 recordings per case). Missing required output rejects the case; ask the owner for it
> before quiz admission. Only optional observations may resolve to Not captured.
> Original `show int` and `show interfaces` captures require matching hosts, ports and
> command kinds. U15 is a recommended-action diagnosis review; U13/U14 have reported
> recovery. The synthetic contract below is retained as historical documentation.

# Content Loading and Review Contract

**Updated:** 2026-11-17 · schemaVersion 2 · noc-v3-2026-11-17

Resolve data/levels.json relative to the loader module. Check HTTP success and JSON parsing, then
validate the entire document. Return deeply frozen content with no errors, or null content plus
structured errors (code, path, optional levelId/roundId, message). Never start a partial curriculum.

Validation requires:

1. Supported schema, nonempty revision, three neutral groups and two uniquely identified rounds each.
2. Source records with exact locator/section/claims, explicit deployment applicability, and dated,
   named reviews matching this revision. No pending/rejected/stale review is playable.
3. Exact selected hardware, EOS architecture, corrected card/slot, ports, multi-agent mode and optic;
   valid distinct IPv6 addresses in the same /126 subnet; correct link endpoints and medium.
4. All 20 supplied optical limits, confirmed units, interpretation metadata and references preserved.
5. A common all-method briefing, neutral incident identities, and no preselected condition/target key.
6. Exactly one visible status, port-status, optics, counters and history tool at each endpoint; valid command/text/time,
   identity, source and output-review references. All incidents expose the same tool set. Interface snapshots retain every supplied U6 field;
   platform formats and background counters/ages are checked in source review and regression tests.
7. Light/counter/history observations for both endpoints with valid output/source mappings and times.
   All current states and window boundaries agree; finite readings and valid histories are required.
8. Three unique category choices and ordered method/step/solution help with source references.
9. Pure domain evaluation finds one supported endpoint/category or matching shared-link flapping histories; conflicting or missing
   evidence disables grading. Labels and order do not choose the answer.

Error categories include load-failed, invalid-json, invalid-schema, invalid-reference,
unverified-content, inconsistent-evidence and ambiguous-answer. Explain errors without recording
learner attempts. Reload reruns the full gate, starting fresh only on success. No bypass exists.

Machine checks cannot certify arbitrary CLI prose or establish vendor compatibility. Review the
source-to-simulation mapping, all displayed values, hints and explanations before recording verified
metadata. New revisions need reassessment of applicable reviews. The current mixed incident review
records exact expected results and explicitly distinguishes user captures from authored faults.

Error snapshots require a same-endpoint later `counter-snapshot` via pairedOutputId; both must use
`counters errors`. The seven structured error fields are nonnegative integers and FCS equals the
graded count. Full interface records remain supporting evidence. MAC snapshot IDs/times resolve
to their endpoint and have all four complete rows. Missing pair references or FCS mismatches block
play. Historical MAC records are separate outputs; their full text remains available in the UI.

10. A valid `linkTimeline` reconciles both endpoints at every snapshot, including system clocks,
    operational state, full-interface Up/Down age, MAC row ages and transition increments.
    Reject missing timelines, mismatched endpoint histories or contradictory rendered values.

11. Four structured Tx values must match the displayed transceiver Tx column. Compute U9
    dispatch from evidence and require exactly one agreed destination for each playable case.
