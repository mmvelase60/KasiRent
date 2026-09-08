---
document_id: KR-BCK-002
title: "KasiRent Tenancy Lifecycle"
version: 0.2.0
status: Draft
classification: Internal
owner: Engineering
project: KasiRent
last_updated: 2026-09-08
---

# KR-BCK-002 — Tenancy Lifecycle

## Document control

| Field | Value |
| --- | --- |
| Version / date | 0.2.0 / 2026-09-08 |
| Status | Draft — implementation recorded; review pending |
| Requirement | FR-012 / US-009 / UC-008 / TC-012 |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.2.0 | 2026-09-08 | Dated move-ins, move-outs, retained history and versioned migration. |

## Behaviour

An active tenancy has no end_on. A landlord can record its last occupied day and a reason. This preserves the tenancy, charges and payments; it frees the room for a later occupant. Former tenants remain visible under Former/All and can receive payments against their own balance. Room counts use active tenancies only.

Move-in dates are inclusive. Move-out dates are the final occupied day. A replacement must start strictly after the prior end date, not on the same date. Future moves and dates before 1900 are rejected. Validation uses Africa/Johannesburg's business date.

## HTTP contract

POST /tenancies accepts start_on in YYYY-MM-DD. Legacy start_month remains supported by inferring day one and marking start_date_estimated=true. If both fields are supplied they must agree. Exact new start_on entries are not estimated.

POST /tenancies/:id/end takes end_on and reason. An identical retry returns the same record and ended_at. A differing retry conflicts. Foreign-owner IDs return 404. A move-out before the start date or in the future is rejected.

If later monthly charges already exist, a backdated end before those charge months is rejected. There is no silent deletion or adjustment. Corrections to a saved end date and charge-adjustment workflows remain outside this release.

## Monthly charging

Start and end months are eligible inclusively. Full monthly amounts are used; there is no automatic proration. A January 15 move-out followed by a January 16 move-in results in two separate full January charges if that month is charged. Both entry forms explain this limitation. No future months are charged and ended tenants cannot acquire charges after their end month.

## Storage and concurrency

Migration 001 adds start_on, start_date_estimated, end_on, ended_at and end_reason. Existing month-only starts are backfilled to day one and marked estimated. The lifetime room unique constraint becomes a partial unique index for active tenancies. Date/end-field checks and a room-history index are added.

schema_migrations tracks upgrades. Each upgrade runs transactionally under a registry lock. Move-in, move-out and monthly charging share room locks in transactions. The partial index independently prevents two active records. Date-overlap checks are application rules; direct SQL must not bypass them. Registration and state reads are still outside a shared transaction.

## Verification and limits

The lifecycle tests cover old balances, former-renter collections, cross-owner rejection, overlap/date validation, concurrent moves, replay, same-month charges and a populated legacy database upgraded once and reopened. They use PGlite; standalone PostgreSQL lock behaviour and physical-device acceptance are not claimed by these tests.

## References

- [API contract](../06-API/KR-ADS-001-API-Design-Specification.md)
- [Lifecycle decision](../14-ADR/ADR-006-Historical-Tenancies-and-Migrations.md)
- [Release record](../18-Release-Notes/KR-REL-002-Tenancy-Lifecycle.md)
