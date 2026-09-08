---
document_id: KR-RSK-001
title: "KasiRent Risk and Decision Register"
version: 0.2.0
status: Draft
classification: Internal
owner: "Product owner and engineering"
project: KasiRent
last_updated: 2026-09-08
---

# KR-RSK-001 — Risk and Decision Register

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-RSK-001 |
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

Track material gaps and the decisions needed before pilot use.

## Scope and rating

This register covers observed limitations and product uncertainties as of the baseline date. High impact means exposure of personal information, incorrect financial records or inability to recover records. Owners are responsibilities to assign, not named appointments.

| ID | Risk or decision | Impact | Present evidence | Next action / owner |
| --- | --- | --- | --- | --- |
| R-001 | Another landlord's records become accessible | High | API owner filters exist; no database row-level security | Extend negative tests to every relationship; engineering |
| R-002 | History overwritten during tenant change | High | Dated move-outs and replacement tenancies preserve ledgers | Implemented and tested; continue monitoring date/correction edge cases |
| R-003 | Missing rent appears settled | High | Only explicitly charged months contribute to balance | Add missing-charge indicators; product + engineering |
| R-004 | Disk loss or failed restore | High | Local data directory, no backup job or restore test | Define and rehearse backups; operations responsibility |
| R-005 | Incorrect shared receipt cannot be recalled | High | Client-generated text, no immutable receipt snapshot | Version receipts and corrections; engineering |
| R-006 | Account recovery fails | High | No password reset or verified email | Build tested recovery before broader pilot |
| R-007 | Public API lacks hardened controls | High | Wildcard CORS; in-process throttling; HTTP locally | Apply deployment and security gates |
| R-008 | Monthly batch partially completes | Medium | Monthly batch now uses a transaction and room locks | Addressed by lifecycle change; retain regression coverage |
| R-009 | Parallel payment retries return a conflict | Medium | SELECT then INSERT; primary key prevents duplicates | Test concurrent calls and standardize replay response |
| R-010 | Privacy duties unclear | High | No privacy notice, retention or rights workflow | Assign responsible roles and complete compliance review |
| R-011 | Adoption or pricing assumption wrong | Medium | Founder experience; no recorded paying customers | Observe pilot retention; test price without revenue claims |
| R-012 | Full-state response grows too large | Medium | No paging; all owner records loaded | Measure and introduce paginated history |
| R-013 | Date boundary differs from South African business day | Medium | ISO UTC slices drive current month/date validation | Define Africa/Johannesburg accounting dates and test boundaries |
| R-014 | Importing data silently loses history | High | No data import or opening-balance workflow | Reconcile an explicit migration report; never reconstruct from totals alone |
| R-015 | Schema changes fail on an existing database | High | Versioned transactional migration added and tested on legacy records | Rehearse future upgrades against representative data |

## Decision queue

| ID | Question | Proposed position | Status |
| --- | --- | --- | --- |
| D-001 | How are tenancy changes represented? | End old tenancy, create a new record | Implemented; see ADR-006 |
| D-002 | How is imported arrears represented? | Separate audited opening adjustment, dated and explained | Open |
| D-003 | What is the first paid plan? | Test a simple room-count subscription | Open; no billing implemented |
| D-004 | Which host and database service? | Choose after operating costs and recovery needs are known | Open |
| D-005 | Are deposits part of the pilot? | Keep separate from rent; design only after review | Open |
| D-006 | What are retention and recovery targets? | Document per data category and validate with reviewers | Open |

Review high-impact items before every release. A closed item needs evidence and a date; do not close it because a design document exists.


## References

- [KR-SEC-001 — Security Architecture and Threat Model](../09-Security/KR-SEC-001-Security-Architecture-and-Threat-Model.md)
- [KR-OPS-001 — Local Operations and Recovery Guide](../11-Operations/KR-OPS-001-Local-Operations-and-Recovery-Guide.md)
- [KR-TST-001 — Test Strategy and Acceptance Plan](../10-Testing/KR-TST-001-Test-Strategy-and-Acceptance-Plan.md)
