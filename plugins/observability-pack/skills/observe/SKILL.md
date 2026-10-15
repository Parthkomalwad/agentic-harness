---
name: observe
description: Add structured logging, health checks, metrics, tracing and error tracking to a service. Use when the user wants to monitor, debug production, or add logging or alerts.
---

# Observability

Add the minimum that answers: is it up, is it slow, what broke, for whom.

1. **Structured logs.** JSON logs with `level`, `msg`, `request_id`, `user_id` (if allowed), `duration_ms`. One line per request plus errors. Use the stack's standard logger (pino, structlog, zap, slog). Never log secrets, tokens or full request bodies.
2. **Request IDs.** Accept or generate one per request, pass it to downstream calls, include it in every log line and error response.
3. **Health checks.** `/healthz` (process alive, no dependencies) and `/readyz` (dependencies reachable). Keep them cheap and unauthenticated.
4. **Error tracking.** Sentry or an OpenTelemetry exporter, with release and environment tags. Capture unhandled errors once, with the request ID.
5. **Metrics.** The four golden signals: request rate, error rate, latency (p50, p95, p99), saturation. OpenTelemetry if the project already has it or will need tracing.
6. **Alerts.** Alert on symptoms users feel (error rate, p95 latency, health check down), not on CPU. Each alert links to a runbook line.

Keep vendor keys in environment variables. Prefer OpenTelemetry so the backend can change later.
