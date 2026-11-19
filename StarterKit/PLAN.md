# NOC Ninja — Implementation and publishing plan

Updated 2026-11-19. Current implementation: `guided-v17`; content:
`guided-cases-u13-u14-v2`. See [SPEC.md](SPEC.md), [CONSTITUTION.md](CONSTITUTION.md)
and [ARCADE.md](ARCADE.md). This supersedes the StarterKit's old simulation plan.

## Architecture in the current implementation

| File | Responsibility |
| --- | --- |
| `data/cases.json` | Two supplied incidents, 28 captures, eight decisions, reported outcomes and evidence gaps |
| `data/optics-reference.yaml` | Supplied model reference; not loaded by the game |
| `engine/state.js` | Immutable session ordering with Fisher–Yates shuffles and guarded restart |
| `engine/cases.js` | Content validation, grading by stable IDs, progression, outcome gates and handoff generation |
| `engine/investigation.js` | Four-command catalog, grouped recorded observations, missing/locked states and alias display expansion |
| `ui/patrol.js` | Briefing, compact evidence workbench, questions, outcome and summary |
| `ui/aim.js` | Shuriken pointer/keyboard interaction, hit testing, cancellation and animation |
| `ui/render.js`, `ui/controls.js`, `main.js` | Rendering, controls, state dispatch, local loading and text downloads |
| `style.css`, `assets/` | Responsive layout and original local artwork |
| `tests/` | Dependency-free Node and browser checks |

The app validates the source library, copies and shuffles scenario/question/answer arrays
for the session, and preserves their stable identities and evidence. Rendering and grading
use that session order. Only a new session reshuffles. The source library is not mutated.

Command selection shows incident and follow-up recordings together. Both cases have status
once and optics/errors/MAC twice per endpoint. After-repair material remains gated and absent
when not supplied. The original first U14 error prompt is retained for source fidelity; its
learner-facing command is `show interfaces ethernet 55/1 counters errors`.

## Verify locally

From the repository root:

```sh
node tests/run.mjs
python3 -m http.server 8001 --bind 127.0.0.1
```

Open `http://127.0.0.1:8001/index.html` and `http://127.0.0.1:8001/tests/` in Safari.
Reuse the game tab when previewing. Current results: **48/48 Node checks and 56/56 Safari
checks pass** on guided-v17. Both-case progression, shuffle stability, answer mapping,
evidence fidelity, restart and handoff contents are covered. Dedicated screen-reader,
narrow-layout, full manual playthrough and download-click acceptance remain pending.

## Publish

1. Share the current repository, including root `ARCADE.md`, `assets/arcade-card.webp`,
   README, this StarterKit and evidence sources. `StarterKit/` alone is not the application.
2. Serve the repository root on an HTTP(S) static host. No build/install step, server-side
   application or secrets are required. Preserve the layout and revision query strings.
3. The playable subset is `index.html`, `style.css`, `main.js`, `engine/`, `ui/`,
   `data/cases.json`, `assets/ninja.png`, `assets/shuriken.png` and `LICENSE.md`.
   Add the metadata and card for the Arcade listing. Serving tests also requires the case
   evidence documents under `specs/001-noc-ninja-training/evidence/`.
4. Verify JavaScript/JSON MIME types, relative paths, images, both scenarios, shuriken input
   and handoff downloads at the actual hosted URL. Invalidate stale cached files on updates.
5. Set `runtime.hosted_url` in both ARCADE copies only after a real URL is known. No hosting
   destination or hosted validation has been claimed by this update.

## Extend the incident library

Add actual supplied outputs and repair follow-up to a new evidence source and reviewed case.
Keep four-command scope and complete channel rows. Preserve unknown capture/reset timing and
inventory rather than importing details from another incident. Add tests for the new evidence
and progression, then update listing counts, both ARCADE copies, the promotional card and these
documents. Keep the numeric measurements independent of any inferred cause or supplied thresholds.
