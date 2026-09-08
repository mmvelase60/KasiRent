---
document_id: KR-ARC-001
title: "KasiRent C4 and Sequence Views"
version: 0.1.0
status: Draft
classification: Internal
owner: "Engineering"
project: KasiRent
last_updated: 2026-09-07
---

# KR-ARC-001 — C4 and Sequence Views

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-ARC-001 |
| Version / date | 0.1.0 / 2026-09-07 |
| Status | Draft — review pending |
| Owner | Engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Show the system boundary, running containers and payment flow.

## Scope

These are lightweight Mermaid context/container views, not a claim of formal C4 notation conformance. Solid nodes below exist; future facilities are discussed in the deployment document rather than drawn as running services.

## System context

```mermaid
flowchart LR
  L["Landlord"] --> K["KasiRent"]
  K --> R["Receipt file or native share sheet"]
  R --> T["Renter receives a shared receipt"]
  L --> B["Cash / bank transfer outside KasiRent"]
```

The renter has no login and the bank is not integrated. Receipt delivery is performed by the landlord outside the API.

## Container view

```mermaid
flowchart TB
  C["React Native / Expo client"] -->|"HTTP JSON + bearer token"| A["Node.js / Express API"]
  W["Browser preview of same client"] -->|"HTTP JSON + bearer token"| A
  A --> D{"DATABASE_URL configured?"}
  D -->|"Yes"| P["PostgreSQL via pg"]
  D -->|"No"| E["PGlite local data directory"]
```

## Record payment sequence

```mermaid
sequenceDiagram
  actor L as Landlord
  participant C as Client
  participant A as API
  participant D as Database
  L->>C: Confirm received funds and enter amount
  C->>A: POST /payments with UUID
  A->>D: Resolve session and owned tenancy
  A->>D: Find existing payment ID
  alt Same existing payload
    D-->>A: Prior payment
  else New ID
    A->>D: Insert payment
    D-->>A: Saved payment
  end
  A-->>C: Payment JSON
  C->>A: GET /state
  A-->>C: Owned records
  C-->>L: Recomputed balance
  L->>C: Request receipt
  C-->>L: Native share or text download
```

The diagram shows a successful sequential request. Validation errors return before insertion. Concurrent insert collisions, partial state reads and receipt delivery failures need separate handling and are not hidden by this view.


## References

- [KR-SAD-001 — Software Architecture Document](KR-SAD-001-Software-Architecture-Document.md)
- [KR-ADS-001 — API Design Specification](../06-API/KR-ADS-001-API-Design-Specification.md)
