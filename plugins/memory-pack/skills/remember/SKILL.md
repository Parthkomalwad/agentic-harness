---
name: remember
description: Save and recall project memory (decisions, conventions, gotchas, preferences) as Markdown in .claude/memory/. Use when the user says remember, recall, "what did we decide", or when you learn something future sessions need.
---

# Project memory

Memory lives in the repo at `.claude/memory/`, so it travels with git: other machines, teammates and cloud sessions all see it. At session start, this pack prints `INDEX.md` into context. Topic files load only when needed.

## Layout
```
.claude/memory/
├── INDEX.md          one line per memory: - [Title](file.md): hook
└── <slug>.md         one fact or topic per file
```

Each memory file:
```markdown
---
name: <slug>
description: <one line, used to decide relevance>
type: decision | convention | gotcha | preference | reference
updated: YYYY-MM-DD
---

<the fact>. **Why:** <reason>. **How to apply:** <when it matters>.
```

## Save
Save when the user asks, or when you learn something a future session would otherwise have to rediscover: a decision and its reason, a convention not visible in the code, a gotcha that cost time, a user preference, a pointer to an external system.

Do not save what the code, git history, README or CLAUDE.md already says, secrets, or facts that only matter to the current task.

Before saving, check `INDEX.md` for an existing file on the topic and update it instead of adding a duplicate. Delete memories that turn out to be wrong. Keep `INDEX.md` under 150 lines; merge or prune when it grows. Use absolute dates, not "yesterday".

## Recall
Read `INDEX.md` (already in context at start), open only the files whose description matches the question, and say which memory you used. Memory can be stale: if it names a file, function or flag, check it still exists before relying on it.
