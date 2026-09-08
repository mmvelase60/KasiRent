---
document_id: ADR-003
title: "KasiRent Integer Cent Ledger and Reversals"
version: 0.1.0
status: Draft
classification: Internal
owner: "Engineering"
project: KasiRent
last_updated: 2026-09-07
---

# ADR-003 — Integer Cent Ledger and Reversals

> Historical baseline: tenancy history and versioned upgrades are updated by [ADR-006](../14-ADR/ADR-006-Historical-Tenancies-and-Migrations.md) and [KR-REL-002](../18-Release-Notes/KR-REL-002-Tenancy-Lifecycle.md). Earlier limitations below describe the original version.


## Document control

| Field | Value |
| --- | --- |
| Document ID | ADR-003 |
| Version / date | 0.1.0 / 2026-09-07 |
| Status | Draft — review pending |
| Owner | Engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Record how amounts and corrections preserve an explainable balance.

## Contents

- [Decision status](#decision-status)
- [Context](#context)
- [Decision](#decision)
- [Alternatives](#alternatives)
- [Consequences](#consequences)
- [Revisit](#revisit)

## Decision status

**Recorded existing implementation; review pending.**

## Context

Cash/EFT instalments and entry corrections must not produce floating-point rounding errors or silently erase evidence.

## Decision

Store money as integer cents. Each charge records its month and amount. Active payments reduce the tenancy balance; reversed payments stay stored with reason and timestamp. Use one unique payment ID for replay protection and one tenancy/month unique charge key.

## Alternatives

Floating-point rand values invite rounding ambiguity. Deleting mistaken payments loses history. A full double-entry accounting engine is beyond the present rent-only workflow.

## Consequences

Simple explainable arithmetic supports instalments and credits. It does not allocate payments to invoices, reconcile bank statements, refund money or manage deposits. There is no charge-adjustment entity. Parallel request responses and historical occupancy remain gaps.

## Revisit

Before fees, deposits, effective-dated rent or opening balances, define distinct transactions and correction rules. Preserve historical sums with migrations and tests rather than overwriting amounts.


## References

- [KR-DOM-005 — Business Rules Catalogue](../04-Domain/KR-DOM-005-Business-Rules-Catalogue.md)
- [KR-DDS-001 — Database Design Specification](../05-Database/KR-DDS-001-Database-Design-Specification.md)
