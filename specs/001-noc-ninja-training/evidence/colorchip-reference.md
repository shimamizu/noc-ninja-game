# ColorChip C100Q020CWDM403B Reference

**Source ID**: U3
**Received**: 2026-11-17, supplied by the user in the project conversation.
**Source kind**: User reference, not an independently retrieved manufacturer datasheet.
**Selected classification**: QSFP28 100G CWDM4, four lanes.

## Supplied Values

The following preserves the user's model, manufacturer text, classifications and numeric values.
The initial reference omitted measurement units; the user subsequently confirmed them in U5 below.
The original YAML remains unchanged.

```yaml
# ColorChip QSFP28 100G CWDM4
"C100Q020CWDM403B": &colorchip_100g_cwdm4
  manufacturer: "ColorChip ltd"
  type: "QSFP28"
  speed: "100G"
  lanes: 4
  temperature:
    high_alarm: 60.0
    high_warn: 55.0
    low_warn: 0.0
    low_alarm: -5.0
  voltage:
    high_alarm: 3.60
    high_warn: 3.50
    low_warn: 3.10
    low_alarm: 3.00
  bias_current:
    high_alarm: 78.0
    high_warn: 75.0
    low_warn: 25.0
    low_alarm: 20.0
  tx_power:
    high_alarm: 3.30
    high_warn: 2.30
    low_warn: -7.0
    low_alarm: -9.0
  rx_power:
    high_alarm: 3.30
    high_warn: 2.30
    low_warn: -13.70
    low_alarm: -15.70
```

## Integration and Interpretation

- Use CWDM4 as the selected classification for both game endpoints, superseding the earlier
  LR4 description. Keep COLORCHIP as the existing vendor label and preserve "ColorChip ltd"
  as the supplied manufacturer string; these are explicitly associated by U3.
- Retain all five groups and all four thresholds per group without rounding or substituting
  generic limits. Each group satisfies low_alarm < low_warn < high_warn < high_alarm.
- These are alarm/warning reference values, not measured transceiver readings or an EOS capture.
  They do not establish the units of the earlier headerless Et3/3 rows.
- U5 supplies the intended units and the -30 dBm no-light interpretation for this modeled
  environment. Preserve this as user-provided interpretation, not manufacturer certification.
- Below a low alarm means very poor light according to the user; it does not automatically
  establish absence. Unavailable values and absent light remain distinct.
- Threshold equality behavior is not needed for the current diagnosis mechanic. Leave
  `comparisonRule` unset unless threshold-based grading is introduced with reviewed semantics.
- Review the applicability of sources and the consistency of each authored scenario before play;
  do not ask for the already supplied values, units, headers or no-light interpretation again.

## U5 — User-Confirmed Units and No-Light Interpretation

**Source kind**: user-reference; received 2026-11-17 in the project conversation.
The user confirmed the proposed units: temperature in degrees Celsius, voltage in volts,
bias current in milliamperes, and Tx/Rx optical power in dBm. The U4a output independently
labels these same units in its supplied headers.

The user states that a light-level value of **-30 dBm means no light at all** for this modeled
context, and values below the low alarms indicate very bad light. Use exactly -30 dBm as the
supplied no-light indication; do not invent an absent-light cutoff at the low alarm or extend
this to every device/model. For a receiving-end diagnosis, use Rx readings, not Tx readings.

U4a preserves four reported rows. Keep individual row values and do not average them into an
invented aggregate. For the authored L1 absent-Rx cases, use -30 dBm on all four displayed Rx
rows with administrative up and operational down. This conservative scenario choice avoids
teaching that one impaired channel establishes absence across the whole optic. Mixed-channel
faults are outside the six selected rounds. Detailed module-versus-lane threshold application
needs review only if a scenario uses it to interpret a measurement; the supplied units and
no-light indication are no longer missing inputs.

## Validation

All 20 threshold values were preserved and their ordering checked. This is a transcription and
internal-consistency check, not independent technical certification. No runtime implementation
or alarm-grading mechanic is added by this reference.
