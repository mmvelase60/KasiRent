# Contributing to KasiRent

Start with the [engineering handbook](docs/13-Engineering-Handbook/KR-ENG-001-Engineering-Handbook.md) and [documentation standard](docs/00-Governance/Standards/KR-STD-001-Documentation-and-Branding-Standard.md).

Tie changes to a requirement and acceptance example. Preserve integer-cent arithmetic, owner checks and payment history. Keep secrets, local databases and personal records out of source control. Read applicable AGENTS.md files before code changes.

Run the checks appropriate to the change. The existing integration test requires DATABASE_URL unset; see the [test strategy](docs/10-Testing/KR-TST-001-Test-Strategy-and-Acceptance-Plan.md). For documentation-only work, validate links, IDs, metadata and factual consistency.

Update affected specifications and the register with every feature. Do not label planned infrastructure as deployed or drafts as approved.
