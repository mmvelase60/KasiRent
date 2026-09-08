---
document_id: KR-BCK-001
title: "KasiRent Backend Foundation"
version: 0.2.0
status: Draft
classification: Internal
owner: "Engineering"
project: KasiRent
last_updated: 2026-09-08
---

# KR-BCK-001 — Backend Foundation

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-BCK-001 |
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

Explain the code organization and the next maintainable backend boundaries.

## Runtime

server/index.mjs opens the database then starts Express. server/db.mjs chooses pg when DATABASE_URL is set and PGlite otherwise. It creates the local directory recursively and bootstraps the schema statement by statement. A failed bootstrap prevents normal startup.

server/app.mjs constructs an injectable Express app. Its database dependency exposes query(sql,args), enabling the same integration flow against PGlite and an external driver. The query helper returns result.rows.

## Request flow

JSON parsing → CORS/cache headers → public auth route → session middleware → protected route → error handler.

Auth uses salted scrypt password hashes and 32-byte random tokens. Session lookup hashes the presented token with SHA-256. SQL values are parameterized. Table names in the state route come from a fixed internal list, not request input.

## Source-level limitations

Registration/session creation and state reads remain nontransactional. server/transaction.mjs supports PGlite transactions and pinned pg clients; migration, tenancy changes and monthly batches now use it. Payment replay is a lookup followed by insert, with uniqueness as the final duplicate guard. Generic errors are logged directly; production redaction and structured logging are absent.

The backend uses JavaScript ES modules, not TypeScript. Zod provides runtime input validation; no generated shared API types exist. The UI uses broad Row types. There is no scheduled cleanup of expired sessions or per-IP limiter keys.

## Refactoring order

1. Extract validation schemas and data-access functions without changing endpoint contracts.
2. Extract identity and rent-ledger services and pure balance calculations.
3. Extend the versioned migration framework for subsequent schema changes.
4. Add transaction-aware workflows, paging and structured error codes.
5. Add audit and operational instrumentation with redaction.

Every step should preserve existing money and ownership tests. Do not introduce NestJS or queues merely because an earlier concept note mentioned them.


## References

- [KR-SAD-001 — Software Architecture Document](../03-Architecture/KR-SAD-001-Software-Architecture-Document.md)
- [KR-ADS-001 — API Design Specification](../06-API/KR-ADS-001-API-Design-Specification.md)
- [KR-ENG-001 — Engineering Handbook](../13-Engineering-Handbook/KR-ENG-001-Engineering-Handbook.md)
