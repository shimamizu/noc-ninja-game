---
# Creator details and publication consent confirmed by the owner. Unrecorded fields remain unknown.
arcade_version: 1
game:
  title: "NOC Ninja — Guided NOC Patrol"
  slug: "noc-ninja"
  tagline: "Investigate the link, explain the evidence, and verify the outcome."
  summary: "Work through three supplied Arista EOS link incidents and fifteen guided decisions. Compare both endpoints, challenge automated assessments, learn from feedback, and prepare evidence-supported handoffs before reviewing reported repair outcomes."
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
  card_image_alt: "A cartoon ninja with a red headband stands beside the NOC Ninja title and the three topics: light levels, CRC errors and link flapping."
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
    task_count: 60
    loops_or_phases: 7
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
    - "Owner-supplied ColorChip C100Q020CWDM403B thresholds and no-light interpretation"
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
  human_prompts: 0
  usage:
    input_tokens: "unknown"
    output_tokens: "unknown"
    cost_note: "unknown"
  ai_generated_assets:
    - "assets/ninja.png — original transparent ninja sprite generated with built-in image_gen"
    - "assets/shuriken.png — original transparent shuriken sprite generated with built-in image_gen; also used as the browser favicon"
    - "assets/arcade-card.webp — browser-rendered HTML/CSS composition using the generated sprites"
runtime:
  kind: "static-web"
  stack:
    - "HTML5"
    - "CSS"
    - "JavaScript ES modules"
    - "Authored JSON"
    - "Local PNG/WebP assets"
  start: "python3 -m http.server 8000 --bind 127.0.0.1"
  url_after_start: "http://127.0.0.1:8000/index.html"
  hosted_url: ""
  static_root: "."
  requires_install: false
  requires_network: false
  requires_api_key: false
  uses_ai_at_runtime: false
  browsers:
    - "Safari (preferred; current visual and DOM acceptance pending)"
  accessibility: "Keyboard pickup/move/drop, visible focus, textual feedback and live announcements implemented. Current keyboard, screen-reader, narrow-layout and download-click acceptance pending."
  save_state: "none; session progress is in memory and resets on page reload"
verification:
  tests: "node tests/run.mjs"
  tests_passing: 42
  facts_sourced_from:
    - "Owner-supplied U10, U11 and U12 captures and follow-up in specs/001-noc-ninja-training/evidence/"
    - "Source-reviewed questions and evidence limits in data/cases.json"
  known_limits:
    - "Three captured incidents; no generated telemetry, live device operations or runtime AI."
    - "Not all cases include confirmed recovery or post-repair measurements."
    - "Historical counters alone do not establish current rates."
    - "Ten minutes is an unmeasured planning target."
    - "Current Safari visual, keyboard, narrow-layout and download-click acceptance remain pending."

---

## In one paragraph

NOC Ninja teaches physical-link troubleshooting in one guided NOC patrol using three supplied
incident captures. Learners compare both endpoints, interpret optical channels and fault flags,
question counter claims and prepare a bounded diagnosis. Shuriken targets submit the selected evidence decision. Fifteen decisions provide specific
feedback and optional reasoning hints. Reported interventions and their evidence limits are
revealed after each investigation; handoffs remain downloadable at the end.

## Current build

The earlier six-case simulation, alternate modes and threshold/dispatch classifier were removed
at the owner's request on 2026-11-18. All playable readings now come from U10–U12. The historical
build metadata above records tools used across earlier versions, not current browser acceptance.
See [README](README.md) and [current scope](specs/001-noc-ninja-training/guided-patrol.md).

Future examples must use actual supplied captures. Missing readings remain unknown. Preserve
measurement provenance, intervention order, and the distinction between suspected and confirmed
causes. Preview the game in Safari and verify browser behavior as well as pure logic.
