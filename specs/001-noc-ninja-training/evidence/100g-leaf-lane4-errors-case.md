# U14 — 100G leaf lane 4 errors and intermittent faults

The owner supplied these original outputs and confirmed that replacing the spine-gw1
Et4/28/1 optic fixed the problem. No numerical post-repair readings were supplied.

## Device inventory

| Endpoint | Chassis | EOS | Line card | Optic vendor | Optic model |
| --- | --- | --- | --- | --- | --- |
| leaf-gw2 | Arista DCS-7050SX3-48YC8-R | 4.31.10M | Not supplied | ColorChip | C100Q020CWDM403H |
| spine-gw1 | Arista DCS-7808-CH | 4.31.10M | Not supplied | ColorChip | C100Q020CWDM403H |

## Teaching interpretation

Leaf receive errors increase: FCS 4 → 22, Symbol 4 → 22, Rx 6 → 26, Runts 2 → 4.
Spine error counters remain zero. Leaf lane 4 Rx is -14.91 dBm in both observations.
Leaf Local Fault Changes increase 1088 → 1096 over 93 seconds; spine Remote Fault Changes
increase 1058 → 1066 over 85 seconds. Current fault flags are False in both samples.
Interface-state Changes rise by four at both ends. These are state transitions, not full cycles.
The combined evidence points to the spine optic, whose replacement was confirmed to resolve it.
The MAC sampling windows differ; no one-to-one event timing or error rate is inferred.

The first leaf error output uses the supplied `senz` shortcut. The application associates
that exact table with counters errors. At the owner’s request, the game and handoff
display `show interfaces ethernet 55/1 counters errors` in place of the shortcut; the
original prompt remains only in the source data. The output body is unchanged. It does not
execute or offer arbitrary aliases. The four-command dropdown remains unchanged.

## Original supplied text

```text
leaf-gw2 Arista DCS-7050SX3-48YC8-R on 4.31.10M 
Et55/1 = ColorChip C100Q020CWDM403H

spine-gw1 Arista DCS-7808-CH on 4.31.10M 
Et4/28/1 = ColorChip C100Q020CWDM403H

leaf-gw2#show interfaces ethernet 55/1 status 
Port       Name                                                     Status       Vlan     Duplex Speed  Type           Flags Encapsulation
Et55/1     spine-gw1_Et4/28/1 connected    in Po103 full   100G   100GBASE-CWDM4                   

spine-gw1(s1)#show interfaces ethernet 4/28/1 status 
Port       Name                                                    Status       Vlan     Duplex Speed  Type           Flags Encapsulation
Et4/28/1   leaf-gw2_Et55/1 connected    in Po428 full   100G   100GBASE-CWDM4      

leaf-gw2#senz
Port               FCS    Align   Symbol       Rx    Runts   Giants       Tx
Et55/1               4        0        4        6        2        0        0

leaf-gw2#show interfaces ethernet 55/1 counters errors
Port               FCS    Align   Symbol       Rx    Runts   Giants       Tx
Et55/1              22        0       22       26        4        0        0

spine-gw1(s1)#show interfaces ethernet 4/28/1 counters errors 
Port               FCS    Align   Symbol       Rx    Runts   Giants       Tx
Et4/28/1             0        0        0        0        0        0        0

spine-gw1(s1)#show interfaces ethernet 4/28/1 counters errors
Port               FCS    Align   Symbol       Rx    Runts   Giants       Tx
Et4/28/1             0        0        0        0        0        0        0

leaf-gw2#show interfaces ethernet 55/1 transceiver 
If device is externally calibrated, only calibrated values are printed.
N/A: not applicable, Tx: transmit, Rx: receive.
mA: milliamperes, dBm: decibels (milliwatts).
                               Bias      Optical   Optical                
          Temp       Voltage   Current   Tx Power  Rx Power               
Port      (Celsius)  (Volts)   (mA)      (dBm)     (dBm)     Last Update  
-----     ---------  --------  --------  --------  --------  -------------------
Et55/1     42.48      3.31      57.18    1.19      -0.57     0:00:04 ago
Et55/2     42.48      3.31      57.43    1.38      0.56      0:00:04 ago
Et55/3     42.48      3.31      56.93    0.60      0.65      0:00:04 ago
Et55/4     42.48      3.31      57.68    1.49      -14.91    0:00:04 ago

leaf-gw2#show interfaces ethernet 55/1 transceiver 
If device is externally calibrated, only calibrated values are printed.
N/A: not applicable, Tx: transmit, Rx: receive.
mA: milliamperes, dBm: decibels (milliwatts).
                               Bias      Optical   Optical                
          Temp       Voltage   Current   Tx Power  Rx Power               
Port      (Celsius)  (Volts)   (mA)      (dBm)     (dBm)     Last Update  
-----     ---------  --------  --------  --------  --------  -------------------
Et55/1     42.48      3.31      57.18    1.19      -0.57     0:00:00 ago
Et55/2     42.48      3.31      57.43    1.38      0.56      0:00:00 ago
Et55/3     42.48      3.31      56.84    0.60      0.65      0:00:00 ago
Et55/4     42.48      3.31      57.60    1.48      -14.91    0:00:00 ago

spine-gw1(s1)#show interfaces ethernet 4/28/1 transceiver 
If device is externally calibrated, only calibrated values are printed.
N/A: not applicable, Tx: transmit, Rx: receive.
mA: milliamperes, dBm: decibels (milliwatts).
                               Bias      Optical   Optical                
          Temp       Voltage   Current   Tx Power  Rx Power               
Port      (Celsius)  (Volts)   (mA)      (dBm)     (dBm)     Last Update  
-----     ---------  --------  --------  --------  --------  -------------------
Et4/28/1   39.45      3.27      56.51    0.96      -0.13     0:00:01 ago
Et4/28/2   39.45      3.27      56.67    1.38      0.69      0:00:01 ago
Et4/28/3   39.45      3.27      56.67    1.33      0.70      0:00:01 ago
Et4/28/4   39.45      3.27      56.51    -0.52     0.97      0:00:01 ago

spine-gw1(s1)#show interfaces ethernet 4/28/1 transceiver 
If device is externally calibrated, only calibrated values are printed.
N/A: not applicable, Tx: transmit, Rx: receive.
mA: milliamperes, dBm: decibels (milliwatts).
                               Bias      Optical   Optical                
          Temp       Voltage   Current   Tx Power  Rx Power               
Port      (Celsius)  (Volts)   (mA)      (dBm)     (dBm)     Last Update  
-----     ---------  --------  --------  --------  --------  -------------------
Et4/28/1   39.45      3.27      56.51    0.96      -0.13     0:00:01 ago
Et4/28/2   39.45      3.27      56.67    1.38      0.69      0:00:01 ago
Et4/28/3   39.45      3.27      56.76    1.33      0.70      0:00:01 ago
Et4/28/4   39.45      3.27      56.51    -0.52     0.96      0:00:01 ago


leaf-gw2#show interfaces ethernet 55/1 mac detail 
Current System Time: Thu Nov 19 00:39:53 2026

Ethernet55/1
                              Current State     Changes            Last Change
  PHY State                   linkUp                564            0:00:10 ago
  Interface State             linkUp                556            0:00:09 ago
  MAC Rx Local Fault          False                1088            0:00:12 ago
  MAC Rx Remote Fault         False                   6            0:03:30 ago
leaf-gw2#show interfaces ethernet 55/1 mac detail
Current System Time: Thu Nov 19 00:41:26 2026

Ethernet55/1
                              Current State     Changes            Last Change
  PHY State                   linkUp                568            0:00:01 ago
  Interface State             linkUp                560            0:00:00 ago
  MAC Rx Local Fault          False                1096            0:00:03 ago
  MAC Rx Remote Fault         False                   6            0:05:02 ago
leaf-gw2#

spine-gw1(s1)#show interfaces ethernet 4/28/1 mac detail 
Current System Time: Thu Nov 19 00:40:02 2026

Ethernet4/28/1
                              Current State     Changes            Last Change
  PHY State                   linkUp                  4            0:03:40 ago
  Interface State             linkUp                700            0:00:18 ago
  MAC Rx Local Fault          False                   8            0:03:40 ago
  MAC Rx Remote Fault         False                1058            0:00:18 ago
spine-gw1(s1)#show interfaces ethernet 4/28/1 mac detail
Current System Time: Thu Nov 19 00:41:27 2026

Ethernet4/28/1
                              Current State     Changes            Last Change
  PHY State                   linkUp                  4            0:05:05 ago
  Interface State             linkUp                704            0:00:01 ago
  MAC Rx Local Fault          False                   8            0:05:06 ago
  MAC Rx Remote Fault         False                1066            0:00:02 ago
spine-gw1(s1)#


```
