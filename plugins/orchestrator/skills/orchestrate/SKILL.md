---
name: orchestrate
description: Plan large multi-file work as a dynamic workflow (scan, fix, verify) instead of doing it turn by turn. Use for codebase-wide audits, sweeps, migrations or anything touching many files.
---

# Orchestrate

For work that touches many files, use a workflow instead of the main conversation. Intermediate results stay in the script and only the final answer reaches context.

1. Size it first. Under 5 files: just do it, no workflow. Otherwise run the bundled `/orchestrator:sweep <goal>`, or write a workflow for a different shape.
2. Run on a small slice first (one directory) to check cost and quality, then widen.
3. Model per stage: a small model scans and lists, a mid model edits, a strong model verifies or signs off.
4. Every edit happens in an isolated copy, and only changes the verifier proves are kept.
5. Report: what changed, what was rejected and why, and what needs a human.

Before editing a workflow script, load `/workflow-authoring` for the exact runtime API of this Claude Code version.
