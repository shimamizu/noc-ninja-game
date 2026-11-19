# Guided patrol data model

Current: guided-v21, schemaVersion 1, content `guided-cases-u13-u14-u15-v3`, constitution 1.7.1.
The runtime source is `data/cases.json`: three cases, twelve decisions, forty-two recordings.

## Library and case

The library has `schemaVersion`, `revision` and `cases`. Each case has a unique `id`, matching
`revision`, local evidence `source`, title/speed, intro/method/limits/collectionNote, two endpoints,
evidence, questions, outcome, captureNeeds and commandCaptures. Validated content is frozen.
Endpoint identity includes id/name/port; model, EOS, optic/vendor and line card preserve supplied
values or explicit unknowns. Shared hostnames do not imply identical hardware across cases.

## Required evidence and intake

Each endpoint requires literal status once and incident/follow-up optics, MAC and error counters:
14 recordings per case. Each recording identifies endpoint, kind, observation, label and literal
text, with capture-time/limit notes. The validator checks matching host/port/command and unique
endpoint/kind/observation keys. An incomplete required set fails before play. Ask the owner for
omitted expected outputs and wait before adding a new case to the quiz.

U15's leaf errors are now supplied: both Et53/1 tables contain seven zeros. Its source records
the later submission separately; no absolute counter timestamp or reset baseline is inferred.
Optional after-repair commandCaptures require endpoint/command/observation, timestamp, source
and literal text; none are currently supplied. Optional follow-up status/post-repair gaps stay
missing. These optional gaps do not weaken the required intake gate.

## Questions and outcomes

Each question has id, prompt, three options, explanation, commandHint and sourceIds; optional
nonempty context appears before answers. Each option has stable id/text/correct/feedback and
exactly one is correct. U15 context defines bias current variance between lanes as highest
minus lowest, 63.35 − 27.33 = 36.02 mA versus the operator's usual 10–20 mA maximum range.

Outcome has status/title/summary/limits. U13/U14 use confirmed-recovery, U15 recommended-action.
The schema also supports intervention-only and combined-recovery; neither is currently active.

## Session state

State holds view, frozen shuffled sessionCases, restartConfirmation and patrol. Patrol tracks
case/question indices, selected captures and per-case progress. Each case records completed,
viewedIds, captureRequests and per-question answerId/attempts/completed/assisted/feedback.
Grading uses IDs; ordering stays fixed through retries. Reveal and report require all correct
answers and all available evidence views. Confirmed restart reshuffles; reload loses memory.

See [spec.md](spec.md), [plan.md](plan.md) and [content contract](contracts/content.md).
