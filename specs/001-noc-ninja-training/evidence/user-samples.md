# User-Supplied CLI Samples

**Received**: 2026-11-17, in the planning conversation.
**Source IDs**: U1 (interface detail), U2 (transceiver rows).
**Status**: Observed sample formats; release/platform/optic provenance incomplete.

The excerpts below normalize chat line breaks and indentation. The interface prompt hostname
and MAC addresses are redacted. Prompts use the fictional spine-gw1 alias for the selected
DCS-7808-CH. Interface names, measurements and counters are retained.
No output has been relabeled to another port or presented as an independently captured fault.

## U1 — Interface Detail

```text
spine-gw1(s1)#show interfaces ethernet 3/15/1
Ethernet3/15/1 is up, line protocol is up (connected)
  Hardware is Ethernet, address is [redacted] (bia [redacted])
  Description: [omitted]
  Ethernet MTU 10218 bytes, Ethernet MRU 10240 bytes, BW 100000000 kbit
  Full-duplex, 100Gb/s, auto negotiation: off, uni-link: disabled
  Up 21 days, 5 hours, 22 minutes
  Loopback Mode : None
  2 link status changes since last clear
  Last clearing of "show interface" counters never
  5 minutes input rate 145 bps (0.0% with framing overhead), 0 packets/sec
  5 minutes output rate 197 Mbps (0.2% with framing overhead), 18552 packets/sec
     206357 packets input, 34282691 bytes
     Received 0 broadcasts, 132717 multicast
     0 runts, 0 giants
     0 input errors, 0 CRC, 0 alignment, 0 symbol, 0 input discards
     0 PAUSE input
     77058942722 packets output, 104241857131935 bytes
     Sent 0 broadcasts, 132732 multicast
     0 output errors, 0 collisions
     0 late collision, 0 deferred, 0 output discards
     0 PAUSE output
```

### Supported observations

- The sample command is `show interfaces ethernet 3/15/1`; the displayed full interface name
  is `Ethernet3/15/1`, corresponding to the user's chosen short label `Et3/15/1`.
- Interface and line protocol are both reported up, and speed is explicitly 100Gb/s.
- The input-counter section explicitly labels a CRC counter with value zero. This is a useful
  candidate for the game's receive-CRC evidence; aggregate input errors are a separate field.
- The output records two link status changes since last clear and an up-duration of 21 days,
  5 hours and 22 minutes. These are observations in this sample, not a timed event history.

### Limits and next review

No command timestamp, EOS version/image architecture, chassis/card inventory, routing mode,
or optic identity is shown. Those facts cannot be extracted from this excerpt alone.
One zero-CRC observation does not establish a counter trend. Two cumulative state changes
without their timestamps do not establish the game's four transitions in a 60-second window.
This excerpt is an up-link format example; it is not absent-light or flapping evidence.

## U2 — Transceiver Rows

The original command, headers, units and module identity were not included.

```text
Et3/3/1    26.84      3.25      31.80    -2.50     -2.55     0:00:03 ago
Et3/3/2    26.84      3.25      34.57    -1.67     -0.56     0:00:03 ago
Et3/3/3    26.84      3.25      30.16    -1.64     -0.90     0:00:03 ago
Et3/3/4    26.84      3.25      31.10    -1.62     -2.20     0:00:03 ago
```

### Supported observations

- Four rows have distinct labels under `Et3/3`, five numeric columns each, and a relative
  measurement-age string. The values are preserved without assigning unprovided column names.
- These labels differ from the selected `Et3/15/1` endpoint. They must not be silently renamed
  or treated as its measurements.

### Limits and next review

Without headers, do not assert which values are temperature, voltage, bias, transmit power,
or receive power, or assign units. Do not infer whether rows denote optical lanes or separate
interfaces solely from their labels. The relative age is not an absolute capture timestamp.
No provided row establishes optical absence, alarm thresholds, module classification, exact
part identity, or release support. Request the originating command and complete headers,
plus the source platform/EOS version and whether the example uses the selected optic.

## Use in Authored Scenarios

These samples can ground reviewed display formats once provenance is established. The game
may use explicitly authored scenario values and consistent fictional device names; those must
be clearly identified as simulated, reviewed against the supported behavior, and kept separate
from the original samples. A real fault capture for each of the six authored numeric cases is
not inherently required. Unsupported absent-light rendering or thresholds still cannot be invented.

## U4 — Working Troubleshooting Examples

**Received**: 2026-11-17, supplied by the user as working command examples.
**Source IDs**: U4a (transceiver), U4b (MAC detail), U4c (interface detail).
**Source kind**: user-example. Prompts use fictional spine-gw1; MAC addresses are redacted.
These examples supplement U1/U2 without replacing or relabeling their values.

### U4a — Transceiver with Headers

```text
spine-gw1(s1)#show interfaces ethernet 3/15/1 transceiver
If device is externally calibrated, only calibrated values are printed.
N/A: not applicable, Tx: transmit, Rx: receive.
mA: milliamperes, dBm: decibels (milliwatts).
                              Bias      Optical   Optical
         Temp       Voltage   Current   Tx Power  Rx Power
Port      (Celsius)  (Volts)   (mA)      (dBm)     (dBm)     Last Update
-----     ---------  --------  --------  --------  --------  -------------------
Et3/15/1   36.85      3.26      43.76    1.55      0.42      0:00:01 ago
Et3/15/2   36.85      3.26      56.42    1.30      -0.13     0:00:01 ago
Et3/15/3   36.85      3.26      47.28    1.34      0.79      0:00:01 ago
Et3/15/4   36.85      3.26      56.42    1.31      0.13      0:00:01 ago
```

This establishes the supplied command, column order, units and four reported rows for the
selected port. Preserve row labels; do not turn the four rows into four topology links.
It is a working-light example, not a captured absent-light case. The user's absent-light
interpretation is recorded separately as U5 in [the optical reference](colorchip-reference.md).
A relative update age is not an absolute capture time. This output does not itself show
EOS/image version, inventory or transceiver part identity.

### U4b — MAC Detail

```text
spine-gw1(s1)#show interfaces ethernet 3/15/1 mac detail
Current System Time: Tue Nov 17 19:17:58 2026

Ethernet3/15/1
                              Current State     Changes            Last Change
 PHY State                   linkUp                  2   21 days, 5:57:08 ago
 Interface State             linkUp                  2   21 days, 5:57:12 ago
 MAC Rx Local Fault          False                   4   21 days, 5:57:13 ago
 MAC Rx Remote Fault         False                   2   21 days, 5:57:13 ago
```

This supplies a working MAC-detail format, current states, cumulative change counts and
relative last-change ages. The displayed system time has no timezone; preserve it as supplied,
not as an asserted UTC timestamp. Two interface changes over the displayed history do not
establish four transitions in 60 seconds. Local/remote fault changes are not interface up/down
transitions. A single last-change age cannot reconstruct a complete transition history.

### U4c — Interface Detail

```text
spine-gw1(s1)#show interfaces ethernet 3/15/1
Ethernet3/15/1 is up, line protocol is up (connected)
  Hardware is Ethernet, address is [redacted] (bia [redacted])
  Description: [omitted]
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

This reinforces the up/up 100G interface format and explicit CRC field. U1 and U4c both show
zero CRC; neither is an increasing-error capture. Their differing MAC addresses have been
redacted, so do not assert a same-device/no-replacement counter pair merely from the shared
interface label. Authored CRC pairs must carry their own consistent timestamps and reviewed
no-reset assertion.

### Application to the Game

Use U4a/U4b/U4c as user-supplied format evidence and U5 as the stated optical interpretation.
Keep newly authored fault values clearly labeled simulated. The selected deployment remains
the user-provided context; these excerpts alone are not version or inventory output. Existing
technical review tasks should check applicability and scenario consistency rather than request
these supplied headers, units or interpretation again. No real capture of each authored fault
is required. For flapping, use a complete reviewed sequence of timestamped state observations;
do not manufacture a vendor log format from this MAC-detail sample.

## U6 — Later complete interface examples

The owner supplied complete output for both named endpoints while reviewing realism. See
[full-interface-samples.md](full-interface-samples.md) for those examples and the current
source-to-simulation mapping. U6 supersedes the initial abbreviated interface display, and
provides direct leaf interface-format evidence; U4 remains the basis for optics/MAC history.
