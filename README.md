# NOC Ninja — Guided NOC Patrol

One guided patrol teaches link troubleshooting through three incident captures and twelve
reasoning decisions. Inspect both switches, explain the evidence, prepare a handoff and compare
your reasoning with the diagnosis and any reported intervention. Only supplied incident readings are used.
There is no separate incident mode, arcade mode or generated telemetry.

## Run

No install or build step is needed:

```sh
python3 -m http.server 8001 --bind 127.0.0.1
```

Open [the game in Safari](http://127.0.0.1:8001/). The root URL serves `index.html` and
opens the game briefing directly. `/tests/` is a separate developer page, not part of player entry. Reload an existing tab to pick up the updated
patrol; the changed entry modules and stylesheet have revisioned URLs to avoid older cached UI.
Native modules and JSON require HTTP, not a file URL. Stop the server with Ctrl+C.

The app uses only local static files: no account, backend, live switches, analytics, runtime AI,
API key, external fonts or online grading service. Reload clears in-memory progress.

## Play

1. Read the investigation method and select **Start guided NOC patrol**.
2. In **Recorded command investigation**, choose a switch/interface and show command to display its saved outputs immediately.
   Incident and follow-up readings appear together, with their original text preserved. Choose only interface-scoped status, transceiver, MAC detail
   or counters errors. The spine–DMZ case replays all 14 original command captures. Missing captures say **Not captured**, never zero or normal.

3. Work through four decisions per incident. Read the labeled answers, then drag the shuriken from the ninja’s hand onto
   the matching A/B/C circle and release. The answer text and targets do not click-submit. Wrong answers explain the mistake; reasoning hints and retries
   are available. Empty submissions do not count as attempts. Opening evidence is tracked
   separately from answering correctly.
4. Complete all four decisions and open all available panels to **Reveal actual outcome** (or **Review diagnosis** when repair is unconfirmed).
5. Review the outcome, uncertainty and ticket-closure checks. After-repair requests unlock here;
   missing verification stays missing in capture notes. Download the learning handoff, including command requests
   and the case's missing-capture list,
   or continue. Device details, investigation guidance and capture notes expand on demand;
   the compact desktop layout keeps the question and ninja beside the readings. The ninja arena
   uses a local Himeji Castle-inspired twilight backdrop. During quiz incidents, Mount Fuji
   and red maple branches fill the page behind the panels; the homepage stays unchanged.
   Artwork provenance and prompts are in
   [assets/README.md](assets/README.md). The final summary retains the case handoff download.

Scenario order, question order within each scenario, and answer positions are shuffled for
each new patrol. The order stays fixed while investigating, using hints or retrying. Confirming
Restart creates a fresh shuffle; cancelling Restart preserves the current session.

Across all incidents, intentional transmitter disable is excluded. This is a training assumption,
not a fabricated status reading. Questions and hints must not require ruling it out.

The patrol teaches directionality, per-channel optics, Local/Remote Fault interpretation,
counter provenance, historical versus current instability, confidence and post-repair verification.
Required command samples must be collected before a case becomes playable; optional
post-repair observations remain unknown until supplied. No invented alarm thresholds, interface output, readings,
flap histories or recovery measurements are used to complete a case.

For keyboard accessibility, focus the shuriken: Space picks it up, arrow keys move between
targets, and Space drops it. Picking up and dropping without moving to a target does not answer. Escape or an off-target release cancels a drag; reduced
motion skips the flight animation. Throwing never delays feedback or controls. Feedback is textual, retries are
unlimited and there is no time or precision requirement. Restart asks for confirmation; Cancel
preserves the session. Downloads contain the captured evidence, supported answers, explanations,
attempts, assistance and reported outcome. Completion records practice, not independent mastery.

## Incident library

The spine is an Arista DCS-7808-CH and the DMZ switch is an Arista DCS-7804-CH. Both run
EOS 4.31.10M with 7800R3-48CQ-LC line cards. Endpoint cards and handoffs include these
owner-supplied details. Both endpoints use ColorChip C100Q020CWDM403H optics.

The second case links leaf-gw2 (Arista DCS-7050SX3-48YC8-R, Et55/1) to spine-gw1
(Arista DCS-7808-CH, Et4/28/1), both on EOS 4.31.10M with the same ColorChip model.
Its first error capture displays the full counters-errors command in the game and handoff;
the original shortcut prompt remains in the source record. All 14 readings are preserved. The line card for this incident was not supplied.

The third case links spine-gw1 (Arista DCS-7508N, Et8/10/1) to leaf-gw2
(Arista DCS-7050SX3-48YC8-R, Et53/1), both on EOS 4.31.10M with ColorChip
C100Q020CWDM403B optics. Its 14 supplied interface recordings preserve spine Rx
-13.87 dBm, leaf Remote Fault True and the large bias current variance between lanes on spine-gw1.
Replace the leaf optic first. Only if the link remains down **and** the bias current variance between lanes on spine-gw1
remains high after that swap could you consider replacing the spine optic. Both leaf error-counter samples supplied in the follow-up are zero, as are both spine samples.
Line cards and repair results were not supplied. The operator normally sees at most about
10–20 mA between lanes in this environment; 63.35 − 27.33 = 36.02 mA is a very large spread.

The supplied [optics reference YAML](data/optics-reference.yaml) stores model-specific
warning/alarm thresholds and DOM support information, including the ColorChip
C100Q020CWDM403H used in U13/U14. Its original comments, values and shared profiles
(YAML anchors/aliases) are preserved. This is an authoring reference; the game does not
load it or apply its thresholds to scoring. Reference specifications are separate from
recorded incident measurements, and have not been independently verified against datasheets.

| Case | Teaching focus | Reported outcome |
| --- | --- | --- |
| [U13: 100G spine/DMZ down](specs/001-noc-ninja-training/evidence/100g-spine-dmz-remote-fault-case.md) | PHY versus interface state, paired fault direction, four low Rx channels and repeated MAC observations | Spine optic replacement confirmed to have fixed the link; numerical post-repair captures not supplied |
| [U14: 100G leaf lane 4 errors](specs/001-noc-ninja-training/evidence/100g-leaf-lane4-errors-case.md) | Increasing leaf errors, low lane 4 Rx, paired fault-count increases despite False current flags | Spine Et4/28/1 optic replacement confirmed to have fixed the problem; numerical post-repair captures not supplied |
| [U15: 100G leaf-first repair](specs/001-noc-ninja-training/evidence/100g-leaf-first-conditional-spine-case.md) | Low spine Rx, leaf Remote Fault, bias current variance between lanes and conditional escalation | Leaf Et53/1 replacement recommended first; spine Et8/10/1 only if both down link and high bias current variance between lanes on spine-gw1 persist afterward; no repair outcome supplied |

The evidence-first teaching approach was informed by the
[Interface and Link Troubleshooting skill](https://infraagentskills.ai/skills/interface-link-troubleshooting/).
It is an authoring reference, not a runtime dependency. Reviewed questions are anchored to the
case documents; the old universal diagnosis/dispatch classifier has been removed.

The recorded-command workflow also uses the phase structure of the
[Arista EOS MCP interface-health skill](https://github.com/aristanetworks/eos-mcp-server/blob/main/skills/check-interface-health/SKILL.md)
as an authoring reference. We reviewed and corrected its optical guidance: 0 dBm is 1 mW,
not absent light, and generic optical/temperature cutoffs are not universal limits. No MCP
server is installed or used by the game. All twelve reasoning hints now include evidence-request
guidance; command selection does not execute a shell or connect to a switch.

See the [per-case capture collection guide](specs/001-noc-ninja-training/capture-collection-guide.md)
for exact command lists on both endpoints, missing timepoints, collection priorities and the
recording import format. The highest-value additions are the same four commands from further incidents, plus timed
after-repair samples with reset/intervention context. The earlier three cases have been removed
from the playable library; their source documents remain historical records only.

## Adding future incidents

Before adding a new case, inventory the expected outputs at both endpoints: status once;
transceiver, mac detail and counters errors twice each (incident and follow-up). If any are
missing, **ask the owner for the exact host/port/command/sample and wait before adding the
case to the quiz**. Draft source notes may be prepared outside the playable library.
The validator requires all 14 original interface recordings and rejects incomplete sets.

Once complete, add the supplied captures and documented follow-up to an evidence source,
then add the reviewed case to `data/cases.json`. Do not generate telemetry to fill gaps. The current schema supports paired
10G/100G optical-link cases with inventory, per-endpoint optics/counters/MAC detail, an optional supplied automated
assessment, reviewed choices and an outcome with confidence limits. U13 supports raw status,
optics, MAC and errors at incident/follow-up observations, explicit unknown inventory, and a
recommended-action outcome when repair confirmation has not been supplied. Broader fault types may need
schema additions for their actual evidence; do not fabricate an automated assessment or MAC
output to satisfy the current schema. Counts in the UI derive from the library.

Useful next additions, in priority order:

- Intermittent flapping with timestamped up/down events and counter-clear history.
- Increasing FCS/CRC while the link remains up, with two or more timed counter samples.
- A fiber/connector fault resolved by cleaning or cable repair alone, with unchanged optics.
- A receiver-side or switch-port failure isolated by controlled swaps and the actual result.
- A configuration cause such as speed/FEC mismatch, with relevant
  configuration/status evidence and a confirmed corrective action.

For each, preserve both endpoints' inventory, speed, timestamps, optical rows, counters,
MAC/fault state, each intervention in order, and before/after
verification. State what was not collected. Remove sensitive identifiers before sharing captures;
that authoring process is not presented to learners.

## Code and checks

- `data/cases.json`: the only deployed incident library.
- `engine/cases.js`: validation, deterministic reasoning, progression, outcomes and handoffs.
- `engine/investigation.js`: finite show-command catalog, observation lookup and capture manifest.
- `engine/state.js`: session initialization and guarded restart.
- `ui/patrol.js`: briefing, evidence notebook, decisions and review.
- `ui/aim.js`: drag/keyboard pickup-and-drop throwing, cancellation and decorative animation.
- `ui/render.js`, `ui/controls.js`, `main.js`: rendering, native controls and loading/downloads.

```sh
node tests/run.mjs
```

The Node suite checks all twelve answers and distractors, malformed content, retries, hints,
evidence/outcome/report gates, progression, reset, exact source fidelity, U13/U14/U15 raw replay and removal of retired
runtime paths. Run [browser checks](http://127.0.0.1:8001/tests/) in Safari for the same case and aiming suites
plus DOM rendering/control checks. Browser checks do not replace visual/accessibility review.

Current result (2026-11-19, guided-v20): **53/53 Node checks and 62/62 Safari browser checks pass**. Checks cover all three cases, shuffled grading and progression,
source fidelity, both zero leaf-counter readings, required-capture rejection, leaf-first sequencing, both second-replacement
conditions, diagnosis/outcome gating, handoffs and restart. Safari also showed the updated
3-incident/12-decision briefing and the third case with readable evidence, choices and targets
on guided-v18. Guided-v19 DOM checks verify the new teaching context before answers; a fresh
Safari root launch confirms that players reach the briefing directly.
Dedicated narrow-layout, screen-reader, full manual playthrough and download-click acceptance
remain pending. See [current scope and acceptance](specs/001-noc-ninja-training/guided-patrol.md).



Counter-history guidance follows the supplied environment: interface traffic/error counter clears
do not clear MAC state/fault histories, which persist until reboot. This scoped operational rule
is not a universal EOS guarantee. Lessons teach timed deltas and post-repair monitoring; no reboot
is needed just to obtain a monitoring baseline. U13 preserves spine Remote Fault True and DMZ Local Fault True; U14 preserves False current flags alongside increasing fault histories.

Compact workbench update: command selections display all available readings automatically, with no observation selector or request button. Repair recordings remain gated until outcome review.


## Publishing handoff

[ARCADE.md](ARCADE.md) contains current listing metadata and publishing instructions for John.
Its [StarterKit copy](StarterKit/ARCADE.md) has matching metadata. Publish the repository root;
the StarterKit folder alone is documentation, not the app. The current listing image is
[assets/arcade-card.webp](assets/arcade-card.webp). No hosted URL has been configured or verified.


Current governing documents: [constitution 1.7.1](.specify/memory/constitution.md),
[specification](specs/001-noc-ninja-training/spec.md) and
[implementation/publishing plan](specs/001-noc-ninja-training/plan.md).
The StarterKit SPEC, CONSTITUTION and PLAN are synchronized handoff copies. Superseded
simulation requirements are archived under `specs/001-noc-ninja-training/history/`.
