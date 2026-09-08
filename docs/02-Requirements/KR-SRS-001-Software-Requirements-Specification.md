---
document_id: KR-SRS-001
title: "KasiRent Software Requirements Specification"
version: 0.3.0
status: Draft
classification: Internal
owner: "Engineering"
project: KasiRent
last_updated: 2026-09-08
---

# KR-SRS-001 — Software Requirements Specification

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-SRS-001 |
| Version / date | 0.3.0 / 2026-09-08 |
| Status | Draft — review pending |
| Owner | Engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.2.0 | 2026-09-08 | Tenancy lifecycle, migration and current verification. |
| 0.3.0 | 2026-09-08 | Align with effective-month rent changes. |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Specify functional behaviour and measurable release requirements.

## Contents

- [Functional baseline](#functional-baseline)
- [Acceptance examples](#acceptance-examples)
- [Non-functional requirements](#non-functional-requirements)
- [Input rules and limits](#input-rules-and-limits)
- [Exclusions](#exclusions)

## Functional baseline

| ID | Requirement | State |
| --- | --- | --- |
| FR-001 | Register, sign in, expire sessions after seven days and revoke on logout | Implemented; expiry/login cases not covered by the present test |
| FR-002 | Scope reads and relationship writes to the authenticated owner | Implemented at API level |
| FR-003 | Create properties and uniquely named rooms within a property | Implemented |
| FR-004 | Assign a renter to a room with positive rent, due day 1–28 and move-in date | Implemented; one active tenancy plus history |
| FR-005 | Explicitly generate one charge per eligible tenancy and selected month | Implemented; no scheduler or proration |
| FR-006 | Record positive integer-cent rent payments with date, method and request UUID | Implemented |
| FR-007 | Return an identical prior payment for a sequential identical retry | Implemented; concurrency response needs improvement |
| FR-008 | Reverse a payment once with a reason and timestamp | Implemented |
| FR-009 | Display balance, collection totals and room occupancy | Implemented in client |
| FR-010 | Generate a rent receipt and share natively or download browser text | Implemented; delivery not verified by automated test |
| FR-011 | Offer read-only sample data isolated from account records | Implemented |
| FR-012 | End tenancies and create subsequent occupancies without history loss | Implemented; migration and API tests |
| FR-013 | Apply effective-dated rent changes and audited opening adjustments | Partial: rent changes implemented; opening adjustments planned |
| FR-014 | Issue immutable, versioned PDF receipts and correction references | Planned |
| FR-015 | Provide verified account recovery and a documented privacy-rights workflow | Planned |
| FR-016 | Export records and restore backups with reconciliation evidence | Planned |
| FR-017 | Show missing monthly charges distinctly from fully paid balances | Planned |

## Acceptance examples

For FR-005–FR-009: create a R1,500 charge; receive R1,000; display R500. Receive a further R500; display zero. Reverse the second payment with a reason; display R500 and retain both entries. Repeating the first payment's identical ID/payload must not change totals.

For FR-002: another owner's room, tenancy and payment identifiers must not permit unauthorized writes. Existing reads return only the owner's records. Database foreign keys alone are not authorization.

For FR-017: a new tenancy with no charges must not be presented as evidence of payment. Current zero balance means only that recorded charges equal recorded active payments.

## Non-functional requirements

| ID | Proposed requirement | Validation | Current evidence |
| --- | --- | --- | --- |
| NFR-001 | No cross-owner data access through supported endpoints | Negative API tests for every relationship | Partial coverage |
| NFR-002 | Preserve exact cent arithmetic within supported amount bounds | Partial, full, credit and reversal cases | Partial coverage |
| NFR-003 | A saved payment survives a controlled restart | Restart persistence test | Synthetic legacy payment records survived upgrade/reopen |
| NFR-004 | Core screens work at 360px width and with text scaling | Physical-device and accessibility review | Not recorded |
| NFR-005 | On 30 rooms / 1,000 payments, state fetch p95 under 2s on a documented test network | Reproducible load test | Target only |
| NFR-006 | Every money-changing action has traceable history | Audit and correction review | Payment reversals only |
| NFR-007 | Restore within agreed RTO and RPO | Isolated recovery exercise | Targets not agreed |
| NFR-008 | Public access uses HTTPS and approved data handling | Deployment/security review | Not deployed |

## Input rules and limits

Amounts use rand in the UI and cents in the API. API amount range is 1–100,000,000 cents. Names/addresses are trimmed, 1–200 characters. Passwords are 10–128 characters. Month format is YYYY-MM. Payment dates must be valid calendar dates and no later than today's UTC date. Future charge months use the South African business month and are rejected. Move dates are real dates from 1900 through today in Africa/Johannesburg. These are actual prototype rules; calendar alignment and policy limits require review.

## Exclusions

No user-role hierarchy, tenancy editing, account deletion endpoint, proof upload, lease generation, maintenance, bank integration, receipt table, automated charging or offline synchronization exists.


## References

- [KR-ADS-001 — API Design Specification](../06-API/KR-ADS-001-API-Design-Specification.md)
- [KR-DOM-005 — Business Rules Catalogue](../04-Domain/KR-DOM-005-Business-Rules-Catalogue.md)
- [KR-TST-001 — Test Strategy and Acceptance Plan](../10-Testing/KR-TST-001-Test-Strategy-and-Acceptance-Plan.md)
