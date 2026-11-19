# NOC Ninja Training Constitution

## Core Principles

### C1 · Technical truth is a release requirement

The game MUST teach conclusions supported by the supplied incident evidence and documented
operator guidance. Each case MUST preserve its own hostnames, ports, chassis, EOS release,
optics, units, measurements and timing. Unknown inventory, timestamps, counter reset history
and repair measurements MUST remain unknown. Missing recordings MUST NOT be filled with
simulated data or treated as normal readings.

Recommendations, reported interventions and confirmed recovery MUST be distinguished.
A fault flag alone MUST NOT become a universal failed-component rule. Compare both ends
and each optical channel; retain the limits of historical counters and unmatched sample
windows. Intentional transmitter disable is excluded from every training incident by owner
instruction; do not require ruling it out or invent telemetry to prove the assumption.

Before a new case enters the quiz, authors MUST inventory the expected command captures
at both endpoints: status once, transceiver twice, MAC detail twice and counters errors twice
(incident and follow-up for each repeated command). If any required output is missing, ask
the owner for the specific endpoint/port/command/sample and wait for it before enabling the
case. Do not treat omission as permission to proceed, invent readings or weaken validation.
Draft source notes and questions may be prepared outside the playable library while waiting.
Ask for any additional evidence required by a proposed conclusion. Post-repair captures are
optional for recommended-action cases; a recommendation MUST NOT imply a completed repair.

**Evidence:** reviewed source records, exact-capture checks, independently reasoned answers
and explicit limits in each case. Invalid content MUST make the patrol unavailable.

### C2 · Every round teaches through a decision

Each decision MUST exercise evidence interpretation, repair sequencing or verification.
Introduce unfamiliar concepts and show the measurements needed before testing them.
Questions MUST stand alone because their order is shuffled. Three answer choices MUST
include one supported answer, explanatory feedback for each distractor and a reasoning hint.

For U15, “bias current variance between lanes” means the highest-to-lowest range in mA:
63.35 − 27.33 = 36.02 mA. The operator normally sees at most about 10–20 mA between the
four lanes in this environment. This comparison MUST be attributed to that environment,
not presented as a universal manufacturer alarm or statistical variance. Show the definition,
calculation and comparison before the relevant questions. Replace leaf-gw2 first; consider
spine-gw1 only if the link remains down AND high variance persists after that swap.

**Evidence:** prompts, teaching context, hints, feedback and handoffs agree with the sources.

### C3 · Progress is honest and retry is safe

Only a valid correct answer completes a decision. Incorrect answers MUST remain retryable;
empty input, cancelled throws and duplicate submissions MUST NOT inflate attempts or progress.
Record attempts and hint use separately from evidence views. Outcome/diagnosis disclosure and
handoff export MUST require every decision correct and every available evidence item viewed.
Unrecorded commands MUST NOT block completion or count as reviewed evidence.

No lives, countdown or speed score. Confirmed restart clears progress and reshuffles;
cancellation preserves the session. Completion records practice, not certification or proof
of service recovery beyond the supplied follow-up.

**Evidence:** transition, retry, gating, report and restart checks.

### C4 · Access is part of the core game

Shuriken drag-and-release MUST have a keyboard equivalent: pick up, move, drop or cancel.
Answer text and target clicks MUST NOT submit. Provide visible focus, readable labels,
textual feedback and live announcements. Reduced motion MUST avoid decorative flight without
delaying feedback. Dense output may scroll within its labeled container; core controls MUST
remain usable on laptop and narrow screens. Decorative scenery MUST stay behind controls
and MUST NOT intercept input or reduce text readability. The incident badge and capture
notes/limits MUST use solid dark surfaces over the page artwork.

**Evidence:** browser controls, keyboard/drag and reduced-motion checks, plus recorded manual
layout and screen-reader acceptance. Pending checks MUST stay visible; automated checks
MUST NOT be described as full accessibility certification.

### C5 · Grading is deterministic and the game is self-contained

Ship authored JSON, static HTML/CSS, JavaScript modules and local artwork. No accounts,
backend, live-switch commands, credentials, external grading service or runtime AI.
Scenario, question and answer arrays may shuffle once per session; stable identities MUST
keep grading deterministic and the order MUST remain fixed during play. Reload clears memory.

HTTP(S) static hosting MUST work without a package install or build step. Authoring tools
are not runtime dependencies. Runtime AI or generated telemetry requires an explicit scope
and governance amendment before implementation.

**Evidence:** the static entry loads the game using only deployed local assets.

### C6 · Content and logic can be reviewed separately

Keep cases, sources, hints, teaching context, reviewed choices, outcomes and capture needs in
`data/cases.json`. Keep validation, progression and rendering separate. Validate before play
and fail closed for malformed libraries or incomplete required capture sets. Exactly one reviewed choice per question is supported;
the runtime grades stable answer IDs, not a universal optical threshold classifier.

Adding a supplied case that fits the existing mechanic MUST reuse the existing progression.
New evidence shapes require explicit validation and tests, not fabricated data. Preserve raw
source text; any displayed command expansion MUST leave measurement bodies unchanged.

**Evidence:** source-fidelity, malformed-content, answer-mapping and full-patrol checks.

### C7 · Done is demonstrated

The constitution, specification, plan, tasks, README, both ARCADE copies and listing artwork
MUST describe the same current game. Historical requirements MUST be clearly separated from
active requirements. State actual test results, revision and remaining checks; do not label
an unperformed deployment verified. Incorrect teaching and broken interaction take priority
over cosmetic additions.

**Evidence:** reproducible checks, a consistent publishing handoff and honest verification records.

## Current Scope and Technical Boundaries

One Guided NOC Patrol contains U13, U14 and U15: three supplied 100G Arista incidents,
four decisions each, 42 interface recordings (14 per case), all on EOS 4.31.10M.
U13/U14 use ColorChip C100Q020CWDM403H optics and have operator-confirmed spine optic
repair outcomes. U15 uses C100Q020CWDM403B optics and has a recommended sequence only.
Do not import chassis or line-card details across incidents sharing a hostname.

The four interface-scoped commands are status, transceiver, mac detail and counters errors.
Choosing an endpoint or command displays all available incident/follow-up recordings together.
Both endpoints in every case have the complete required incident/follow-up capture set.
All cases' numerical post-repair measurements remain absent.
The optics YAML is an authoring reference, not a runtime classifier. Retired simulations,
fixed IPv6 deployments and separate game modes are outside current scope.

The quiz uses local Himeji Castle-inspired arena artwork and a separate Mount Fuji/red maple
page background, visible only during incident play. The homepage retains its original
background. A 145×165 CSS-pixel ninja stands in a 300px arena with space below the targets.
These decorative assets do not add runtime services or alter evidence and grading.

The public entry MUST be the repository-root `index.html` (or a host root configured to
serve it). Players enter the game briefing and select Start guided NOC patrol. `/tests/`
is a separately addressed developer test runner, never a player prerequisite or public
launch target. Both ARCADE copies MUST identify the repository root and game URL.

## Development Workflow and Quality Gates

Use constitution → specification → clarification when needed → plan → tasks → consistency
review → implementation. Preserve accepted owner instructions and record their effects in
current artifacts. Review C1–C7 before material scope changes; do not silently relax requirements.
The governing documents are this constitution and `specs/001-noc-ninja-training/spec.md`
and `plan.md`; StarterKit documents summarize them for the handoff.

Verify source fidelity, supported and incorrect choices, missing data, repeated submissions,
shuffled sessions, outcome/report gates, restart and browser controls. Record manual keyboard,
narrow-layout, screen-reader and download acceptance as observed or pending. Prefer Safari
for previews. Validate the actual hosted launch and assets after a hosting URL is supplied.

## Governance

This constitution governs the current project. Version 1.7.1 clarifies existing accessibility
and local-artwork requirements for the owner-approved castle/Fuji scenery, target clearance
and opaque text surfaces. Version 1.7.0 added the complete-capture intake gate to the approved
U14/U15 additions, shuffled patrol, lane-variance teaching and public launch guidance.
It retains C1–C7 and removes superseded simulation requirements from the active document.
The prior text is archived at `specs/001-noc-ninja-training/history/constitution-before-1.6.0.md`.

Amendments MUST record the reason, affected principles, owner authorization and dependent
artifact updates. Use MAJOR for incompatible governance/principle changes, MINOR for expanded
guidance and PATCH for clarification without semantic change. Preserve the original ratification
date. Reviews MUST identify unresolved violations and the evidence needed to close them.
Neither a documentation update nor passing unit tests waives pending release acceptance.

**Version**: 1.7.1 | **Ratified**: 2026-11-17 | **Last Amended**: 2026-11-19
