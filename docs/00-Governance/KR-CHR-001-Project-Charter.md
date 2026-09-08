---
document_id: KR-CHR-001
title: "KasiRent Project Charter"
version: 0.3.0
status: Draft
classification: Internal
owner: "Product owner"
project: KasiRent
last_updated: 2026-09-08
---

# KR-CHR-001 — Project Charter

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-CHR-001 |
| Version / date | 0.3.0 / 2026-09-08 |
| Status | Draft — review pending |
| Owner | Product owner |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.2.0 | 2026-09-08 | Tenancy lifecycle, migration and current verification. |
| 0.3.0 | 2026-09-08 | Align with effective-month rent changes. |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Set the purpose, boundaries and delivery gates for KasiRent.

## Contents

- [Purpose and business context](#purpose-and-business-context)
- [Objectives](#objectives)
- [Scope](#scope)
- [Stakeholders and responsibilities](#stakeholders-and-responsibilities)
- [Delivery gates](#delivery-gates)
- [Constraints and open decisions](#constraints-and-open-decisions)

## Purpose and business context

The product owner has previously managed a family rental business. KasiRent turns that operational experience into a system for rooms, renters and rent records. The immediate objective is a dependable landlord workflow; market size and revenue remain unvalidated assumptions.

## Objectives

| ID | Objective | Evidence of success |
| --- | --- | --- |
| OBJ-001 | Know each renter's balance | Charges less active payments can be reproduced from history |
| OBJ-002 | Record payments once | Repeat requests cannot create a second payment with the same ID |
| OBJ-003 | Protect landlord records | Cross-owner access attempts fail in tests |
| OBJ-004 | Support handover and growth | Requirements, models, API and decisions remain linked |
| OBJ-005 | Prepare a usable pilot | Real-device workflow and restore exercise pass before operational reliance |

## Scope

The current baseline covers account registration/sign-in, properties, rooms, historical tenancies with one active occupant per room, explicit monthly charging, rent payments, reversals, text receipts and dashboard totals.

Effective-dated rent is implemented. Remaining pilot improvements cover opening balances, receipt preservation, recovery, backups and privacy operations. Later opportunities include tenant access, maintenance, reminders and documents. Payments go directly to landlords; KasiRent does not transfer or hold money.

## Stakeholders and responsibilities

| Role | Responsibility |
| --- | --- |
| Product owner | Confirms rental rules, workflow and release priorities |
| Landlord | Maintains accurate records and confirms funds were received |
| Renter | Subject of rental records; no app account in the current build |
| Engineering | Implements, tests, documents and operates the software |
| Legal/privacy reviewer, when appointed | Reviews intended public operation and document requirements |

## Delivery gates

1. **Foundation:** current prototype and this documentation pack are reviewable.
2. **Pilot readiness:** historical records, recovery, privacy controls, receipts and device checks meet the acceptance plan.
3. **Controlled pilot:** users complete two rent cycles with reconciled balances and recorded support issues.
4. **Public launch:** hosting, monitoring, backup restoration and access recovery are evidenced.

These are proposed gates, not deadlines or completed approvals. No budget or launch date has been agreed.

## Constraints and open decisions

Use the requested React Native, Node.js and PostgreSQL direction. Keep operations practical for a solo developer. Select hosting, support arrangements, pricing, data retention and deposit scope through explicit decisions. The documentation does not authorize a public launch or assert pilot readiness.


## References

- [KR-VSN-001 — Product Vision and Strategy](../01-Business/KR-VSN-001-Product-Vision-and-Strategy.md)
- [KR-BRD-001 — Business Requirements Document](../01-Business/KR-BRD-001-Business-Requirements-Document.md)
- [KR-RSK-001 — Risk and Decision Register](KR-RSK-001-Risk-and-Decision-Register.md)
