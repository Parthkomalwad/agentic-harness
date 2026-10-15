# Deployment and operations (compact)

Use this when the `deploy-strategy` and `devops` skills are not available (for example in a claude.ai chat). When they are, hand off to them instead.

## Where to run it (cheapest that fits)
| Part | Default | Move to |
|---|---|---|
| Static site or SPA | Cloudflare Pages (free, unlimited static bandwidth) | Private S3 + CloudFront with Origin Access Control if it must live in AWS |
| Media and downloads | Cloudflare R2 (no egress fees) | S3 for AWS integration and lifecycle tiers |
| Next.js with heavy SSR | Vercel Pro | OpenNext on Cloudflare or AWS to cut per-seat cost |
| Small API | Render ($7/month) or Fly.io | Containers on ECS or Cloud Run as load grows |
| Spiky or event-driven | Cloudflare Workers, AWS Lambda, Cloud Run | |
| Many small apps, fixed budget | One VPS with Coolify | |
| Postgres | Neon (scales to zero) | Supabase when auth and storage are needed; RDS or Aurora for steady AWS load |

Prices change: state the date and tell the user to check current pricing.

## How it gets there (match the level to the project)
1. **Platform deploys**: Git integration, preview per PR, production on merge.
2. **CI/CD**: test, build once, staging, promote the same artifact to production.
3. **Infrastructure as code**: Terraform or CDK, plan on PR, apply on merge.
4. **Platform**: containers, GitOps, shared modules, for many services or teams.

## Always
Secrets in a secret store with OIDC from CI, never in the repo. Staging and production separated. One-step rollback, tested. Backward-compatible migrations (expand, then contract). Health checks, error tracking with release tags, billing alerts from day one.

## Output for the design doc
A **Deployment** section: hosting per component with monthly cost for low, medium and high traffic, the delivery level and pipeline stages, the rollout strategy (rolling, blue/green, canary or feature flags), and the rollback plan.
