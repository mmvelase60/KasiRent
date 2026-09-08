---
document_id: KR-UXS-002
title: "Missing-charge alerts"
version: 0.5.0
status: Draft
project: KasiRent
last_updated: 2026-09-08
---

# Missing-charge alerts

## Rules

FR-017 is implemented in the React Native client using rentStatus.mjs. Evaluate months from the later of move-in month and active opening-balance month through the earlier of move-out month and the current South African month. Both endpoints are inclusive. A missing tenancy/month charge produces Not charged regardless of the recorded balance. Reversed opening balances no longer suppress earlier months. Other tenants' records do not affect the result.

With no missing months, the total ledger determines Rent due (positive), Credit (negative), or Settled (zero with recorded charge/opening history). No eligible months and no such history produces No rent expected. Payments are not allocated to months; these labels never claim an individual month's payment was received. Due is a recorded balance, not an overdue-day calculation.

## Screens and action

Overview warns how many renters have missing months and states that outstanding totals exclude uncharged rent. Former renters with missing months remain visible even with a zero balance. Overview rows and tenant lists distinguish Not charged from the recorded amount. Tenant detail lists the first 12 missing months and total count, with a Review charges button for the earliest gap.

Review opens the existing monthly-charge form prefilled with the missing month. The warning explicitly says ALL eligible renters for that month are affected. Saving uses the existing owner-scoped charge endpoint, including its idempotency, opening cutoffs and effective-rate selection. Existing charges remain unchanged. No request runs just from viewing an alert. Sample mode keeps saves disabled.

The helper inspects all eligible months even when only 12 are displayed. After each charge, refreshed records remove that month from the alert and the next gap becomes actionable. No database migration or new API contract is required.

## Verification

Three direct tests exercise the same helper used by the screen: zero/credit with missing historical months, balance labels after complete billing, year rollover, ownership of input rows, move-out inclusivity, future exclusion, opening/reversed-opening cutoffs, and alert removal after a charge. Existing integration tests continue to cover the charge endpoint. Physical-device layout, accessibility and end-to-end workflow acceptance remain pending.
