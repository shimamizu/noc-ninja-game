# NOC Ninja — Project principles

Updated 2026-11-19. This replaces the StarterKit's earlier simulation scope and summarizes
current owner requirements. See [SPEC.md](SPEC.md), [PLAN.md](PLAN.md) and the
[current scope](../specs/001-noc-ninja-training/guided-patrol.md).

## Purpose and scope

Teach NOC employees to investigate optical-link failures and select a supported optic
replacement using actual captured Arista EOS output. One Guided NOC Patrol currently has
two incidents (U13/U14), four questions each, with confirmed spine-optic replacement outcomes.
Scenario, question and answer order shuffle for each new session and remain stable during play.

## Evidence integrity

- Use only supplied measurements. Do not generate readings, commands' output bodies,
  timestamps, repair verification or missing inventory to complete a case.
- Preserve original captures in source records. Expand personal aliases to standard commands
  for learners while keeping the measurement body unchanged.
- Separate current state, cumulative histories, timed deltas and repair reports. Do not borrow
  MAC timestamps for other commands or count state transitions as complete flap cycles.
- Compare both endpoints and all optical channels. A fault flag alone is not universal proof
  of one failed component. Teach the case's combined evidence and confirmed outcome.
- Keep absent data explicit. Supplied specification thresholds are reference material;
  the game does not infer universal alarm bands or run a threshold classifier.
- Intentional transmitter disable is excluded from the educational cases.
- Learner content does not describe the capture-sanitization process. Future contributors
  must remove sensitive information before sharing new evidence.

## Learning and interaction

Use four interface-scoped command choices: status, transceiver, mac detail, counters errors.
Show all available readings on selection. Keep the investigation compact, with expandable
context and the question/ninja alongside the outputs on desktop.

Require deliberate shuriken drag-and-release to answer, with a keyboard pickup/move/drop
alternative. No click-to-answer, reflex test or precision score. Cancellation is free; retries
are unlimited. Explanatory feedback and hints must use the supplied evidence. Stable IDs keep
grading correct when visible A/B/C positions change.

Outcome disclosure requires completed decisions and reviewed evidence. Handoffs state what
was observed, what the technician did and what remains unmeasured. Practice completion does
not certify independent competence or service health beyond the reported follow-up.

## Engineering and publication

Keep the app static and dependency-free at runtime: HTML, CSS, ES modules, JSON and local art.
No live-switch commands, backend, runtime AI, telemetry service or credentials. HTTP(S) hosting
is required; no package install or build step is needed. Progress is session-only.

Use original project artwork, visible focus, textual feedback, live announcements and reduced
motion. Test logic and browser behavior appropriate to changes. Document pending manual checks
and do not call an untested hosted deployment verified. Prefer Safari, reusing its existing
game tab when previewing. Publishing instructions and both ARCADE metadata copies must match
the current game; historical documents do not supersede this scope.
