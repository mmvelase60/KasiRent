---
document_id: KR-SAD-001
title: "KasiRent Software Architecture Document"
version: 0.2.0
status: Draft
classification: Internal
owner: "Engineering"
project: KasiRent
last_updated: 2026-09-08
---

# KR-SAD-001 — Software Architecture Document

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-SAD-001 |
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

Describe the actual system and the direction for its next iteration.

## Contents

- [Current architecture](#current-architecture)
- [Components and responsibilities](#components-and-responsibilities)
- [Runtime and trust](#runtime-and-trust)
- [Consistency and failure modes](#consistency-and-failure-modes)
- [Evolution path](#evolution-path)
- [Architectural limits](#architectural-limits)

## Current architecture

KasiRent is a small monolithic API with a React Native client. Tenancy and monthly-charging routes have been extracted into server/tenancies.mjs. A modular monolith is the intended refactoring direction, not a claim about today's folder structure.

The client uses Expo, React Native and TypeScript. The Express API uses JavaScript ES modules, Zod validation and parameterized SQL. Setting DATABASE_URL selects node-postgres; otherwise PGlite stores embedded PostgreSQL data on disk. There is no NestJS, ORM, queue, object storage or PostGIS dependency.

## Components and responsibilities

| Component | Current location | Responsibility |
| --- | --- | --- |
| App composition / calculations | mobile/src/Main.tsx | Authentication UI, forms, state, balances and receipts |
| Presentation | mobile/src/styles.ts | Responsive layout and colours |
| Receipt delivery | mobile/src/shareReceipt.ts | Native share or browser text download |
| HTTP application | server/app.mjs | Validation, sessions, ownership and SQL |
| Database setup | server/db.mjs; schema.sql | Driver selection and table bootstrap |
| Entry points | server/index.mjs; preview.mjs | API and optional static preview |

## Runtime and trust

The API listens on 0.0.0.0:3001 by default. The static preview listens on loopback:8081. A phone must reach the computer's LAN address; localhost on the phone refers to the phone. Client-visible EXPO_PUBLIC_API_URL is configuration, never a secret.

Authentication creates opaque random tokens. Stored token hashes map to account IDs. Each data query or linked-parent lookup uses the authenticated owner. The client cannot choose another owner in accepted payloads. Database foreign keys are ID-only and do not independently enforce matching owners.

## Consistency and failure modes

Money uses integer cents. Balances are derived in the client from the returned records. State reads are separate queries and not a consistent transactional snapshot. Monthly charging is transactional and coordinates with move-in/out using room locks; uniqueness supports retries. Payment deduplication checks before insert; the primary key prevents duplicate rows but a simultaneous collision can return 409.

## Evolution path

Extract identity, inventory, occupancy and rent-ledger services behind the existing routes. Versioned migration and dated tenancy history now exist. Add server-owned calculation tests and typed API contracts before broadening features. Add a transactional outbox only when an actual event consumer is introduced. No microservice extraction is justified by the present scale.

## Architectural limits

Current code is a local prototype: no public deployment, no operational monitoring, no full audit log, no scheduled processing and no safe import/export migration path. The ADR series records why the present choices were used and where they need replacement.


## References

- [KR-ARC-001 — C4 and Sequence Views](KR-ARC-001-C4-and-Sequence-Views.md)
- [KR-DDS-001 — Database Design Specification](../05-Database/KR-DDS-001-Database-Design-Specification.md)
- [ADR-001 — Single API and React Native Client](../14-ADR/ADR-001-Single-API-and-React-Native-Client.md)
- [ADR-002 — PostgreSQL with Embedded Local Mode](../14-ADR/ADR-002-PostgreSQL-with-Embedded-Local-Mode.md)
