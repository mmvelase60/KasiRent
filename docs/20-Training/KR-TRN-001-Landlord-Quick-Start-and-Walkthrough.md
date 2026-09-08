---
document_id: KR-TRN-001
title: "KasiRent Landlord Quick Start and Walkthrough"
version: 0.4.0
status: Draft
classification: Internal
owner: "Product owner"
project: KasiRent
last_updated: 2026-09-08
---

# KR-TRN-001 — Landlord Quick Start and Walkthrough

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-TRN-001 |
| Version / date | 0.4.0 / 2026-09-08 |
| Status | Draft — review pending |
| Owner | Product owner |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.2.0 | 2026-09-08 | Tenancy lifecycle, migration and current verification. |
| 0.3.0 | 2026-09-08 | Align with effective-month rent changes. |
| 0.4.0 | 2026-09-08 | Add opening balances and correction rules. |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Teach the current workflow using fictional records.

## Contents

- [Start with sample data](#start-with-sample-data)
- [Set up your first rental](#set-up-your-first-rental)
- [Record instalments](#record-instalments)
- [Give a receipt](#give-a-receipt)
- [Correct a mistake](#correct-a-mistake)
- [Finish the month](#finish-the-month)
- [Practice completion](#practice-completion)

## Start with sample data

Open the local preview and choose Explore with sample data. Browse Overview, Rooms, Tenants and Payments. Sample records cannot be saved into your account. Choose Create my account when ready.

For first practice use fictional details. The app's current release is for local evaluation; see the release notes before relying on it operationally.

## Set up your first rental

1. Create an account with your name, email and a password of at least 10 characters.
2. Open Rooms, choose Add property, and enter the property name/address.
3. Add Room 01 to that property.
4. Choose Add tenant on the available room. Enter Example Renter, monthly rent 1500, due day 1 and the actual move-in date.
5. Open Overview and choose Charge monthly rent. Select that month and save.

The month must not be in the future. Assigning the renter alone does not add rent owed.

## Record instalments

Select Record payment and the renter. Enter 1000, choose Cash and a valid received date, and give a period/reference such as “January first instalment.” Save after confirming funds were received. A R1,500 charge less R1,000 payment leaves R500.

Record the remaining 500 with a new payment entry. The recorded balance becomes zero. A negative balance means credit; it is not an automatic refund.

## Give a receipt

Open Payments or renter history and choose Receipt. A phone opens its sharing options. The browser downloads a text file. Check the recipient yourself before sharing. The app does not confirm delivery or verify bank transfers.

## Correct a mistake

Find the payment in Payments, choose Reverse and enter the reason. The original remains visible but stops reducing the balance. Record the correct payment separately if needed. A reversal does not move money.

## Finish the month

Compare recorded payments against cash/bank evidence and inspect each renter's charges. Ensure the intended months are present. Existing month charges are not duplicated if you charge the same month again.

Do not record deposits, utilities or refunds as rent. Use Record move-out to release a room; never delete old renter records. If a connection error appears after saving, refresh and inspect history before entering a fresh payment.

## Practice completion

You can explain the balance from the history, produce a receipt, reverse a mistake and distinguish an uncharged month from a paid month. Sign out on a shared device. Protect downloaded receipts because they contain personal rental information.


## Move out and replace a renter

Open Tenants → the active renter → Record move-out. Enter the last occupied day and reason, then confirm. Choose Former to find the old renter afterward, including any unpaid balance. Open the available room and add a replacement with a move-in after the previous renter's last day. Dates cannot be future; move-out details cannot be overwritten. The move-out month is fully chargeable, and two renters in one month each get a full charge. Do not use this flow expecting automatic proration. Already-posted later-month rent blocks a backdated end; do not delete charges to bypass it.

## References

- [KR-WIK-001 — Project Guide and FAQ](../17-Wiki/KR-WIK-001-Project-Guide-and-FAQ.md)
- [KR-USE-001 — Use Cases](../02-Requirements/KR-USE-001-Use-Cases.md)
- [KR-REL-001 — Initial Local Baseline](../18-Release-Notes/KR-REL-001-Initial-Local-Baseline.md)

## Effective-month rent update

Open Tenants, choose an active renter and choose Change rent. Enter the rand amount, effective month and reason. Check carefully before saving: changes cannot be edited/cancelled. Choose a month after the first rental month, saved charges and latest scheduled change. See [effective-month rent](../08-Backend/KR-BCK-003-Effective-Month-Rent.md).

## Opening balances

Opening arrears/credits, cutoff rules and retained reversals are implemented through migration 003 and owner-scoped endpoints. Balance includes the active signed opening amount; collection totals do not. See [KR-BCK-004](../08-Backend/KR-BCK-004-Opening-Balances.md) for the contract and workflow.
