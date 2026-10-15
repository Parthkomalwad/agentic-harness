---
name: devops
description: Set up the delivery pipeline for a project: CI/CD, infrastructure as code, containers, environments, secrets, safe rollout and rollback. Use when the user asks for CI/CD, DevOps, pipelines, Docker, Terraform, staging and production, or "how do I ship this safely".
---

# DevOps

Pair with `deploy-strategy`: that skill picks **where** to run (provider and cost). This one sets up **how** code gets there, safely and repeatably. If no hosting decision exists yet, run `deploy-strategy` first.

## 1. Read what exists
Find before writing: CI files (`.github/workflows`, `.gitlab-ci.yml`), `Dockerfile`, IaC (`*.tf`, `cdk.json`, `template.yaml`, `wrangler.toml`, `render.yaml`, `fly.toml`), env files, test and build commands. Extend what is there; do not replace a working setup without a reason.

## 2. Pick the level that fits
Match effort to the project. Do not give a weekend project a Kubernetes cluster.

| Level | Fits | Setup |
|---|---|---|
| 1. Platform deploys | Solo or small app on Vercel, Netlify, Cloudflare Pages, Render | Platform's Git integration: preview per PR, production on merge. CI only runs tests and lint |
| 2. CI/CD pipeline | Team project, any host | GitHub Actions (or the repo's CI): test, build once, deploy to staging, promote the same artifact to production |
| 3. Infrastructure as code | Cloud resources (AWS, GCP, Azure), more than a few services | Terraform or CDK in the repo, plan on PR, apply on merge, remote state with locking |
| 4. Platform | Many services or teams | Containers on ECS, Cloud Run or Kubernetes, GitOps, shared modules |

State the level and why. Read `references/pipeline.md` for the pipeline and `references/rollout.md` for release safety.

## 3. Non-negotiables at every level
- **Build once, deploy many**: the artifact tested is the artifact shipped. Tag images by commit SHA, never `latest`.
- **Secrets** live in the CI or cloud secret store, never in the repo, logs or images. Use OIDC from CI to the cloud instead of long-lived keys.
- **Environments**: at least preview (or staging) and production, with production config separate and access restricted.
- **Rollback in one step**, tested once before you need it.
- **Database migrations** run as their own step, backward compatible (expand, then contract; see `db-pack`).
- **Observability** hooked into deploys: release tag on errors, health check gates (see `observability-pack`).
- **Least privilege** for the deploy identity.

## 4. Deliver
Write the files (workflow, Dockerfile, IaC), a `DEPLOY.md` with how to deploy, roll back and add a secret, and a short list of manual steps the user must do once (create the cloud role, add secrets). Ask before creating any paid resource. Run the pipeline once on a branch and report the result.
