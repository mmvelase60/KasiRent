---
document_id: KR-DEP-001
title: "KasiRent Deployment and Release Readiness"
version: 0.2.0
status: Draft
classification: Internal
owner: "Engineering"
project: KasiRent
last_updated: 2026-09-08
---

# KR-DEP-001 — Deployment and Release Readiness

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-DEP-001 |
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

Define evidence required for a hosted release.

## Contents

- [Current status](#current-status)
- [Proposed release checklist](#proposed-release-checklist)
- [Deployment sequence, proposed](#deployment-sequence-proposed)
- [Rollback](#rollback)
- [Operational targets](#operational-targets)

## Current status

Local application only. Web and Android bundles have been exported; no domain, public server, managed database, app-store package or deployment pipeline has been provisioned. This document is a plan, not a deployment report.

## Proposed release checklist

| Gate | Required evidence | Baseline |
| --- | --- | --- |
| Data model | Versioned migrations on existing records, history-safe tenancies | Implemented/tested in PGlite; standalone PostgreSQL rehearsal pending |
| Authentication | Verified recovery, throttling/proxy design, session handling review | Open |
| Hosting | HTTPS, approved origins, environment separation | Open |
| Database | Restricted credentials, selected region, restore rehearsal | Open |
| Privacy | Data inventory, notice, rights handling and responsible role | Open |
| Observability | Redacted errors, availability monitoring and incident owner | Open |
| Quality | Release-specific ledger/ownership tests and physical-device checks | Partial |
| Client delivery | Correct API URL, signed native distribution if chosen | Open |
| Rollback | Application and database compatibility plan | Open |

## Deployment sequence, proposed

Select a provider and budget; create staging with synthetic data; configure secrets and database; run reviewed migrations; deploy API; build client against staging; run acceptance tests; rehearse backup restore; record release decision. Only then repeat the controlled process for production.

## Rollback

Keep the previous application artifact and a verified database recovery point. Prefer backward-compatible schema changes. Never restore an older database blindly after new payments have been entered; reconcile the intervening records first. A rollback owner and support contact must be assigned before launch.

## Operational targets

Availability, recovery point, recovery time, hosting region and retention are not yet agreed. Do not invent an SLA or say that deployment is “production-ready” because a bundle compiles.


## References

- [KR-ARC-002 — Deployment Architecture](../03-Architecture/KR-ARC-002-Deployment-Architecture.md)
- [KR-SEC-001 — Security Architecture and Threat Model](../09-Security/KR-SEC-001-Security-Architecture-and-Threat-Model.md)
- [KR-OPS-001 — Local Operations and Recovery Guide](../11-Operations/KR-OPS-001-Local-Operations-and-Recovery-Guide.md)
