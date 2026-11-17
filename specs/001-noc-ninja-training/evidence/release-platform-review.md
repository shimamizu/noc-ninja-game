> Historical v1 review retained for source provenance. The current mixed curriculum and revised
> absent/degraded-light interpretation are reviewed in [mixed-incident-review.md](mixed-incident-review.md).
> Old round mappings and lesson sequencing below do not describe schema 2.

# Deployment and Source Review

**Review date:** 2026-11-17. **Reviewer:** Codex, reviewing supplied project inputs.
**Content revision:** `noc-v1-2026-11-17`.

## User-selected topology

The project conversation specifies leaf-gw1 as DCS-7050SX3-48YC8, EOS 4.36.3M 32-bit,
Ethernet51/1; spine-gw1 as DCS-7808-CH, EOS 4.36.3M 64-bit, 7800R3-48CQ-LC in slot 3,
Ethernet3/15/1. Both use multi-agent mode, COLORCHIP C100Q020CWDM403B, and a 100G
single-mode fiber link. The user corrected the card selection before implementation.

During implementation, the user explicitly confirmed that the latest U4 command examples
were captured from that selected spine-gw1 chassis/card/slot/EOS/optic combination. This
confirmation supplies the deployment context absent from the standalone excerpts. No
production hostname is needed or retained. leaf-gw1 remains the user-specified modeled endpoint;
no separate leaf-gw1 capture has been supplied.

## Supporting references and limits

The primary sources already recorded in research.md support the physical port families and
shared EOS concepts: Arista 7050X3 Q&A (ports 49–56 at 100G), 7800R3 datasheet (48CQ card),
and the 64-bit-image readme. These general references are not misrepresented as an exact
4.36.3M compatibility certification. The exact-release CLI format reference is the user's
confirmed U4 capture. leaf-gw1 excerpts are explicitly authored same-release format adaptations,
not additional captures. The game models the selected topology; it does not certify that
another hardware/image/third-party-optic combination is supported for deployment.

The simulation review accepts the recorded user deployment and confirmed capture context.
Independent vendor qualification of every combination and a separate leaf-gw1 capture have not
been performed. They are limits of this evidence, not invented verified measurements.
