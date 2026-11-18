> **Historical integration record:** The separate track documented below was superseded by the [single guided patrol](../guided-patrol.md). It is no longer a playable mode.

# Playable real incidents — 2026-11-18

The owner explicitly requested adding the three supplied cases to the game. They are now accessible
from **Play real incident patrol** on the opening screen and after completing the original dojo.
The synthetic six-incident course remains available. No hosted deployment or live network action
is part of this change.

## Source and question review

| Case | Preserved evidence source | Questions / independently reviewed correct options | Outcome |
| --- | --- | --- | --- |
| U10 | [10G capture](10g-spine-transmitter-case.md) | B, B, C, A, B | Owner-confirmed recovery after spine optic replacement |
| U11 | [100G down capture](100g-single-channel-receive-case.md) | B, B, C, C, A | Leaf replacement confirmed; recovery/fiber work unconfirmed |
| U12 | [100G up capture](100g-link-up-receive-errors-case.md) | B, A, C, B, B | Owner-reported resolution after cleaning and leaf optic replacement |

Each case supplies two endpoint inventories, six endpoint evidence panels, the original script
assessment, five authored reasoning questions with explanations, and an outcome with explicit limits.
Questions are supported by the source analysis; original automated conclusions are not answer keys.
No extra case is invented. The 403H model suffix, actual EOS releases, negative-zero display, comma
formatting, individual optical channels and differing MAC histories are preserved.

The new track does not classify alarm thresholds, calculate unproven error rates or make component
failure a fact merely because a fault flag is asserted. Missing evidence is a valid part of the
reasoning. The current uncertainty on U11 and the possible aggregation problem on U12 remain visible.

## State and implementation

- `data/real-cases.json`: schema 1, revision `real-cases-2026-11-18-v1`. Literal capture strings and
  tables are separate from explanation, script assessment and outcome.
- `engine/real-cases.js`: validates endpoint/command identity, channel counts/labels, numeric fields,
  source/revision links, unique answers and outcome types. Invalid real content fails closed for
  the real patrol; the original course remains available with an explanatory error.
- `engine/state.js`: integrates `real-case` / `real-summary` views with the common restart dialog.
  Real progress is separate from dojo diagnosis and assistance records.
- `ui/real-cases.js`: native radio groups, buttons, scrollable labeled evidence, outcome reveal and
  patrol review. No animation is required to complete a real case.
- Empty/unknown answers do not count. Wrong answers stay retryable; a correct decision freezes its
  attempt count. Hints mark assistance. Viewing panels is explicitly not proof of comprehension.
- Outcomes require all five decisions correct and all seven panels viewed. Next case requires
  outcome reveal; reports require completed cases. Summary downloads retain all three cases.
- Return to the dojo preserves its prior screen/progress. Confirmed restart clears both tracks;
  cancel preserves everything. Reload clears in-memory records.

## Verification

**191 automated checks pass** under Node 26.13.0 (`node tests/run.mjs`): the previous 163 checks plus
28 real-case checks covering validation failures, actual source fidelity, every distractor in all
15 decisions, progression/outcome gates, hints, attempts, reports, return navigation and restart.
Both test runners register the new checks. Source-fidelity checks compare every shipped inventory,
optical/counter row and literal MAC output against its source case document.

Module syntax and `git diff --check` pass. Live desktop, narrow viewport, keyboard, screen-reader
and download-click acceptance remain **not verified** for this change: the browser connector is
unavailable, and the native Chrome Beta attempt stalled and then reported user interaction before
the preview could be observed. Do not treat old Chrome checks as acceptance of the new track.

Manual acceptance:

1. Serve the repository, open the game and select **Play real incident patrol**.
2. Verify the case inventory and each evidence panel against its source. In U12, check -0.00,
   -15.21, 236/40/277 and the separate script 533/267 values.
3. Submit empty and wrong answers, request a reasoning hint, then correct the answers. Check
   feedback, attempt accounting, visible keyboard focus and live announcements.
4. Before all questions/panels are complete, verify the actual outcome and report are unavailable.
5. Complete each case; check the three different outcome confidence levels and download a report.
6. Finish the patrol and download all three reports from the summary. Return to the original dojo;
   test restart cancel/confirm and repeat from a completed dojo summary.
7. Repeat essential controls at a narrow viewport and with reduced motion. Evidence can scroll
   within labeled regions; the page and decision controls must remain usable.

## Adding future examples

Record sanitized source evidence and distinguish confirmed outcomes from missing information first.
Add a case to `data/real-cases.json` using the same endpoint/evidence/question/outcome structure,
advance the document and case revisions together, and review every supported answer against its
source. Case counts, decision counts and progression derive from the data; the loader does not
hard-code three cases. Add independent expected answers and source-fidelity checks for the new case.
Do not convert unknown values into synthetic measurements merely to satisfy a validator.
