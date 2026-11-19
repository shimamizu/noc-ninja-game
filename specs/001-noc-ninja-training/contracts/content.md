# Guided patrol content contract

Current: guided-v20, `data/cases.json` schemaVersion 1, revision
`guided-cases-u13-u14-u15-v3`, constitution 1.7.0. U13–U15 contain 42 recordings and 12 decisions.

Load relative to the module, verify HTTP/JSON, then validate the whole library. Return frozen
cases with no errors, or an empty set with an explanatory error. Never partially start or
restore retired examples on failure.

Require unique case/evidence/question/option IDs, matching revisions, local evidence sources,
two endpoint identities, valid literal command targets/observations and reviewed explanations.
Require **one incident status plus incident/follow-up optics, MAC and errors per endpoint**:
14 original recordings. An omitted required capture fails validation with case, host, port,
command kind and observation. Ask the owner for missing expected data and wait before adding
the case to the quiz. Draft intake notes may stay outside the runtime library.

Literal prompts must match host, interface and kind, including the captured `show int`
abbreviation. Only the reviewed `senz` counters alias has display expansion; preserve its
body and original source prompt. Do not substitute summaries for required literal recordings.

Questions may have nonempty context shown before choices. Each has exactly three options
and one correct choice, feedback, explanation, command hint and matching case source ID.
Outcome type and uncertainty are explicit. U13/U14 are confirmed-recovery; U15 recommended-action.

Optional recordings, including after-repair data, retain explicit provenance and unique keys.
Missing optional observations resolve to Not captured without fabricated values or evidence
credit. They do not bypass required admission or imply that a proposed repair has occurred.
Unknown timing, reset history and inventory remain explicit. After-repair recordings stay
locked until review completion. The optics YAML is authoring reference, not runtime grading.

See [data-model.md](../data-model.md), [spec.md](../spec.md), [plan.md](../plan.md) and the
[capture collection guide](../capture-collection-guide.md). Prior contracts are archived in history.
