---
document_id: KR-OPS-001
title: "KasiRent Local Operations and Recovery Guide"
version: 0.3.0
status: Draft
classification: Internal
owner: "Engineering"
project: KasiRent
last_updated: 2026-09-08
---

# KR-OPS-001 — Local Operations and Recovery Guide

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-OPS-001 |
| Version / date | 0.3.0 / 2026-09-08 |
| Status | Draft — review pending |
| Owner | Engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |
| 0.3.0 | 2026-09-08 | Align with effective-month rent changes. |

## Executive summary

Provide reproducible local startup and honest recovery limits.

## Local startup

Prerequisites: a supported Node.js runtime and package manager; the previous build used Node 24.19.0. Install root packages with npm install and mobile packages with npm --prefix mobile install. Keep both package-lock files. Project .npmrc files direct caches into the workspace.

Start the API from the root using npm run api. The command reads a root .env if present. With no DATABASE_URL, data is stored at data/postgres. Use only one API process for that data directory.

For a live browser development view, run npm run web in a second terminal. For an exported preview, build web in mobile then run node server/preview.mjs from the root; it serves localhost:8081. The API uses port 3001 by default.

## Lifecycle upgrade

Before applying migration 001 to saved records, stop the API and take a protected copy of data/postgres. Startup runs the versioned migration once. Legacy start dates are marked estimated; charges and payments are preserved. The old API cannot safely run on the new schema because its positional tenancy INSERT has changed. Test recovery independently before relying on a backup.

## Configuration

| Variable | Location | Meaning |
| --- | --- | --- |
| DATABASE_URL | Root .env | External PostgreSQL connection; omit for embedded mode |
| PORT | Root .env | API listener port; default 3001 |
| EXPO_PUBLIC_API_URL | mobile/.env | Client API base; default http://localhost:3001 |

For a phone, use the computer's reachable LAN IP and same trusted network. Restart/rebuild the client after configuration changes. Changing PORT also requires the matching client URL.

## Troubleshooting

If the app cannot connect, confirm the API is running, the client URL matches and the network/firewall allows the connection. If port 3001 is occupied, identify the existing service before choosing another port. A browser reload signs out but does not erase database records.

If an email already exists, use sign-in; no password reset exists yet. If the root directory is wrong, relative data paths may point elsewhere—always start from the project root. Do not delete data to resolve an account error.

## Local backup and recovery rehearsal

No backup automation or restore command exists. Proposed local procedure: stop the API cleanly; confirm the actual data directory; copy the entire directory to a separate protected backup location; label the time/version; restart the original service. Do not assume a live directory copy is consistent or that OneDrive synchronization is a database backup.

Rehearse restoration into a separate workspace copy, never over the only live copy. Match runtime/schema versions, start one API against the restored directory and compare owner, row and cent totals. Record the result before relying on this procedure operationally. No successful restore has been recorded.

For external PostgreSQL use a provider-supported backup/restore process with a tested retention and recovery target. Moving embedded records into that server is a separate, unimplemented migration.


## References

- [KR-DEP-001 — Deployment and Release Readiness](../12-Deployment/KR-DEP-001-Deployment-and-Release-Readiness.md)
- [KR-DDS-001 — Database Design Specification](../05-Database/KR-DDS-001-Database-Design-Specification.md)
- [KR-TST-001 — Test Strategy and Acceptance Plan](../10-Testing/KR-TST-001-Test-Strategy-and-Acceptance-Plan.md)

## Effective-month rent update

Before migration 002, stop the local API and copy data/postgres to a protected backup. Restart the updated API; the migration adds rent_changes without rewriting money. Do not run an older API for billing after rates are recorded: it ignores rent_changes and would charge the original rate. See [effective-month rent](../08-Backend/KR-BCK-003-Effective-Month-Rent.md).
