# NOC Ninja — Guided NOC Patrol

Investigate **three supplied Arista EOS incidents through twelve reasoning decisions and
42 recorded command outputs**. Compare both endpoints, interpret optical readings and fault
histories, choose a repair sequence, and download a learning handoff. Each new patrol shuffles
incident order, question order and answer positions; that order remains stable during play.

The game runs entirely from local static files. It has no accounts, backend, live-switch
connection, analytics, runtime AI, API keys, external fonts or online grading service.
Only supplied incident readings are used. Progress lives in memory and resets on reload.

## Run locally

No package installation or build step is needed. From the repository root:

```sh
python3 -m http.server 8001 --bind 127.0.0.1
```

Open [the game in Safari](http://127.0.0.1:8001/). The root URL serves `index.html` and
opens the **Master the link** briefing with **Start guided NOC patrol**. Native modules and
JSON require HTTP(S); opening `index.html` as a file URL is unsupported. Stop the server
with Ctrl+C. Refresh existing tabs after an update; preserve revision queries when hosting.

`/tests/` is a separate developer page. Players never need to visit it before the game.

## Play

1. Read the investigation method and select **Start guided NOC patrol**.
2. In **Command investigation**, choose a switch/interface and one of four commands:
   **status**, **transceiver**, **mac detail** or **counters errors**. All supplied readings
   for that selection appear together immediately. Each case has 14 recordings: one status
   and two optics, MAC-detail and error-counter captures at each endpoint.
3. Read the question and A/B/C choices. Drag the shuriken from the ninja's hand onto the
   matching circle and release. Clicking the answer text or targets does not submit.
   Wrong answers explain the mistake; reasoning hints and retries are unlimited.
4. Answer all four decisions correctly and view all 14 recordings to unlock **Reveal actual
   outcome** for a confirmed repair or **Review diagnosis** for a recommended action.
5. Review the supported answers, outcome limits, ticket-closure checks and evidence still
   needed. Download the case handoff or continue to the next incident. All three handoffs
   remain available in the final summary.

Device details, investigation guidance and capture notes expand on demand. Evidence views
are tracked separately from correct answers. No numerical after-repair recordings were
supplied for these cases; the notes and handoffs retain those gaps without inventing recovery.
There is no separate observation selector or request button.

For keyboard play, focus the shuriken: **Space** picks it up, **arrow keys** select a target,
and **Space** drops it. **Escape**, an off-target release, or pickup/drop without movement
does not submit. Reduced motion skips the flight animation. Feedback is textual; there are
no lives, countdowns or speed scores. Restart asks for confirmation and creates a fresh
shuffle; cancelling preserves the session. Completion records practice, not certification.

## Incident library

All six endpoints run EOS **4.31.10M**. Inventory belongs to its incident: a repeated hostname
does not imply the same chassis, interface or optic across cases.

| Case | Hostname | Switch model | Port | Optic model |
| --- | --- | --- | --- | --- |
| U13 — The DMZ handoff | spine-gw1 | Arista DCS-7808-CH | Et6/2/1 | ColorChip C100Q020CWDM403H |
| U13 | dmz-gw2 | Arista DCS-7804-CH | Et6/21/1 | ColorChip C100Q020CWDM403H |
| U14 — The unstable fourth lane | leaf-gw2 | Arista DCS-7050SX3-48YC8-R | Et55/1 | ColorChip C100Q020CWDM403H |
| U14 | spine-gw1 | Arista DCS-7808-CH | Et4/28/1 | ColorChip C100Q020CWDM403H |
| U15 — The persistent down link | spine-gw1 | Arista DCS-7508N | Et8/10/1 | ColorChip C100Q020CWDM403B |
| U15 | leaf-gw2 | Arista DCS-7050SX3-48YC8-R | Et53/1 | ColorChip C100Q020CWDM403B |

U13 has 7800R3-48CQ-LC line cards at both ends. Line cards for U14/U15 were not supplied.

| Case and source | Teaching focus | Outcome |
| --- | --- | --- |
| [U13: spine/DMZ down](specs/001-noc-ninja-training/evidence/100g-spine-dmz-remote-fault-case.md) | PHY versus operational state, paired fault direction, four DMZ Rx channels at −30 dBm and repeated MAC/error readings | Operator confirms spine Et6/2/1 optic replacement fixed the link. |
| [U14: leaf lane 4 errors](specs/001-noc-ninja-training/evidence/100g-leaf-lane4-errors-case.md) | Leaf lane 4 Rx at −14.91 dBm, increasing errors and paired fault histories despite current False flags | Operator confirms spine Et4/28/1 optic replacement fixed the problem. |
| [U15: leaf-first repair](specs/001-noc-ninja-training/evidence/100g-leaf-first-conditional-spine-case.md) | Spine Rx at −13.87 dBm, leaf Remote Fault True, zero counters at both ends and high bias current variance between lanes | Replace leaf Et53/1 first; consider spine Et8/10/1 only if the link remains down AND high interlane bias current variance persists afterward. No repair result supplied. |

For U15, **bias current variance between lanes** means highest minus lowest within a sample:
**63.35 − 27.33 = 36.02 mA**, approximately a 36 mA spread. It is not one lane changing
by 36 mA over time or statistical variance. The operator normally sees at most about
10–20 mA between lanes in this environment; that comparison is not a universal manufacturer
threshold. Relevant questions explain this before presenting the choices.

Across all incidents, intentional transmitter disable is excluded by the training assumption.
A fault flag alone is not a universal failed-component rule. Historical counters do not
establish current rates, and zero errors on a down link do not establish health. Timing,
reset history and numerical post-repair measurements remain unknown where unsupplied.
Counter-clear versus MAC-history guidance is scoped to the supplied operating environment.

The game expands U14's reviewed `senz` shortcut to the full counters-errors command for
display; its original prompt remains in the source. U15's captured `show int` abbreviation
is preserved. Measurement bodies remain unchanged.

## Presentation

During quiz incidents, a **Mount Fuji and red maple landscape** fills the page behind the
panels. A separate **Himeji Castle courtyard** fills the ninja arena. The homepage keeps
its original background. The ninja is 145×165 CSS pixels in a 300px arena, with space below
the answer targets. The incident badge and capture notes/limits have solid dark backgrounds.

Artwork is bundled locally and requires no external service. See
[artwork provenance and generation prompts](assets/README.md). The separate
[Arcade listing card](assets/arcade-card.webp) advertises three incidents and twelve decisions.

## Adding future incidents

Before a new case enters the quiz, collect original output from **each endpoint**:

- `show interfaces ethernet <port> status`: one incident capture.
- `show interfaces ethernet <port> transceiver`: incident and follow-up captures.
- `show interfaces ethernet <port> mac detail`: incident and follow-up captures.
- `show interfaces ethernet <port> counters errors`: incident and follow-up captures.

These 14 recordings are required. If an expected output is missing, **ask the owner for the
exact host, port, command and sample, and wait before adding the case to the playable library**.
The validator rejects incomplete sets. Draft notes may be prepared outside the library.
Ask for any additional evidence needed to support a proposed question. Never fill gaps with
generated readings, zeros or another incident's data.

After-repair recordings are optional for a recommended-action case; a recommendation must
not imply the repair happened. Preserve inventory, units, timestamps, reset history and
intervention order. See the [capture collection guide](specs/001-noc-ninja-training/capture-collection-guide.md)
for command lists, evidence gaps and the import format. Add complete, reviewed cases to
`data/cases.json` with their source documents, answers, explanations and honest outcome status.
Broader fault types may require schema changes and corresponding validation.

The [optics reference YAML](data/optics-reference.yaml),
[Interface and Link Troubleshooting skill](https://infraagentskills.ai/skills/interface-link-troubleshooting/)
and [Arista interface-health skill](https://github.com/aristanetworks/eos-mcp-server/blob/main/skills/check-interface-health/SKILL.md)
are authoring references, not runtime dependencies. YAML thresholds do not grade answers;
its specifications are separate from incident measurements and have not been independently
verified against datasheets. Reviewed optical guidance and limits are recorded in the evidence
notes. Retired incident sources and archived design documents are not playable cases.

## Code and verification

| Files | Responsibility |
| --- | --- |
| `data/cases.json` | Three incidents, 42 captures, 12 decisions, sources and outcomes |
| `engine/cases.js` | Validation, grading, progression, outcome gates and handoffs |
| `engine/investigation.js` | Four-command catalog, capture lookup and manifests |
| `engine/state.js` | Session shuffling and guarded restart |
| `ui/patrol.js` | Briefing, command workbench, decisions and review |
| `ui/aim.js` | Pointer/keyboard aiming, cancellation and animation |
| `ui/render.js`, `ui/controls.js`, `main.js` | Rendering, controls, loading and downloads |
| `style.css`, `assets/` | Responsive presentation and local artwork |

```sh
node tests/run.mjs
```

Run [browser checks in Safari](http://127.0.0.1:8001/tests/) separately from the game.
The publishing handoff run on **2026-11-19 passed 53/53 Node and 62/62 Safari checks**.
Coverage includes source fidelity, all supported answers and distractors, capture admission,
pre-answer teaching, shuffled progression, conditional replacement, outcome/export gates,
restart and pointer/keyboard controls.

Current revisions: application **guided-v21**, content **guided-cases-u13-u14-u15-v3**,
stylesheet **guided-v20-fuji2**, constitution **1.7.1**. Safari desktop visual checks confirmed
the quiz-only Fuji background, castle arena, ninja clearance and opaque notes/incident badge.
Dedicated narrow-layout, screen-reader, full manual playthrough, download-click acceptance
and hosted verification remain pending. See the [dated verification record](specs/001-noc-ninja-training/verification.md).

## Publishing handoff for John

Use [ARCADE.md](ARCADE.md) for listing metadata and the full publishing handoff;
[StarterKit/ARCADE.md](StarterKit/ARCADE.md) is its synchronized copy.
Serve the **repository root** on an HTTP(S) static host. The Arcade Play destination must be
root `/` with `index.html` as the default document, or `/index.html` directly. The `StarterKit/`
folder is documentation, and `/tests/` is the developer runner.

Deploy these files with their relative paths intact:

```text
index.html
style.css
main.js
engine/*.js
ui/*.js
data/cases.json
assets/ninja.png
assets/shuriken.png
assets/himeji-castle.webp
assets/fuji-maple.webp
LICENSE.md
```

For the listing, also supply `ARCADE.md` and `assets/arcade-card.webp`. Keep evidence, tests
and design documents in the source handoff; they are not required in the public player upload.
Preserve module/stylesheet revision queries and refresh cached files when publishing updates.
Verify the actual hosted entry, assets, all three cases, shuriken controls and handoff downloads.
No hosted URL has been configured or verified; fill `runtime.hosted_url` in both ARCADE files
when it is known.

Current governing documents: [constitution](.specify/memory/constitution.md),
[specification](specs/001-noc-ninja-training/spec.md) and
[implementation/publishing plan](specs/001-noc-ninja-training/plan.md).
StarterKit SPEC, CONSTITUTION and PLAN are synchronized handoff copies. Superseded requirements
are preserved under `specs/001-noc-ninja-training/history/`.
