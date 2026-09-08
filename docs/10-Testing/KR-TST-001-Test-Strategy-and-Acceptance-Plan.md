---
document_id: KR-TST-001
title: "KasiRent Test Strategy and Acceptance Plan"
version: 0.6.0
status: Draft
classification: Internal
owner: "Engineering"
project: KasiRent
last_updated: 2026-09-08
---

# KR-TST-001 — Test Strategy and Acceptance Plan

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-TST-001 |
| Version / date | 0.6.0 / 2026-09-08 |
| Status | Draft — review pending |
| Owner | Engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Missing-charge update

Version 0.5.0 adds FR-017 missing-charge visibility; see KR-UXS-002.

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.6.0 | 2026-09-08 | Record partial Android validation and remaining checks. |
| 0.2.0 | 2026-09-08 | Tenancy lifecycle, migration and current verification. |
| 0.3.0 | 2026-09-08 | Align with effective-month rent changes. |
| 0.4.0 | 2026-09-08 | Add opening balances and correction rules. |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Separate existing test evidence from the work needed for pilot acceptance.

## Existing evidence

server/app.test.mjs contains one integration test spanning a full workflow. The earlier build turn on 2026-09-07 reported it passing against an isolated PGlite instance, together with TypeScript, web export and Android Hermes bundle export. These results are historical build evidence, not new tests run during this documentation change.

| TC | Scenario | Current coverage |
| --- | --- | --- |
| TC-001 | Register, authenticate, reject absent session, revoke logout | Registration/no token/logout covered; login, expiry and reset pending |
| TC-002 | Prevent cross-owner linkage and reversal | Foreign property/tenancy/reversal and empty other-owner state covered; remaining paths pending |
| TC-003 | Property/room creation and duplicate room | Creation covered; duplicate case pending |
| TC-004 | Tenancy assignment and invalid terms | Creation covered; occupied-room/range cases pending |
| TC-005 | Charge month once and eligibility | Duplicate January covered; future/start-boundary cases pending |
| TC-006 | Partial/full amounts, negative values and dates | R1,000 + R500 on R1,500, negative amount and impossible date covered |
| TC-007 | Payment replay | Identical sequential replay covered; changed payload and race pending |
| TC-008 | Reversal history and owner check | Covered; repeat reversal pending |
| TC-009 | Derived balance and dashboard | API-record arithmetic covered; displayed totals, credit, carry-over and timezone pending |
| TC-010 | Receipt content and delivery | Manual/native/browser checks pending |
| TC-011 | Sample isolation | Android sample navigation confirmed; automated UI test pending |
| TC-012 | Tenancy replacement history | Automated: replacement, arrears, isolation, dates, concurrency, billing and legacy migration/reopen |
| TC-013 | Rent changes and opening adjustments | Three rent-change integration tests pass; opening balances implemented; general adjustments remain outside scope |
| TC-014 | Immutable receipt correction | Planned with FR-014 |
| TC-015 | Recovery/privacy workflow | Planned with FR-015 |
| TC-016 | Persist, back up and restore | Not tested in current integration suite |
| TC-017 | Uncharged month presentation | Three helper tests; initial Not charged state confirmed on Android, charge completion pending |

## Commands

From the root, use npm test. Database integration fixtures pass null explicitly to select PGlite rather than inherit DATABASE_URL. The migration test uses a new temporary directory, closes and reopens it, then removes only that checked test path. Never change tests to target production.

From mobile:

```text
node node_modules/typescript/bin/tsc --noEmit
node node_modules/expo/bin/cli export --platform web
node node_modules/expo/bin/cli export --platform android --output-dir dist-android
```

## Manual acceptance scenario

Create fictional landlord A and B. Under A add a property, two rooms and a R1,500 tenancy. Charge a month, record R1,000 and confirm R500; add R500 and confirm zero; reverse it and confirm R500. Check receipt fields/download, duplicate submission handling and B's isolation. Reload/sign in and confirm records. Restart the API separately and repeat persistence checks.

Run at 360px width and on a physical Android device with large text. Test loss of connection during save and distinguish a failed write from a failed refresh. Test keyboard/focus, long names and receipt destination. Use synthetic data.

## Pilot exit criteria

No unresolved high-impact money or ownership defect. All planned release stories have accepted tests. Backup restoration reproduces balances. Selected real-device flows pass. Recovery/privacy procedures exist. Performance results identify workload/network rather than claiming “fast” without measurement.


## Lifecycle additions

Five tests in server/tenancies.test.mjs supplement the original money workflow. They cover move-out/replacement with preserved balances and former-renter payments, invalid/backdated/future dates and charged-later guards, concurrent new occupants and matching move-out replays, same-month full charges, and migration/reopen of a populated legacy database. Standalone PostgreSQL and physical-device acceptance remain separate checks.

## References

- [KR-RTM-001 — Requirements Traceability Matrix](../02-Requirements/KR-RTM-001-Requirements-Traceability-Matrix.md)
- [KR-SRS-001 — Software Requirements Specification](../02-Requirements/KR-SRS-001-Software-Requirements-Specification.md)
- [KR-REL-001 — Initial Local Baseline](../18-Release-Notes/KR-REL-001-Initial-Local-Baseline.md)

Opening-balance contract and acceptance details: [KR-BCK-004](../08-Backend/KR-BCK-004-Opening-Balances.md).

## Android field evidence — 8 September 2026

Registration, initial record creation, initial Not charged display and tenant-detail recovery after the native text fix are user-confirmed. Exact September charge, partial payment, receipts and remaining device workflows are pending. See [KR-TST-002](KR-TST-002-Android-Field-Validation.md) for evidence boundaries and regression checks.
