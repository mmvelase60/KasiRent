---
document_id: ADR-002
title: "KasiRent PostgreSQL with Embedded Local Mode"
version: 0.1.0
status: Draft
classification: Internal
owner: "Engineering"
project: KasiRent
last_updated: 2026-09-07
---

# ADR-002 — PostgreSQL with Embedded Local Mode

> Historical baseline: tenancy history and versioned upgrades are updated by [ADR-006](../14-ADR/ADR-006-Historical-Tenancies-and-Migrations.md) and [KR-REL-002](../18-Release-Notes/KR-REL-002-Tenancy-Lifecycle.md). Earlier limitations below describe the original version.


## Document control

| Field | Value |
| --- | --- |
| Document ID | ADR-002 |
| Version / date | 0.1.0 / 2026-09-07 |
| Status | Draft — review pending |
| Owner | Engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Record storage choices and the boundary between development and hosting.

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

A PostgreSQL server was not running on the development computer. The first workflow needed durable local records and real relational constraints without requiring Docker setup.

## Decision

Use PGlite for local embedded PostgreSQL storage, and node-postgres when DATABASE_URL is configured. Keep one SQL schema and parameterized query style. Store local records under ignored data/postgres.

## Alternatives

SQLite would diverge from the requested database direction. Requiring Docker before any use would delay local testing. A hosted database would require provider and secret configuration that has not been agreed.

## Consequences

Local development is self-contained, but external PostgreSQL operation is not yet proven by this test suite. Only one local process should open the embedded directory. Schema bootstrap is not migration management. No automated embedded-to-server transfer or restore verification exists.

## Revisit

Before hosted use, select a PostgreSQL service, establish versioned migrations, import/reconciliation and restore evidence. Do not present changing DATABASE_URL as moving existing data.


## References

- [KR-DDS-001 — Database Design Specification](../05-Database/KR-DDS-001-Database-Design-Specification.md)
- [KR-OPS-001 — Local Operations and Recovery Guide](../11-Operations/KR-OPS-001-Local-Operations-and-Recovery-Guide.md)
