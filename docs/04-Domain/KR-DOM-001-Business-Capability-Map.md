---
document_id: KR-DOM-001
title: "KasiRent Business Capability Map"
version: 0.2.0
status: Draft
classification: Internal
owner: "Product owner and engineering"
project: KasiRent
last_updated: 2026-09-08
---

# KR-DOM-001 — Business Capability Map

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-DOM-001 |
| Version / date | 0.2.0 / 2026-09-08 |
| Status | Draft — review pending |
| Owner | Product owner and engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.2.0 | 2026-09-08 | Tenancy lifecycle, migration and current verification. |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Map the rental business capabilities to current and future product scope.

## Capability map

| Capability | Business outcome | Current state | Next boundary |
| --- | --- | --- | --- |
| Identity and access | A landlord sees their own records | Account + opaque session | Recovery, staff roles and verification |
| Property inventory | Rooms belong to a property | Create properties/rooms | Edit/archive with history protection |
| Occupancy | Associate a renter with a room | Dated move-outs and subsequent tenancies | Date corrections and effective rent changes |
| Rent charging | Establish rent owed | Explicit selected-month charges | Effective dates, adjustments and missing-month checks |
| Payment recording | Reflect funds received | Cash/EFT/bank-deposit entry | Reconciliation without assuming receipt from uploads |
| Corrections | Explain changed balances | Payment reversal with reason | Charge adjustments and complete audit |
| Receipts | Share payment evidence | Client-generated text | Immutable issuance and PDF |
| Reporting | Understand recorded balances | Three dashboard measures | Statements, export and period views |
| Operations | Recover service and records | Manual local startup | Backups, restore, monitoring and support |
| Tenant services | Let renters access their records | Not implemented | Separately permissioned portal |
| Maintenance and documents | Track repairs and evidence | Not implemented | Purpose-limited files and workflow |
| Communications | Reduce manual follow-up | Native receipt sharing only | Reminder consent/preferences and delivery tracking |

## Prioritization

Identity, inventory, occupancy and rent recording are the operational core. Complete their history and recovery gaps before adding a marketplace or communications provider. A feature belongs to a capability because of its business outcome, not merely because a table can be created.

The 1–30 room focus guides usability testing. It is not a database limit or active subscription rule.


## References

- [KR-BRD-001 — Business Requirements Document](../01-Business/KR-BRD-001-Business-Requirements-Document.md)
- [KR-DOM-002 — Bounded Context Map](KR-DOM-002-Bounded-Context-Map.md)
