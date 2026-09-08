---
document_id: KR-REL-002
title: "KasiRent Tenancy Lifecycle Release"
version: 0.2.0
status: Draft
classification: Internal
owner: Engineering
project: KasiRent
last_updated: 2026-09-08
---

# KR-REL-002 — Tenancy Lifecycle

## Release scope

Local development milestone, not a public release or signed app-store package. Implements FR-012: dated move-in, record move-out, replace the occupant and retain all prior renter charges/payments. Adds Active/Former/All filters and correct active-room counts. Former balances remain collectible.

## Upgrade

Versioned migration 001 preserves existing business rows, marks inferred legacy start dates, and replaces lifetime room uniqueness with a single-active-tenancy index. Back up the stopped local database before first application. Reverting only the old API source is unsafe: its positional tenancy INSERT no longer matches the new schema. Keep the new API and investigate rather than deleting data.

## Verification

Verified on 2026-09-08: six backend tests passed (the original money workflow and five lifecycle/migration tests), TypeScript noEmit passed, web export passed, and Android Hermes export passed. Browser sample checks confirmed the move-out fields/warning, read-only guard, Active/Former/All filters and empty-filter message. The real local database was backed up to data/backups/before-lifecycle-20260908-042912 before the API successfully applied its migration. No real renter records were changed through browser testing. A successful Android bundle is not a physical-device test. PGlite results do not claim independent hosted PostgreSQL validation.

## Remaining work

No automatic proration, effective-dated rent changes, opening adjustments, end-date correction, PDF receipts, account recovery or public hosting is included. The move-out month is charged in full, and a replacement in the same month receives its own full charge. An end date before already-posted later charge months is rejected without changing history.

## References

- [Lifecycle specification](../08-Backend/KR-BCK-002-Tenancy-Lifecycle.md)
- [Decision record](../14-ADR/ADR-006-Historical-Tenancies-and-Migrations.md)
- [Original baseline — historical](KR-REL-001-Initial-Local-Baseline.md)
