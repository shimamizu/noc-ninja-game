# Guided patrol interaction contract

Current: guided-v21, constitution 1.7.1. One briefing → three incidents → session summary.

| State/action | Result |
| --- | --- |
| Load complete valid library | Briefing; shuffle cases/questions/choices once |
| Load invalid or incomplete required captures | Training unavailable; reload action, no fallback play |
| Start guided NOC patrol | First shuffled case and its initial status recording |
| Choose endpoint/command | Show available incident/follow-up outputs together; record evidence views |
| Optional observation missing | Explicit absence; no invented data, answer attempt or evidence credit |
| Shuriken pickup/move/drop onto A/B/C | Grade stable answer identity; show explanatory feedback |
| Answer text/target click, off-target drop, Escape | No submission/attempt |
| Keyboard Space/arrows/Space | Equivalent pickup/move/drop; Escape cancels |
| Wrong answer | Increment attempt; keep retry available |
| Hint | Record assistance; show method/explanation without completing answer |
| Correct answer | Complete once; permit next question |
| All answers correct and all 14 recordings viewed | Permit outcome/diagnosis reveal and text handoff |
| Reveal U13/U14 | Reported recovery with measurement limits |
| Reveal U15 | Recommended-action diagnosis review; no fabricated repair |
| Finish all cases | Summary retains all three handoffs |
| Restart cancel / confirm | Preserve exact session / clear and reshuffle |

Questions with context display it before choices. U15 defines the inter-lane highest-minus-lowest
range and preserves the leaf-first, down-link AND high-variance second-swap condition. U15's
counter question and workbench now use both supplied zero-error tables at both ends.
The homepage omits the generic missing-recording sentence. Public entry is root/index.html;
/tests/ is a separate developer page and not part of player progression.

Missing required outputs are an authoring admission failure: ask the owner and wait before
adding the case. Optional after-repair data can remain absent without implying recovery.
