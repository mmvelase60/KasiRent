---
document_id: KR-REL-001
title: "KasiRent Initial Local Baseline"
version: 0.1.0
status: Draft
classification: Internal
owner: "Engineering"
project: KasiRent
last_updated: 2026-09-07
---

# KR-REL-001 — Initial Local Baseline

> Historical baseline: tenancy history and versioned upgrades are updated by [ADR-006](../14-ADR/ADR-006-Historical-Tenancies-and-Migrations.md) and [KR-REL-002](../18-Release-Notes/KR-REL-002-Tenancy-Lifecycle.md). Earlier limitations below describe the original version.


## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-REL-001 |
| Version / date | 0.1.0 / 2026-09-07 |
| Status | Draft — review pending |
| Owner | Engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Record the delivered prototype and what the validation actually established.

## Contents

- [Release identity](#release-identity)
- [Implemented](#implemented)
- [Validation recorded in the earlier build turn](#validation-recorded-in-the-earlier-build-turn)
- [Known limitations](#known-limitations)
- [Documentation addition](#documentation-addition)

## Release identity

Documentation baseline 0.1.0, dated 2026-09-07. This is a local development milestone, not a tagged Git release or production launch. mobile/package.json contains starter version 1.0.0; that value is not used as evidence of production maturity.

## Implemented

- Landlord account creation, sign-in and logout.
- Owner-scoped property, room and tenancy creation.
- Explicit monthly rent charging.
- Cash, EFT and bank-deposit records, including instalments.
- Sequential payment replay protection and reversal history.
- Client-derived balances, monthly collections and occupancy count.
- Native text sharing/browser .txt receipt download.
- Read-only sample workspace.
- Embedded PostgreSQL mode and configurable pg driver.

## Validation recorded in the earlier build turn

| Check | Result | Meaning |
| --- | --- | --- |
| server/app.test.mjs | Passed, one integration test | Selected money and isolation assertions |
| TypeScript noEmit | Passed | Client type check |
| Expo web export | Passed | Browser bundle generated |
| Expo Android export | Passed | Hermes bundle generated; not an installed application |
| Preview HTTP request | 200 | Static preview responded |

No browser interaction automation, physical-device acceptance, standalone PostgreSQL integration, performance run, backup restore or security assessment is recorded. This documentation change adds specifications; it does not rerun or broaden those results.

## Known limitations

Single tenancy ever per room; no move-out or rent changes; no opening adjustments; missing months can look settled; no immutable/PDF receipts; no password recovery; no file upload, reminders, offline sync or public hosting. The current test requires DATABASE_URL unset for its intended embedded isolation.

## Documentation addition

Introduces controlled product, requirements, domain, architecture, database, API, security, testing and operating documents; ADRs; templates; an indexed reading path; and explicit planned work. Application source behaviour is unchanged by this documentation pass.


## References

- [KR-RTM-001 — Requirements Traceability Matrix](../02-Requirements/KR-RTM-001-Requirements-Traceability-Matrix.md)
- [KR-TST-001 — Test Strategy and Acceptance Plan](../10-Testing/KR-TST-001-Test-Strategy-and-Acceptance-Plan.md)
- [KR-RSK-001 — Risk and Decision Register](../00-Governance/KR-RSK-001-Risk-and-Decision-Register.md)
