---
document_id: ADR-006
title: "Historical Tenancies and Versioned Migrations"
version: 0.2.0
status: Draft
classification: Internal
owner: Engineering
project: KasiRent
last_updated: 2026-09-08
---

# ADR-006 — Historical Tenancies and Versioned Migrations

## Decision status

Recorded implementation; review pending. Version 0.2.0, 2026-09-08.

## Context

The original UNIQUE(room_id) allowed only one tenancy ever per room. Replacing or deleting that row would lose the distinction between renters and their financial histories. Existing data must survive an upgrade.

## Decision

Keep each tenancy permanently linked to its original ledger. Add inclusive start/last-occupied dates and a one-time move-out reason/timestamp. Restrict active occupancy with a partial unique index. Lock the owned room while checking interval overlap and recording moves. Coordinate charging with those same room locks.

Introduce a version registry and transactional SQL migration. Backfill old first-of-month dates explicitly as estimated. Keep start_month for compatibility. Do not alter historical charge/payment amounts.

## Alternatives

Deleting prior renters loses traceability. Keeping lifetime uniqueness blocks ordinary turnover. Month-only dates would prevent a dated handover. Automatically prorating rent introduces policy and rounding decisions beyond this change.

## Consequences

Former renters and unpaid balances remain accessible. Replacement dates cannot overlap. Full-month billing remains explicit; an intra-month handover can produce two full charges. Backdating before posted later charges is blocked, and saved end records cannot be overwritten. A future correction workflow needs its own audited design.

The migration runner currently registers one explicit migration; subsequent upgrades must be appended to its ordered registry. External PostgreSQL concurrency still needs independent integration testing. Existing ADRs remain historical context; this record updates their occupancy/migration limitations.

## References

- [Lifecycle implementation](../08-Backend/KR-BCK-002-Tenancy-Lifecycle.md)
- [Database design](../05-Database/KR-DDS-001-Database-Design-Specification.md)
- [Storage decision](ADR-002-PostgreSQL-with-Embedded-Local-Mode.md)
