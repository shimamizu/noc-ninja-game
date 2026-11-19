# Guided patrol grading contract

Current: guided-v20, schemaVersion 1, constitution 1.7.0.

The game grades reviewed choices by stable answer ID in `transitionPatrol`; it does not run
a universal optical threshold or diagnostic category classifier. Each question has exactly
three options and exactly one supported answer. Scenario/question/answer shuffling changes
presentation, not identity or correctness. Invalid IDs and completed repeat submissions do
not award progress. Wrong valid answers increment attempts and remain retryable.

The library validator requires literal status once and transceiver/MAC/errors twice at each
endpoint. Missing required output rejects the library before grading. The author must request
that output from the owner and wait before quiz admission. No generated or inferred substitute.

U15's counter answer recognizes unchanged down-link MAC histories and zero counters in both
samples at both ends. Its variance lesson defines highest minus lowest in mA, with the
operator's 10–20 mA comparison. The first replacement is leaf-gw2 Et53/1; consideration of
spine-gw1 Et8/10/1 requires BOTH continued link failure and high bias current variance between
lanes after the leaf swap. Neither condition alone satisfies the reviewed answer.

Reveal/export requires all decisions correct and all available evidence reviewed. U13/U14
have reported recovery; U15 remains a recommendation. Unrecorded optional post-repair values
remain unknown. See [content.md](content.md) and [interaction.md](interaction.md).
