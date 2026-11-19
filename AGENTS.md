# NOC Ninja working instructions

## Required intake for new quiz cases

The owner explicitly requires missing expected outputs to be collected before a new use
case becomes playable. Do not add an incomplete case to `data/cases.json` or weaken its
validation to accept a gap. Ask the owner for the exact missing endpoint, interface,
command and sample, and wait for that data before enabling the case. Source intake notes
and draft questions may be prepared while waiting, outside the playable library.

For each endpoint, require original output for:

- `show interfaces ethernet <port> status`: one incident capture.
- `show interfaces ethernet <port> transceiver`: incident and follow-up captures.
- `show interfaces ethernet <port> mac detail`: incident and follow-up captures.
- `show interfaces ethernet <port> counters errors`: incident and follow-up captures.

That is 14 interface recordings per paired case. Preserve all rows, units, timestamps and
original values. If a proposed question needs further evidence, ask for that too before
adding the case. Do not substitute generated output, zeros or another case's recordings.
Do not assume an omitted output is intentionally unavailable. Any exception requires an
explicit change in owner instructions and matching validation/design updates.

Post-repair recordings are not prerequisites for a recommended-action case; do not imply
that a proposed repair has happened. Keep unsupplied timestamps, reset history, inventory
and recovery measurements unknown, and limit conclusions accordingly. Generic missing-state
handling is for optional observations, not a bypass of required case intake.

## Keep the handoff current

After case or teaching changes, synchronize root and StarterKit ARCADE.md, the governing
spec/plan/constitution and their StarterKit copies, README, capture guide, relevant contracts,
verification and counts in listing artwork. Preserve clearly labeled historical records.
The public Play URL is repository-root `/` or `/index.html`, never `/tests/` or StarterKit.

Use `node tests/run.mjs` for relevant changes and Safari for browser checks. Prefer leaving
the preview on the game briefing rather than the developer test results. Record actual
results and any pending manual/hosted checks; do not claim an unperformed verification.
