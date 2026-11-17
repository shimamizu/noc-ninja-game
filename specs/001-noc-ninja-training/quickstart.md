# Quickstart and Manual Validation

**Updated:** 2026-11-17 · mixed incident revision noc-v2.1-2026-11-17

## Start and run checks

From the repository root, run `python3 -m http.server 8000 --bind 127.0.0.1` and open
http://127.0.0.1:8000/index.html. No package install/build is required. Stop the server with Ctrl+C.
Run `node tests/run.mjs`, or open http://127.0.0.1:8000/tests/ in the browser. Require a nonzero
count and zero failures; loader/import errors are failures. Record exact browser/OS versions.

## Full mixed patrol

1. Start fresh. Verify the opening guide teaches all three methods, then Enter the dojo.
2. Incident 1: verify all four tools at both switches. Switch endpoints while retaining the chosen
   tool. Throw with no aim: guidance, zero throws. Aim at Light levels: no submission/animation yet.
   Throw: one wrong attempt, retry remains available. Inspect CRC pairs: leaf-gw1 900→900,
   spine-gw1 5→17. Aim CRC / errors and throw. Verify +12 at spine-gw1, one completion and Next.
3. Repeat a solved submission: no extra progress. Next opens incident 2 directly. Inspect leaf-gw1's
   down status and four −30 dBm readings. Choose Light levels; confirm absent-light explanation.
4. Incident 3: inspect spine-gw1's normal light, unchanged counters, and four changes ending down.
   Use all help tiers and reopen one. Help never submits or duplicates assistance. Throw Link
   flapping; verify assisted completion, no failed-component claim, no animation-gated Next.
5. Incident 4: leaf-gw1 120→145 while up; spine-gw1 2400→2400. Throw CRC / errors. Feedback shows
   +25 at leaf-gw1 and does not diagnose the peer merely for its larger old total.
6. Incident 5: spine-gw1 Rx −17.20/−16.80/−17.00/−16.90 dBm. Throw Light levels. Feedback says
   very bad receive light below −15.70, never “no light.”
7. Incident 6: leaf-gw1 changes down/up/down/up at 10/20/40/60 seconds, ending up. Choose Link
   flapping. Finish opens the summary with six completed and honest throws/assistance totals.
8. Restart → Cancel or Escape preserves everything and returns focus. Restart → Confirm resets
   all state. Build some progress and reload: a fresh opening briefing, no saved progress.

## Keyboard, viewport and motion

Repeat the complete core flow by keyboard only. Check native radio arrows aim without submitting,
visible focus, Throw activation, all help controls, Next and dialog focus containment/return.
Check skip link, new-incident heading focus, and wrong feedback persistence while inspecting data.
Use a real screen reader; record browser/reader pairing and feedback announcements.

Review at 1366 × 768 and 375 × 812 layout pixels. Essential labels/values/actions must remain
reachable; terminal scrolling must not cause page-width overflow. Read numeric equivalents of
gauges and static history; no required data depends on hover or color.

Enable reduced motion. Projectile is hidden and feedback/impact marks remain. Without reduced
motion, a valid throw travels to the chosen target. Selecting a target alone must not throw.
Feedback and Next are available immediately, without waiting for animation completion.

## Failure and portability checks

Use cloned test data, not permanent production edits, to verify invalid JSON, missing source,
pending/stale review, conflicting tools, incomplete history and multiple diagnoses prevent grading.
Verify a visible error and reload recovery. Test static serving under a repository subpath; relative
module/data/style URLs must work. Observe network requests: only project files should be required.

A representative new NOC engineer should complete the patrol and explain all three diagnostic
methods and causal limits. Record time and assistance, never penalize duration. Have another
attendee follow README from a fresh session. Record every pass/fail/not-run in verification.md.
