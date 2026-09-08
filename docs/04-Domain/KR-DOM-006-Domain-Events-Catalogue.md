---
document_id: KR-DOM-006
title: "KasiRent Domain Events Catalogue"
version: 0.1.0
status: Draft
classification: Internal
owner: "Engineering"
project: KasiRent
last_updated: 2026-09-07
---

# KR-DOM-006 — Domain Events Catalogue

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-DOM-006 |
| Version / date | 0.1.0 / 2026-09-07 |
| Status | Draft — review pending |
| Owner | Engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Reserve a small event vocabulary for future integrations.

## Status and scope

**Proposed only.** The current API writes rows directly and emits no domain events. This catalogue describes business signals that may be useful when notifications, audit or integrations are actually implemented. It does not claim a broker or reliable event delivery exists.

| Event ID | Name | Source / trigger | Possible consumer |
| --- | --- | --- | --- |
| EVT-001 | LandlordRegistered | Identity; completed account creation | Onboarding |
| EVT-002 | RoomCreated | Inventory; completed room creation | Audit |
| EVT-003 | TenancyStarted | Occupancy; completed tenancy creation | Rent preparation |
| EVT-004 | RentCharged | Ledger; new monthly charge inserted | Statement preparation |
| EVT-005 | RentPaymentRecorded | Ledger; new confirmed payment inserted | Receipt issuance |
| EVT-006 | RentPaymentReversed | Ledger; completed reversal | Correction notice/audit |
| EVT-007 | TenancyEnded | Future occupancy lifecycle | Availability |
| EVT-008 | ReceiptIssued | Future immutable receipt service | Delivery tracking |

## Proposed envelope

Use event_id, event_name, schema_version, occurred_at_utc, owner_id, aggregate_id and correlation_id. Include only the minimum business payload. Do not put passwords, tokens or unrelated renter contact details into events.

## Reliability requirements before implementation

Commit the business row and outbox record in the same database transaction. Publish asynchronously from the outbox. Consumers deduplicate event IDs and tolerate retries. A repeated successful payment request must not create a second event. Partition ordering by the relevant aggregate only where needed.

A reversal event reports a ledger correction; it never means a bank refund happened. Document consent/preferences and delivery failure handling before using events for outbound messages.


## References

- [KR-DOM-002 — Bounded Context Map](KR-DOM-002-Bounded-Context-Map.md)
- [ADR-005 — Defer Integrations and Event Infrastructure](../14-ADR/ADR-005-Defer-Integrations-and-Event-Infrastructure.md)
