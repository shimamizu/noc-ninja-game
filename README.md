# NOC Ninja — Network Dojo

Investigate a network incident, aim at a diagnosis, and throw a shuriken.

Six mixed incidents challenge you to distinguish **light levels**, **CRC / errors**, and **link
flapping**. Every incident offers the same diagnostic tools at both switches. A night dojo, ninja,
answer targets, optical gauges and animated throws make the investigation a game. Your diagnosis
comes from the evidence; the throw has no timing or precision requirement.

## Run

No install or build step is needed:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open [the game](http://127.0.0.1:8000/index.html). Native modules and JSON loading require HTTP;
serve index.html rather than opening a file URL. Use port 8001 if 8000 is occupied. On Windows,
`py -m http.server` is an alternative launcher. Stop with Ctrl+C.

Only local static files are used: no account, external fonts/images, live switches, backend,
analytics, API key, runtime AI or online grading service.

## Play

1. Read the opening guide to all three diagnoses and select **Enter the dojo**.
2. Inspect **leaf-gw1** and **spine-gw1**. Each has **Interface now**, **Port status**, **Optics**, **Error snapshots**,
   and **MAC / history**. Compare measurements, timestamps and actual changes.
3. Click/tap a target to aim, or use native radio-button arrow keys. Activate **Throw shuriken**
   when ready. Aiming alone does not submit.
4. Read the explanation. Wrong diagnoses stay retryable; correct diagnoses enable **Next incident**.
   Six successes lead to the final patrol summary, without category-specific lesson breaks.

Method hints, worked steps and solutions are available in order. Help records assistance, never
completion. Throws, completed incidents, and assisted/unassisted completion are separate. There
are no lives, points, countdowns, speed rewards or retry penalties. Completion is practice, not
proof of independent mastery.

Tab/Shift+Tab navigate controls; native Enter/Space activate buttons. Restart asks for confirmation;
Escape/Cancel preserve the session. Reload starts fresh, with no local storage. Dense evidence
scrolls in labeled regions. Reduced motion disables the projectile; static impact marks and text
retain the result. Feedback and controls never wait for animation.

## Fixed training environment

| Endpoint | Platform / EOS | Port | IPv6 address |
| --- | --- | --- | --- |
| leaf-gw1 | DCS-7050SX3-48YC8 / 4.36.3M, 32-bit | Et51/1 | `2001:db8:51::1/126` |
| spine-gw1 | DCS-7808-CH / 4.36.3M, 64-bit; 7800R3-48CQ-LC in slot 3 | Et3/15/1 | `2001:db8:51::2/126` |

Both use `service routing protocols model multi-agent` and COLORCHIP C100Q020CWDM403B
QSFP28 100G CWDM4 optics over single-mode fiber. All 20 supplied reference limits and confirmed
units are preserved. IPv6 is correctly configured context; there are no repair/configuration actions.

For this supplied optic reference, −30 dBm means no light and Rx below −15.70 dBm means very bad
light. The optical incidents include both absence and degraded light; these meanings are distinct.
This game does not implement a universal alarm classifier or diagnose a failed component.

CRC comparison uses the same receiver and counter, with no reset/rollover. Four actual state changes
inside an inclusive 60-second window is the game's teaching threshold for flapping, not a universal
EOS definition. An up interface does not prove stability, healthy traffic or IPv6 connectivity.

Read the [mixed incident source review](specs/001-noc-ninja-training/evidence/mixed-incident-review.md).
The user confirmed the working spine-gw1 samples' exact setup. Fault values and UTC timelines are
simulated. Full interface layouts for both switches follow the latest supplied examples; leaf
optics and MAC-history formatting remain an explicit same-release adaptation. Independent hardware
qualification, vendor compatibility certification and external technical review are not claimed.
Only fictional device labels appear. Both endpoints share one authored link timeline: paired
Up/Down durations and MAC Interface State ages match, while PHY/fault rows keep their own
event histories. Matching interface flaps count once per link.

## Verify

```sh
node tests/run.mjs
```

**133 checks pass** in Node 26.13.0: all six independent diagnoses and alternatives, equal tool
availability, displayed numbers, absent/degraded light, CRC/history boundaries, conflicting evidence,
source/revision failures, safe retry, assistance, duplicate submission, direct progression and reset.
The command fails on test failures. No runtime dependency is added.

The same suite has a [browser runner](http://127.0.0.1:8000/tests/). A missing import or zero tests is
failure. See the [manual procedure](specs/001-noc-ninja-training/quickstart.md) and
[verification record](specs/001-noc-ninja-training/verification.md). Browser automation is currently
unavailable, so the redesigned screen, complete pointer/keyboard playthrough, exact viewport sizes,
reduced motion and screen-reader announcements remain unverified. Automated checks do not replace
them. This is an implemented revision, not a claim of completed release acceptance.

## Repository

- `data/levels.json`: schema 2; six mixed incidents in three neutral authoring groups.
- `engine/`: content validation, all-method diagnosis, session state and computed feedback.
- `ui/`, `style.css`: native controls, console, dojo and decorative animation.
- `tests/`: dependency-free Node/browser assertions.
- `specs/001-noc-ninja-training/`: current specification, contracts, tasks and evidence.

The entire curriculum validates before play starts. No authored category or target key chooses the
answer. Content changes require a new revision and actual source/display reassessment; copying a
review flag is not review. Same-mechanic content reuses the existing rules and screens.

## Complete interface output

Both interface snapshots include hardware/MAC, peer description, MTU/MRU where supplied, duplex,
uni-link, state age, link-change total, counter-clear history, five-minute rates, packet/byte totals,
broadcast/multicast, runts/giants, CRC and other errors, discards, collisions and PAUSE counters.
The platform-specific leaf/spine formats are preserved. State ages, changes and counters follow
incident history; MACs and scenario values are simulated. See the [full supplied samples and
mapping](specs/001-noc-ninja-training/evidence/full-interface-samples.md). Scroll the terminal to
inspect all fields; the Error snapshots tool shows paired counters-errors tables.

Error snapshots now use `show interfaces … counters errors` with FCS, Align, Symbol, Rx, Runts,
Giants and Tx columns at both times. MAC / history shows the complete MAC state/fault table;
expand its earlier snapshots to compare history. Port status provides the compact routed-port
summary. See [U7 examples and interpretation](specs/001-noc-ninja-training/evidence/error-mac-samples.md).
