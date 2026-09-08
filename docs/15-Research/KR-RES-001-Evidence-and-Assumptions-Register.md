---
document_id: KR-RES-001
title: "KasiRent Evidence and Assumptions Register"
version: 0.1.0
status: Draft
classification: Internal
owner: "Product owner"
project: KasiRent
last_updated: 2026-09-07
---

# KR-RES-001 — Evidence and Assumptions Register

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-RES-001 |
| Version / date | 0.1.0 / 2026-09-07 |
| Status | Draft — review pending |
| Owner | Product owner |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Separate observed product facts from market and operating assumptions.

## Evidence register

| ID | Evidence | What it supports | Limit |
| --- | --- | --- | --- |
| E-001 | Product owner states they managed a family rental business | Domain experience informs workflow | Not a measured market sample |
| E-002 | Current source and package manifests inspected on 2026-09-07 | Implemented features and dependency declarations | Not public-operation evidence |
| E-003 | Previous build-turn test/export results | Local integration, type and bundle checks passed then | No physical-device, load or restore evidence |
| E-004 | TaxiSphere repository documentation reviewed | Folder organization, metadata and traceability format | Transport rules and corporate identity do not transfer |
| E-005 | Information Regulator POPIA resource, checked 2026-09-07 | Starting point for privacy review | Does not establish KasiRent compliance |
| E-006 | Government Rental Housing Act page, checked 2026-09-07 | Starting point for rental-document review | Applicable amendments/commencement require review |

Source links: [Information Regulator](https://inforegulator.org.za/popia/) and [Rental Housing Act](https://www.gov.za/documents/rental-housing-act).

## Assumptions to validate

| ID | Assumption | Validation method |
| --- | --- | --- |
| A-001 | A simple ledger is the first useful capability | Observe landlord completion of the core workflow |
| A-002 | Android/mobile use fits the audience | Test on actual target devices |
| A-003 | A room-count subscription is acceptable | Document willingness to pay after use |
| A-004 | English is sufficient for the first pilot | Record requested languages and comprehension issues |
| A-005 | 30-room workloads fit full-state loading | Measure payload and latency with representative history |
| A-006 | Current receipt format is operationally sufficient | Review user needs and applicable legal requirements |

No market-size statistics, competitor superiority or revenue projections are asserted in this baseline. Earlier pasted recommendations contained proposed technology versions and market numbers; those are not copied as verified facts.

## Reference provenance

The structural reference is the local TaxiSphere Enterprise Mobility Platform documentation, especially its documentation standard, charter, domain series and ADR format. KasiRent does not inherit TaxiSphere's company claims, transport entities, Java/Angular stack or approval statuses.


## References

- [KR-VSN-001 — Product Vision and Strategy](../01-Business/KR-VSN-001-Product-Vision-and-Strategy.md)
- [KR-CMP-001 — Privacy and Rental Records Review](../19-Compliance/KR-CMP-001-Privacy-and-Rental-Records-Review.md)
