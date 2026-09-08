# KasiRent architecture

The current implementation is an Expo/React Native client, one Express API and PostgreSQL-compatible persistence. It runs locally with PGlite unless DATABASE_URL selects an external PostgreSQL server.

- [Architecture specification](docs/03-Architecture/KR-SAD-001-Software-Architecture-Document.md)
- [Context, container and payment diagrams](docs/03-Architecture/KR-ARC-001-C4-and-Sequence-Views.md)
- [Database model](docs/05-Database/KR-DDS-001-Database-Design-Specification.md)
- [API contract](docs/06-API/KR-ADS-001-API-Design-Specification.md)
- [Decision records](docs/README.md#14-adr)

Logical module separation is a planned refactor; the current backend primarily lives in server/app.mjs. There are no microservices, message broker, payment provider or AI service.
