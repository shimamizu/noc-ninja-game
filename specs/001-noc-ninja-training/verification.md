# Verification record

**Current revision:** noc-v3-2026-11-17 · **Constitution:** 1.3.0 · **Schema:** 2

- `node tests/run.mjs`: **144 passed, 0 failed**. Includes independent dispatch outcomes,
  CRC receive/transmit direction, current/historical Remote Fault, Tx alarm boundaries,
  corroborated flapping, missing/conflicting evidence, and drag target hit testing.
- Chrome Beta, isolated headless session: passed mouse drag/throw; off-target and Escape
  cancellation; wrong/correct retry; no duplicate submission; successful loading of both
  sprites; six independent technician destinations; complete six-incident progression;
  all five tools; restart cancellation; ninja keyboard aiming/throw; destination text in
  the live region; mobile touch drag and reduced motion.
- Visually inspected browser screenshots at 1366×900 and 375×812. Keyboard checks also
  used 1366×768. No horizontal page overflow on mobile; terminal output scrolls within
  its own region. No browser JavaScript exceptions occurred in the final pass.
- A release hit-testing issue was corrected during browser verification. Final verification
  disabled the browser cache to load current JavaScript, then passed the complete checks.
- Syntax and `git diff --check` pass. No new runtime packages or external asset requests.

Browser checks are repeatable with `tests/browser-qa.mjs` and a local server on port 8000.
The script uses an isolated Chrome debugging session and saves screenshots under `/tmp`.
CUA remains unavailable; these observations used Chrome's local debugging protocol instead.
Screen-reader listening, representative learner timing and independent external technical
review remain unperformed. Automated live-region checks are not a screen-reader session.

## Historical verification log

The records below describe earlier revisions. Their browser-unavailable statements and
old fixture expectations are superseded by the current report and U9 runbook above.


**Date:** 2026-11-17 · **Content:** noc-v3-2026-11-17 · **Schema:** 2
**Code:** working tree based on 361c963; no commit/deployment performed by this implementation.
**Environment:** macOS 27.3, Node v26.13.0. Browser control unavailable for this revision.

## Executed checks

- `node tests/run.mjs`: **144 discovered, 144 passed, 0 failed**. Independent expectations cover
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
| AC23 | Pass (data checks) | Complete fields on all 24 interface snapshots, per-platform formatting, ages/changes/traffic versus history; browser display pending |
| AC24 | Pass (data/logic checks) | Paired error tables, FCS mapping, complete MAC rows/times and port-status formats; rendered interaction pending |

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

Constitution 1.3.0, spec, plan, schema-2 data model/contracts, README and current tasks agree on:
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

## Full interface output — 2026-11-17

Revision `noc-v2.2-2026-11-17` replaces abbreviated interface output with the complete U6 field
inventory on both endpoints, for both timestamps in all six incidents. The six added checks cover
all 24 snapshots, platform format differences, state ages, cumulative transition totals, traffic
counters and counter-clear ages. Total: 109 passed, zero failed via `node tests/run.mjs`.
Reviewed representative down-ending and up-ending flap snapshots: the final durations are
Down 5 seconds and Up 0 seconds respectively, with four added link changes. Stable intervals
advance state ages by 60 seconds; continuously down intervals do not accumulate traffic.

CUA was retried for this update and again reported native-pipe startup failure and an unavailable
browser host. No new rendered output or full-output scrolling behavior was observed. The content
and regression checks pass; manual browser acceptance remains pending. No commit or deployment.

## Counters-errors and MAC formatting — 2026-11-17

Revision noc-v2.3-2026-11-17: Error snapshots uses paired counters-errors tables. MAC / history
shows complete current/earlier MAC output with separate authored history aids. Port status is
available and full interface details remain accessible. Six new checks cover columns/pairing,
MAC fields, temporal consistency, port status, invalid references/FCS mappings, and the distinction
between unchanged FCS and rising Rx/runts. Total: 115 passed, zero failed. Source U7 resolves the
command/row port mismatch explicitly and records receive-path semantics without claiming a failed
remote component solely from CRC or fault flags. Browser checks remain unverified.

## Stable-up MAC ages — 2026-11-17

Revision noc-v2.3.1-2026-11-17 aligns all four Last Change ages in 16 current/earlier
stable-up MAC snapshots. Independently checked equal structured ages and ran the existing
display-agreement suite. Compared all 15 down/flapping snapshots against their pre-edit values:
history records and rendered CLI text are unchanged. All 126 automated checks pass. This
content correction has not received a new browser visual check.

## Paired endpoint timeline correction

Revision noc-v2.4-2026-11-17 uses one link timeline per incident. Both endpoint MAC
and full interface histories share event times; port status and counter observation states
agree. Stable-up final ages are 21 days, 5:58:29 on both sides. Optical cases end down
for 11 minutes at both ends. Shared four-transition cases finish down for 5 seconds or
up for 0 seconds and count as one diagnosis. Source captures and counter-clear ages are
not link event clocks. Eleven new regression checks cover paired histories, independent
expected durations, feedback, clock/age/state corruption, missing timeline, mismatched flaps
and competing diagnoses. All 126 checks pass. Existing manual browser checks remain pending;
this change does not claim a new browser observation.

## Directional MAC and counter history correction

Revision noc-v2.5-2026-11-17, U8: retain shared Interface State events but independent
PHY/local/remote event histories. Full-interface counts since clear no longer have to equal
MAC totals. All 144 automated checks pass, including both optical directions, peer PHY up
with Interface down, distinct row ages, zero post-clear counts with nonzero MAC history,
and rejection of drifting row clocks or unexplained counter increments. The earlier v2.4
all-row equality statement is superseded. Browser/manual checks remain pending.

## Flap ages and distinct transceiver profiles

Revision noc-v2.6-2026-11-17: all 133 tests pass. New coverage checks aligned Remote Fault
False ages throughout both flap histories, rejection of stale fault timestamps, and distinct
endpoint telemetry within supplied normal limits. Existing tests verify fault-change histories,
displayed/structured Rx agreement and the six unchanged diagnoses. No new browser observation
is claimed; outstanding manual checks remain open.
