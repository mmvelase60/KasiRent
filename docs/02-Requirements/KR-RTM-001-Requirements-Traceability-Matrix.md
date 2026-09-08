---
document_id: KR-RTM-001
title: "KasiRent Requirements Traceability Matrix"
version: 0.2.0
status: Draft
classification: Internal
owner: "Engineering"
project: KasiRent
last_updated: 2026-09-08
---

# KR-RTM-001 — Requirements Traceability Matrix

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-RTM-001 |
| Version / date | 0.2.0 / 2026-09-08 |
| Status | Draft — review pending |
| Owner | Engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.2.0 | 2026-09-08 | Tenancy lifecycle, migration and current verification. |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Connect business intent to current code and specific verification.

## Traceability matrix

Source paths below are relative to the project root. TC identifiers describe scenarios in KR-TST-001; the current automated suite is one integration test with multiple assertions, not one executable test per ID.

| Business | Functional | Story / use case | Rules | Implementation evidence | Verification |
| --- | --- | --- | --- | --- | --- |
| BR-001 | FR-001 | US-001 / UC-001 | RULE-001 | server/app.mjs auth and session middleware | TC-001 partial; login/expiry pending |
| BR-001 | FR-002 | US-001 / UC-002 | RULE-002 | owner-filtered state and parent lookups | TC-002 automated subset |
| BR-002 | FR-003 | US-002 / UC-002 | RULE-003 | properties, rooms routes; schema constraints | TC-003 create covered; duplicate pending |
| BR-003 | FR-004 | US-003 / UC-002 | RULE-004 | tenancies.mjs and migration 001 | TC-004 create covered; boundaries pending |
| BR-004 | FR-005 | US-004 / UC-003 | RULE-005 | tenancies.mjs charge transaction and unique key | TC-005 duplicate covered |
| BR-005 | FR-006 | US-005 / UC-004 | RULE-006 | payments route; UI cents conversion | TC-006 partial/full/negative/date covered |
| BR-005 | FR-007 | US-006 / UC-004 | RULE-007 | prior payment lookup and primary key | TC-007 sequential covered; concurrent pending |
| BR-006 | FR-008 | US-007 / UC-005 | RULE-008 | void update and client exclusion | TC-008 reversal/ownership covered |
| BR-004 | FR-009 | US-005 / UC-006 | RULE-009 | mobile/src/Main.tsx balance and totals | TC-009 API arithmetic covered; UI pending |
| BR-005 | FR-010 | US-008 / UC-004 | RULE-010 | Main.tsx receipt; shareReceipt.ts | TC-010 manual pending |
| BR-002 | FR-011 | UC-007 | RULE-011 | client-only sample data | TC-011 manual pending |
| BR-007 | FR-012 | US-009 / UC-008 | RULE-004, RULE-013 | server/tenancies.mjs; migration 001; tenant filters | TC-012 automated lifecycle/migration tests |
| BR-007 | FR-013 | US-010, US-011 | Planned effective-date rules | No implementation | TC-013 planned |
| BR-005 | FR-014 | US-012 | Planned receipt snapshot | No implementation | TC-014 planned |
| BR-008 | FR-015 | US-013 | Planned recovery/privacy flow | No implementation | TC-015 planned |
| BR-008 | FR-016 | US-014 | Planned recovery controls | No implementation | TC-016 planned |
| BR-004 | FR-017 | US-015 | Missing-charge interpretation | No implementation | TC-017 planned |

## Evidence limits

Implementation existence is established by reading current source. Previous-turn checks on 2026-09-07 reported a passing integration test, TypeScript check, web export and Android bundle export. This documentation pass does not turn bundle compilation into physical-device validation or a security assessment.

## Maintenance rule

When a feature changes, update its requirement, affected rule, contract, schema and TC row in the same change. Link the resulting test output or release record. Keep pending cases visible.


## Lifecycle verification

server/tenancies.test.mjs adds five tests for history/replacement and ended-tenant collections, validation/backdated charges, concurrent moves, same-month billing, and populated legacy upgrade/reopen. The original money test remains. Refer to KR-REL-002 for this change's final checks.

## References

- [KR-TST-001 — Test Strategy and Acceptance Plan](../10-Testing/KR-TST-001-Test-Strategy-and-Acceptance-Plan.md)
- [KR-SRS-001 — Software Requirements Specification](KR-SRS-001-Software-Requirements-Specification.md)
- [KR-REL-001 — Initial Local Baseline](../18-Release-Notes/KR-REL-001-Initial-Local-Baseline.md)
