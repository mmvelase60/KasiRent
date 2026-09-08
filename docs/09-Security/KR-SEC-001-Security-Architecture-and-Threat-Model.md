---
document_id: KR-SEC-001
title: "KasiRent Security Architecture and Threat Model"
version: 0.1.0
status: Draft
classification: Internal
owner: "Engineering"
project: KasiRent
last_updated: 2026-09-07
---

# KR-SEC-001 — Security Architecture and Threat Model

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-SEC-001 |
| Version / date | 0.1.0 / 2026-09-07 |
| Status | Draft — review pending |
| Owner | Engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Record implemented protections, attack surfaces and release gaps.

## Contents

- [Assets and boundaries](#assets-and-boundaries)
- [Current controls](#current-controls)
- [Public-operation blockers](#public-operation-blockers)
- [Targeted abuse tests](#targeted-abuse-tests)
- [Incident procedure, proposed](#incident-procedure-proposed)

## Assets and boundaries

Protect renter names/phones, rental addresses, payment histories, password hashes and session credentials. Boundaries are client → API, API → database, and app → exported receipt. A valid account is not proof of property ownership.

## Current controls

| Threat | Present control | Remaining gap |
| --- | --- | --- |
| Cross-owner record access | Owner-filtered reads and parent checks | Extend negative tests; no database RLS |
| Password disclosure | Per-password salt and scrypt hash | No recovery, verification or breach screening |
| Stolen stored session value | Server stores SHA-256 token hash | A stolen client bearer token still grants access |
| SQL injection | Parameterized values; fixed table list | Maintain this rule during refactors |
| Duplicate money entries | Request ID check and primary key | Concurrent response semantics incomplete |
| Silent correction | Reversal reason/time retained | No full append-only audit record |
| Brute-force auth | 15 attempts/IP/60 seconds in memory | No shared store, cleanup, proxy configuration or production abuse strategy |
| Cached sensitive JSON | Cache-Control: no-store | Client/device and exported files still need protection |

## Public-operation blockers

Use HTTPS and restricted approved origins; wildcard CORS is not an authorization mechanism. Protect database credentials and backups outside client bundles and source control. Add verified recovery, privacy notice/requests, structured redacted logs, safe proxy configuration and service monitoring.

Account passwords remain in client form state during the current session; clear sensitive form state as a hardening change. Session state is not securely persisted across reloads; that is a usability limitation, not evidence that all token theft risks are eliminated.

## Targeted abuse tests

Try each relationship with another owner's ID. Replay a payment with modified amount, tenancy or date. Race identical submissions. Submit malformed/oversized JSON, expired tokens and long strings. Confirm errors do not expose SQL, credentials or another owner's records. Inspect stored rows for correct ownership after failed writes.

## Incident procedure, proposed

Restrict affected access, preserve minimal diagnostic evidence, identify owners/data affected and rotate compromised credentials. Assess notification obligations with the responsible privacy role. Do not delete financial history to hide an incident. No incident monitoring or notification automation is implemented.


## References

- [KR-RSK-001 — Risk and Decision Register](../00-Governance/KR-RSK-001-Risk-and-Decision-Register.md)
- [KR-CMP-001 — Privacy and Rental Records Review](../19-Compliance/KR-CMP-001-Privacy-and-Rental-Records-Review.md)
- [KR-TST-001 — Test Strategy and Acceptance Plan](../10-Testing/KR-TST-001-Test-Strategy-and-Acceptance-Plan.md)
- [ADR-004 — Opaque Sessions and Owner Isolation](../14-ADR/ADR-004-Opaque-Sessions-and-Owner-Isolation.md)
