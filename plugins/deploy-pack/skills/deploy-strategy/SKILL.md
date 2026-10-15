---
name: deploy-strategy
description: Audit a project and recommend the most cost-effective hosting stack (static, CDN, storage, API, database) with monthly cost estimates and risks. Use when the user asks where or how to deploy, or how to cut hosting cost.
---

# Deploy strategy

Provider data: `${CLAUDE_PLUGIN_ROOT}/providers.json`, with the date it was checked. Decision rules: `references/playbook.md`.

## 1. Audit the project (read, do not guess)
Record each item with the file that proves it:
- Type: static site, SPA, SSR framework (which one), API, workers, cron, websockets.
- Runtime and build: language, framework, build command, output folder, Dockerfile.
- Data: database type, file uploads, object storage, caches, queues.
- Needs: auth, email, custom domains, regions, compliance.
- Traffic: ask for monthly visitors, bandwidth and data size if unknown. Without numbers, use low, medium and high scenarios.
- Existing cloud: accounts or credits the user already has (AWS, Cloudflare, GCP).

## 2. Recommend
Use the playbook, then give:
1. **Recommended stack**: one line per layer (frontend, CDN, storage, API, database, DNS).
2. **Monthly cost table** per traffic scenario, with each line's unit price.
3. **Two alternatives**: the cheapest possible, and the most hands-off.
4. **Risks and limits**: free-tier traps, cold starts, egress, lock-in.
5. **Exit plan**: what to move first when cost or traffic grows.

Before the final answer, re-check the `pricingUrl` of every provider you recommend and state the date. If live prices differ from `providers.json`, say so and suggest updating the file.

## 3. Deploy (only when the user says go)
Write the config files (for example `wrangler.toml`, `render.yaml`, `Dockerfile`, CDK or Terraform), a CI deploy job, and a short `DEPLOY.md` with the commands. Keys go in CI secrets, never in the repo. Ask before creating any paid cloud resource.

Rules: give real numbers, not "cheap". Prefer fewer providers. Never recommend a public S3 website endpoint; use CloudFront with Origin Access Control, or R2.
