# KasiRent documentation

A controlled product and engineering documentation pack, following TaxiSphere's numbered-folder structure and adapted to KasiRent's rental workflows.

**Baseline:** 0.3.0 rent schedule update · **Date:** 8 September 2026 · **Status:** Draft for review.

The app is a local MVP. Documentation describes both the inspected implementation and proposed next work; it does not mark the system production-ready.

## Start here

1. [Product vision](01-Business/KR-VSN-001-Product-Vision-and-Strategy.md) — who the system serves.
2. [Project charter](00-Governance/KR-CHR-001-Project-Charter.md) — objectives, boundaries and delivery gates.
3. [Software requirements](02-Requirements/KR-SRS-001-Software-Requirements-Specification.md) — current and planned behaviour.
4. [Business rules](04-Domain/KR-DOM-005-Business-Rules-Catalogue.md) — rent arithmetic and corrections.
5. [Architecture](03-Architecture/KR-SAD-001-Software-Architecture-Document.md) — how the current app works.
6. [Landlord walkthrough](20-Training/KR-TRN-001-Landlord-Quick-Start-and-Walkthrough.md) — use the system.

## Document register

[Full controlled register](00-Governance/KR-REG-001-Document-Register.md) · [Traceability matrix](02-Requirements/KR-RTM-001-Requirements-Traceability-Matrix.md) · [Risks and open decisions](00-Governance/KR-RSK-001-Risk-and-Decision-Register.md)

## 00-Governance

- [KR-CHR-001 — Project Charter](00-Governance/KR-CHR-001-Project-Charter.md)
- [KR-REG-001 — Document Register](00-Governance/KR-REG-001-Document-Register.md)
- [KR-RSK-001 — Risk and Decision Register](00-Governance/KR-RSK-001-Risk-and-Decision-Register.md)
- [KR-STD-001 — Documentation and Branding Standard](00-Governance/Standards/KR-STD-001-Documentation-and-Branding-Standard.md)

## 01-Business

- [KR-BRD-001 — Business Requirements Document](01-Business/KR-BRD-001-Business-Requirements-Document.md)
- [KR-VSN-001 — Product Vision and Strategy](01-Business/KR-VSN-001-Product-Vision-and-Strategy.md)

## 02-Requirements

- [KR-RTM-001 — Requirements Traceability Matrix](02-Requirements/KR-RTM-001-Requirements-Traceability-Matrix.md)
- [KR-SRS-001 — Software Requirements Specification](02-Requirements/KR-SRS-001-Software-Requirements-Specification.md)
- [KR-USE-001 — Use Cases](02-Requirements/KR-USE-001-Use-Cases.md)
- [KR-USR-001 — User Stories and Acceptance Criteria](02-Requirements/KR-USR-001-User-Stories-and-Acceptance-Criteria.md)

## 03-Architecture

- [KR-ARC-001 — C4 and Sequence Views](03-Architecture/KR-ARC-001-C4-and-Sequence-Views.md)
- [KR-ARC-002 — Deployment Architecture](03-Architecture/KR-ARC-002-Deployment-Architecture.md)
- [KR-SAD-001 — Software Architecture Document](03-Architecture/KR-SAD-001-Software-Architecture-Document.md)

## 04-Domain

- [KR-DOM-001 — Business Capability Map](04-Domain/KR-DOM-001-Business-Capability-Map.md)
- [KR-DOM-002 — Bounded Context Map](04-Domain/KR-DOM-002-Bounded-Context-Map.md)
- [KR-DOM-003 — Ubiquitous Language and Business Glossary](04-Domain/KR-DOM-003-Ubiquitous-Language-and-Business-Glossary.md)
- [KR-DOM-004 — Domain Model](04-Domain/KR-DOM-004-Domain-Model.md)
- [KR-DOM-005 — Business Rules Catalogue](04-Domain/KR-DOM-005-Business-Rules-Catalogue.md)
- [KR-DOM-006 — Domain Events Catalogue](04-Domain/KR-DOM-006-Domain-Events-Catalogue.md)
- [KR-DOM-007 — Business Process Catalogue](04-Domain/KR-DOM-007-Business-Process-Catalogue.md)
- [KR-DOM-008 — State Transition Models](04-Domain/KR-DOM-008-State-Transition-Models.md)
- [KR-DOM-009 — Domain Ownership Matrix](04-Domain/KR-DOM-009-Domain-Ownership-Matrix.md)
- [KR-DOM-010 — Automation and AI Scope](04-Domain/KR-DOM-010-Automation-and-AI-Scope.md)

## 05-Database

- [KR-DDS-001 — Database Design Specification](05-Database/KR-DDS-001-Database-Design-Specification.md)

## 06-API

- [KR-ADS-001 — API Design Specification](06-API/KR-ADS-001-API-Design-Specification.md)

## 07-Frontend

- [KR-UXS-001 — UI UX Specification](07-Frontend/KR-UXS-001-UI-UX-Specification.md)

## 08-Backend

- [KR-BCK-002 — Tenancy Lifecycle](08-Backend/KR-BCK-002-Tenancy-Lifecycle.md)

- [KR-BCK-001 — Backend Foundation](08-Backend/KR-BCK-001-Backend-Foundation.md)

## 09-Security

- [KR-SEC-001 — Security Architecture and Threat Model](09-Security/KR-SEC-001-Security-Architecture-and-Threat-Model.md)

## 10-Testing

- [KR-TST-001 — Test Strategy and Acceptance Plan](10-Testing/KR-TST-001-Test-Strategy-and-Acceptance-Plan.md)

## 11-Operations

- [KR-OPS-001 — Local Operations and Recovery Guide](11-Operations/KR-OPS-001-Local-Operations-and-Recovery-Guide.md)

## 12-Deployment

- [KR-DEP-001 — Deployment and Release Readiness](12-Deployment/KR-DEP-001-Deployment-and-Release-Readiness.md)

## 13-Engineering-Handbook

- [KR-ENG-001 — Engineering Handbook](13-Engineering-Handbook/KR-ENG-001-Engineering-Handbook.md)

## 14-ADR

- [ADR-006 — Historical Tenancies and Migrations](14-ADR/ADR-006-Historical-Tenancies-and-Migrations.md)

- [ADR-001 — Single API and React Native Client](14-ADR/ADR-001-Single-API-and-React-Native-Client.md)
- [ADR-002 — PostgreSQL with Embedded Local Mode](14-ADR/ADR-002-PostgreSQL-with-Embedded-Local-Mode.md)
- [ADR-003 — Integer Cent Ledger and Reversals](14-ADR/ADR-003-Integer-Cent-Ledger-and-Reversals.md)
- [ADR-004 — Opaque Sessions and Owner Isolation](14-ADR/ADR-004-Opaque-Sessions-and-Owner-Isolation.md)
- [ADR-005 — Defer Integrations and Event Infrastructure](14-ADR/ADR-005-Defer-Integrations-and-Event-Infrastructure.md)

## 15-Research

- [KR-RES-001 — Evidence and Assumptions Register](15-Research/KR-RES-001-Evidence-and-Assumptions-Register.md)

## 16-Templates

- [KR-TPL-001 — Controlled Document Template](16-Templates/KR-TPL-001-Controlled-Document-Template.md)
- [KR-TPL-002 — Architecture Decision Template](16-Templates/KR-TPL-002-Architecture-Decision-Template.md)

## 17-Wiki

- [KR-WIK-001 — Project Guide and FAQ](17-Wiki/KR-WIK-001-Project-Guide-and-FAQ.md)

## 18-Release-Notes

- [KR-REL-002 — Tenancy Lifecycle](18-Release-Notes/KR-REL-002-Tenancy-Lifecycle.md)

- [KR-REL-001 — Initial Local Baseline](18-Release-Notes/KR-REL-001-Initial-Local-Baseline.md)

## 19-Compliance

- [KR-CMP-001 — Privacy and Rental Records Review](19-Compliance/KR-CMP-001-Privacy-and-Rental-Records-Review.md)

## 20-Training

- [KR-TRN-001 — Landlord Quick Start and Walkthrough](20-Training/KR-TRN-001-Landlord-Quick-Start-and-Walkthrough.md)

## Reading the status labels

**Implemented** means source exists; it does not imply every acceptance test has passed. **Partial** identifies a supported subset. **Planned** means no implementation should be assumed. Document approval remains separate from feature status.

TaxiSphere supplied the organizational pattern; its transport features, company identity, technology choices and approval claims are not part of KasiRent.

- [KR-BCK-003 — Effective-Month Rent](08-Backend/KR-BCK-003-Effective-Month-Rent.md)
