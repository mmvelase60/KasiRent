---
document_id: KR-USR-001
title: "KasiRent User Stories and Acceptance Criteria"
version: 0.2.0
status: Draft
classification: Internal
owner: "Product owner"
project: KasiRent
last_updated: 2026-09-08
---

# KR-USR-001 — User Stories and Acceptance Criteria

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-USR-001 |
| Version / date | 0.2.0 / 2026-09-08 |
| Status | Draft — review pending |
| Owner | Product owner |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.2.0 | 2026-09-08 | Tenancy lifecycle, migration and current verification. |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Provide implementable stories for the baseline and next release.

## Baseline stories

| ID | Story | Acceptance criteria | Requirement |
| --- | --- | --- | --- |
| US-001 | As a landlord I want private records | Given two accounts, when B uses A's room or tenancy ID, the write fails and A's records remain unchanged | FR-002 |
| US-002 | As a landlord I want a room inventory | Given a property, when I add Room 01 twice, only one room with that name exists in that property | FR-003 |
| US-003 | As a landlord I want rent terms on a tenancy | Given an available room, when I save valid terms, its renter appears and the room is occupied | FR-004 |
| US-004 | As a landlord I want monthly charges once | Given a tenancy starting January, two January charge requests result in one charge | FR-005 |
| US-005 | As a landlord I want instalments reflected | Given R1,500 charged and R1,000 received, balance is R500 | FR-006, FR-009 |
| US-006 | As a landlord I want safe retries | Given an accepted payment, an identical repeated ID returns that payment without a new row | FR-007 |
| US-007 | As a landlord I want to correct mistakes | Given a recorded payment, reversal requires a reason, preserves history and recalculates balance | FR-008 |
| US-008 | As a landlord I want evidence to give a renter | Given an active payment, receipt contains parties, room/address, amount, date and purpose | FR-010 |

## Lifecycle and remaining pilot stories

| ID | Story | Acceptance criteria | Requirement |
| --- | --- | --- | --- |
| US-009 | As a landlord I want to replace an occupant | Implemented: end tenancy A; create tenancy B after A's last occupied day; preserve A's ledger | FR-012 |
| US-010 | As a landlord I want to increase rent prospectively | New rent from October leaves September charges unchanged and records the effective date | FR-013 |
| US-011 | As a landlord I want to import existing arrears | A dated, explained opening adjustment is distinguishable from a month's rent and reconciles to source records | FR-013 |
| US-012 | As a landlord I want stable receipts | Re-downloading a issued receipt preserves its original details; a correction is separately identified | FR-014 |
| US-013 | As a landlord I want account recovery | Verified recovery grants account access without exposing a password or another owner's data | FR-015 |
| US-014 | As an operator I want recoverable records | Restore isolated backup and reproduce balances and ownership relationships | FR-016 |
| US-015 | As a landlord I want missing rent flagged | A current eligible month without a charge is labelled uncharged, not paid | FR-017 |

## Story readiness

Before implementation, agree edge cases, record ownership, failure responses and migration effects. For financial changes include before/after cent examples. A story is complete only when the relevant contract, tests and documentation match the behaviour. “Planned” is not an implementation commitment without an implementation and acceptance record.


## References

- [KR-SRS-001 — Software Requirements Specification](KR-SRS-001-Software-Requirements-Specification.md)
- [KR-RTM-001 — Requirements Traceability Matrix](KR-RTM-001-Requirements-Traceability-Matrix.md)
