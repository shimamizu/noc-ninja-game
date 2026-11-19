# Guided patrol quickstart and manual validation

Current revision: guided-v21, stylesheet guided-v20-fuji2, constitution 1.7.1, 2026-11-19. Three incidents, twelve decisions, forty-two recordings.

## Start

From the repository root:

```sh
python3 -m http.server 8001 --bind 127.0.0.1
```

Open `http://127.0.0.1:8001/` or `/index.html` in Safari. Players see the briefing and
Start guided NOC patrol directly. No install/build step. Reload clears progress.
Developer checks use `node tests/run.mjs` and the separate `/tests/` browser page; never
set the Arcade Play link to that page. Return the preview to the game after checking tests.

## Check the current patrol

1. Confirm the briefing shows 3 incidents / 12 decisions and does not include the removed
   “Requests without a recording…” sentence. Start the patrol; scenario/question/answer order shuffles.
2. Select both endpoints and each of the four commands. Status has one sample; transceiver,
   MAC detail and counters errors have two at each endpoint. U15 leaf Et53/1 errors show zero
   in every category in both samples. Do not infer a measured rate from untimed tables.
3. Check U15's variance/second-swap context before answering: 63.35 − 27.33 = 36.02 mA versus
   the operator's usual 10–20 mA range between lanes. Leaf optic first; consider the spine optic
   only if the link remains down AND high variance persists after that swap.
4. Check U14's fault-count prompt names `show interfaces ethernet XX mac detail` on each device.
5. Drag the shuriken to A/B/C; wrong answers explain and permit retries. Clicking answer text
   or a target does not submit. Cancel/off-target releases do not count. Keyboard: Space,
   arrows, Space; Escape cancels. Repeat with reduced motion.
6. Complete all four answers and review all 14 recordings per case before revealing. U13/U14
   show reported recovery; U15 shows diagnosis review only. Download each handoff and compare
   evidence/answers/limits with source. Finish all cases and verify three handoff links.
7. Cancel restart to preserve the session; confirm to clear and reshuffle. Repeat at narrow
   widths and with a screen reader; record actual results, not inferred compliance.

## Visual acceptance

- Confirm the homepage retains its original background; Fuji and red maple scenery appears only during quiz incidents.
- Confirm the Himeji Castle courtyard fills the ninja arena separately from the page background.
- Check the 145×165 ninja and hand control in the 300px arena, with clear space below target B.
- Check the incident badge and capture notes/limits have solid dark backgrounds, both collapsed and expanded.
- Repeat at narrow widths: headings, output scroll regions, targets, instructions and expanded notes remain readable and usable.
- Return to the briefing and confirm the quiz-page background is removed.

## Future case intake and current status

Collect the complete required 14 recordings before adding a new case. Ask the owner for each
missing expected endpoint/port/command/sample and wait; draft outside the playable library.
The validator rejects omissions. Post-repair recordings remain optional for recommendations.

53/53 Node and 62/62 Safari checks pass on guided-v21. Dedicated narrow-layout, screen-reader,
full manual playthrough and download-click acceptance remain pending, as does hosted validation.
Use [ARCADE.md](../../ARCADE.md) and [plan.md](plan.md) for the actual publication handoff.
