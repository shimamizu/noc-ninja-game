# Mixed Incident Implementation Verification

**Date:** 2026-11-17 · **Content:** noc-v2.1-2026-11-17 · **Schema:** 2
**Code:** working tree based on 361c963; no commit/deployment performed by this implementation.
**Environment:** macOS 27.3, Node v26.13.0. Browser control unavailable for this revision.

## Executed checks

- `node tests/run.mjs`: **103 discovered, 103 passed, 0 failed**. Independent expectations cover
  all three categories at both endpoints, all six actual incidents and every alternative category,
  optical absence/degradation, CRC arithmetic, history boundaries, contradictory evidence, complete
  tool sets, output-number agreement, source gates, safe retries, help, direct progression and reset.
- All application/test JavaScript files pass `node --check`.
- `git diff --check` passes. Current content source locators and local document links checked.
- Reviewed all six authored incidents against the independent table in mixed-incident-review.md.
  Compared terminal Rx/CRC numbers with observations; preserved all 20 optical limits and deployment.
- Inspected control dispatch: aiming only selects; form submit evaluates; animation has no timing
  callback or scoring effect. Reduced-motion CSS hides the projectile; feedback is immediate.
- Found the existing Python server listening on 127.0.0.1:8000. `open
  http://127.0.0.1:8000/index.html` returned successfully, requesting the updated game in the browser.
  This is not evidence that the rendered page or interaction has been visually checked.
- CUA inventory failed: “Sky Computer Use native pipe startup failed” and “The browser access
  host is unavailable.” No screenshot or interactive browser result for the redesigned UI was
  available. Earlier observations of the original UI do not validate this replacement.

## Acceptance ledger

“Pass (automated)” covers the named domain/state evidence only. Manual UI acceptance remains
separate and is not inferred from tests, markup, successful browser launch, or screenshots of v1.

| Criterion | Result | Evidence / remaining check |
| --- | --- | --- |
| AC1 | Not run in browser | Common all-method briefing data and initial state inspected; visible opening flow pending |
| AC2 | Pass (automated) | Absent-light cases at both endpoints and actual incident 2 |
| AC3 | Pass (automated) | Every alternative category rejected; wrong retry retains incident |
| AC4 | Pass (automated) | Empty/malformed/unknown selections do not count |
| AC5 | Pass (automated) | Ordered help, reopening, no completion from help |
| AC6 | Pass (automated) | Attempts and duplicate-success protection |
| AC7 | Pass (automated) | Six actual cases advance directly to final summary |
| AC8 | Pass (automated) | Cancel/confirm state behavior; native dialog/focus pending |
| AC9 | Not run | Full keyboard journey and visible focus pending |
| AC10 | Not run | Live announcement and persistent feedback in browser pending |
| AC11 | Pass (data checks) | Identical four tools at both endpoints, numeric agreement; visible console behavior pending |
| AC12 | Pass (automated) | Independent case table and boundary rules; label/order independence |
| AC13 | Pass (logic/source review) | Computed endpoint/value feedback; visual wrong/correct feedback pending |
| AC14 | Not run in browser | Fresh state and memory-only code checked; progress-then-reload pending |
| AC15 | Pass (automated) | Assistance frozen at completion; unique assistance history |
| AC16 | Pass (code/state review) | No timer, lives, points, speed or retry/help penalty path |
| AC17 | Not run | Exact laptop/narrow layout and text-equivalent rendering pending |
| AC18 | Not run | Projectile/aim/static mark/reduced-motion visual behavior pending |
| AC19 | Pass (automated) | Missing, stale, ambiguous and contradictory content rejected |
| AC20 | Pass (modeling review) | Current source-to-simulation review; no vendor/independent qualification claim |
| AC21 | Pass (automated/code) | Deterministic actual curriculum; static assets; full browser/network observation pending |
| AC22 | Not complete | Results recorded, but manual acceptance remains open |

## Success criteria

| Criterion | Result | Evidence / remaining check |
| --- | --- | --- |
| SC-001 | Not run | Representative learner timing and assistance |
| SC-002 | Pass (automated) | Independent diagnoses, alternatives, boundaries and feedback |
| SC-003 | Pass (automated) | Retry, invalid input, assistance, duplicate success and reset |
| SC-004 | Not run | Keyboard-only patrol and reduced-motion/browser check |
| SC-005 | Not run | 1366×768 and 375×812 layouts |
| SC-006 | Not run | Representative learner explanation of methods and causal limits |
| SC-007 | Pass (modeling/automated) | Six reviewed cases and invalid-content gate |
| SC-008 | Not complete | All acceptance results recorded; attendee handoff and manual checks pending |

## Cross-artifact review

Constitution 1.1.0, spec, plan, schema-2 data model/contracts, README and current tasks agree on:
three competing categories; six interleaved incidents; both endpoints and all tools every time;
one opening briefing; explicit aim then throw; direct Next; immediate feedback and reduced-motion
alternative; preserved hardware, thresholds, source gate and honest assistance. Historical research
and v1 review/task records are labeled as superseded. No new source request or approval gate is
introduced. Browser gaps remain open in T050 and the historical manual release tasks.

Follow quickstart.md for the complete pointer/keyboard, layout, motion, announcement, restart,
loader-error, subpath, representative-learner and attendee-handoff procedures. Record actual
browser/OS versions and results when those checks can run.

**Status:** redesigned game implemented and opened; automated checks pass; release acceptance
remains incomplete. No claim of full accessibility certification or visual QA.

## Switch naming and /126 update — 2026-11-17

Revision `noc-v2.1-2026-11-17`: all six incidents map DCS-7050SX3-48YC8 to leaf-gw1,
`2001:db8:51::1/126`, and DCS-7808-CH to spine-gw1, `2001:db8:51::2/126`. Checked every
CLI prompt against its owning device, along with labels, hints, source aliases and references.
The schema enforces /126 for this deployment while the general IPv6 parser still accepts other
valid prefixes. The existing 103 tests pass; an additional one-time content check confirmed the
renamed /126 curriculum validates and an incorrect deployment prefix is rejected. Whitespace
checks pass. Browser checks remain pending as above.
