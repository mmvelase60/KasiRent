---
document_id: KR-DDS-001
title: "KasiRent Database Design Specification"
version: 0.3.0
status: Draft
classification: Internal
owner: "Engineering"
project: KasiRent
last_updated: 2026-09-08
---

# KR-DDS-001 — Database Design Specification

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-DDS-001 |
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

Document the business tables, migration registry and lifecycle constraints.

## Contents

- [Storage baseline](#storage-baseline)
- [Data dictionary](#data-dictionary)
- [Derived information](#derived-information)
- [Indexes and isolation](#indexes-and-isolation)
- [Change and recovery requirements](#change-and-recovery-requirements)

## Storage baseline

Schema source: server/schema.sql. Driver selection: server/db.mjs. PGlite stores local data at data/postgres; DATABASE_URL enables PostgreSQL through pg. Startup executes CREATE TABLE IF NOT EXISTS statements individually. Versioned migrations run transactionally afterward under a schema_migrations table lock. Migration 001 backfills start dates, marks them estimated and replaces lifetime room uniqueness with an active-tenancy index.

## Data dictionary

All columns below are NOT NULL unless marked nullable. IDs are text, even when generated in UUID format.

| Table | Columns | Keys and constraints |
| --- | --- | --- |
| accounts | id text; name text; email text; password text | PK id; UNIQUE email; password contains salt:hash |
| sessions | token text; owner text; expires timestamptz | PK token stores hash; FK owner → accounts |
| properties | id text; owner text; name text; address text | PK id; FK owner |
| rooms | id text; owner text; property_id text; name text | PK id; FK owner/property; UNIQUE(property_id,name) |
| tenancies | id text; owner text; room_id text; name text; phone text; rent integer; due_day integer; start_month text; start_on date; start_date_estimated boolean; end_on date nullable; ended_at timestamptz nullable; end_reason text nullable | PK id; FK owner/room; unique room_id WHERE end_on IS NULL; ordered dates; complete end fields; rent > 0; due_day 1–28 |
| charges | id text; owner text; tenancy_id text; month text; amount integer | PK id; FK owner/tenancy; UNIQUE(tenancy_id,month); amount >= 0 |
| payments | id text; owner text; tenancy_id text; amount integer; method text; paid_on date; reference text; created_at timestamptz; void_reason text nullable; voided_at timestamptz nullable | PK id; FK owner/tenancy; amount > 0; method enum check; created_at defaults now() |

phone and reference may be empty strings but are not nullable. Date/month string format constraints and upper amount bounds are enforced by the API, not comprehensively by the database. There is no constraint requiring void_reason and voided_at to be set together. No cascade-delete rules are declared.

## Derived information

Balance = sum(charges.amount) − sum(payments.amount where voided_at is null). Outstanding is the sum of positive tenancy balances; credits are not netted against other renters' debt. Collected-this-month uses paid_on, not the charge month. Occupied count includes only tenancies with end_on null.

There is no tenant_profiles, receipts, leases, audit_logs, expenses or subscriptions table.

## Indexes and isolation

Primary/unique constraints provide their backing indexes. A room/start date index and partial active-room unique index support occupancy. No general owner indexes are added. Before production, measure owner-filtered queries and add appropriate indexes. Foreign keys validate referenced IDs, not owner consistency. The application supplies that check; row-level security and composite ownership constraints are not present.

## Change and recovery requirements

Migration 001 is applied once via schema_migrations(version, applied_at). It preserves every tenancy, charge and payment. Legacy start_on is the first day of start_month with start_date_estimated=true; new dated entries default false. The API enforces interval overlap under room locks; the database independently enforces one active row. Back up and rehearse migration against populated data. Reconcile counts, owners and cent totals after import.

Do not copy PGlite files into a PostgreSQL server and expect compatibility. No automatic data-transfer command exists. Restoring local data or moving it to hosted storage needs a tested procedure.


## References

- [KR-DOM-004 — Domain Model](../04-Domain/KR-DOM-004-Domain-Model.md)
- [KR-OPS-001 — Local Operations and Recovery Guide](../11-Operations/KR-OPS-001-Local-Operations-and-Recovery-Guide.md)
- [ADR-002 — PostgreSQL with Embedded Local Mode](../14-ADR/ADR-002-PostgreSQL-with-Embedded-Local-Mode.md)
- [ADR-003 — Integer Cent Ledger and Reversals](../14-ADR/ADR-003-Integer-Cent-Ledger-and-Reversals.md)

## Effective-month rent update

Migration 002 adds rent_changes with owner/tenancy references, unique tenancy/effective_month, integer-cent amount, reason and creation time. Starting rent remains on tenancies; existing ledger rows are preserved. See [effective-month rent](../08-Backend/KR-BCK-003-Effective-Month-Rent.md).
