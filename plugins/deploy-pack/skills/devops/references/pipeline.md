# Pipeline

## Stages
1. **On every PR**: install with a lockfile and cache, lint, type check, unit tests, build. Fail fast, cheapest checks first. Security scan (dependency audit, secret scan). Preview deploy when the platform supports it.
2. **On merge to main**: build the artifact once (image tagged with the commit SHA, or a versioned bundle), push to a registry, deploy to staging, run smoke tests.
3. **Promote to production**: the same artifact, by an approval or automatically after staging passes. Run migrations first if they are backward compatible.
4. **After deploy**: health check, smoke test, watch error rate for a few minutes; roll back automatically or alert if it rises.

## GitHub Actions skeleton
```yaml
name: ci
on:
  pull_request:
  push:
    branches: [main]
permissions:
  contents: read
  id-token: write   # OIDC to the cloud, no long-lived keys
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run lint && npm test
  deploy:
    if: github.ref == 'refs/heads/main'
    needs: test
    runs-on: ubuntu-latest
    environment: production   # protection rules and secrets per environment
    steps:
      - uses: actions/checkout@v4
      # build once, tag with ${{ github.sha }}, push, deploy
```

## Containers
- Multi-stage Dockerfile: build stage with dev dependencies, small runtime stage (distroless or slim), non-root user, `HEALTHCHECK`.
- `.dockerignore` excludes `.git`, `node_modules`, `.env`, tests.
- Pin base images by digest for production; rebuild regularly for patches.

## Infrastructure as code
- Terraform or CDK (match the team's language). Remote state with locking (S3 plus DynamoDB, Terraform Cloud, GCS).
- `plan` on PR posted as a comment, `apply` only on merge to main, per environment.
- Modules for repeated patterns; no hand-made changes in the console (drift).
- Tag every resource with project and environment for cost tracking.

## Cost and speed
- Cache dependencies and Docker layers. Run jobs in parallel. Skip deploy jobs on docs-only changes with path filters.
- Self-hosted runners only when minutes cost more than maintenance.
