---
document_id: ADR-001
title: "KasiRent Single API and React Native Client"
version: 0.1.0
status: Draft
classification: Internal
owner: "Engineering"
project: KasiRent
last_updated: 2026-09-07
---

# ADR-001 — Single API and React Native Client

> Historical baseline: tenancy history and versioned upgrades are updated by [ADR-006](../14-ADR/ADR-006-Historical-Tenancies-and-Migrations.md) and [KR-REL-002](../18-Release-Notes/KR-REL-002-Tenancy-Lifecycle.md). Earlier limitations below describe the original version.


## Document control

| Field | Value |
| --- | --- |
| Document ID | ADR-001 |
| Version / date | 0.1.0 / 2026-09-07 |
| Status | Draft — review pending |
| Owner | Engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Record the present application shape and proposed modular evolution.

## Contents

- [Decision status](#decision-status)
- [Context](#context)
- [Decision](#decision)
- [Alternatives](#alternatives)
- [Consequences and revisit trigger](#consequences-and-revisit-trigger)

## Decision status

**Recorded existing implementation; review pending.** This ADR documents the code now present. It does not assert that a formal architecture board approved it.

## Context

The user requested React Native, Node.js and PostgreSQL. A solo-friendly build needs one complete rent workflow without managing independent services.

## Decision

Use one Expo/React Native client with a browser preview and one Express API. Keep logical identity, inventory, occupancy and ledger boundaries, and extract modules as code grows. The present backend is a single application file, not a fully modular implementation.

## Alternatives

Separate microservices increase deployment and distributed-consistency work. NestJS could provide stronger structure but is not installed. A web-only client would not follow the requested mobile direction.

## Consequences and revisit trigger

Fast local iteration and shared client code come with a large UI component and combined API logic. Refactor when tests/contracts can preserve behaviour; split services only for measured scaling or team independence needs. No broker or container orchestration is required by the current baseline.


## References

- [KR-SAD-001 — Software Architecture Document](../03-Architecture/KR-SAD-001-Software-Architecture-Document.md)
- [KR-DOM-002 — Bounded Context Map](../04-Domain/KR-DOM-002-Bounded-Context-Map.md)
