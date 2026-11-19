---
# Creator details and publication consent confirmed by the owner. Unrecorded fields remain unknown.
arcade_version: 1
game:
  title: "NOC Ninja — Guided NOC Patrol"
  slug: "noc-ninja"
  tagline: "Investigate the link, explain the evidence, and verify the outcome."
  summary: "Investigate three real Arista EOS link incidents through twelve guided decisions. Compare recorded commands at both endpoints, choose the replacement sequence, and review the diagnosis or reported repair. Scenario, question and answer order shuffle each patrol. Drag the shuriken to answer, learn from feedback, and download a handoff."
  topics:
    - "Arista EOS"
    - "Optical diagnostics"
    - "CRC/FCS"
    - "Link flapping"
    - "NOC troubleshooting"
  category: "switching"
  skill_level: "beginner"
  play_minutes: 10
  levels: 3
  card_image: "assets/arcade-card.webp"
  card_image_alt: "A ninja with a red headband beside NOC Ninja: Guided NOC Patrol. Three real incidents, twelve decisions; light levels, CRC errors and link flapping."
  repo: "https://github.com/shimamizu/noc-ninja-game"
  repo_path: ""
  license: "Apache-2.0"
creator:
  name: "Cat Gurinsky"
  github: "shimamizu"
  location: "Austin, TX"
  organization: "Immortal Martial Arts Academy"
  links:
    - "https://www.immortalmartialarts.org/"
  first_spec_project: true
  workshop: "unknown"
  consent_to_publish: true
build:
  started: "unknown"
  finished: "unknown"
  wall_time: "unknown"
  spec_driven:
    framework: "GitHub Spec Kit"
    framework_version: "1.4.2.dev0"
    artifacts:
      - "constitution"
      - "spec"
      - "clarify"
      - "plan"
      - "tasks"
      - "checklists"
      - "research"
      - "data-model"
      - "contracts"
      - "verification"
    task_count: "unknown"
    loops_or_phases: "unknown"
  model: "unknown"
  helper_models:
    - "unknown"
  harness: "Codex"
  harness_version: "unknown"
  mcp_servers:
    - "mcp__codex_apps"
    - "mcp__cua_repl"
    - "mcp__node_repl"
  rag_and_sources:
    - "StarterKit/CONSTITUTION.md"
    - "StarterKit/SPEC.md"
    - "StarterKit/PLAN.md"
    - "Owner-supplied Arista EOS command captures and deployment confirmation"
    - "Owner-supplied optics-reference.yaml (authoring reference; not a runtime classifier)"
    - "Owner-defined technician replacement runbook"
    - "Arista EOS Ethernet Ports and Transceiver Performance Monitoring manuals"
    - "Arista 7050X3 and 7800R3 datasheets"
    - "MDN JavaScript modules and Fetch documentation"
    - "W3C accessibility guidance"
    - "Owner-linked Adobe Stock ninja image as an inspected style reference only"
  skills_and_plugins:
    - "speckit-constitution"
    - "speckit-specify"
    - "speckit-clarify"
    - "speckit-plan"
    - "speckit-tasks"
    - "speckit-analyze"
    - "speckit-implement"
    - "imagegen"
    - "unified-computer-use (native Safari verification; browser connector unavailable)"
  other_tools:
    - "Built-in image_gen"
    - "Node.js 26.13.0 and dependency-free test harness"
    - "Chrome Beta 159.0.8154.6 with local DevTools Protocol"
    - "Python static HTTP server"
    - "Git"
    - "ripgrep"
    - "curl"
    - "Shell commands and file patches"
    - "Web search and image inspection tools"
  human_prompts: "unknown"
  usage:
    input_tokens: "unknown"
    output_tokens: "unknown"
    cost_note: "unknown"
  ai_generated_assets:
    - "assets/fuji-maple.webp — original Mount Fuji and red maple quiz-page background generated with built-in image_gen"
    - "assets/ninja.png — original transparent ninja sprite generated with built-in image_gen"
    - "assets/shuriken.png — original transparent shuriken sprite generated with built-in image_gen; also used as the browser favicon"
    - "assets/arcade-card.webp — rendered promotional composition using the existing generated sprites"
    - "assets/himeji-castle.webp — original Himeji Castle-inspired twilight arena background generated with built-in image_gen"
runtime:
  kind: "static-web"
  stack:
    - "HTML5"
    - "CSS"
    - "JavaScript ES modules"
    - "Authored JSON"
    - "Local PNG/WebP assets"
  start: "python3 -m http.server 8001 --bind 127.0.0.1"
  url_after_start: "http://127.0.0.1:8001/index.html"
  hosted_url: ""
  static_root: "."
  requires_install: false
  requires_network: false
  requires_api_key: false
  uses_ai_at_runtime: false
  browsers:
    - "Safari (preferred; 62 browser checks passed on guided-v20, 2026-11-19)"
  accessibility: "Keyboard pickup/move/drop, visible focus, textual feedback, reduced-motion support and live announcements implemented. Safari DOM/control checks pass on guided-v20. Dedicated screen-reader, narrow-layout, full manual playthrough and download-click acceptance remain pending."
  save_state: "none; session progress is in memory and resets on page reload"
verification:
  tests: "node tests/run.mjs"
  tests_passing: 53
  facts_sourced_from:
    - "Owner-supplied U13–U15 captures, U13/U14 repair outcomes and U15 replacement guidance in specs/001-noc-ninja-training/evidence/"
    - "Source-reviewed questions and evidence limits in data/cases.json"
  known_limits:
    - "Three captured incidents, twelve decisions and 42 recorded outputs; no generated telemetry, live device operations or runtime AI."
    - "Spine optic replacement resolved U13/U14 according to the operator; U15 has no reported repair result. Numerical post-repair measurements and stability intervals were not supplied."
    - "Historical counters alone do not establish current rates."
    - "Ten minutes is an unmeasured planning target."
    - "Dedicated screen-reader, narrow-layout, full manual playthrough and download-click acceptance remain pending. Other browsers have not been requalified for this version."

---

## Current game — 2026-11-19

One Guided NOC Patrol contains **three real incidents and twelve decisions**, using only the
42 supplied command captures. Each new patrol shuffles scenarios, questions and answer
positions; the order remains stable while investigating or retrying. Learners drag the
shuriken to A/B/C (or use keyboard pickup/move/drop), receive explanatory feedback, and
review the diagnosis and any reported repair after completing each case's decisions and available evidence.
Handoffs remain downloadable from the final summary.

Quiz incidents use a Mount Fuji/red maple page background behind the panels, with a separate
Himeji Castle courtyard inside the ninja arena. The homepage keeps its existing background.
The incident badge and capture notes/limits panel have opaque dark surfaces for readability.

- **U13 — The DMZ handoff:** spine-gw1 Et6/2/1 ↔ dmz-gw2 Et6/21/1. Down link,
  paired fault flags and all four DMZ Rx channels at −30 dBm; spine optic replacement fixed it.
- **U14 — The unstable fourth lane:** leaf-gw2 Et55/1 ↔ spine-gw1 Et4/28/1.
  Increasing leaf errors, lane 4 Rx −14.91 dBm and increasing paired fault counts;
  spine optic replacement fixed it.
- **U15 — The persistent down link:** spine-gw1 Et8/10/1 ↔ leaf-gw2 Et53/1.
  Spine Rx −13.87 dBm, leaf Remote Fault True and high bias current variance between lanes on spine-gw1.
  Replace leaf-gw2 first; consider the spine-gw1 optic only if both the down link and high
  bias current variance between lanes persist after the leaf swap. No repair result was supplied.

All three cases contain 14 required interface recordings. U15 includes both leaf-gw2
Et53/1 error-counter samples, with all seven counters zero in each; the lesson compares
these with the zero spine counters while recognizing the link remains down.

U15 teaches highest-minus-lowest bias current variance between lanes before the relevant
answers: 63.35 − 27.33 = 36.02 mA, compared with the operator’s usual 10–20 mA maximum
range in this environment. This is operator guidance, not a universal manufacturer threshold.

The command menu contains only interface-scoped **status**, **transceiver**, **mac detail**,
and **counters errors**. Selection displays all available readings immediately. The compact
layout keeps the question and ninja beside the outputs. Personal command shortcuts display
as their full standard commands; captured measurement bodies are unchanged.

The source library is `data/cases.json` (revision `guided-cases-u13-u14-u15-v3`); the application
module revision is `guided-v20`; the stylesheet revision is `guided-v20-fuji2`
(larger ninja, target clearance, Himeji Castle arena and quiz-only Fuji/red maple page backdrop). Source documents retain original prompts. U13 and U14 have
confirmed repair reports; U15 has a recommended sequence only. No recovery measurements
are invented. Intentional transmitter disable is excluded from this training. The optics YAML is reference material, not a
runtime threshold engine. Earlier simulated cases and alternate game modes are retired.

## Required intake for future cases

Before a new case enters the quiz, collect from each endpoint one status recording and
incident/follow-up transceiver, mac detail and counters errors recordings (14 total).
If an expected output is missing, ask the owner for the exact endpoint, interface, command
and sample and wait before adding the case. Validation rejects incomplete sets. Draft
intake work may continue outside the playable library; do not fabricate or infer readings.
Post-repair observations are optional for a recommended-action case and remain unknown
until supplied. The homepage omits the generic missing-recording explanation; optional
capture gaps remain described where relevant in the workbench and handoff.

## Publishing handoff for John

Publish the **repository root**, not the `StarterKit/` directory. There is no build or
package-install step. Use an HTTP(S) static host that serves ES modules as JavaScript and
JSON as JSON, preserves relative paths and query strings, and uses `index.html` as the entry.
File URLs are unsupported. A subdirectory deployment is supported by the relative asset URLs.

**Arcade Play destination:** the hosted repository-root `index.html`, or `/` when the host
serves that file as its default document. It opens the **Master the link** briefing and
**Start guided NOC patrol** button directly. The “NOC Ninja · independent checks” screen
is the developer page at `/tests/index.html`; it is never a prerequisite, redirect or
intermediate screen in the game. Do not point the Arcade Play link at `/tests/` or `StarterKit/`.
The local root launch was verified in Safari on 2026-11-19. The future hosted URL still
needs its own launch check once publication is configured.

Minimum playable files:

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

For the Arcade listing, also include root `ARCADE.md` and `assets/arcade-card.webp`.
Keep the source repository, README, StarterKit, optics reference and evidence documents
with the handoff. They provide authoring history and verification context, not live-switch
integration. Neither `tests/` nor the source documents are required in the public playable
upload; keep them in the source handoff. If the developer tests are also hosted, they need
`tests/` and the case evidence source files and remain accessible only by their separate URL.

Preview locally with the `runtime.start` command above, then open the listed URL in Safari.
Run `node tests/run.mjs` and open `/tests/` on the local server to repeat browser checks.
For deployment, upload the same directory structure and verify all three cases, shuriken input
and handoff downloads on the actual hosted URL. Refresh/invalidate cached files when updating;
do not strip the module and stylesheet revision queries.

**Verification:** publishing handoff rerun passed 53/53 Node and 62/62 Safari browser checks
on guided-v20 with stylesheet guided-v20-fuji2 (2026-11-19).
Safari visual review confirmed the third case and updated totals on guided-v18; guided-v19
checks verify pre-answer teaching context. Guided-v20 verifies both leaf-counter samples
and rejects missing required captures. The public root launch opens the briefing directly. Tests cover
three-case progression, shuffled answer mapping, source fidelity, both zero leaf-counter readings, required-capture rejection,
conditional replacement, restart and handoffs. Dedicated screen-reader, narrow-layout,
full manual playthrough and download-click acceptance remain pending. No hosted deployment
or hosted smoke check has been performed; `hosted_url` remains blank until publication.

Creator and consent fields above retain the owner's previously confirmed values. Build tools
and skills record the project's history, including older versions; they are not required to
host or play the game. Unknown build counts and usage remain unknown. The ten-minute duration
is a planning estimate, not a measured completion time.

See [README](README.md) and [current scope](specs/001-noc-ninja-training/guided-patrol.md).
