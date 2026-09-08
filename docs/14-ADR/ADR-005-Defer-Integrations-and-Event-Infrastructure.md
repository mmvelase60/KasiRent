---
document_id: ADR-005
title: "KasiRent Defer Integrations and Event Infrastructure"
version: 0.1.0
status: Draft
classification: Internal
owner: "Product owner and engineering"
project: KasiRent
last_updated: 2026-09-07
---

# ADR-005 — Defer Integrations and Event Infrastructure

## Document control

| Field | Value |
| --- | --- |
| Document ID | ADR-005 |
| Version / date | 0.1.0 / 2026-09-07 |
| Status | Draft — review pending |
| Owner | Product owner and engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Keep the initial scope focused on recording rent.

## Contents

- [Decision status](#decision-status)
- [Context](#context)
- [Decision](#decision)
- [Consequences](#consequences)
- [Revisit criteria](#revisit-criteria)

## Decision status

**Proposed direction, consistent with the current implementation.**

## Context

An earlier concept included reminders, uploads, payment gateways and many extra modules. Each adds operational responsibilities before the core rental history is complete.

## Decision

Keep payments outside the app and record confirmed funds. Defer queues, event publication, AI, marketplaces and provider integrations until a specific accepted story requires them. Maintain a proposed event vocabulary without representing it as running infrastructure.

## Consequences

The app cannot verify transfers, deliver automated reminders or process refunds. Native receipt sharing remains a user action. Engineering effort can first address tenancy history, accurate month completeness, recovery and stable receipts.

## Revisit criteria

Introduce a capability when user demand is observed, costs and permissions are understood, acceptance tests exist and a named operational responsibility can support it. For event delivery, design transaction/outbox and consumer deduplication before announcing reliability.


## References

- [KR-DOM-006 — Domain Events Catalogue](../04-Domain/KR-DOM-006-Domain-Events-Catalogue.md)
- [KR-DOM-010 — Automation and AI Scope](../04-Domain/KR-DOM-010-Automation-and-AI-Scope.md)
- [KR-VSN-001 — Product Vision and Strategy](../01-Business/KR-VSN-001-Product-Vision-and-Strategy.md)
