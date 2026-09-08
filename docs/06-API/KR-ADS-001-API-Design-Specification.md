---
document_id: KR-ADS-001
title: "KasiRent API Design Specification"
version: 0.2.0
status: Draft
classification: Internal
owner: "Engineering"
project: KasiRent
last_updated: 2026-09-08
---

# KR-ADS-001 — API Design Specification

## Document control

| Field | Value |
| --- | --- |
| Document ID | KR-ADS-001 |
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

Describe the existing HTTP contract rather than a future REST redesign.

## Contents

- [Transport and common behaviour](#transport-and-common-behaviour)
- [Endpoint catalogue](#endpoint-catalogue)
- [Field constraints](#field-constraints)
- [Example payloads](#example-payloads)
- [Replay and security details](#replay-and-security-details)

## Transport and common behaviour

Default API base: http://localhost:3001. JSON bodies have a 32kb parser limit. Protected requests use Authorization: Bearer followed by the opaque token. Responses set Cache-Control: no-store and wildcard CORS in this local baseline. Success is HTTP 200, including creates; there is no /v1 prefix.

Validation normally returns 400 with an error string; bad sessions return 401; missing/foreign parents return 404; uniqueness or changed replay payloads return 409; auth throttling returns 429. Other errors use the generic 500 handler. Malformed JSON/body-limit behaviour is not a polished public contract and needs tests. Unknown paths may return Express HTML, not JSON.

## Endpoint catalogue

| Method / path | Auth | JSON request | Success |
| --- | --- | --- | --- |
| POST /auth/register | No | name, email, password | token; account{id,name,email} |
| POST /auth/login | No | email, password | Same shape |
| POST /logout | Yes | {} | {ok:true} |
| GET /state | Yes | None | properties[], rooms[], tenancies[], charges[], payments[] |
| POST /properties | Yes | name, address | Inserted property row |
| POST /rooms | Yes | property_id, name | Inserted room row |
| POST /tenancies | Yes | room_id, name, phone, rent, due_day, start_on (legacy start_month accepted) | Inserted tenancy row |
| POST /charges | Yes | month | {ok:true} |
| POST /payments | Yes | id, tenancy_id, amount, method, paid_on, reference | New or identical prior payment row |
| POST /payments/:id/void | Yes | reason | Updated payment row |

GET /state excludes accounts and sessions but returns the selected business rows' fields including owner. It has no filters, pagination or snapshot consistency guarantee. Order is unspecified. There is no receipt endpoint: the client constructs receipt text.

## Field constraints

name/address/IDs using the shared text validator: trimmed 1–200 characters. Email: valid syntax, maximum 200, normalized to lowercase; no verification. Password: 10–128 characters. phone: trimmed maximum 30 and required in JSON, though empty is valid. start_month/month: YYYY-MM with a valid numeric month. due_day: integer 1–28. rent/amount: integer cents 1–100,000,000.

Payment id must be a UUID. method is exactly Cash, EFT or Bank deposit. paid_on must be a real YYYY-MM-DD date no later than current UTC date. reference is required, trimmed up to 200 characters, and may be empty. reason is trimmed 1–200 characters.

## Example payloads

Creating a tenancy, after obtaining actual room_id from POST /rooms:

```json
{
  "room_id": "<returned room ID>",
  "name": "Example Renter",
  "phone": "",
  "rent": 150000,
  "due_day": 1,
  "start_on": "2026-01-01"
}
```

Recording R1,000:

```json
{
  "id": "b0a2173f-66b4-4b73-b929-66524f47a508",
  "tenancy_id": "<returned tenancy ID>",
  "amount": 100000,
  "method": "Cash",
  "paid_on": "2026-01-02",
  "reference": "January rent, first instalment"
}
```

Identifiers in angle brackets are placeholders, not usable records. Generate a fresh payment UUID for a new payment and retain it for retries. Do not change the amount on an existing request ID.

## Replay and security details

Before inserting, the server checks the payment ID and compares the complete accepted payload and owner. An exact sequential replay returns the old row, even if it was subsequently reversed. Do not interpret this as restoring the payment. Concurrent identical requests can produce a uniqueness conflict rather than two 200 responses; the primary key still prevents a second row.

No endpoint takes owner from the request body. Staff roles, password reset, exports, general record edits are not part of this contract.


## Move-out endpoint and date rules

POST /tenancies/:id/end requires authentication and JSON {"end_on":"2026-01-31","reason":"Moved home"}. Returns the ended tenancy including end_on, ended_at and end_reason. 400: invalid/future/pre-start date or missing reason. 404: foreign/missing tenancy. 409: different repeat or charges after the requested end month. An identical replay returns the stored row with unchanged ended_at.

New move-ins use start_on from 1900 through today in Africa/Johannesburg. A legacy start_month is translated to its first day; if both fields are present they must agree. A new active tenancy cannot overlap any existing interval. Monthly charging covers start through end month inclusively, in one transaction. Former tenants remain eligible for payment recording. No proration, end-date editing or refund is performed.

## References

- [KR-SRS-001 — Software Requirements Specification](../02-Requirements/KR-SRS-001-Software-Requirements-Specification.md)
- [KR-DDS-001 — Database Design Specification](../05-Database/KR-DDS-001-Database-Design-Specification.md)
- [KR-SEC-001 — Security Architecture and Threat Model](../09-Security/KR-SEC-001-Security-Architecture-and-Threat-Model.md)
