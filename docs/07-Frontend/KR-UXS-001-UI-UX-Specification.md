---
document_id: KR-UXS-001
title: "KasiRent UI UX Specification"
version: 0.3.0
status: Draft
classification: Internal
owner: "Product owner and engineering"
project: KasiRent
last_updated: 2026-09-08
---

# KR-UXS-001 — UI UX Specification

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-UXS-001 |
| Version / date | 0.3.0 / 2026-09-08 |
| Status | Draft — review pending |
| Owner | Product owner and engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.2.0 | 2026-09-08 | Tenancy lifecycle, migration and current verification. |
| 0.3.0 | 2026-09-08 | Align with effective-month rent changes. |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Document the current screens, interaction rules and usability gaps.

## Screen map

| Screen | Primary task | Main actions |
| --- | --- | --- |
| Account entry | Create account or sign in | Register, switch to login, sample mode |
| Overview | Understand recorded rent | Record payment, charge month, open renter history |
| Rooms | Manage inventory | Add property, add room, assign tenant |
| Tenants | Locate renter | Search name, Active/Former/All filters, view balance/history, add tenant |
| Tenant detail | Explain balance | View charges/payments, record payment, obtain receipt |
| Payments | Review received funds | Receipt, reverse with reason |
| Modal forms | Enter one record | Save or cancel; validation messages |

Above 850px width, navigation is a side panel. At smaller widths it is a horizontal tab strip. Layout, content and forms use React Native primitives. There is no separate web dashboard implementation.

## Interaction rules

A save awaits its API response then refreshes state. A failed request displays an error; there is no offline queue. If refresh fails after a successful save, users must inspect history before retrying with a new payment ID. Busy state disables modal saves but is not a complete concurrency control.

Money input accepts digits and at most two decimal places. Dates are text fields using YYYY-MM-DD and month fields YYYY-MM. Phone entry is optional. Sample mode exposes fictional records and prevents saves; exiting it clears sample state.

Native receipt action opens the share sheet; browser receipt action downloads KasiRent-receipt.txt. Opening a share sheet does not prove the renter received it.

## Presentation

Use forest green primary actions, pale neutral backgrounds and clear numeric totals. Status must be expressed in words as well as colour. Text fields have labels; buttons expose button semantics. Current examples use English and rand formatting only.

## Known usability work

A zero balance with no charges can be labelled Settled; FR-017 must correct this interpretation. Missing-charge visibility, keyboard date input guidance, larger text, long renter names, small-screen forms, keyboard avoidance and screen-reader focus require device review.

Add privacy information, verified recovery and explanatory receipt correction wording before a broader pilot. Do not describe the app as offline-first or multilingual until those flows exist and are tested.


## Tenancy lifecycle screens

Tenant detail shows move-in and status. Migrated month-only starts are labelled estimated. Active tenants offer Record move-out, requiring last occupied day and reason, with full-month billing/history warnings. Save uses Confirm move-out; successful refresh shows the ended record. Former tenants remain searchable and can receive payments. Room availability and occupied counts exclude ended tenancies. Payment choices identify room and Active/Former status.

## References

- [KR-SRS-001 — Software Requirements Specification](../02-Requirements/KR-SRS-001-Software-Requirements-Specification.md)
- [KR-USE-001 — Use Cases](../02-Requirements/KR-USE-001-Use-Cases.md)
- [KR-TST-001 — Test Strategy and Acceptance Plan](../10-Testing/KR-TST-001-Test-Strategy-and-Acceptance-Plan.md)

## Effective-month rent update

The renter detail includes current rent, starting rent, scheduled/history rows and Change rent for active renters. Forms require amount, effective month and reason, and warn that saved changes cannot be edited/cancelled. Sample saves remain disabled. See [effective-month rent](../08-Backend/KR-BCK-003-Effective-Month-Rent.md).
