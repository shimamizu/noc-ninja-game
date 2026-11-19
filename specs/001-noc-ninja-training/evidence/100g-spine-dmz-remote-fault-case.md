# U13 — 100G spine-to-DMZ receive fault

Owner-supplied original command captures. Recorded prompts, spacing, values, units and
state histories below are preserved. Device and optic inventory were subsequently supplied below.

## Device inventory — owner follow-up

| Endpoint | Chassis | EOS | Line card | Optic vendor | Optic model |
| --- | --- | --- | --- | --- | --- |
| spine-gw1 | Arista DCS-7808-CH | 4.31.10M | 7800R3-48CQ-LC | ColorChip | C100Q020CWDM403H |
| dmz-gw2 | Arista DCS-7804-CH | 4.31.10M | 7800R3-48CQ-LC | ColorChip | C100Q020CWDM403H |

These facts supplement the original captures. No optical measurements or CLI text are changed.

## Operator assessment

The owner identifies a bad optic on spine-gw1 and recommends replacing it: spine Remote Fault
True coincides with DMZ Local Fault True and all four DMZ Rx channels at -30.00 dBm.
The owner subsequently confirmed: “yes optic was replaced and it fixed the link”.
Spine optic replacement and link recovery are therefore reported outcomes. Numerical post-repair
readings and any simultaneous cleaning/reseating were not supplied. Remote Fault reports the peer's receive problem rather than
causing the low receive light. Positive local spine Tx DOM does not prove delivery to DMZ.

## Current curriculum

The owner requested that this be the only playable case for now. The earlier U10–U12 cases
are removed from the runtime library. All 14 original captures below remain unchanged.

## Review

[Arista Layer 1 Debug Guide](https://arista.my.site.com/AristaCommunity/s/article/Layer-1-T-shooting-TOI)
defines Local Fault as the local receive-side problem and Remote Fault as a peer receive-side
problem. The case teaches direction and a targeted first replacement; it does not turn either
flag into a universal component diagnosis. Status shows physical members of Po302/Po321; their
local identifiers are not evidence of an aggregation mismatch. Intentional transmitter disable
remains excluded under the standing curriculum assumption.

There are 14 literal captures: 2 status, 4 MAC, 4 counters errors and 4 transceiver. The two MAC
samples span 41 seconds on spine and 39 on DMZ, crossing midnight. State and Changes rows remain
unchanged. No timing is assigned to counter/transceiver captures using these MAC clocks.
The shorthand final transceiver command is retained exactly as supplied; the selector uses the
full interface-specific spelling. No normal values, inventory or recovery readings are generated.

## Original supplied text

```text
spine-gw1(s1)#show interfaces ethernet 6/2/1 status 
Port       Name                                                     Status       Vlan     Duplex Speed  Type           Flags Encapsulation
Et6/2/1    dmz-gw2_Et6/21/1 notconnect   in Po302 full   100G   100GBASE-CWDM4             

dmz-gw2(s1)#show interfaces ethernet 6/21/1 status 
Port       Name                                                    Status       Vlan     Duplex Speed  Type           Flags Encapsulation
Et6/21/1   spine-gw1_Et6/2/1 notconnect   in Po321 full   100G   100GBASE-CWDM4

spine-gw1(s1)#show interfaces ethernet 6/2/1 mac detail
Current System Time: Wed Nov 18 23:59:30 2026

Ethernet6/2/1
                              Current State     Changes            Last Change
  PHY State                   linkUp                  8            0:02:15 ago
  Interface State             linkDown                3   20 days, 3:19:20 ago
  MAC Rx Local Fault          False                  16            0:02:18 ago
  MAC Rx Remote Fault         True                   11            0:02:23 ago
spine-gw1(s1)#show interfaces ethernet 6/2/1 mac detail
Current System Time: Thu Nov 19 00:00:11 2026

Ethernet6/2/1
                              Current State     Changes            Last Change
  PHY State                   linkUp                  8            0:02:56 ago
  Interface State             linkDown                3   20 days, 3:20:01 ago
  MAC Rx Local Fault          False                  16            0:02:59 ago
  MAC Rx Remote Fault         True                   11            0:03:04 ago
  
dmz-gw2(s1)#show interfaces ethernet 6/21/1 mac detail
Current System Time: Wed Nov 18 23:59:35 2026

Ethernet6/21/1
                              Current State     Changes            Last Change
  PHY State                   linkDown                5   20 days, 3:19:25 ago
  Interface State             linkDown                5   20 days, 3:19:25 ago
  MAC Rx Local Fault          True                    9   20 days, 3:19:25 ago
  MAC Rx Remote Fault         False                   4  22 days, 10:38:31 ago
dmz-gw2(s1)#show interfaces ethernet 6/21/1 mac detail
Current System Time: Thu Nov 19 00:00:14 2026

Ethernet6/21/1
                              Current State     Changes            Last Change
  PHY State                   linkDown                5   20 days, 3:20:03 ago
  Interface State             linkDown                5   20 days, 3:20:03 ago
  MAC Rx Local Fault          True                    9   20 days, 3:20:03 ago
  MAC Rx Remote Fault         False                   4  22 days, 10:39:09 ago


spine-gw1(s1)#show interfaces ethernet 6/2/1 counters errors 
Port               FCS    Align   Symbol       Rx    Runts   Giants       Tx
Et6/2/1              0        0        0        0        0        0        0

spine-gw1(s1)#show interfaces ethernet 6/2/1 counters errors 
Port               FCS    Align   Symbol       Rx    Runts   Giants       Tx
Et6/2/1              0        0        0        0        0        0        0

dmz-gw2(s1)# show interfaces ethernet 6/21/1 counters errors 
Port               FCS    Align   Symbol       Rx    Runts   Giants       Tx
Et6/21/1             0        0        0        0        0        0        0

dmz-gw2(s1)# show interfaces ethernet 6/21/1 counters errors 
Port               FCS    Align   Symbol       Rx    Runts   Giants       Tx
Et6/21/1             0        0        0        0        0        0        0


spine-gw1(s1)#show interfaces ethernet 6/2/1 transceiver
                               Bias      Optical   Optical                
          Temp       Voltage   Current   Tx Power  Rx Power               
Port      (Celsius)  (Volts)   (mA)      (dBm)     (dBm)     Last Update  
-----     ---------  --------  --------  --------  --------  -------------------
Et6/2/1    32.01      3.27      55.84    1.47      -0.26     0:00:03 ago
Et6/2/2    32.01      3.27      55.58    1.68      1.27      0:00:03 ago
Et6/2/3    32.01      3.27      55.67    1.57      1.22      0:00:03 ago
Et6/2/4    32.01      3.27      55.75    1.14      1.17      0:00:03 ago

spine-gw1(s1)#show interfaces ethernet 6/2/1 transceiver
                               Bias      Optical   Optical                
          Temp       Voltage   Current   Tx Power  Rx Power               
Port      (Celsius)  (Volts)   (mA)      (dBm)     (dBm)     Last Update 
-----     ---------  --------  --------  --------  --------  ------------------- 
Et6/2/1    32.32      3.27      55.92    1.47      -0.24     0:00:00 ago
Et6/2/2    32.32      3.27      55.67    1.69      1.27      0:00:00 ago
Et6/2/3    32.32      3.27      55.67    1.56      1.22      0:00:00 ago
Et6/2/4    32.32      3.27      55.84    1.14      1.18      0:00:00 ago

dmz-gw2(s1)#show interfaces ethernet 6/21/1 transceiver
                               Bias      Optical   Optical                
          Temp       Voltage   Current   Tx Power  Rx Power               
Port      (Celsius)  (Volts)   (mA)      (dBm)     (dBm)     Last Update  
-----     ---------  --------  --------  --------  --------  ------------------- 
Et6/21/1   35.98      3.26      56.17    0.29      -30.00    0:00:05 ago
Et6/21/2   35.98      3.26      56.26    1.65      -30.00    0:00:05 ago
Et6/21/3   35.98      3.26      56.26    1.34      -30.00    0:00:05 ago
Et6/21/4   35.98      3.26      56.17    1.10      -30.00    0:00:05 ago

dmz-gw2(s1)#show interfaces 6/21/1 transceiver
                               Bias      Optical   Optical                
          Temp       Voltage   Current   Tx Power  Rx Power               
Port      (Celsius)  (Volts)   (mA)      (dBm)     (dBm)     Last Update  
-----     ---------  --------  --------  --------  --------  ------------------- 
Et6/21/1   34.67      3.26      56.09    0.35      -30.00    0:00:02 ago
Et6/21/2   34.67      3.26      56.00    1.68      -30.00    0:00:02 ago
Et6/21/3   34.67      3.26      56.00    1.38      -30.00    0:00:02 ago
Et6/21/4   34.67      3.26      56.00    1.14      -30.00    0:00:02 ago
```
