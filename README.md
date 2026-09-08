# KasiRent

Room rental management for small South African landlords, built with React Native, Node.js and PostgreSQL-compatible storage.

KasiRent brings property inventory, renter history and rent records into one landlord workspace. It supports cash and EFT instalments, visible payment corrections, and replacement tenants without losing the previous renter's balance.

**Status:** working local MVP. Public hosting, account recovery and physical-device acceptance remain outstanding. KasiRent records received rent; it does not transfer money or verify bank transactions.

## What works

- Landlord registration, sign-in and owner-scoped records.
- Properties, rooms, dated move-ins and move-outs.
- Active and former renter history, including outstanding balances.
- Missing-charge alerts for active and former renters, with month review.
- Opening arrears and credits with reversal history and duplicate-period protection.
- Effective-month rent changes with preserved rate history.
- Monthly charges, partial payments, credits and payment reversals.
- Native receipt sharing and browser text downloads.
- Read-only sample workspace for exploring the interface.

## Engineering decisions

| Concern | Implementation |
| --- | --- |
| Financial accuracy | Integer-cent amounts; balances derived from charges and active payments |
| Duplicate requests | Unique payment IDs and one charge per tenancy/month |
| Occupancy history | Dated tenancies, a partial unique index and room-locked transactions |
| Data isolation | Server-resolved account ownership and parent-record checks |
| Authentication | Salted scrypt password hashes and revocable opaque sessions |
| Schema evolution | Versioned transactional migration with legacy-data preservation |
| Local development | PGlite embedded PostgreSQL; configurable external PostgreSQL via pg |

The API is an Express application with an extracted tenancy module. The mobile client uses Expo and TypeScript. There is no separate web application: the browser preview is an export of the same React Native client.

## Documentation

Start with the [KasiRent documentation hub](docs/README.md), built in the numbered TaxiSphere format. It contains the project charter, business and software requirements, domain models and rules, architecture, database/API specifications, testing and operating guides, and decision records.

- [Full document register](docs/00-Governance/KR-REG-001-Document-Register.md)
- [Development roadmap](ROADMAP.md)
- [Landlord walkthrough](docs/20-Training/KR-TRN-001-Landlord-Quick-Start-and-Walkthrough.md)

The documentation baseline is Draft and distinguishes implemented features from planned work.

See the [tenancy lifecycle release](docs/18-Release-Notes/KR-REL-002-Tenancy-Lifecycle.md) for the migration and billing boundaries.

## Run locally

1. Install server packages: `npm install`
2. Install mobile packages: `cd mobile` then `npm install`
3. From the project root: `npm run api`
4. In another terminal, from the project root: `npm run web`
5. Create an account, or choose **Explore with sample data** for a read-only walkthrough.

Records persist in `data/postgres` using PGlite (embedded PostgreSQL) when `DATABASE_URL` is unset. This local development mode needs no Docker. Only run one API process against that folder. For a standalone PostgreSQL server, set `DATABASE_URL` in a root `.env` using `.env.example` as a guide. The same schema and queries work with both drivers.

For a physical phone, set `EXPO_PUBLIC_API_URL=http://YOUR-COMPUTER-LAN-IP:3001` in `mobile/.env`, then run `npm run mobile`. Phone and computer must be on the same trusted network. Browser preview uses localhost by default. iOS native compilation requires macOS.

## First workflow

Add a property → add rooms → assign tenants → charge the relevant rent month → record cash/EFT/bank-deposit payments → share receipts. Use an opening balance for imported arrears or credit, or charge earlier months individually; do not count the same history twice. All amounts are stored as integer cents. Partial payments and credits are supported. Reversals retain the original payment and a reason. Monthly charges are unique per tenancy/month. Payment request IDs prevent retry duplicates. Sample records never enter the database.

## Checks

`npm test` runs integration tests against an isolated embedded PostgreSQL database. In `mobile`, run `npx tsc --noEmit` and `npx expo export --platform web`.

The backend tests cover the rent workflow, ownership checks, payment retries and reversals, replacement tenancies, date validation, concurrent moves, same-month charging, rent-rate selection, concurrent billing/rate changes, and upgrading/reopening a populated legacy database. TypeScript, web export and Android bundle checks also passed during development. Bundle compilation does not replace physical-device testing.

## Project layout

```text
server/           Express API, schema, migrations and integration tests
mobile/src/       React Native screens, styles and receipt delivery
docs/             Product, domain, architecture and operating documentation
```

See [architecture](ARCHITECTURE.md), [contribution guidance](CONTRIBUTING.md), [security status](SECURITY.md) and the [roadmap](ROADMAP.md).

## Release boundaries

This is an initial local MVP, not a publicly deployed service. Sessions are memory-only on the client and require sign-in after a reload; server sessions expire after seven days. Passwords are salted/scrypt hashed and session tokens are stored hashed. API access is scoped to the signed-in landlord.

Before public operation: deploy behind HTTPS, restrict CORS, configure managed PostgreSQL and tested backups, add email verification/password reset and durable rate limiting, review privacy and receipt requirements, and test on physical phones. Current receipts share as text, not PDFs. No automated reminders, full offline sync, lease generation, payment processing, or document uploads yet. The app records rent only; deposits and utilities must not be recorded as rent. Move-out and replacement tenants now preserve history. Open Tenants, choose a renter, then Record move-out; use Former to review their retained ledger. To change rent, open a tenant and choose Change rent. Enter the new amount, effective month and reason; saved changes cannot be edited or cancelled. Full-month charging applies, including handover months.
