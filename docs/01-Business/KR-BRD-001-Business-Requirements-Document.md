---
document_id: KR-BRD-001
title: "KasiRent Business Requirements Document"
version: 0.4.0
status: Draft
classification: Internal
owner: "Product owner"
project: KasiRent
last_updated: 2026-09-08
---

# KR-BRD-001 — Business Requirements Document

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-BRD-001 |
| Version / date | 0.4.0 / 2026-09-08 |
| Status | Draft — review pending |
| Owner | Product owner |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.2.0 | 2026-09-08 | Tenancy lifecycle, migration and current verification. |
| 0.3.0 | 2026-09-08 | Align with effective-month rent changes. |
| 0.4.0 | 2026-09-08 | Add opening balances and correction rules. |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Translate the product purpose into business capabilities and outcomes.

## Scope and actors

The baseline actor is the landlord account holder. A renter is the person occupying a room; the landlord workspace is the security boundary. Do not confuse these two meanings of “tenant.”

| ID | Business requirement | Priority | Acceptance outcome |
| --- | --- | --- | --- |
| BR-001 | Keep each landlord's records separate | Must | Owner B cannot read or modify Owner A's linked records |
| BR-002 | Maintain a property and room inventory | Must | Each room belongs to one owned property and can be assigned |
| BR-003 | Connect rent terms to an occupant | Must | A tenancy records renter, room, monthly amount, due day and start month |
| BR-004 | Show explainable rental balances | Must | Every displayed balance is reproducible from charges and active payments |
| BR-005 | Record received funds and provide evidence | Must | Amount, date, method and receipt identify the payment |
| BR-006 | Correct entry mistakes without erasing history | Must | Reversal has a reason; original entry remains |
| BR-007 | Continue safely across rental cycles | Must for pilot | Tenant changes, rent changes and opening balances preserve history |
| BR-008 | Recover and safeguard operational data | Must for pilot | Account recovery and backup restoration are tested |
| BR-009 | Reduce repeated admin | Later | Reminders or maintenance tasks have measurable user value |

## Measures and boundaries

BR-001 through BR-006 have at least a prototype implementation; some acceptance evidence remains manual or incomplete. BR-007 has local implementation for move-out/replacement, rent changes and opening balances; pilot validation remains pending. BR-008 remains incomplete. BR-009 is future scope.

Business reports currently mean collected rent for the current UTC month, total positive balances and occupied-room count. They do not mean profit, bank reconciliation, overdue-only debt, tax reports or occupancy over time.

## Commercial and operational assumptions

The landlord confirms receipt of funds before entry. The software does not verify bank transactions. Historical data needs a controlled import or manual reconciliation. One active tenancy per room is enforced; ended tenancies and their ledgers remain accessible.

## Acceptance of scope changes

For deposits, utilities, fees, refunds, shared staff accounts or tenant access, first specify accounting treatment, permissions, history and acceptance examples. A payment reversal changes the ledger only; it is not a cash refund.

An agreed release must identify which requirements it satisfies and which remain deferred. Pricing and marketing claims require separate evidence.


## References

- [KR-SRS-001 — Software Requirements Specification](../02-Requirements/KR-SRS-001-Software-Requirements-Specification.md)
- [KR-RTM-001 — Requirements Traceability Matrix](../02-Requirements/KR-RTM-001-Requirements-Traceability-Matrix.md)
- [KR-DOM-005 — Business Rules Catalogue](../04-Domain/KR-DOM-005-Business-Rules-Catalogue.md)
