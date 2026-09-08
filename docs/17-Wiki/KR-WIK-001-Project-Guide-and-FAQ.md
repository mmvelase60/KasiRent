---
document_id: KR-WIK-001
title: "KasiRent Project Guide and FAQ"
version: 0.2.0
status: Draft
classification: Internal
owner: "Product owner and engineering"
project: KasiRent
last_updated: 2026-09-08
---

# KR-WIK-001 — Project Guide and FAQ

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-WIK-001 |
| Version / date | 0.2.0 / 2026-09-08 |
| Status | Draft — review pending |
| Owner | Product owner and engineering |
| Product baseline | Local MVP; planned capabilities explicitly identified |

## Revision history

| Version | Date | Description |
| --- | --- | --- |
| 0.2.0 | 2026-09-08 | Tenancy lifecycle, migration and current verification. |
| 0.1.0 | 2026-09-07 | Initial KasiRent documentation baseline. |

## Executive summary

Answer common questions and direct readers to authoritative specifications.

## Contents

- [Where should I start?](#where-should-i-start)
- [Is this a website or a mobile app?](#is-this-a-website-or-a-mobile-app)
- [Where are my records?](#where-are-my-records)
- [Why does a new renter show zero?](#why-does-a-new-renter-show-zero)
- [Does “reverse” refund money?](#does-reverse-refund-money)
- [Can I move a renter out or increase rent?](#can-i-move-a-renter-out-or-increase-rent)
- [Are receipts PDFs and bank verified?](#are-receipts-pdfs-and-bank-verified)
- [Is the system ready for public use?](#is-the-system-ready-for-public-use)

## Where should I start?

For product direction, read KR-VSN-001 and KR-BRD-001. For implementation, read KR-SRS-001, KR-SAD-001, KR-DDS-001 and KR-ADS-001. For running it, use KR-OPS-001. For learning the landlord workflow, use KR-TRN-001.

## Is this a website or a mobile app?

The source is React Native through Expo. It also exports to a browser for local preview. There is no separate website codebase. An Android JavaScript/Hermes bundle has been exported, but no signed APK or app-store release is documented.

## Where are my records?

Locally under data/postgres unless DATABASE_URL selects another PostgreSQL server. Browser state is not the primary data store. Signing out or reloading does not delete server records.

## Why does a new renter show zero?

Only recorded monthly charges count toward the balance. Adding a tenancy does not create a charge. Charge the relevant month and check history. Zero is not proof that all contractual rent has been paid.

## Does “reverse” refund money?

No. It corrects the record by excluding an entry from totals while preserving its reason/history. Actual funds remain outside KasiRent.

## Can I move a renter out or increase rent?

Move-out is supported: open the active tenant, record last occupied day/reason, then add a replacement starting later. Former balances remain available. Rent increases remain planned; do not overwrite old amounts.

## Are receipts PDFs and bank verified?

No. Receipts are text generated from recorded payment details; browser downloads are .txt. The landlord confirms received funds. There is no bank integration or immutable receipt archive.

## Is the system ready for public use?

The local prototype is useful for evaluation. The release-readiness document records the remaining recovery, security, privacy and testing work. A successful build does not close those gates.


## References

- [KR-VSN-001 — Product Vision and Strategy](../01-Business/KR-VSN-001-Product-Vision-and-Strategy.md)
- [KR-SRS-001 — Software Requirements Specification](../02-Requirements/KR-SRS-001-Software-Requirements-Specification.md)
- [KR-OPS-001 — Local Operations and Recovery Guide](../11-Operations/KR-OPS-001-Local-Operations-and-Recovery-Guide.md)
- [KR-TRN-001 — Landlord Quick Start and Walkthrough](../20-Training/KR-TRN-001-Landlord-Quick-Start-and-Walkthrough.md)
- [KR-DEP-001 — Deployment and Release Readiness](../12-Deployment/KR-DEP-001-Deployment-and-Release-Readiness.md)
