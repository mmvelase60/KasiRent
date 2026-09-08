---
document_id: KR-DOM-010
title: "KasiRent Automation and AI Scope"
version: 0.1.0
status: Draft
classification: Internal
owner: "Product owner and engineering"
project: KasiRent
last_updated: 2026-09-07
---

# KR-DOM-010 — Automation and AI Scope

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-DOM-010 |
| Version / date | 0.1.0 / 2026-09-07 |
| Status | Draft — review pending |
| Owner | Product owner and engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Set boundaries for future automation without inventing an AI subsystem.

## Current position

KasiRent has no AI integration, model, provider, prompt store or AI credentials. The core ledger must remain deterministic and explainable. This document fills the strategic slot used by TaxiSphere's AI domain document while adapting it to KasiRent's actual needs.

## Potential automation

| Candidate | Value hypothesis | Prerequisites |
| --- | --- | --- |
| Monthly charge scheduler | Fewer missed months | Effective dates, missing-charge handling, retry-safe job records |
| Rent reminders | Less repetitive follow-up | Contact preferences, approved wording, delivery tracking |
| Bank reconciliation assistance | Faster payment matching | Authorized bank/provider integration and human confirmation |
| Maintenance categorization | Easier triage | Actual ticket volume and privacy review |
| Translation assistance | More accessible communication | User-requested languages and reviewed terminology |

## Limits

An uploaded proof of payment must not become a confirmed payment solely through OCR or a model's interpretation. No automated eviction advice, tenant blacklisting, credit decisions or fabricated receipt details belong in the current product scope.

If AI is later justified, document the data sent, purpose, provider, cost, retention and evaluation set. A human must confirm any suggestion that changes financial records. Require measured benefit over a simpler rule-based solution.

## Decision

Defer AI implementation. Prioritize historical tenancies, accurate ledgers and recovery. Any future AI feature needs a distinct requirement and ADR rather than inheriting TaxiSphere's transport-specific strategy.


## References

- [KR-VSN-001 — Product Vision and Strategy](../01-Business/KR-VSN-001-Product-Vision-and-Strategy.md)
- [KR-DOM-006 — Domain Events Catalogue](KR-DOM-006-Domain-Events-Catalogue.md)
- [ADR-005 — Defer Integrations and Event Infrastructure](../14-ADR/ADR-005-Defer-Integrations-and-Event-Infrastructure.md)
