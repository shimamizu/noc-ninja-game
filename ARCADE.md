---
# Creator details and publication consent confirmed by the owner. Unrecorded fields remain unknown.
arcade_version: 1
game:
  title: "NOC Ninja — Network Dojo"
  slug: "noc-ninja"
  tagline: "Read the evidence, throw your diagnosis, and send the tech to the right optic."
  summary: "Investigate six simulated Arista EOS link incidents by comparing transceiver readings, error counters and interface histories at both ends. Drag a ninja onto the supported diagnosis, then learn which optic the training runbook recommends replacing and why."
  topics:
    - "Arista EOS"
    - "Optical diagnostics"
    - "CRC/FCS"
    - "Link flapping"
    - "NOC troubleshooting"
  category: "switching"
  skill_level: "beginner"
  play_minutes: 10
  levels: 6
  card_image: "assets/arcade-card.webp"
  card_image_alt: "A cartoon ninja with a red headband stands beside the NOC Ninja title and the three topics: light levels, CRC errors and link flapping."
  repo: "https://github.com/shimamizu/martial-arts-game"
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
    - "unified-computer-use (attempted; unavailable)"
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
    - "assets/shuriken.png — original transparent shuriken sprite generated with built-in image_gen"
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
    - "Chrome Beta 159.0.8154.6 (isolated headless desktop and mobile emulation)"
  accessibility: "Browser-tested keyboard aiming and submission, native answer radios, visible focus, Escape and off-target cancellation, touch dragging, reduced motion, mobile layout and live-region destination text. Screen-reader listening and physical-device testing were not performed."
  save_state: "none; session progress is in memory and resets on page reload"
verification:
  tests: "node tests/run.mjs"
  tests_passing: 144
  facts_sourced_from:
    - "Owner-provided EOS captures and deployment context documented in specs/001-noc-ninja-training/evidence/"
    - "Owner-provided ColorChip limits documented in specs/001-noc-ninja-training/evidence/colorchip-reference.md"
    - "Arista EOS Ethernet Ports — https://www.arista.com/en/um-eos/eos-ethernet-ports"
    - "Arista EOS Transceiver Performance Monitoring — https://www.arista.com/en/um-eos/eos-transceiver-performance-monitoring"
    - "Arista 7050X3 Q&A and 7800R3 datasheet for platform context; exact scenario values are authored"
    - "Technician replacement policy supplied by the owner and documented in specs/001-noc-ninja-training/evidence/technician-runbook.md"
  known_limits:
    - "Six authored incidents; no live switch connection, configuration changes or simulated repair outcome."
    - "Four transitions in a 60-second window is the teaching threshold, not a universal EOS definition."
    - "Optical thresholds and no-light semantics apply to the supplied ColorChip reference; they are not universal cutoffs."
    - "Replacement destinations follow the owner training runbook and do not prove that a component has failed."
    - "IPv6 addresses are correctly configured context; the game does not test IPv6 connectivity."
    - "Exact release/platform compatibility has not been independently certified."
    - "Ten minutes is a planning target, not a measured learner completion time."
    - "Python 3 is needed for the example local server; any static HTTP host can serve the game without a build step. File URLs are unsupported."
    - "No internet connection is needed during local play; hosted play needs access to the host."
    - "Hosted URL, exact model IDs, build duration, token use and cost were not recorded."
    - "The MCP list reflects exposed session namespaces; a complete historical connection inventory was not recorded."
    - "Workshop attribution was not confirmed and is recorded as unknown."
---

## In one paragraph

NOC Ninja is a browser game for new network operations engineers practicing physical-link troubleshooting. Each of its six incidents presents realistic Arista EOS output from both ends of a single-mode fiber link. Players compare light levels, CRC/FCS counters and timed state changes, then drag a ninja onto a diagnosis and release a shuriken. A correct answer reveals where the training runbook would send a technician to replace an optic. Hints and unlimited retries support practice without a countdown or score penalty.

## How it was built

We began with the owner's StarterKit constitution, specification and plan, then used GitHub Spec Kit to clarify requirements, define contracts, generate tasks, analyze consistency and implement a static browser game. The owner supplied the switch models, EOS version, ports, optical thresholds and real command examples. Those inputs shaped the simulation and its source notes.

The largest change was educational: the three categories became competing diagnoses within mixed incidents, rather than separate levels repeating the same problem. Subsequent reviews improved command formatting, aligned interface event times and distinguished shared link state from directional PHY and MAC fault histories. We also separated counters cleared recently from older MAC change totals.

The owner then requested illustrated ninja and shuriken assets, drag-to-throw controls and a technician destination. We generated original sprites and encoded the replacement rules as a training runbook, with conflicting evidence rejected. Browser verification caught a release hit-testing defect; we fixed it and disabled caching to verify current files. The final checks covered mouse, touch, keyboard controls and all six destinations. The next builder should start with trustworthy examples, keep measured evidence separate from recommendations, and verify actual browser interaction alongside pure rule tests.

## What we'd tell the next builder

- Build the scenario timeline before formatting CLI output. Interface, PHY, fault and counter-clear histories can represent different events.
- Derive diagnoses and technician destinations from structured evidence, then check that the visible output contains exactly those values.
- Test drag cancellation, keyboard alternatives, touch input and stale-browser-cache behavior before calling the interface complete.
