---
document_id: KR-STD-001
title: "KasiRent Documentation and Branding Standard"
version: 0.1.0
status: Draft
classification: Internal
owner: "Product owner and engineering"
project: KasiRent
last_updated: 2026-09-07
---

# KR-STD-001 — Documentation and Branding Standard

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-STD-001 |
| Version / date | 0.1.0 / 2026-09-07 |
| Status | Draft — review pending |
| Owner | Product owner and engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Define a consistent, traceable documentation baseline for KasiRent.

## Contents

- [Purpose and scope](#purpose-and-scope)
- [Product identity](#product-identity)
- [Document conventions](#document-conventions)
- [Traceability and updates](#traceability-and-updates)
- [Review standard](#review-standard)

## Purpose and scope

Apply this standard to product, requirements, architecture, domain, delivery and support documents. Markdown is the maintained source. This pack adapts TaxiSphere's numbered folders, controlled metadata, requirements traceability and decision records to a small rental-management product.

## Product identity

| Attribute | Baseline |
| --- | --- |
| Name / code | KasiRent / KR |
| Product | Room rental-management software |
| Intended market | Small South African landlords, initially backyard and township rooms |
| Current delivery | Local React Native/Expo app, Express API, PostgreSQL-compatible storage |
| Intended operating model | Hosted landlord workspaces; hosting is not implemented |
| Legal entity and public brand registration | Not established by this documentation |

The current interface uses forest green `#205b43`, off-white `#f6f7f3` and dark green text. Use plain, respectful language. Currency examples use rand. Do not claim a registered company, trademark, security certification or legal approval.

## Document conventions

Use IDs `KR-XXX-001`, descriptive filenames and the existing numbered categories 00–20. Decisions use `ADR-001`. Every controlled document has metadata, control information, revision history, purpose/scope, specific content and references. Long documents include a contents list. Use relative links so the pack works when the repository moves.

Document status and feature status are separate. Documents start **Draft**, then may become **Under Review**, **Approved**, **Superseded** or **Archived** after an actual review. Existing implementation is labelled **Implemented**; intended work is **Planned**; constrained implementation is **Partial**. Creating a document does not approve it.

## Traceability and updates

Link business requirements BR-001 onward to functional requirements FR-001 onward, business rules RULE-001 onward, use cases UC-001 onward, stories US-001 onward and tests TC-001 onward. The matrix in KR-RTM-001 records implementation evidence and verification gaps.

Change the patch version for editorial corrections, minor version for compatible additions and major version for a changed contract or product scope. Record the reason and date. An ADR records what is implemented or proposed; it must not invent prior approval.

## Review standard

A reviewer checks that examples match the API, links resolve, diagrams distinguish current and future components, security limitations are visible and requirements have measurable acceptance criteria. Use fictional examples. Never include real passwords, tokens, connection strings or tenant records.

Business decisions belong to the product owner; technical review belongs to engineering. These are responsibilities, not claims that a larger organization exists.


## References

- [KR-CHR-001 — Project Charter](../KR-CHR-001-Project-Charter.md)
- [KR-RTM-001 — Requirements Traceability Matrix](../../02-Requirements/KR-RTM-001-Requirements-Traceability-Matrix.md)
