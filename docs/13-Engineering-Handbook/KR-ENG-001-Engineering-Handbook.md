---
document_id: KR-ENG-001
title: "KasiRent Engineering Handbook"
version: 0.2.0
status: Draft
classification: Internal
owner: "Engineering"
project: KasiRent
last_updated: 2026-09-08
---

# KR-ENG-001 — Engineering Handbook

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-ENG-001 |
| Version / date | 0.2.0 / 2026-09-08 |
| Status | Draft — review pending |
| Owner | Engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.2.0 | 2026-09-08 | Tenancy lifecycle, migration and current verification. |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Describe how changes should preserve contracts and rental history.

## Contents

- [Working baseline](#working-baseline)
- [Change workflow](#change-workflow)
- [Coding and data rules](#coding-and-data-rules)
- [Database and testing discipline](#database-and-testing-discipline)
- [Documentation maintenance](#documentation-maintenance)

## Working baseline

The root contains the Node API; mobile contains the Expo app. Keep source layout intact unless a scoped refactor is justified. Read applicable repository instructions before changing code. In particular, mobile/AGENTS.md points contributors to the version-specific Expo documentation.

## Change workflow

1. Identify the requirement and acceptance example.
2. Inspect current contract, schema and affected code.
3. For money or history changes, record an ADR/migration plan.
4. Implement the smallest complete behaviour.
5. Run relevant checks and record actual outcomes.
6. Update API, domain and traceability documents.
7. Review and commit only when requested or within the agreed project workflow.

Documentation-only changes require link, ID and content checks, not an automatic rerun of every application build.

## Coding and data rules

Use parameterized SQL, server-owned authorization and integer cents. Never accept owner identity from a form. Keep request IDs stable across payment retries. Do not delete payments to correct errors. Do not reinterpret historical charges from a changed rent field.

Keep secrets out of mobile EXPO_PUBLIC variables and commits. Keep sample/test data synthetic. Broad Row typing and the single app.mjs are current technical debt; replace them incrementally with contracts and focused services.

## Database and testing discipline

Schema bootstrap is followed by versioned transactional migrations. Add new numbered files for future changes; do not rewrite migrations already applied to user data. Tests now pass null explicitly to choose isolated PGlite regardless of DATABASE_URL.

When reporting tests, distinguish syntax/types, bundle compilation, integration behaviour, UI interaction and device operation. A single integration test can have multiple assertions but must not be reported as many separate executed tests.

## Documentation maintenance

Follow KR-STD-001. A new feature should update its story, rule, endpoint, entity relationship, test scenario and release entry. Retain deprecated decisions for history and link replacements. Do not mark Draft documents Approved without an actual review.


## References

- [KR-STD-001 — Documentation and Branding Standard](../00-Governance/Standards/KR-STD-001-Documentation-and-Branding-Standard.md)
- [KR-TST-001 — Test Strategy and Acceptance Plan](../10-Testing/KR-TST-001-Test-Strategy-and-Acceptance-Plan.md)
- [KR-RTM-001 — Requirements Traceability Matrix](../02-Requirements/KR-RTM-001-Requirements-Traceability-Matrix.md)
