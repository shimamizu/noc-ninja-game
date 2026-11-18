# NOC Ninja — Guided NOC Patrol

One guided patrol teaches link troubleshooting through three incident captures and fifteen
reasoning decisions. Inspect both switches, explain the evidence, prepare a handoff and compare
your reasoning with the reported intervention. Only supplied incident readings are used.
There is no separate incident mode, arcade mode or generated telemetry.

## Run

No install or build step is needed:

```sh
python3 -m http.server 8001 --bind 127.0.0.1
```

Open [the game in Safari](http://127.0.0.1:8001/). Reload an existing tab to pick up the updated
patrol; the changed entry modules and stylesheet have revisioned URLs to avoid older cached UI.
Native modules and JSON require HTTP, not a file URL. Stop the server with Ctrl+C.

The app uses only local static files: no account, backend, live switches, analytics, runtime AI,
API key, external fonts or online grading service. Reload clears in-memory progress.

## Play

1. Read the investigation method and select **Start guided NOC patrol**.
2. Use the **Investigation notebook** to examine optics, error counters and MAC detail at both
   endpoints, plus the automated assessment. Each case retains its supplied inventory and EOS.
3. Work through five decisions. Read the labeled answers, then drag the shuriken from the ninja’s hand onto
   the matching A/B/C circle and release. The answer text and targets do not click-submit. Wrong answers explain the mistake; reasoning hints and retries
   are available. Empty submissions do not count as attempts. Opening evidence is tracked
   separately from answering correctly.
4. Complete all five decisions and open all seven panels to **Reveal actual outcome**.
5. Review the outcome, uncertainty and ticket-closure checks, then download the learning handoff
   or continue. The final summary retains all three handoff downloads.

Across all incidents, intentional transmitter disable is excluded. This is a training assumption,
not a fabricated status reading. Questions and hints must not require ruling it out.

The patrol teaches directionality, per-channel optics, Local/Remote Fault interpretation,
counter provenance, historical versus current instability, confidence and post-repair verification.
A missing second sample stays missing. No invented alarm thresholds, interface output, readings,
flap histories or recovery measurements are used to complete a case.

For keyboard accessibility, focus the shuriken: Space picks it up, arrow keys move between
targets, and Space drops it. Picking up and dropping without moving to a target does not answer. Escape or an off-target release cancels a drag; reduced
motion skips the flight animation. Throwing never delays feedback or controls. Feedback is textual, retries are
unlimited and there is no time or precision requirement. Restart asks for confirmation; Cancel
preserves the session. Downloads contain the captured evidence, supported answers, explanations,
attempts, assistance and reported outcome. Completion records practice, not independent mastery.

## Incident library

| Case | Teaching focus | Reported outcome |
| --- | --- | --- |
| [U10: 10G down](specs/001-noc-ninja-training/evidence/10g-spine-transmitter-case.md) | Spine Tx / leaf Rx, historical counters and uncertain flap rate | Spine optic replacement restored link, transmit power and stable counters |
| [U11: 100G down](specs/001-noc-ninja-training/evidence/100g-single-channel-receive-case.md) | Low spine receive channel, fault directionality and component uncertainty | Leaf optic replacement confirmed; recovery and accompanying fiber work unconfirmed |
| [U12: 100G up with errors](specs/001-noc-ninja-training/evidence/100g-link-up-receive-errors-case.md) | LinkUp versus health, low receive channel and inconsistent script totals | Cleaning plus leaf optic replacement resolved the issue; individual contribution unresolved |

The evidence-first teaching approach was informed by the
[Interface and Link Troubleshooting skill](https://infraagentskills.ai/skills/interface-link-troubleshooting/).
It is an authoring reference, not a runtime dependency. Reviewed questions are anchored to the
case documents; the old universal diagnosis/dispatch classifier has been removed.

## Adding future incidents

Add actual captures and documented follow-up to an evidence source, then add a reviewed case to
`data/cases.json`. Do not generate telemetry to fill gaps. The current schema supports paired
10G/100G optical-link cases with inventory, per-endpoint optics/counters/MAC detail, an automated
assessment, reviewed choices and an outcome with confidence limits. Broader fault types may need
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
MAC/fault state, relevant logs/configuration, each intervention in order, and before/after
verification. State what was not collected. Remove sensitive identifiers before sharing captures;
that authoring process is not presented to learners.

## Code and checks

- `data/cases.json`: the only deployed incident library.
- `engine/cases.js`: validation, deterministic reasoning, progression, outcomes and handoffs.
- `engine/state.js`: session initialization and guarded restart.
- `ui/patrol.js`: briefing, evidence notebook, decisions and review.
- `ui/aim.js`: drag/keyboard pickup-and-drop throwing, cancellation and decorative animation.
- `ui/render.js`, `ui/controls.js`, `main.js`: rendering, native controls and loading/downloads.

```sh
node tests/run.mjs
```

The Node suite checks all fifteen answers and distractors, malformed content, retries, hints,
evidence/outcome/report gates, progression, reset, exact source fidelity and removal of retired
runtime paths. Run [browser checks](http://127.0.0.1:8001/tests/) in Safari for the same case and aiming suites
plus DOM rendering/control checks. Browser checks do not replace visual/accessibility review.

Current result: **42/42 Node checks pass**. Syntax and whitespace checks pass. Safari navigation
was interrupted by browser activity; the new browser suite, fresh visual playthrough, narrow
layout, screen-reader and download-click acceptance remain pending. Historical results for the
retired six-incident game do not certify this version. See
[current scope and acceptance](specs/001-noc-ninja-training/guided-patrol.md).


Counter-history guidance follows the supplied environment: interface traffic/error counter clears
do not clear MAC state/fault histories, which persist until reboot. This scoped operational rule
is not a universal EOS guarantee. Lessons teach timed deltas and post-repair monitoring; no reboot
is needed just to obtain a monitoring baseline. U10 also uses asymmetric Remote Fault history as
corroboration of its strong optical evidence, while preserving both current flags as False.
