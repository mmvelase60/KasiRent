---
document_id: KR-TST-002
title: "Android Field Validation"
version: 0.6.0
status: Draft
classification: Internal
owner: "Product owner and engineering"
project: KasiRent
last_updated: 2026-09-08
---

# KR-TST-002 — Android Field Validation

## Document control and revision

Version 0.6.0, 8 September 2026. Initial physical Android evidence and defect record. This is partial acceptance, not pilot approval.

## Environment and evidence

User-operated physical Android phone running KasiRent through Expo Go over the same Wi-Fi as the Windows development laptop. Phone model, Android version and Expo Go version were not captured. The app uses Expo SDK 57 and React Native 0.86.3. Findings come from user confirmations and supplied screenshots, not automated device control.

Evidence sets: nine screenshots dated 2026-09-08 09:03–09:06 show sample screens, registration and a development connection warning; four dated 09:30–09:32 show a native text-rendering error. Images remain in the user's local pictures folders and are not copied into the repository. Later chat confirmations establish the outcomes below.

## Confirmed and pending outcomes

| Check | Evidence / result |
| --- | --- |
| Android startup and sample navigation | User confirmed startup; screenshots show Overview, Rooms, Tenants and Payments with sample banner. |
| Registration and account loading | User confirmed registration opens an empty workspace. |
| Property, room and tenant creation | User confirmed the guided Test Yard / Room 01 / Test Tenant workflow works. |
| Initial missing-charge state | User confirmed the instructed R0 recorded balance and Not charged state after adding the R1,500 tenant. |
| Tenant-detail rendering after fix | User confirmed the screen opens after correction of the native text error. |
| September charging and R1,500 balance | Instructions supplied; exact saved charge and resulting balance have not yet been confirmed. |
| R1,000 partial payment and R500 remaining | Instructions supplied; pending user execution/confirmation. |
| Full settlement, overpayment, reversal and receipt sharing | Pending physical-device verification. |
| Opening balance, correction, rent changes and move-out | Automated coverage exists; physical-device workflows pending. |
| Restart persistence, connection-loss recovery and accessibility | Pending structured verification. |

## Defects and corrections

| Finding | Action | Verification / remaining work |
| --- | --- | --- |
| Collection amounts squeezed names into narrow columns | b4a3057 places balances on a separate line on phone layouts and adds bottom scroll padding. | TypeScript passed; updated phone layout still needs screenshot confirmation. |
| Cannot connect to Expo CLI warning | Confirmed Expo and API respond through the laptop LAN address; advised reopen on the same Wi-Fi. | Device continued through registration; root cause and sustained reconnect behavior remain unverified. No claim that a network defect was fixed. |
| Text strings must be rendered within Text | 0c834ed removes a literal JSX space under a View in tenant details. | Emitted-JSX regression test and TypeScript passed; user confirmed tenant screen opens without the red error. |

## Automated evidence at handoff

The full 14-test suite passed during missing-charge delivery, along with TypeScript and web export. After the native text fix, the new targeted native-text regression test and TypeScript passed. The suite now contains 15 tests, but a combined 15-test run was not performed during that fix or this documentation update. Compilation does not establish device behavior.

## Resume the test

Use the existing fictional Test Tenant. Verify September 2026 has one R1,500 charge; if absent, review September charging, noting that it affects all eligible renters. Then record a single fictional R1,000 cash payment dated 2026-09-08 with reference Test September instalment. Expect a R1,000 payment entry and R500 remaining due. Record the observed result before marking this check passed. Do not recreate records or repeat payment saving to infer success.

## References

- [Test strategy](KR-TST-001-Test-Strategy-and-Acceptance-Plan.md)
- [Missing-charge rules](../07-Frontend/KR-UXS-002-Missing-Charge-Alerts.md)
- [Landlord walkthrough](../20-Training/KR-TRN-001-Landlord-Quick-Start-and-Walkthrough.md)
