---
name: db-design
description: Design schemas, write safe zero-downtime migrations and review indexes and slow queries. Use for any database schema, migration or query performance work.
---

# Database design

## Schema
- Start from the access patterns: list the 5 most frequent queries before choosing tables.
- Every table: a primary key, `created_at`, and `updated_at` where rows change. Foreign keys with explicit `ON DELETE`.
- Use the database to enforce rules: `NOT NULL`, `UNIQUE`, `CHECK`, foreign keys. Do not leave them to app code alone.
- Multi-tenant: a `tenant_id` on every tenant table, in every index that serves tenant queries, and row-level security or a mandatory filter.
- Money as integer minor units or `numeric`, never float. Timestamps with time zone.

## Migrations (zero downtime: expand, migrate, contract)
1. **Expand**: add new columns or tables as nullable or with defaults; deploy code that writes both old and new.
2. **Migrate**: backfill in batches (for example 1,000 rows per transaction), resumable.
3. **Contract**: switch reads, then drop the old column in a later release.
- Never rename or drop a column in the same deploy that stops using it.
- Postgres: `CREATE INDEX CONCURRENTLY`; add `NOT NULL` via a `CHECK ... NOT VALID` then `VALIDATE`. Set a `lock_timeout`.
- Every migration has a down path or a written reason it cannot.

## Queries and indexes
Run `EXPLAIN (ANALYZE, BUFFERS)` (or the engine's equivalent). Look for sequential scans on large tables, row estimate errors, and sorts spilling to disk. Index columns in the order: equality filters, then range, then sort. Check for unused and duplicate indexes before adding more.
