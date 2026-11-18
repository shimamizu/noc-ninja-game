# Interface troubleshooting skill adaptation — 2026-11-18

The owner requested using Itential's [Interface and Link Troubleshooting skill](https://infraagentskills.ai/skills/interface-link-troubleshooting/) to improve NOC training.
Read on 2026-11-18: [SKILL.md](https://github.com/itential/infra-agent-skills/blob/main/skills/interface-link-troubleshooting/SKILL.md),
[platform index](https://github.com/itential/infra-agent-skills/blob/main/skills/interface-link-troubleshooting/references/INDEX.md), and
[Arista procedure](https://github.com/itential/infra-agent-skills/blob/main/skills/interface-link-troubleshooting/references/arista-eos/procedure.md).
These are upstream main-branch references, not pinned release artifacts. No upstream code was installed or executed.

The adaptation uses platform identification, symptom-specific follow-up, evidence-backed reporting,
and separation of read-only diagnosis from remediation. New teaching prose is authored for this
simulation. The Arista procedure refers to manual 4.36.2F; it does not independently validate this
game's 4.36.3M captures. Existing reviewed samples remain authoritative for displayed commands,
counter names, optical limits, timestamps and diagnostic rules.

| Upstream principle | Game adaptation | Boundary |
| --- | --- | --- |
| Identify platform and symptom | Fixed EOS topology; three competing diagnoses | No new vendor or fault family |
| Check admin versus operational state | State check at both ends; briefing confirms admin enabled | No simulated administrative-shutdown scenario |
| Report diagnosis with literal evidence | Computed reasoning answer and downloadable command-output handoff | All observations are simulated |
| Correlate physical evidence and fault behavior | Condition-specific next-check question | LFS configuration and damping details remain unknown |
| Keep diagnosis read-only | Feedback explains why resets and port bounces are premature | Existing owner replacement runbook remains a separate recommendation |

Do not transplant the skill's unverified exact LFS CLI, damping defaults, standard counter-field
definitions, or another vendor's duplex conventions. Do not add synthetic BER or module-status
output on the strength of this skill alone. Requests for logs/configuration/module status in the
new questions are proposed follow-ups, not evidence already available in the console.

## Acceptance record

- Node checks: **163 / 163 pass**, including all 151 prior checks and 12 new guided-workflow checks.
- New checks cover fresh state, both-end coverage, premature progression, invalid selections,
  incomplete answers without attempt increments, retry feedback, all six guided incidents,
  per-incident isolation, restart, computed measurements and literal report evidence.
- Static module syntax and whitespace checks: pass.
- Fresh browser, keyboard, download-click, mobile and reduced-motion checks for this change:
  **not run**. Browser connector unavailable; native Safari attempts were interrupted by active
  user interaction. Prior Chrome checks describe the earlier arcade release, not these additions.
- Representative learner and screen-reader review: **not run**. This implementation is ready for
  local review, not accepted as a verified training release.

## Manual review procedure

1. Serve the repository with `python3 -m http.server 8000 --bind 127.0.0.1`.
2. Choose **Start guided NOC patrol**. Check that one visible state snapshot is recorded.
3. Visit the eight notebook checks; verify each opens the correct endpoint/tool and both counter
   snapshots remain visible. Repeat a check and ensure the total does not increase.
4. Try a wrong diagnosis, then CRC / errors for the first incident. Verify there is no Next button
   until evidence coverage and both reasoning answers are complete.
5. Submit empty reasoning, then the component-location and immediate-reset distractors. Verify
   explanatory text, safe retry, and separate reasoning/diagnosis attempt accounting.
6. Select the measured delta and evidence-correlation answers. Review and download the handoff;
   compare its literal output with the console, including later counters and historical MAC rows.
7. Finish all incidents. Download earlier handoffs from the final review. Cancel a restart, then
   confirm one and verify the entire session resets. Check arcade mode still advances on diagnosis.
8. Repeat essential controls using only keyboard, a narrow viewport and reduced motion. Verify
   visible focus, radio navigation, live feedback, no page overflow, readable report scrolling and
   immediate controls independent of animation.
