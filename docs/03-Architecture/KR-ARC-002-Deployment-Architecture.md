---
document_id: KR-ARC-002
title: "KasiRent Deployment Architecture"
version: 0.1.0
status: Draft
classification: Internal
owner: "Engineering"
project: KasiRent
last_updated: 2026-09-07
---

# KR-ARC-002 — Deployment Architecture

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-ARC-002 |
| Version / date | 0.1.0 / 2026-09-07 |
| Status | Draft — review pending |
| Owner | Engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Separate the running local layout from the proposed hosted design.

## Current local layout

One developer computer runs the API, embedded database and optional preview. Runtime records are under data/postgres and excluded from version control. The exported browser bundle contains its API base URL. Changing EXPO_PUBLIC_API_URL requires rebuilding or restarting the Expo environment.

No cloud resources, custom domain, reverse proxy, TLS certificate, CI pipeline or app-store release have been created.

## Proposed hosted layout

A release candidate would use an HTTPS client origin, HTTPS API, managed PostgreSQL with restricted credentials, secret storage and protected backups. Choose a provider only after comparing costs, region, recovery features and operational workload. An app build should contain the intended API URL but no database credentials.

PGlite is a local-development convenience; do not place its data folder on an ephemeral hosted filesystem and assume it is durable. Moving local data to PostgreSQL requires an explicit export/import and reconciliation path that is not implemented.

## Release boundaries

Use separate development, staging and production databases. Staging uses synthetic records. Run schema migrations before enabling incompatible application changes. A rollback must account for database compatibility, not only restoring an older client bundle.

Public hosting remains gated by KR-DEP-001. Android bundle export proves compilation; it does not produce a signed installable APK or prove device behaviour. iOS export/device testing has not been recorded.


## References

- [KR-DEP-001 — Deployment and Release Readiness](../12-Deployment/KR-DEP-001-Deployment-and-Release-Readiness.md)
- [KR-OPS-001 — Local Operations and Recovery Guide](../11-Operations/KR-OPS-001-Local-Operations-and-Recovery-Guide.md)
- [ADR-002 — PostgreSQL with Embedded Local Mode](../14-ADR/ADR-002-PostgreSQL-with-Embedded-Local-Mode.md)
