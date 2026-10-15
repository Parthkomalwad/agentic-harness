# Deployment playbook

## Static site or SPA
- Default: **Cloudflare Pages**. Free, unlimited static bandwidth, commercial use allowed.
- Heavy media or downloads: assets in **R2** (zero egress), site on Pages.
- Must stay in AWS (company account, compliance, credits): **private S3 bucket + CloudFront with Origin Access Control + ACM certificate + Route 53**. Add a CloudFront Function for SPA routing. Never a public S3 website endpoint.
- Next.js with heavy SSR or ISR: **Vercel Pro** if per-seat cost is fine; otherwise OpenNext on Cloudflare or AWS.

## API or backend
- Small, low traffic, sleeping is acceptable: **Render free**.
- Always on, small: **Render $7** or the smallest **Fly.io** machine.
- Many small apps on one budget: one **VPS with Coolify**. Cheapest at scale, but you own patches, backups and uptime.
- Spiky or event-driven: **Cloudflare Workers** (JS/TS, small CPU budget) or **AWS Lambda / Cloud Run** (scale to zero).
- Websockets or global low latency: **Fly.io**.

## Database
- Postgres, bursty or low traffic: **Neon** (scale to zero, a branch per PR).
- Auth, storage and realtime together: **Supabase** ($25 floor).
- Database per tenant or edge reads: **Turso**.
- Already on AWS with steady load: RDS or Aurora, priced with reserved capacity.

## Storage
- Public or egress-heavy: **R2**.
- AWS-integrated, lifecycle tiers (Glacier), event triggers: **S3**.

## Cost rules
1. Egress is usually the biggest surprise. Estimate GB out per month first.
2. Free tiers that sleep or pause are for demos, not production.
3. Set billing alerts and spend caps on day one (AWS Budgets, Railway limits).
4. Fewer providers means fewer bills and fewer outages to debug.
5. Start on the cheapest option with a clear exit path, and write the exit path down.
