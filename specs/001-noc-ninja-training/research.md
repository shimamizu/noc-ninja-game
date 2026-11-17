# Current research status — 2026-11-17

The owner-requested mixed-incident redesign is governed by Constitution 1.1.0, current spec.md,
plan.md and schema-2 contracts. All three diagnostic methods now run for every incident; there
are no category-specific lessons or intermediate summaries. The shuriken throw is decorative
explicit submission. See [mixed-incident-review.md](evidence/mixed-incident-review.md) for current
cases and source applicability. The owner has confirmed U4’s exact spine-gw1 setup; no further
threshold or source-setup evidence is being requested. Browser acceptance remains pending.

The research log below is historical planning/provenance. Any earlier pending-applicability,
all-absent optical scope, or lesson-sequence statement is superseded by the current review/spec.

---

# Research: NOC Ninja Training

**Date**: 2026-11-17
**Inputs**: [spec.md](spec.md), [StarterKit plan](../../StarterKit/PLAN.md), and
[project constitution](../../.specify/memory/constitution.md).
**Outcome**: Phase 0 design research complete. R-01–R-03 remain open content-evidence
requirements; none is represented as verified.
**Phase status**: Architecture and interface decisions are resolved. Phase 1 can describe
validation and unavailable-content behavior without manufacturing platform-specific evidence.
This report does not certify the selected deployment.

Research covers EOS evidence, exact optics/hardware, and browser design. Findings distinguish
generic documentation, exact-part/release claims and the limits of supplied examples.

## Decisions

### D1 — Keep the starter's native browser stack

**Decision:** Semantic HTML, CSS and native JavaScript modules; authored JSON loaded over HTTP;
no framework, bundler, application backend or runtime model. Keep session state in memory.

**Rationale:** Six fixed rounds and one mechanic do not need additional infrastructure. Native
modules need a supported serving context. Resolve resource paths relative to the owning module
using URL/module metadata, so importing from the test runner or hosting under a subpath does
not accidentally look at the host root. [MDN JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

**Alternatives considered:** Framework/build pipeline, server-based grading, persistence and
runtime AI. They add scope and dependencies without serving the accepted first release.

### D2 — Treat loading failure and authored-content failure as availability errors

**Decision:** Check HTTP status, parse JSON, validate its structure, then check domain invariants
before starting any playable session. Keep invalid learner input separate from unavailable content.

**Rationale:** Fetch does not reject merely because the HTTP response indicates failure.
An unavailable file or malformed scenario must never become a learner mistake or an empty
successful curriculum. The complete six-round content set is validated before start, following
the starter's whole-document policy. [MDN Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

**Alternatives considered:** Start partial content and discover defects later, or silently skip
unavailable rounds. Both conflict with sequential six-round completion and honest progress.

### D3 — Use plain text and native controls for evidence and choices

**Decision:** Render authored command text in a preformatted text region through `textContent`.
Use a fieldset/legend and native radio inputs with labels and stable choice IDs. Do not select an
answer initially; selection and command inspection do not submit it.

**Rationale:** Text rendering does not interpret simulated output as markup. Native single-choice
controls provide established keyboard behavior. [MDN textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent),
[MDN radio inputs](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/radio),
[W3C radio-group interaction](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)

**Alternatives considered:** Rich HTML terminal content or custom graphical radio controls.
They create avoidable parsing and accessibility obligations.

### D4 — Feedback and motion must not impede decisions

**Decision:** Maintain a persistent polite status region for feedback. Move focus deliberately
when changing views, not on every retry update. Keep complete static state history when optional
playback is disabled by reduced-motion preferences.

**Rationale:** Result updates must be available to assistive technology without forcing focus
changes; motion is never the sole evidence source. [W3C status messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html),
[MDN reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)

**Alternatives considered:** Feedback conveyed only through color or animation, or recreating
and focusing the whole interface after every choice. These undermine AC9, AC10, AC17 and AC18.

### D5 — Compute diagnoses from reviewed observations

**Decision:** Preserve the starter's pure evaluator and separate state, content, rendering and
feedback modules. Grade the observed condition and receiving interface, not a guessed cause.
Use independent fixtures for correct, plausible-wrong and boundary expectations.

**Rationale:** The spec provides concrete CRC deltas (25, 0, 12) and four-transition histories.
Those establish algorithm expectations without inventing vendor captures. Source review is
still needed to map actual terminal fields to these observations.

**Alternatives considered:** Choice-index lookup, labels as answer keys, and evaluator-derived
expected tests. These can silently reward incorrect content and do not independently verify logic.

### D6 — Correct starter validation conflicts using the clarified spec

**Decision:** Permit unsupported-cause statements as intentionally wrong choices. Reject a
scenario only if such a statement is accepted as true, lacks corrective feedback, or creates
ambiguity. Fix v1 flapping to four transitions within exactly 60 seconds, inclusive endpoints.
Distinguish raw ordered state reports from derived transitions: same-state reports do not count;
outside-window reports may provide context but do not count inside the window.

**Rationale:** Starter validation otherwise rejects the exact wrong cable-failure choice in AC3,
allows a threshold below the spec's four, and rejects history that the spec says to exclude from
counting. Follow the active spec for these conflicts.

**Alternatives considered:** Copy the starter literally or weaken the spec's diagnostic rules.
Both would create contradictions between tests, teaching and implementation.

### D7 — Retain the exact user-selected hardware without claiming full verification

**Decision:** Keep DCS-7050SX3-48YC8, DCS-7808-CH, 7800R3-48CQ-LC in slot 3,
Et51/1 ↔ Et3/15/1, the requested 32-/64-bit EOS 4.36.3M images, multi-agent mode,
and the exact COLORCHIP part. Treat general family sources as partial evidence only.

**Rationale:** Official Arista materials support physical port 51's 100G capability and the
selected 48CQ card family, but those facts alone do not certify every selected release,
interface spelling, transceiver or output format. See source register S1–S5.

**Alternatives considered:** Substitute a similarly named switch/card, use a newer manual as
exact 4.36.3M proof, or assume image architecture from product name. These would alter or
misrepresent the user's selected environment.

### D8 — Use the supplied CWDM4 reference without inventing absent-signal semantics

**Decision:** Use the user's [reference U3](evidence/colorchip-reference.md) to select
C100Q020CWDM403B as four-lane QSFP28 100G CWDM4. Preserve all 20 supplied alarm/warning
values and manufacturer text. The current classification is based on this explicit reference,
not a model-name inference. U5 now confirms units and the -30 dBm no-light indication;
U4 supplies full headers. Threshold comparisons are outside the current mechanic. A low
receive-power alarm alone is not absent-signal evidence.

**Rationale:** U3 supplies an exact model association and intended values that were missing
from public family documentation. It is a user reference, not a retrieved manufacturer
datasheet or an EOS capture. The generic ColorChip pages S8–S9 remain useful background but
must not be used to overwrite the exact values. User selection and technical review have
separate evidence status.

**Alternatives considered:** Keep the superseded LR4 selection, infer units or lane scope,
substitute generic thresholds, or use rx_power low_alarm as an automatic no-light cutoff.
These would conflict with the latest reference or claim interpretations it does not provide.

### D9 — Separate design completion from content acceptance

**Decision:** Complete the application design using the user-selected environment and an explicit
review gate. Unverified source records, unknown optical classification, or uninterpretable
observations are representable in authoring data but cannot pass playable-content validation.
The whole content set remains unavailable if any required round fails that gate.

**Rationale:** C1 and FR-020/FR-021 already define the required behavior: reject unverified
content without grading it. No exact optical threshold or fabricated vendor output is needed
to specify that behavior, the data model, or the state machine. D-002 still requires verification
before dependent platform-specific content is implemented or released. Completing design does
not close D-002 or certify six playable rounds.

**Alternatives considered:** Guess diagnostic thresholds; accept unsupported outputs; or withhold
all architecture documents until every scenario is reviewed. The first two violate C1; the last
unnecessarily conflates content acceptance with decisions needed to define the application.

**Resolved design rules:** Store evidence provenance and review status; keep unavailable values
explicit rather than inventing them; never infer optical absence from a number alone; require
reviewed interpretation to produce a graded optical observation. The exact vendor classification
is a content field with a required review, not a hard-coded evaluator branch.

## User-Supplied Evidence Update

[User samples](evidence/user-samples.md) preserve two examples received on 2026-11-17.
U1 supports the full `Ethernet3/15/1` display name, an up/up 100Gb/s detail-output format,
and an explicit input CRC field. U2 supplies four transceiver rows under `Et3/3`, with no
headers or originating command; these are not measurements from the chosen `Et3/15/1` port.

**Decision:** Accept U1 as user-provided format evidence, with release/platform provenance
pending. Use the explicit CRC field as an alternative to a verified FCS field for CRC scenarios;
record which command and field supplied the count and never mix unlike counters in a comparison.
Keep U2 numeric columns uninterpreted until headers and units are supplied.

**Rationale:** U1 contains only one CRC snapshot and a cumulative link-change count, so it cannot
establish increasing errors or the specified flapping interval. Neither sample identifies the
EOS release or exact optic. The excerpts reduce the output-format uncertainty without proving
facts that are absent from the data.

**Alternatives considered:** Relabel Et3/3 rows as Et3/15, infer column units from familiar-looking
values, or interpret two historic state changes as a timed flapping case. These would add facts
not supplied by the evidence.

The six cases are authored simulations. Once command/field semantics, platform/release behavior,
and optical diagnostics are supported, reviewed simulated values can instantiate the cases;
there is no requirement to reproduce each numeric fixture as a real fault capture. Original
samples and derived simulated output must remain separately identified.

## User-Supplied ColorChip Reference Update

U3 records the selected exact part as QSFP28 100G CWDM4 with four lanes and manufacturer text
"ColorChip ltd". Temperature, voltage, bias current, transmit power and receive power each have
four supplied alarm/warning values. All 20 values are preserved in
[evidence/colorchip-reference.md](evidence/colorchip-reference.md), and each group has strictly
ordered low alarm, low warning, high warning and high alarm limits.

R-02 has additional user support from U5: units and -30 dBm no-light interpretation are now
supplied. U4a provides complete transceiver headers and rows at the selected port. Threshold
boundary comparisons are outside the current mechanic; scenario applicability still receives
review. U2 remains a separate historical sample and is not relabeled as U4.

## Primary Source Register

All sources were reviewed during this planning session. A source's presence in this table is
not evidence that it establishes the full selected hardware/software combination.

| ID | Primary source and section | Supported finding | Limit |
| --- | --- | --- | --- |
| S1 | [Arista 7050X3 Q&A](https://www.arista.com/assets/data/pdf/Datasheets/7050X3-Series-Q%26A.pdf), port-speed question | 7050SX3-48YC8 physical ports 49–56 support 100G; physical port 51 is in this group | Does not establish exact 4.36.3M Et51/1 output |
| S2 | [Arista 7800R3 datasheet](https://www.arista.com/assets/data/pdf/Datasheets/7800R3-Data-Sheet.pdf), ordering information | DCS-7800R3-48CQ-LC is a 48-port 100GbE QSFP line card | Slot-3 interface spelling and selected release output still need evidence |
| S3 | [Arista 64-bit image readme](https://www.arista.com/assets/data/pdf/software-agreement/64Bit-Images-Readme.pdf), platform tables and footnotes | General architecture policy supports the requested family-level image choices; similarly named models may differ | Not an exact 4.36.3M release/platform certification |
| S4 | [Arista advisory 0178](https://www.arista.com/en/support/advisories-notices/security-advisory/24734-security-advisory-0178), Resolution | References EOS 4.36.3M as a release | Does not establish image availability/support on both chosen endpoints |
| S5 | [EOS session management commands](https://www.arista.com/en/um-eos/eos-session-management-commands), service routing protocols | Documents multi-agent selection command | Current manual is not the selected 4.36.3M manual |
| S6 | [EOS Ethernet Ports](https://www.arista.com/en/um-eos/eos-ethernet-ports), show interfaces status and show interfaces counters errors | Generic status command and FCS counter semantics; FCS concerns received packets with CRC errors | Page identifies EOS 4.37.0F during review; exact selected-release captures are missing |
| S7 | [EOS transceiver performance monitoring](https://www.arista.com/en/um-eos/eos-transceiver-performance-monitoring), show interfaces transceiver dom and thresholds | Generic DOM values, thresholds and measurement behavior | Does not establish selected COLORCHIP model, absent-light behavior or exact-release formatting |
| S8 | [ColorChip CWDM4](https://www.color-chip.com/products/100g-qsfp28-cwdm4/), overview and specifications | CWDM4 family uses single-mode fiber and provides digital optical diagnostics | No mapping to exact C100Q020CWDM403B; sensitivity is not proof of a no-light threshold |
| S9 | [ColorChip LR4](https://www.color-chip.com/products/100g-qsfp28-lr4/), overview and part-number table | LR4 is separately documented; page names C100Q100LR402E and CTQ1XLR4CS1-01 | Neither is the selected exact part |
| S10 | [Arista transceiver guide](https://www.arista.com/assets/data/pdf/Transceiver-Guide.pdf), compatibility tables and version guidance | General Arista transceiver/platform compatibility guidance | No COLORCHIP/C100Q020 entry located; does not certify the selected third-party module |
| S11 | [Arista 7150 management fundamentals](https://www.arista.com/docs/Manuals/QuickStart-Managing7150Series.pdf), logging examples | Illustrates timestamped interface state-change logging | Older/different platform, contextual only; not proof of selected-release log syntax |

No vendor output is fabricated as a capture. User-provided excerpts are preserved separately
in [evidence/user-samples.md](evidence/user-samples.md). Source sections, sample provenance and
the distinction between original output and authored scenario values must accompany review.

## Open Content-Evidence Requirements

| Gate | Status | Needed to close | Impact |
| --- | --- | --- | --- |
| R-01 Release/platform identity | OPEN — content gate | Exact 4.36.3M release/platform/image support evidence and reviewed identity/configuration records for both endpoints | Cannot certify the requested 32-bit/64-bit environment or exact interface names |
| R-02 Optic identity and interpretation | USER INPUTS RECEIVED — scenario review pending | U3 supplies exact-model CWDM4 classification and 20 thresholds; U5 confirms units and -30 dBm no-light interpretation; review their application to authored L1 scenarios using U4a | Do not request these inputs again; low alarms remain distinct from absence and unused alarm-boundary comparisons are not a v1 gate |
| R-03 Output and timed evidence | PARTIAL — full command examples received | U4a/U4b/U4c supply transceiver headers, MAC detail and interface detail; review deployment provenance and authored timed state/counter scenarios | Working snapshots do not themselves establish a fault; MAC fault/change totals cannot replace complete interface-state history |

These are evidence requests, not a request to reconfirm already selected hardware. Negative
public-search results do not prove that the requested configuration is unsupported; they mean
this session has not established the required support. Software downloads/release notes may
require authenticated access that public research did not obtain.

## Evidence Package Before Content Acceptance

Provide existing local paths or reference links where possible. Do not include credentials,
customer identifiers, or unrelated configuration. No live device access is required by the game.
The project needs reviewed evidence of:

1. Both devices' model, EOS version, image architecture, and inventory; the 7808 line card in
   slot 3; exact interface names and 100G operational/configured context; multi-agent mode.
2. Review U3's exact COLORCHIP vendor/part identity, CWDM4 classification and supplied limits,
   together with documented diagnostics or reviewed captures explaining present versus absent
   receive light. U5 now supplies units and -30 dBm no-light semantics; review their use in
   the authored cases. Do not require unused threshold-boundary grading semantics.
3. Interface status format for each endpoint in the conditions being taught. U1 now supplies
   an up/up example at Et3/15/1; its EOS/platform provenance remains to be established.
4. Verified CRC/FCS field semantics and reviewed pairs of authored timestamped observations
   with no reset/rollover and status evidence. U1 provides an explicit CRC field, but only one
   observation. Aggregate Rx errors are not interchangeable with CRC/FCS counts.
5. Complete ordered up/down history for the flapping interval, including the preceding state,
   so four real transitions can be distinguished from duplicate reports or a single last-flap time.
6. Reviewer, source section/capture provenance, and independent expected diagnosis for every
   shipped round. Sanitize labels consistently while preserving values and timestamps needed
   for the diagnostic reasoning. Authored numeric examples must be identified as such.

Candidate command families to validate against the exact release include interface status,
interface error counters, transceiver DOM/thresholds, and timestamped interface-state logs.
Generic command documentation is listed above; this report does not claim an exact command
string or output is validated for every selected device.

## Exit Check

- Stack, state ownership, safe rendering, accessibility direction and starter conflicts: resolved.
- Architecture and interface decisions: resolved; no remaining design clarification.
- Exact technical-content evidence R-01–R-03: U1–U5 received. R-02 user inputs are supplied;
  scenario review remains. R-03 now includes full optical/MAC/interface command examples.
  Remaining work is deployment applicability and authored scenario/timing review, not another
  request for the supplied thresholds, units, headers or no-light interpretation. Unverified
  content must still fail playable validation.
- Phase 0 design research: complete with the explicit acceptance gates above.
- Phase 1 deliverables: [data model](data-model.md), [content contract](contracts/content.md),
  [evaluator contract](contracts/evaluator.md), [interaction contract](contracts/interaction.md),
  and [quickstart](quickstart.md).
- Validation of documentation is distinct from the future source and gameplay acceptance checks.
- Source-device hostnames are excluded from repository artifacts and game assets. Use fictional
  leaf-gw1/spine-gw1 aliases; source review must not depend on a production hostname.

## Latest Evidence Update — U4 and U5

The user supplied three working commands in [U4](evidence/user-samples.md#u4--working-troubleshooting-examples)
and confirmed the units and -30 dBm no-light meaning in [U5](evidence/colorchip-reference.md#u5--user-confirmed-units-and-no-light-interpretation).
These updates supersede earlier requests above for transceiver headers, units and an absent-light
interpretation. They do not turn earlier samples into fault captures. Preserve the U4b system
time without inventing its timezone, and never count MAC local/remote fault changes as interface
up/down transitions. Complete reviewed authored histories can implement the flapping scenarios;
a real capture of each numeric fault is not required.
