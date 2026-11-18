> **Current scope (2026-11-18):** One guided NOC patrol using only U10–U12. See [guided-patrol.md](guided-patrol.md). Conflicting six-case, simulation and separate-mode details below are historical and superseded.

# Quickstart and Manual Validation

**Updated:** 2026-11-17 · mixed incident revision noc-v2.1-2026-11-17

## Start and run checks

From the repository root, run `python3 -m http.server 8000 --bind 127.0.0.1` and open
http://127.0.0.1:8000/index.html. No package install/build is required. Stop the server with Ctrl+C.
Run `node tests/run.mjs`, or open http://127.0.0.1:8000/tests/ in the browser. Require a nonzero
count and zero failures; loader/import errors are failures. Record exact browser/OS versions.

## Full mixed patrol

1. Start fresh. Verify the opening guide teaches all three methods, then Enter the dojo.
2. Incident 1: verify all five tools at both switches. Switch endpoints while retaining the chosen
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

## Complete-interface realism check

For each switch, scroll Interface now to PAUSE output and inspect both full Error snapshots. Verify
MAC/BIA, peer description, platform-specific MTU/MRU and uni-link, state age, link-change total,
counter-clear history, rates, packet/byte totals and all error/discard/PAUSE fields. In incidents
3 and 6, the current Down/Up duration must reflect the last flap, not the original long uptime.
A high cumulative link-change count is background evidence; use timed history to classify flapping.

## Error snapshots and MAC detail

Verify Error snapshots shows the counters-errors command twice, with both timestamps and all
seven columns. Verify the FCS values match the earlier/later full interface CRC counts, which
remain available in Interface now and its expandable earlier detail. Port status must show the
selected endpoint/peer, routed mode, full duplex, 100G and CWDM4. MAC / history must show the full
current MAC table; expand the earlier MAC snapshots and compare every state, cumulative count
and Last Change age to the separate authored timeline. Do not interpret a high old total or a
single last-change age as the four-transition history required to grade flapping.

For each incident, compare both switches at the same snapshot time: link state and Up/Down
age must agree, as must MAC Interface State Last Change ages. PHY and fault rows may differ
by endpoint; in optical incidents the normal-light peer has PHY up but Interface State down. Stable-up histories align all
four rows. Both endpoints of a flapping case show the same four transitions, counted once
in feedback. Device-local counter-clear times and accumulated counts may differ.

## v3 drag and dispatch acceptance

1. Start the game, drag the ninja to an incorrect answer and release; verify one retryable throw.
2. Drag onto the correct answer and release; verify one additional throw and a dispatch panel.
3. Release in empty arena space and press Escape during another drag; neither scores.
4. Focus the ninja: left/right aim, Enter/Space throws. Native target radios and Throw also work.
5. Verify case destinations in order: leaf, spine, leaf, spine, leaf, leaf, using Et51/1 or Et3/15/1.
6. In case 5 inspect low leaf Tx and poor spine Rx; in case 6 inspect leaf Remote Fault True in
   historical snapshots despite current False. These clues must remain visible before answering.
7. Repeat with touch and reduced motion. The destination must appear in persistent text and
   the live-region announcement; no real dispatch action occurs.

Optional repeatable Chrome checks (Node 26, server on port 8000): launch a separate Chrome
profile with `--headless=new --remote-debugging-port=9228 --user-data-dir=/tmp/noc-ninja-qa`,
then run `node tests/browser-qa.mjs 9228`. Do not attach it to a personal browser profile.
