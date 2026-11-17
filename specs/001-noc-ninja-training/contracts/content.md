# Content Loading and Review Contract

**Updated:** 2026-11-17 · schemaVersion 2 · noc-v2.1-2026-11-17

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
6. Exactly one status, optics, counters and history output at each endpoint; valid command/text/time,
   identity, source and output-review references. All incidents expose the same tool set.
7. Light/counter/history observations for both endpoints with valid output/source mappings and times.
   All current states and window boundaries agree; finite readings and valid histories are required.
8. Three unique category choices and ordered method/step/solution help with source references.
9. Pure domain evaluation finds exactly one supported endpoint/category; conflicting or missing
   evidence disables grading. Labels and order do not choose the answer.

Error categories include load-failed, invalid-json, invalid-schema, invalid-reference,
unverified-content, inconsistent-evidence and ambiguous-answer. Explain errors without recording
learner attempts. Reload reruns the full gate, starting fresh only on success. No bypass exists.

Machine checks cannot certify arbitrary CLI prose or establish vendor compatibility. Review the
source-to-simulation mapping, all displayed values, hints and explanations before recording verified
metadata. New revisions need reassessment of applicable reviews. The current mixed incident review
records exact expected results and explicitly distinguishes user captures from authored faults.
