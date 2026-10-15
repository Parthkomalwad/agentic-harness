# The six Well-Architected pillars

From the AWS Well-Architected Framework. The questions apply to any cloud or stack.

| Pillar | Ask | Common fixes |
|---|---|---|
| Operational excellence | How do we deploy, observe and recover? Who is paged, and what do they see? | Infrastructure as code, CI/CD, structured logs, dashboards, runbooks, small reversible changes |
| Security | Who can access what? How is data protected at rest and in transit? Where are secrets? | Least-privilege IAM, SSO, encryption, a secrets manager, input validation, audit logs, dependency scanning |
| Reliability | What happens when a component, zone or provider fails? How do we restore data? | Health checks, retries with backoff, timeouts, multi-AZ, tested backups, defined RTO and RPO |
| Performance efficiency | Does it meet latency and throughput targets as load grows? | Caching, a CDN, the right data store per access pattern, async queues, load tests |
| Cost optimization | What does it cost per month and per user? What grows fastest? | Right-sizing, scale to zero, storage tiers, egress review, budgets and alerts |
| Sustainability | How much compute and data does it waste? | Managed and serverless services, efficient regions, data lifecycle rules, fewer idle resources |

Rate each pillar low, medium or high risk for the chosen design, with one fix per medium or high risk.
