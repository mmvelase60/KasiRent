---
document_id: KR-DOM-009
title: "KasiRent Domain Ownership Matrix"
version: 0.2.0
status: Draft
classification: Internal
owner: "Engineering"
project: KasiRent
last_updated: 2026-09-08
---

# KR-DOM-009 — Domain Ownership Matrix

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-DOM-009 |
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

Assign data and business responsibility during refactoring.

## Ownership matrix

| Data or contract | Logical owner | Current implementation | Consumers |
| --- | --- | --- | --- |
| accounts, sessions | Identity | app.mjs authentication | Every protected route |
| properties, rooms | Inventory | app.mjs inventory routes | Occupancy, UI |
| tenancies | Occupancy | tenancies.mjs move-in/out routes | Charges, payments, UI |
| charges | Rent ledger | tenancies.mjs charge transaction | Client balances |
| payments and reversal fields | Rent ledger | app.mjs payment routes | Balances and receipts |
| Receipt wording/delivery | Presentation today; ledger issuance proposed | Main.tsx, shareReceipt.ts | Landlord/renter |
| State snapshot | Application query layer | GET /state | All client tabs |
| Schema bootstrap | Persistence | db.mjs, schema.sql, migrations/001-tenancy-lifecycle.sql | API startup |
| Backup/restore | Operations responsibility | Procedure only | Whole system |

## Change responsibility

The product owner confirms rental policy; engineering owns contract and storage changes. Neither role should edit balances directly in a database to bypass the correction model. There is no support-admin role in the current app.

The account owner remains the authorization boundary across all contexts. A logical module boundary does not replace security checks. Future staff access needs memberships and permissions, not shared credentials.

## Cross-context changes

A tenancy-history change touches inventory availability, rent eligibility, dashboard counts and receipt context. A receipt-snapshot change touches payment creation, privacy retention and delivery. Update the affected matrix, ADR, migration and traceability rows together.


## References

- [KR-DOM-002 — Bounded Context Map](KR-DOM-002-Bounded-Context-Map.md)
- [KR-DDS-001 — Database Design Specification](../05-Database/KR-DDS-001-Database-Design-Specification.md)
- [KR-RTM-001 — Requirements Traceability Matrix](../02-Requirements/KR-RTM-001-Requirements-Traceability-Matrix.md)
