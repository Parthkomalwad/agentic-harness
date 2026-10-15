---
name: flow
description: Map how the code actually flows for one feature or change and write docs/FLOW.md. Use when the user asks how something works, or after a change that spans several files.
---

# Flow map

1. Ask (or infer) the scope: one feature, endpoint or user action. Never map the whole repo.
2. Use the `flow-tracer` agent to trace the real call path. It reads the code in its own context and returns only the path, so the main conversation stays small.
3. Write or update the section for that feature in `docs/FLOW.md`:

```markdown
## <feature>
Entry: `path/file.ts:line` (route, command or event)

1. `file:line` function: what it does with the data
2. `file:line` function: ...

Data: what shape enters, what is stored, what is returned.
Side effects: database writes, network calls, files, queues.
Changed in this task: the steps that the current change touched, marked **(changed)**.
```

4. Add a Mermaid `sequenceDiagram` when there are more than four hops.
5. Every step cites `file:line`. If a step is a guess, mark it **(unverified)**.
