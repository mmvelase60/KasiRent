---
document_id: KR-BCK-004
title: "Opening balances"
version: 0.4.0
status: Draft
project: KasiRent
last_updated: 2026-09-08
---

# Opening balances

Opening arrears and credit import the rent balance immediately before a first tracked month. The date must be the first day of a month, no earlier than the move-in month and no later than today in South Africa. Amounts are signed integer cents: positive arrears increase debt; negative credit reduces debt. Zero is not an opening entry.

## Workflow

Tenants → choose a renter → Add opening balance. Select Arrears or Credit, enter a positive rand amount, first tracked month start (YYYY-MM-01) and reason/source. The entry appears in tenant history, including for former renters. It affects balances and outstanding totals, never collected-payment totals or receipts. Example: R2,400 arrears + R1,500 March charge − R1,000 March payment = R2,900 due.

Use Reverse opening balance with a reason to correct an entry, then add a replacement with a new request ID. Reversed entries remain visible and stop affecting totals; reversal also removes the cutoff on older transactions. Record the replacement before further billing where appropriate. No general balance adjustment or deposit ledger is introduced.

## API and persistence

POST /tenancies/:id/opening-balance accepts {id: UUID, amount: signed cents, as_on: YYYY-MM-01, reason: text}. Amount magnitude is 1–100000000 cents; reason is trimmed 1–200 characters. An identical ID and payload replays the existing row even after reversal, without reactivating it. A reused ID with different data conflicts. Only one un-reversed entry per tenancy is permitted, enforced by a partial unique index.

POST /opening-balances/:id/void accepts {reason: text}; exact repeat returns the original reversal timestamp, a different repeat conflicts. Foreign/missing records return 404. Invalid input returns 400; conflicting ledger history returns 409. GET /state includes owner-scoped opening_balances.

Migration 003 adds opening_balances with ownership, tenancy, signed amount, date, reason, creation and reversal metadata. Existing money is untouched. Balance = charges + active opening amount − active payments.

## Preventing double counting

Import is rejected if charges before the first tracked month or active payments before its first day already exist. With an active opening, billing skips older months and payment creation rejects older payment dates. Charge generation, opening import/reversal and payment creation share room locks so concurrent operations cannot bypass these checks. Payment retries return their existing rows. Current-month payments remain separate from the opening balance.

The source amount still requires landlord reconciliation: the system cannot verify a paper ledger. A balance dated in the move-in month is allowed for imported prior agreements or credit. There is no daily proration.

## Operation and verification

Stop the local API and back up data/postgres before migrating. Restart the updated API. Do not bill using an older application after imports because it ignores opening balances and cutoff rules. Restore only from a tested backup with a compatible application.

Integration coverage includes arrears/credit arithmetic, unchanged payments and charges, repeated imports, reversal/replacement, owner isolation, validation and import/billing races. Existing populated legacy migration/reopen coverage remains. External PostgreSQL concurrency and physical-device verification remain pending.
