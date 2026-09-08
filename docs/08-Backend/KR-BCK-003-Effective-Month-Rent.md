---
document_id: KR-BCK-003
title: "Effective-Month Rent"
version: 0.3.0
status: Draft
classification: Internal
owner: "Product owner and engineering"
project: KasiRent
last_updated: 2026-09-08
---

# KR-BCK-003 — Effective-Month Rent

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.3.0 | 2026-09-08 | Introduce an append-only rent schedule and rate-aware charging. |

## Contract and rules

POST /tenancies/:id/rent-changes accepts authenticated JSON: {"effective_month":"2026-10","amount":135000,"reason":"Agreed new rent"}. Amounts are integer cents from 1 through 100000000. A trimmed reason of 1–200 characters is required. The month must be YYYY-MM from 1900-01 onward.

Only the owner may add a change, and only for an active tenancy. Its effective month must be after the tenancy's first month, the latest scheduled change, and every saved charge. Future months and uncharged historical months are supported. Increases and decreases are allowed; the amount must differ from the preceding rate. Records cannot be edited or cancelled. An identical retry returns the saved row, including after later charges or move-out. A different request for the same month conflicts.

Responses: 200 saved/replayed row; 400 invalid input, unchanged rate or month at/before move-in month; 404 missing/foreign tenancy; 409 conflicting month, ended tenancy or impact on saved charges. GET /state includes owner-scoped rent_changes.

## Persistence and concurrency

Migration 002 creates rent_changes(id, owner, tenancy_id, effective_month, amount, reason, created_at), with foreign keys, amount/month/reason checks and a unique tenancy/month constraint. Existing tenancies.rent remains the original starting rate. No existing charges, payments or tenancy amounts are rewritten. The migration registry applies 001 then 002 transactionally and only once.

Charging selects the latest rate whose effective_month is no later than the requested month, falling back to starting rent. Saved charges remain immutable snapshots. Rate creation uses the same room lock as charge generation and move-out, preventing a rate from changing a period that concurrent billing has already posted. All-owner charge batches lock rooms in stable ID order.

A move-out can precede a scheduled change: retain the change as history, label it not applied after move-out, and never charge beyond the end month. Replacement tenancies have independent rent schedules. Full-month billing remains unchanged; no proration or automatic charge posting.

## Landlord workflow

Tenants → choose an active renter → Change rent → enter rand amount, effective month and reason → Save. Read the warning: saved changes cannot be edited or cancelled. The renter view shows starting rent, changes and current rent; rooms show the currently effective amount using the South African business month. Former renters show rent at move-out. Sample mode disables saving.

Example: starting rent R1,200 with an October change to R1,350 means an uncharged September uses R1,200 and October onward uses R1,350. Scheduling October does not post October rent early or alter September payments.

## Verification and limits

Nine backend tests pass, including rate selection across earlier/backfilled months, saved money preservation, ownership, validation, retries, decreases, future scheduling, move-out, concurrent rate requests and billing, and populated legacy migration/reopen. TypeScript and web export pass. External PostgreSQL concurrency and physical-device acceptance remain pending. Opening adjustments and correction/cancellation of rent changes remain planned.
