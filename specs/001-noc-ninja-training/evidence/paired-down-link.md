# U8 — Paired down-link observations

**Received:** 2026-11-17 · **Source:** owner's different-port troubleshooting example.
**Playable adaptation:** noc-v2.5-2026-11-17.

This example is on spine Et6/21/1 and leaf Et6/2/1, not the selected game ports.
The source leaf is a port-channel member and displays a modular-platform interface layout.
Its exact hardware, EOS build and optic part number were not confirmed for this capture.
Use the example to illustrate directional PHY/fault observations and separate counter histories;
retain U6/U7 for selected platform formatting. Do not import its port-channel configuration,
port numbers, MAC addresses or leaf `(s1)` prompt into the game.

## Supplied observations

Relevant rows below preserve the supplied values; spacing is normalized. System times have
no supplied timezone. Full interface commands lack system timestamps and were collected
sequentially, so their displayed ages are not simultaneous measurements.

```text
spine-gw1(s1)#show interfaces ethernet 6/21/1 mac detail
Current System Time: Tue Nov 17 22:43:22 2026

Ethernet6/21/1
                              Current State     Changes            Last Change
 PHY State                   linkDown                5   19 days, 2:03:11 ago
 Interface State             linkDown                5   19 days, 2:03:11 ago
 MAC Rx Local Fault          True                    9   19 days, 2:03:11 ago
 MAC Rx Remote Fault         False                   4   21 days, 9:22:18 ago

leaf-gw1(s1)#show interfaces ethernet 6/2/1 mac detail
Current System Time: Tue Nov 17 22:46:02 2026

Ethernet6/2/1
                              Current State     Changes            Last Change
 PHY State                   linkUp                  4            0:03:08 ago
 Interface State             linkDown                3   19 days, 2:05:51 ago
 MAC Rx Local Fault          False                   8            0:03:13 ago
 MAC Rx Remote Fault         True                    5            0:03:18 ago
```

The two MAC captures are 160 seconds apart. Their Interface State ages also differ by
160 seconds, yielding the same event time (October 29, 20:40:11 in the supplied clock
convention). Their PHY/local-fault/remote-fault rows describe different events and must
not be forced to share an age, change total or state.

Supplied transceiver readings:

| Endpoint / port | Temp °C | V | Bias mA | Tx dBm | Rx dBm | Update age |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| spine Et6/21/1 | 34.34 | 3.26 | 56.09 | 0.37 | -30.00 | 0:00:03 |
| spine Et6/21/2 | 34.34 | 3.26 | 55.92 | 1.69 | -30.00 | 0:00:03 |
| spine Et6/21/3 | 35.98 | 3.26 | 56.26 | 1.34 | -30.00 | 0:00:01 |
| spine Et6/21/4 | 35.98 | 3.26 | 56.26 | 1.11 | -30.00 | 0:00:01 |
| leaf Et6/2/1 | 32.32 | 3.27 | 55.92 | 1.47 | -0.30 | 0:00:00 |
| leaf Et6/2/2 | 32.32 | 3.27 | 55.67 | 1.69 | 1.26 | 0:00:00 |
| leaf Et6/2/3 | 32.32 | 3.27 | 55.67 | 1.56 | 1.20 | 0:00:00 |
| leaf Et6/2/4 | 32.32 | 3.27 | 55.84 | 1.14 | 1.14 | 0:00:00 |

Both full interface outputs show `down`, line protocol `down (notconnect)`, zero link
status changes since last clear, zero traffic rates, zero packet/byte totals and zero errors.
The spine status table also says `notconnect`, routed/full/100G/100GBASE-CWDM4.
Both counters-errors tables contain zero FCS, Align, Symbol, Rx, Runts, Giants and Tx.
Spine full-interface down age is 19 days, 2:04:10; its clear age is 0:01:47.
Leaf full-interface down age is 19 days, 2:05:48; its clear age is 0:03:21.
These zero post-clear counters do not erase the older MAC row histories shown above.

## Authored adaptation

Keep the shared **Interface State** timeline and matching full-interface durations at the
same observation time. Preserve each PHY/fault row's own event clock. The game still uses
simultaneous UTC snapshots; raw source timestamps are not silently reclassified as UTC.

- L1-R2 mirrors the sample direction: leaf Et51/1 receives no light, is PHY down and has
  Local Fault True/Remote Fault False. Spine Et3/15/1 receives normal light, is PHY up,
  Interface down, Local Fault False/Remote Fault True. Both interfaces stay down for the
  entire observation window. This diagnoses absent receive light at leaf, not a failed component.
- L3-R1 keeps degraded receive light at spine and gives the normal-light leaf peer the same
  directional PHY/fault pattern. This is an authored degraded-light variant, not a captured
  result or a rule that every below-alarm reading forces a particular PHY state.
- The normal-light peer's current PHY/local/remote event ages are 188/193/198 seconds,
  with 128/133/138 seconds in the snapshot one minute earlier. Interface age is 660/600
  seconds. These are consistent distinct events, not extra interface flaps.
- L1-R2 also has zero post-clear full-interface link changes and traffic totals while MAC
  history retains nonzero changes. Counter-clear ages advance from two to three minutes;
  there is no reset within the graded observation window.

Stable-up scenarios retain the owner's earlier aligned-row convention. Flapping diagnosis
counts Interface State transitions only; PHY/fault transitions are supporting observations.
