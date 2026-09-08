---
document_id: KR-USE-001
title: "KasiRent Use Cases"
version: 0.2.0
status: Draft
classification: Internal
owner: "Product owner and engineering"
project: KasiRent
last_updated: 2026-09-08
---

# KR-USE-001 — Use Cases

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-USE-001 |
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

Describe the end-to-end workflows and failure handling.

## Contents

- [UC-001 — Create a landlord workspace](#uc-001--create-a-landlord-workspace)
- [UC-002 — Prepare a room for rent](#uc-002--prepare-a-room-for-rent)
- [UC-003 — Charge a rental month](#uc-003--charge-a-rental-month)
- [UC-004 — Record and receipt a payment](#uc-004--record-and-receipt-a-payment)
- [UC-005 — Correct a payment](#uc-005--correct-a-payment)
- [UC-006 — Review a balance](#uc-006--review-a-balance)
- [UC-007 — Explore and exit sample mode](#uc-007--explore-and-exit-sample-mode)

## UC-001 — Create a landlord workspace

**Actor:** landlord. **Precondition:** server reachable. **Flow:** enter name, email and password; register; receive a session; load empty records. **Exceptions:** invalid input, duplicate email, throttling or connection failure. **Result:** account and session exist. Account creation/session creation are separate writes; if the second fails, try sign-in before registering again.

## UC-002 — Prepare a room for rent

**Actor:** signed-in landlord. **Flow:** create property and address; add named room; select available room; enter renter, optional phone, rent, due day and move-in date; save. **Exceptions:** duplicate room name, occupied room, invalid rent or foreign-owner property/room. **Result:** one tenancy is linked to one room. No charge is created automatically. Use UC-008 to end the tenancy without deleting history.

## UC-003 — Charge a rental month

**Actor:** landlord. **Trigger:** preparing a month's ledger. **Flow:** select month; submit; server finds owned tenancies whose start/end months cover the selected month; insert absent charges; refresh. **Exceptions:** future month, network/server failure. **Recovery:** retry the same month; the unique tenancy/month key prevents duplicate rent. The batch runs in one transaction and locks rooms to coordinate with moves.

## UC-004 — Record and receipt a payment

**Actor:** landlord. **Precondition:** funds received and tenancy exists. **Flow:** choose renter; enter amount, payment date, Cash/EFT/Bank deposit and period/reference; save; refresh balance; open receipt. **Exceptions:** invalid date/amount, wrong owner, reused ID with different details, lost response. **Recovery:** keep the original request ID for an exact retry; inspect history before entering a new payment. **Result:** payment row and updated derived balance. Receipt sharing is a separate action.

## UC-005 — Correct a payment

**Actor:** landlord. **Flow:** locate active payment; choose Reverse; give reason; save; optionally record replacement with a new request ID. **Exceptions:** already reversed or inaccessible payment. **Result:** original payment is retained and no longer reduces the balance. Money is not refunded.

## UC-006 — Review a balance

**Actor:** landlord. **Flow:** open overview or tenant history; inspect charges and active payments; compare against external receipt/bank records. **Exceptions:** absent monthly charges can yield a misleading zero; record missing months only after confirming rent terms. **Result:** explainable ledger balance, not bank-verified reconciliation.

## UC-007 — Explore and exit sample mode

**Actor:** visitor. **Flow:** choose sample data; browse populated screens; choose Create my account. **Result:** sample records leave client state and are never written to the database. Sample receipts are labelled SAMPLE.


## UC-008 — Move out and replace a renter

Open the active renter in Tenants; choose Record move-out; supply last occupied day and reason; confirm. End date cannot precede move-in, be future, or predate already-charged later months. An identical retry returns the prior result; changed details conflict. The room becomes available and the renter appears under Former. Add the replacement with a move-in strictly after the prior end date. Old balances remain payable; no funds or ledger rows are deleted. Monthly charges remain full amounts, including start/end months.

## References

- [KR-SRS-001 — Software Requirements Specification](KR-SRS-001-Software-Requirements-Specification.md)
- [KR-DOM-007 — Business Process Catalogue](../04-Domain/KR-DOM-007-Business-Process-Catalogue.md)
