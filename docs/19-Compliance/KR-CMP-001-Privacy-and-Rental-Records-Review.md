---
document_id: KR-CMP-001
title: "KasiRent Privacy and Rental Records Review"
version: 0.1.0
status: Draft
classification: Internal
owner: "Product owner and designated reviewer"
project: KasiRent
last_updated: 2026-09-07
---

# KR-CMP-001 — Privacy and Rental Records Review

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-CMP-001 |
| Version / date | 0.1.0 / 2026-09-07 |
| Status | Draft — review pending |
| Owner | Product owner and designated reviewer |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Identify review tasks for personal information and rental documents.

## Scope and status

This is an engineering review checklist, not a completed compliance assessment or legal opinion. KasiRent currently stores account identity, renter names/phones, addresses and rental-payment history. It does not implement a privacy notice, rights-request portal or retention/deletion workflow.

## Privacy review

The Information Regulator describes Information Officer registration and the conditions for lawful processing. Confirm the responsible party/operator roles, applicable registration, processing purposes, notices and service arrangements before public use. [Information Regulator POPIA resources](https://inforegulator.org.za/popia/) — checked 2026-09-07.

| Area | Required product decision or evidence | Current gap |
| --- | --- | --- |
| Data collection | Explain why each field is needed | No documented user-facing notice |
| Access and correction | Verify requester and scope disclosure | No request workflow |
| Retention | Define category-specific periods and exceptions | No policy or automation |
| Security | Protect stored data, transport and backups | Local baseline only |
| Sharing | Limit receipt contents and verify intended recipient | Exported files leave app control |
| Providers | Review host, database and future messaging arrangements | Providers not selected |

Avoid default ID-copy collection. Do not equate consent alone with complete privacy compliance. Retention decisions must consider applicable duties and disputes rather than promise immediate deletion of all financial history.

## Rental-record review

The government Rental Housing Act page identifies the legislation, amendments and lease-related purposes. Confirm applicable current provisions and commencement before finalizing legally relied-on templates. [Rental Housing Act 50 of 1999](https://www.gov.za/documents/rental-housing-act) — checked 2026-09-07.

Review receipt fields, rent-period identification, issuance date, party details and correction treatment. Current receipts use optional reference text and live account/property context; they are not an immutable issued document. Lease generation, deposits, inspections and legal notices are not implemented.

## Release evidence

Record the reviewer, scope, date, unresolved issues and resulting product changes. Do not mark this document Approved until an actual review occurs. Product wording must avoid “legally compliant receipts,” “verified landlord” and similar unproven claims.


## References

- [KR-SEC-001 — Security Architecture and Threat Model](../09-Security/KR-SEC-001-Security-Architecture-and-Threat-Model.md)
- [KR-DEP-001 — Deployment and Release Readiness](../12-Deployment/KR-DEP-001-Deployment-and-Release-Readiness.md)
- [KR-RES-001 — Evidence and Assumptions Register](../15-Research/KR-RES-001-Evidence-and-Assumptions-Register.md)
