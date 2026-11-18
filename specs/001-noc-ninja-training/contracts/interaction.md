> **Current scope (2026-11-18):** One guided NOC patrol using only U10–U12. See [guided-patrol.md](../guided-patrol.md). Conflicting six-case, simulation and separate-mode details below are historical and superseded.

# Interaction and Session Contract

**Updated:** 2026-11-17 · One briefing → six mixed incidents → summary

| View/event | Behavior |
| --- | --- |
| Loading / valid complete content | Fresh opening briefing; zero progress |
| Loading / failed content | Visible unavailable state, structured errors, Reload; no grading |
| Briefing / Enter dojo | First incident, no aimed diagnosis |
| Challenge / endpoint or tool | Inspect evidence; preserve aim and prior feedback |
| Unsolved / aim via native radio | Select one category only; no throw or animation |
| Unsolved / Throw without valid aim | Persistent guidance; no attempt |
| Unsolved / valid wrong Throw | Attempt +1, text feedback, decorative throw; retry same incident |
| Unsolved / correct Throw | Attempt +1, complete once, freeze assistance status, enable Next immediately |
| Solved / repeated Throw or new help | No change to attempts, assistance or completion |
| Unsolved / help | Method, worked step, solution in order; unique assistance IDs, no submission |
| Challenge / reopen viewed help | Display it without duplicating assistance |
| Unsolved / Next | No effect |
| Solved / Next | Next mixed incident with fresh aim/feedback/help view; no lesson interstitial |
| Sixth solved / Finish | Final completion/throws/assistance summary |
| Restart | Native confirmation dialog |
| Cancel or Escape | Preserve state; return focus to invoking control |
| Confirm or page reload | Fresh opening briefing, all progress cleared |

Explicit throw is the existing internal `submit` event. The animation uses no state timer and
never gates feedback or Next. A static impact mark remains. Reduced motion removes the projectile;
all evidence, results and controls remain available. Dragging is optional: broad answer targets
accept a deliberate release, with equivalent click/radio/keyboard submission and no timing test.

Targets are labeled native radios. Tab/Shift+Tab navigate controls, radio arrows aim, and native
Enter/Space activate buttons. Visible focus surrounds targets and buttons. Endpoint changes preserve
the chosen tool. New incidents focus their heading; empty throws focus a target; success focuses
Next without forced scrolling. Feedback announcements use the persistent live region outside the
rerendered app. A skip link targets the main content.

The graphical topology, Rx gauges and history all have text values. Technical output remains plain
text in a labeled scroll region. No essential information is hover-only. Desktop pairs console and
arena; narrow screens stack them. Browser/accessibility checks must be observed, not inferred from
semantic markup or unit tests.

Throws, completion and assistance are separate. No penalty, countdown, points or mastery claim.

## Drag input and dispatch feedback

Pointer down on the ninja captures that pointer. Movement updates an aiming line and target
highlight without scoring. Release inside a target dispatches select, then submit once. Release
elsewhere, pointer cancellation, lost capture or Escape cancels. Ninja left/right keys select
a target; Enter/Space submits. Existing radio controls and Throw remain equivalent.
Correct feedback adds the dispatch destination and rationale, and the live region announces
the destination. The post-diagnosis recommendation does not add an attempt.
# Guided patrol additions — 2026-11-18

`begin-guided` selects guided mode; `begin` retains arcade. `inspect` saves unique per-round output
IDs. `reasoning-select` accepts only known question/option pairs after correct diagnosis.
`check-reasoning` provides per-option feedback; incomplete input does not count, valid attempts
count once, and successful reasoning freezes further submissions. Guided `next` requires complete
observation coverage and successful reasoning as well as correct diagnosis. Arcade `next` retains
its prior behavior. Restart confirmation freezes interaction and confirmation resets the new state.

`download-handoff` is a local UI action, guarded by completed guided reasoning and evidence coverage.
It supports the current incident and completed summary entries; it sends nothing externally.
Reasoning uses native radio/fieldset controls, text feedback and a live announcement. Guided success
focuses the reasoning section; completed reasoning focuses Next when coverage is complete.
New visual/keyboard/download acceptance is pending as recorded in `../evidence/skill-adaptation.md`.

## Real-case events — 2026-11-18

- `begin-real`: enter the real patrol from briefing or dojo summary; retain the return view.
- `real-inspect`: select a valid case evidence panel and record a unique view.
- `real-select`, `real-submit`: select and explicitly grade the current reviewed decision. Unknown
  options do nothing; empty input gives guidance without an attempt; correct completion freezes it.
- `real-hint`: record assistance and show the current decision’s explanation; never complete it.
- `real-question-next`: advance only after the current decision is correct.
- `real-reveal`: mark case complete and show owner outcome only after all decisions and panel views.
- `real-next`: proceed to the next case, or final real summary, only after outcome reveal.
- `real-download`: local text export only for completed cases, including summary downloads.
- `real-home`: restore the original dojo’s prior screen, preserving both tracks’ records.

The existing restart dialog freezes both tracks; cancel preserves and confirm clears their state.
Real-case progress and question counts are separate from synthetic diagnosis progress.
