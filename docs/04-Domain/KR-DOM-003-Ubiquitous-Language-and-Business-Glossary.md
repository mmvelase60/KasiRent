---
document_id: KR-DOM-003
title: "KasiRent Ubiquitous Language and Business Glossary"
version: 0.1.0
status: Draft
classification: Internal
owner: "Product owner and engineering"
project: KasiRent
last_updated: 2026-09-07
---

# KR-DOM-003 — Ubiquitous Language and Business Glossary

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-DOM-003 |
| Version / date | 0.1.0 / 2026-09-07 |
| Status | Draft — review pending |
| Owner | Product owner and engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Keep rental terms and security terms unambiguous.

## Business language

| Term | KasiRent meaning | Must not imply |
| --- | --- | --- |
| Landlord | Signed-in account holder managing rentals | Verified property owner |
| Workspace / owner boundary | Records associated with accounts.id through owner | A separate organizations table |
| Renter / rental tenant | Person occupying a room | An authenticated app user |
| Tenancy | Link between a renter, room and rent terms | A generated or legally reviewed lease |
| Property | Named location with address and rooms | Verified title deed |
| Room | Individually tracked rental unit | A listing available to the public |
| Charge | Recorded rent obligation for a month | Money received |
| Payment | Landlord-confirmed received amount | Bank-verified transfer |
| Active payment | Payment with no voided_at timestamp | A payment-provider status |
| Reversal | Exclusion of a mistaken payment from totals, retaining reason/history | Refund or money transfer |
| Balance | Sum of recorded charges less active payments | Complete arrears if some months are absent |
| Credit | Negative ledger balance | Automatically refunded money |
| Outstanding | Positive recorded balance | Necessarily overdue under a lease |
| Receipt | Text evidence generated from saved payment/context | An immutable signed document |
| Rental month | YYYY-MM attached to a charge | A payment-to-invoice allocation |
| Opening adjustment | Proposed record of imported balance | An existing feature |
| Sample workspace | Fictional client-only records | Real customers or server seed data |

## Engineering language

**Idempotency** means an identical sequential payment request can be replayed without a second row. The current database key also prevents simultaneous duplicate rows, but all simultaneous retries are not guaranteed to return the same success response.

**PGlite** is the embedded PostgreSQL engine used locally. **PostgreSQL via pg** is the configurable external-server path. **Audit history** currently describes payment reversals only; there is no global audit table.

Use these definitions in forms, APIs and support material. Prefer “workspace” over technical “tenant” when discussing data isolation.


## References

- [KR-DOM-005 — Business Rules Catalogue](KR-DOM-005-Business-Rules-Catalogue.md)
- [KR-DDS-001 — Database Design Specification](../05-Database/KR-DDS-001-Database-Design-Specification.md)
