# U15 — 100G down link with conditional second optic replacement

Supplied by the owner on 2026-11-19. The owner recommends replacing the leaf-gw2
Et53/1 optic first. No completed replacement or recovery was reported.

## Device inventory

| Endpoint | Chassis | EOS | Line card | Optic vendor | Optic model |
| --- | --- | --- | --- | --- | --- |
| spine-gw1 | Arista DCS-7508N | 4.31.10M | Not supplied | ColorChip ltd | C100Q020CWDM403B |
| leaf-gw2 | Arista DCS-7050SX3-48YC8-R | 4.31.10M | Not supplied | ColorChip ltd | C100Q020CWDM403B |

## Teaching interpretation and owner runbook

Spine Et8/10/1 receives -13.87 dBm in both readings and has Local Fault True.
Leaf Et53/1 has Remote Fault True and lane 1 Tx -5.36 dBm in both readings.
Together with the owner's diagnosis these support leaf optic replacement first.
Remote Fault alone is not a universal failed-optic indicator, and these observations do
not independently exclude every fiber/connector cause or prove a completed repair.

Owner teaching clarification (2026-11-19): use **bias current variance between lanes**.
Here “variance” means the highest-to-lowest range in mA, not statistical variance.
Read the Bias Current column on spine-gw1: 63.35, 44.00, 39.24 and 27.33 mA.
Subtract the lowest from the highest: **63.35 − 27.33 = 36.02 mA**. The second capture
has **63.39 − 27.30 = 36.09 mA**. The readings are about 36 mA apart between lanes;
individual lanes change little over time. The operator normally sees at most about
**10–20 mA** between the four lanes in this environment, making 36 mA a very large spread.
This is operator guidance, not a universal manufacturer alarm threshold.

Replace leaf-gw2 Et53/1 first and recheck both endpoints. Only if the link remains down
AND the bias current variance between lanes on spine-gw1 remains high after that swap
could the technician consider replacing spine-gw1 Et8/10/1. Neither a recovered link
with high variance nor a down link with normal variance satisfies this condition.
Record interventions separately and verify optics, new errors, faults, stability and service.
The calculation and comparison must appear before answering the variance/second-swap
questions because either question can appear first in the shuffled patrol.

Both endpoints remain linkDown with unchanged state/fault Changes across their paired
MAC samples (45 seconds on spine, 105 seconds on leaf). These captures do not show
new transitions; they do not prove no changes outside those windows. Leaf Last Change
ages advance by 104 seconds while the printed system timestamps advance by 105 seconds;
preserve this small discrepancy rather than adjusting the source. Spine and leaf counters are
zero in both samples at each endpoint. The leaf tables were supplied in the owner follow-up below. Zero counters on a down
link do not establish health. The optical Last Update fields are telemetry ages, not
absolute capture timestamps. Timezone and counter reset history are unknown.

## Original supplied text

```text
spine-gw1(s1)#show ver
Arista DCS-7508N
Software image version: 4.31.10M

spine-gw1(s1)#show inventory | inc 8/10
  8/10 ColorChip ltd    C100Q020CWDM403B 
  
spine-gw1(s1)#show interfaces ethernet 8/10/1 status 
Port       Name                                                    Status       Vlan     Duplex Speed  Type           Flags Encapsulation
Et8/10/1   leaf-gw2_Et53/1 notconnect   in Po810 full   100G   100GBASE-CWDM4                   

spine-gw1(s1)#show interfaces ethernet 8/10/1 transceiver 
If device is externally calibrated, only calibrated values are printed.
N/A: not applicable, Tx: transmit, Rx: receive.
mA: milliamperes, dBm: decibels (milliwatts).
                               Bias      Optical   Optical                
          Temp       Voltage   Current   Tx Power  Rx Power               
Port      (Celsius)  (Volts)   (mA)      (dBm)     (dBm)     Last Update  
-----     ---------  --------  --------  --------  --------  -------------------
Et8/10/1   37.43      3.29      63.35    -1.33     -13.87    0:00:02 ago
Et8/10/2   37.43      3.29      44.00    0.80      -4.56     0:00:02 ago
Et8/10/3   37.43      3.29      39.24    0.25      0.09      0:00:02 ago
Et8/10/4   37.43      3.29      27.33    -0.58     -0.89     0:00:02 ago

spine-gw1(s1)#show interfaces ethernet 8/10/1 transceiver 
If device is externally calibrated, only calibrated values are printed.
N/A: not applicable, Tx: transmit, Rx: receive.
mA: milliamperes, dBm: decibels (milliwatts).
                               Bias      Optical   Optical                
          Temp       Voltage   Current   Tx Power  Rx Power               
Port      (Celsius)  (Volts)   (mA)      (dBm)     (dBm)     Last Update  
-----     ---------  --------  --------  --------  --------  -------------------
Et8/10/1   37.38      3.29      63.39    -1.33     -13.87    0:00:05 ago
Et8/10/2   37.38      3.29      44.00    0.81      -4.56     0:00:05 ago
Et8/10/3   37.38      3.29      39.22    0.25      0.09      0:00:05 ago
Et8/10/4   37.38      3.29      27.30    -0.57     -0.90     0:00:05 ago


spine-gw1(s1)#show interfaces ethernet 8/10/1 mac detail 
Current System Time: Thu Nov 19 18:27:32 2026

Ethernet8/10/1
                              Current State     Changes            Last Change
  PHY State                   linkDown                3     1 day, 1:51:07 ago
  Interface State             linkDown                3     1 day, 1:51:07 ago
  MAC Rx Local Fault          True                    5     1 day, 1:51:07 ago
  MAC Rx Remote Fault         False                   4     1 day, 1:51:07 ago

spine-gw1(s1)#show interfaces ethernet 8/10/1 mac detail
Current System Time: Thu Nov 19 18:28:17 2026

Ethernet8/10/1
                              Current State     Changes            Last Change
  PHY State                   linkDown                3     1 day, 1:51:52 ago
  Interface State             linkDown                3     1 day, 1:51:52 ago
  MAC Rx Local Fault          True                    5     1 day, 1:51:52 ago
  MAC Rx Remote Fault         False                   4     1 day, 1:51:52 ago
  
spine-gw1(s1)#show interfaces ethernet 8/10/1 counters errors 
Port               FCS    Align   Symbol       Rx    Runts   Giants       Tx
Et8/10/1             0        0        0        0        0        0        0
spine-gw1(s1)#show interfaces ethernet 8/10/1 counters errors
Port               FCS    Align   Symbol       Rx    Runts   Giants       Tx
Et8/10/1             0        0        0        0        0        0        0
spine-gw1(s1)#


leaf-gw2#show ver
Arista DCS-7050SX3-48YC8-R
Software image version: 4.31.10M

leaf-gw2#show inventory | inc 53
  53   ColorChip ltd    C100Q020CWDM403B 
  
leaf-gw2#show int ethernet 53/1 status 
Port       Name                                                     Status       Vlan     Duplex Speed  Type           Flags Encapsulation
Et53/1     spine-gw1_Et8/10/1 notconnect   in Po101 full   100G   100GBASE-CWDM4                   

leaf-gw2#show interfaces ethernet 53/1 transceiver 
If device is externally calibrated, only calibrated values are printed.
N/A: not applicable, Tx: transmit, Rx: receive.
mA: milliamperes, dBm: decibels (milliwatts).
                               Bias      Optical   Optical                
          Temp       Voltage   Current   Tx Power  Rx Power               
Port      (Celsius)  (Volts)   (mA)      (dBm)     (dBm)     Last Update  
-----     ---------  --------  --------  --------  --------  -------------------
Et53/1     46.44      3.28      61.58    -5.36     -2.30     0:00:00 ago
Et53/2     46.44      3.28      64.67    0.81      -0.25     0:00:00 ago
Et53/3     46.44      3.28      51.14    0.27      -0.89     0:00:00 ago
Et53/4     46.44      3.28      60.76    -1.03     -2.99     0:00:00 ago


leaf-gw2#show interfaces ethernet 53/1 transceiver 
If device is externally calibrated, only calibrated values are printed.
N/A: not applicable, Tx: transmit, Rx: receive.
mA: milliamperes, dBm: decibels (milliwatts).
                               Bias      Optical   Optical                
          Temp       Voltage   Current   Tx Power  Rx Power               
Port      (Celsius)  (Volts)   (mA)      (dBm)     (dBm)     Last Update  
-----     ---------  --------  --------  --------  --------  -------------------
Et53/1     46.39      3.28      61.61    -5.36     -2.30     0:00:00 ago
Et53/2     46.39      3.28      64.70    0.82      -0.25     0:00:00 ago
Et53/3     46.39      3.28      51.17    0.27      -0.89     0:00:00 ago
Et53/4     46.39      3.28      60.76    -1.05     -3.01     0:00:00 ago

leaf-gw2#show interfaces ethernet 53/1 mac detail 
Current System Time: Thu Nov 19 18:28:40 2026

Ethernet53/1
                              Current State     Changes            Last Change
  PHY State                   linkDown                5     1 day, 1:52:16 ago
  Interface State             linkDown                7     1 day, 1:52:16 ago
  MAC Rx Local Fault          False                  12            1:56:00 ago
  MAC Rx Remote Fault         True                    5            1:56:01 ago

leaf-gw2#show interfaces ethernet 53/1 mac detail
Current System Time: Thu Nov 19 18:30:25 2026

Ethernet53/1
                              Current State     Changes            Last Change
  PHY State                   linkDown                5     1 day, 1:54:00 ago
  Interface State             linkDown                7     1 day, 1:54:00 ago
  MAC Rx Local Fault          False                  12            1:57:44 ago
  MAC Rx Remote Fault         True                    5            1:57:45 ago
leaf-gw2#
```


## Owner follow-up — leaf error counters, 2026-11-19

The owner supplied both missing leaf counters-errors tables. They complete the expected
14 interface recordings. Pasted line-separator backslashes are rendered as newlines;
no capture timestamp, reset baseline, repair or recovery result was supplied.

```text
leaf-gw2#show interfaces ethernet 53/1 counters errors 
Port               FCS    Align   Symbol       Rx    Runts   Giants       Tx
Et53/1               0        0        0        0        0        0        0
leaf-gw2#show interfaces ethernet 53/1 counters errors
Port               FCS    Align   Symbol       Rx    Runts   Giants       Tx
Et53/1               0        0        0        0        0        0        0
```
