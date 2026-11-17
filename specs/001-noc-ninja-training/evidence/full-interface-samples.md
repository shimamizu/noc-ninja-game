# U6 — Full Interface Examples for Both Switches

**Received:** 2026-11-17 · **Source:** owner-provided examples in the implementation conversation.
**Revision using these formats:** noc-v2.2-2026-11-17.

These samples supplement U4 with the complete interface fields for both selected endpoints.
Whitespace is normalized and supplied MAC addresses are redacted here. The fictional switch names,
peer descriptions, ports, platform-specific lines, measurements and counters below are retained.
Both samples are working up/up examples, not captures of the game's authored faults.

## U6a — spine-gw1

```text
spine-gw1(s1)#show interfaces ethernet 3/15/1
Ethernet3/15/1 is up, line protocol is up (connected)
  Hardware is Ethernet, address is [redacted] (bia [redacted])
  Description: leaf-gw1_Et51/1
  Ethernet MTU 10218 bytes, Ethernet MRU 10240 bytes, BW 100000000 kbit
  Full-duplex, 100Gb/s, auto negotiation: off, uni-link: disabled
  Up 21 days, 5 hours, 57 minutes, 29 seconds
  Loopback Mode : None
  2 link status changes since last clear
  Last clearing of "show interface" counters never
  5 minutes input rate 145 bps (0.0% with framing overhead), 0 packets/sec
  5 minutes output rate 143 Mbps (0.1% with framing overhead), 13768 packets/sec
     206565 packets input, 34313675 bytes
     Received 0 broadcasts, 132870 multicast
     0 runts, 0 giants
     0 input errors, 0 CRC, 0 alignment, 0 symbol, 0 input discards
     0 PAUSE input
     80862469202 packets output, 110437842063101 bytes
     Sent 0 broadcasts, 132879 multicast
     0 output errors, 0 collisions
     0 late collision, 0 deferred, 0 output discards
     0 PAUSE output
```

## U6b — leaf-gw1

```text
leaf-gw1#show interfaces ethernet 51/1
Ethernet51/1 is up, line protocol is up (connected)
  Hardware is Ethernet, address is [redacted] (bia [redacted])
  Description: spine-gw1_Et3/15/1
  Ethernet MTU 9214 bytes, BW 100000000 kbit
  Full-duplex, 100Gb/s, auto negotiation: off, uni-link: n/a
  Up 307 days, 22 hours, 12 minutes, 7 seconds
  Loopback Mode : None
  6 link status changes since last clear
  Last clearing of "show interface" counters 307 days, 22:30:53 ago
  5 minutes input rate 1.49 kbps (0.0% with framing overhead), 2 packets/sec
  5 minutes output rate 1.70 kbps (0.0% with framing overhead), 3 packets/sec
     54742264 packets input, 5870154123 bytes
     Received 37214 broadcasts, 1773515 multicast
     0 runts, 0 giants
     0 input errors, 0 CRC, 0 alignment, 0 symbol, 0 input discards
     0 PAUSE input
     67096812 packets output, 5654190578 bytes
     Sent 11299 broadcasts, 1773574 multicast
     0 output errors, 0 collisions
     0 late collision, 0 deferred, 0 output discards
     0 PAUSE output
```

## Source-to-simulation mapping

The game retains the full field inventory in both earlier and current interface outputs for all
six incidents (24 snapshots). It preserves each platform's MTU/MRU line, uni-link text, prompt,
peer description and counter-clear style. Displayed MACs are fictional locally administered values.
The differing supplied MTUs remain background context, not a new fault category; the small authored
background packets do not create an MTU-related incident.

The samples establish field layout, not fault values. The playable snapshots remain explicitly
labeled authored simulations. Changes made for the authored timeline are:

- Operational status and CRC totals follow the structured observations used by the evaluator.
- Input errors equal CRC errors in these scenarios; other error/discard fields are zero.
- State age advances by elapsed time until a transition, then measures time since that transition.
  A flap at the final observation yields `Up 0 seconds`; the down-ending case yields `Down 5 seconds`.
  Stable-down cases begin with ten minutes down and remain down for the observed minute.
- Link-change totals start at the supplied per-platform baselines and advance only on actual
  transitions. A large historical total alone is not a flapping diagnosis.
- The leaf's time since counter clearing increases by 60 seconds; the spine retains `never`.
  No reset, rollover or counter clearing occurs within a challenge.
- Packet/byte totals retain realistic historical baselines and increase only while both endpoints
  are up in the authored interval. Background traffic is small; five-minute rates are authored
  averages, not instantaneous activity or a claim to reproduce EOS's rate-estimation algorithm.
  A recent down state can coexist with a nonzero prior-window average. A continuously down link
  has zero traffic in the displayed observation interval.

Each endpoint's supplied interface sample now directly supports its display layout. Leaf optical
and MAC-history formats still use the existing U4 adaptation. The six intended diagnoses, optical
thresholds, selected hardware and /126 addresses are unchanged.

Supplemental format check: Arista's [Ethernet Ports manual](https://www.arista.com/en/um-eos/eos-ethernet-ports),
“Subinterface Configuration,” includes a down-duration field. The page currently describes a newer
release and a subinterface; this supports the general duration convention only, not a captured
4.36.3M physical-port fault. The actual fault timelines and ages above are explicitly authored.

**Review:** Codex source-to-simulation review, 2026-11-17. Automated checks cover field completeness,
platform differences, state age versus history, transition totals, cumulative traffic, unchanged
counters while continuously down, counter-clear ages, and agreement with graded CRC observations.
This review does not claim independent hardware qualification or an observed browser playthrough.
