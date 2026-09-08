---
document_id: ADR-004
title: "KasiRent Opaque Sessions and Owner Isolation"
version: 0.1.0
status: Draft
classification: Internal
owner: "Engineering"
project: KasiRent
last_updated: 2026-09-07
---

# ADR-004 — Opaque Sessions and Owner Isolation

## Document control

| Field | Value |
| --- | --- |
| Document ID | ADR-004 |
| Version / date | 0.1.0 / 2026-09-07 |
| Status | Draft — review pending |
| Owner | Engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Record the authentication mechanism without overstating production security.

## Contents

- [Decision status](#decision-status)
- [Context](#context)
- [Decision](#decision)
- [Alternatives](#alternatives)
- [Consequences](#consequences)
- [Revisit](#revisit)

## Decision status

**Recorded existing implementation; review pending.**

## Context

Every account must access only its own rental records. A small API needs revocable sessions without a separate identity provider.

## Decision

Hash passwords with per-password salted scrypt. Issue 32-byte random bearer tokens, store SHA-256 token hashes and expire sessions after seven days. Resolve owner on the server, filter data by owner and check referenced parents before writes.

## Alternatives

JWTs offer self-contained verification but need separate revocation design. An external identity provider could supply recovery and verification later. Shared landlord credentials or client-side owner filtering alone are unacceptable for access control.

## Consequences

Logout can revoke the stored session directly. The system still lacks verified recovery, staff roles, hardened distributed throttling and secure persisted client sessions. Database ownership enforcement is not independent of the API.

## Revisit

Evaluate managed identity or a fuller session service before public scale; preserve owner checks regardless of token mechanism.


## References

- [KR-SEC-001 — Security Architecture and Threat Model](../09-Security/KR-SEC-001-Security-Architecture-and-Threat-Model.md)
- [KR-ADS-001 — API Design Specification](../06-API/KR-ADS-001-API-Design-Specification.md)
