# U7 — Error Counters, MAC Detail and Port Status

**Received:** 2026-11-17 · **Source:** owner's troubleshooting examples.
**Playable content revision:** noc-v2.3.1-2026-11-17.

The owner supplied these examples for the selected spine link, describing a problem on its remote
side. Preserve that case context without teaching that every received CRC error proves a failed
remote component. The samples have no absolute timestamps on the error reads and are not a new
60-second graded incident. The MAC system time has no timezone specified.

## Supplied error reads

```text
spine-gw1(s1)#show interfaces ethernet 3/15/1 counters errors
Port               FCS    Align   Symbol       Rx    Runts   Giants       Tx
Et3/15/1             3        0        3     1323     1317        0        0

spine-gw1(s1)#show interfaces ethernet 3/15/1 counters errors
Port               FCS    Align   Symbol       Rx    Runts   Giants       Tx
Et3/15/1             3        0        3     1324     1318        0        0
```

The owner confirmed that the second command contained a copy/paste error and should target
3/15/1. Both commands above now reflect that confirmed correction. Authored game commands
consistently use the selected Et3/15/1 (or Et51/1 peer).
For the displayed rows, FCS stays 3 and Symbol stays 3; Rx and Runts each rise by one. Do not
call that a positive FCS delta or add column counts together to manufacture a new CRC count.
The six existing graded cases still diagnose rising CRC/FCS, absent/degraded light or flapping.

## Supplied MAC detail

```text
spine-gw1(s1)#show interfaces ethernet 3/15/1 mac detail
Current System Time: Tue Nov 17 21:58:10 2026

Ethernet3/15/1
                              Current State     Changes            Last Change
 PHY State                   linkDown                3  15 days, 14:58:20 ago
 Interface State             linkDown                3  15 days, 14:58:21 ago
 MAC Rx Local Fault          True                    5  15 days, 14:58:21 ago
 MAC Rx Remote Fault         False                   2  238 days, 6:39:08 ago
```

## Supplied port status

Spacing has been aligned to the supplied headings; the empty trailing columns remain empty.

```text
spine-gw1(s1)#show interfaces ethernet 3/15/1 status
Port       Name                       Status       Vlan     Duplex Speed  Type           Flags Encapsulation
Et3/15/1   leaf-gw1_Et51/1              notconnect   routed   full   100G   100GBASE-CWDM4
```

## Supplied optical row

```text
spine-gw1(s1)#show interfaces ethernet 3/15/1 transceiver
If device is externally calibrated, only calibrated values are printed.
N/A: not applicable, Tx: transmit, Rx: receive.
mA: milliamperes, dBm: decibels (milliwatts).
                              Bias      Optical   Optical
         Temp       Voltage   Current   Tx Power  Rx Power
Port     (Celsius)  (Volts)    (mA)      (dBm)     (dBm)     Last Update
-----    ---------  --------  --------  --------  --------  -------------------
Et3/15/1   39.01      3.26      46.19     1.52      1.08     0:00:02 ago
```

This one supplied row does not establish the other three optical readings; it does not replace
the previously supplied complete four-row optical examples used by the authored incidents.

## Interpretation and implementation review

Arista's [Layer 1 Debug Guide](https://arista.my.site.com/AristaCommunity/s/article/Layer-1-T-shooting-TOI),
MAC-detail explanation, distinguishes a local incoming-signal problem from a peer receive-side
problem. Thus Local Fault directs attention to the incoming path, including the remote transmitter;
it is not a declaration that the local box itself is the failed component. The owner identifies
a remote-side problem in this example; the general game still grades observed conditions rather
than an unsupported component claim. The guide is supplemental semantics, not exact-release
hardware qualification.

Revision v2.3 uses:

- Error snapshots: two complete `counters errors` tables, one at each authored observation time,
  with FCS/Align/Symbol/Rx/Runts/Giants/Tx. Structured FCS equals the graded receive CRC/FCS count.
  The later table is explicitly paired with the earlier one, never with an interface-detail excerpt.
- Interface now: complete U6 interface detail remains available. Earlier full interface snapshots
  are retained as supporting authored data, not mislabeled as error-command output.
- MAC / history: current complete MAC detail with system time and all four state/fault rows;
  earlier complete command snapshots are in a separate expandable history area. The static
  timeline is an authored observation aid, not extra text invented inside EOS CLI output.
- Port status: the supplied table shape and peer name, routed/full/100G/CWDM4 context.
- MAC history values: Interface State, cumulative changes and last-change ages follow the complete
  interface timeline. PHY/fault values are explicitly authored scenario context. In these fixtures,
  local fault follows the down state and remote fault remains false; this is not a general rule
  inferring fault flags from interface state. A cumulative change total or Last Change age alone
  never substitutes for the complete history when grading flapping.

Both endpoint layouts adapt U7 to the selected port/prompt. Fault values, UTC timeline and MAC
histories are simulated, not captures of all six incidents. Source review preserves all previous
hardware, /126 addressing and optical thresholds. No further owner confirmation is needed.

**Review:** Codex source-to-simulation review, 2026-11-17. Independent tests check table columns,
paired output IDs, FCS mapping, MAC rows/timing, port status, full interface retention and all six
unchanged diagnoses. Browser verification remains a separate acceptance check.

## Stable-up fixture correction — 2026-11-17

At the owner's request, interfaces that remain up throughout the authored window now show the
same Last Change age on PHY State, Interface State, MAC Rx Local Fault and MAC Rx Remote Fault.
This applies to current and earlier MAC snapshots; ages advance with their observation timestamps.
Cumulative Changes values and fault states are retained. Down and flapping histories retain their
individual event ages. This is a convention for these authored examples, not a universal assertion
that every operational EOS interface must have identical event histories. Original source examples
above remain unchanged.
