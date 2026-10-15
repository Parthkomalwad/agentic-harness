---
name: security-audit
description: Review a diff or project for security problems: leaked secrets, vulnerable dependencies and OWASP Top 10 issues. Use before a push or release, or when the user asks if code is secure.
---

# Security audit

Work through these in order and report findings ranked by severity (critical, high, medium, low), each with `file:line`, the risk in one line, and the fix.

1. **Secrets.** Search the diff and tracked files for keys, tokens, passwords and private keys (`gitleaks detect` if installed, otherwise grep for common patterns like `AKIA`, `sk-`, `-----BEGIN`, `password=`). Check `.gitignore` covers `.env`.
2. **Dependencies.** Run the ecosystem's audit: `npm audit --omit=dev`, `pip-audit`, `cargo audit`, `govulncheck`. Report only reachable, fixable issues first.
3. **OWASP review of changed code:** injection (SQL, shell, template), broken access control (missing auth or ownership checks), unsafe deserialization, SSRF (user-controlled URLs), XSS (unescaped output), weak crypto or homemade auth, sensitive data in logs, missing rate limits on auth endpoints.
4. **Config.** Debug mode in production, permissive CORS, public buckets, default credentials.

Rules: show evidence, not guesses; mark anything uncertain as "check". Never print a secret you find; show its location and type only, and tell the user to rotate it.
