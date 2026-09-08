---
document_id: KR-DOM-005
title: "KasiRent Business Rules Catalogue"
version: 0.2.0
status: Draft
classification: Internal
owner: "Product owner and engineering"
project: KasiRent
last_updated: 2026-09-08
---

# KR-DOM-005 — Business Rules Catalogue

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-DOM-005 |
| Version / date | 0.2.0 / 2026-09-08 |
| Status | Draft — review pending |
| Owner | Product owner and engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.2.0 | 2026-09-08 | Tenancy lifecycle, migration and current verification. |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

State the implemented rules and their important limitations.

## Implemented rules

| ID | Rule | Enforcement / limitation |
| --- | --- | --- |
| RULE-001 | Authenticated access requires an unexpired session | Token hash lookup; expires > now; logout deletes the session |
| RULE-002 | Each supported relationship write must reference an owned parent | Property, room, tenancy and reversal lookups include owner |
| RULE-003 | Room names are unique within a property | Database UNIQUE(property_id,name); case-sensitive database behaviour |
| RULE-004 | A room has at most one active tenancy; historical occupants remain | Partial unique index; room locks and date-overlap checks |
| RULE-005 | A tenancy receives at most one charge for a selected month and must have started by that month | Unique tenancy/month; selected month must fall within start/end months; due_day does not gate charging |
| RULE-006 | Rent/payment API amounts are positive integer cents up to 100,000,000; received date must be real and not future UTC | Zod; database positive payment/rent checks; payment cannot be negative |
| RULE-007 | Identical sequential payment ID/payload returns the stored row; changed payload conflicts | ID, owner, tenancy, amount, method, paid_on and reference are compared |
| RULE-008 | A payment can be reversed only while active and only by its owner | Conditional update sets reason and time; no unreverse endpoint |
| RULE-009 | Balance equals charges less non-reversed payments | Derived in client; credits allowed; no allocation to individual months |
| RULE-010 | Receipt is generated for an active payment exposed by the UI | Client-only text; previously shared files are not recalled |
| RULE-011 | Sample data is read-only and is not stored in account tables | Client state and save guard |
| RULE-012 | Due day is 1–28 and monthly rent is fixed on current tenancy | API/database checks; no proration or late-fee engine |

## Worked ledger

| Action | Charges total | Active payments | Balance |
| --- | --- | --- | --- |
| Charge January rent | R1,500 | R0 | R1,500 |
| Receive instalment | R1,500 | R1,000 | R500 |
| Receive final instalment | R1,500 | R1,500 | R0 |
| Reverse final entry | R1,500 | R1,000 | R500 |
| Receive corrected R700 | R1,500 | R1,700 | -R200 credit |
| Add February charge | R3,000 | R1,700 | R1,300 |

The sequence illustrates intended arithmetic supported by the data model. Not every row is covered by the current automated test.

## Proposed policy decisions

Proration, rent increases, overpayment refunds, deposits, utility charges, fees and opening arrears require explicit rules. There is no automatic penalty, eviction action or financial collection process. The database permits a zero charge, but the current route only copies positive tenancy rent; that distinction matters for future adjustment design.


## RULE-013 — Move-out

The last occupied date must be real, not before move-in and not later than today in South Africa. A reason is required. Ending cannot discard charges or payments; a date before an existing later charge month is rejected. Matching retries return the same record; end details cannot be overwritten. Former renters can still pay their own balances. Start/end months receive full rent, including two distinct tenants handing over within one month; no automatic proration occurs.

## References

- [KR-SRS-001 — Software Requirements Specification](../02-Requirements/KR-SRS-001-Software-Requirements-Specification.md)
- [KR-DOM-007 — Business Process Catalogue](KR-DOM-007-Business-Process-Catalogue.md)
