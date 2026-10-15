---
name: decisions
description: Record the non-obvious decisions behind a change in docs/DECISIONS.md. Use after making a design or library choice, or when the user asks why something was done.
---

# Decision log

Append to `docs/DECISIONS.md` (create it if missing). Never rewrite old entries; add a new one that supersedes them.

Log a decision only if someone might reasonably argue about it six months from now: a library, a pattern, a data model, a tradeoff, a rejected approach. Do not log formatting, naming or obvious fixes.

Entry format:

```markdown
## YYYY-MM-DD: <decision in one line>
- **Context:** what problem forced a choice
- **Decision:** what was chosen
- **Alternatives:** what was rejected, and why, one line each
- **Consequences:** what this makes easy, what it makes hard, when to revisit
- **Files:** paths touched
```

Keep each entry under 12 lines. After writing, tell the user which decisions you logged.
