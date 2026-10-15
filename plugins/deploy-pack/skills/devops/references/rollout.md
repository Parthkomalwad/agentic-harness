# Rollout and rollback

## Strategies

| Strategy | How | Use when |
|---|---|---|
| **Recreate** | Stop old, start new | Dev and internal tools where a short outage is fine |
| **Rolling** | Replace instances a few at a time | Default for stateless services; most platforms do this |
| **Blue/green** | Run new beside old, switch traffic at once, keep old for instant rollback | Need instant rollback; can afford double capacity briefly |
| **Canary** | Send a small share (for example 5%) of traffic to the new version, watch metrics, then increase | High traffic, risky changes; needs good metrics |
| **Feature flags** | Ship code dark, turn on per user or percentage | Decouple deploy from release; fastest rollback (flip the flag) |

## Gates
- Health checks must pass before traffic shifts.
- Automatic rollback on: error rate above baseline, p95 latency above target, failed health checks.
- Deploy freezes and approvals for production on regulated or critical systems.

## Rollback
- Keep the previous artifact and config; rollback redeploys it, it does not rebuild.
- Migrations that cannot be undone break rollback. Use expand and contract so the previous version still works with the new schema.
- Write the rollback command in `DEPLOY.md` and try it once on staging.

## Environments
- **Preview**: per PR, short-lived, seeded test data.
- **Staging**: production-like config and data shape, no real customer data unless anonymized.
- **Production**: restricted access, audited changes, backups tested (a backup never restored is not a backup).

## DORA metrics to watch
Deployment frequency, lead time for changes, change failure rate, time to restore. Improve them by making changes smaller and rollbacks easier, not by adding approvals.
