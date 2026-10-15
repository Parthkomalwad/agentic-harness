---
name: cheap-models
description: Route simple judgments and extraction to cheap small models (Jev, ScaleDown) instead of reading everything into context. Use for large files, yes/no checks, classification, or summaries.
---

# Cheap models

Two command-line tools ship with this pack. Run them with node.

| Need | Tool |
|---|---|
| Yes/no probability, pick one option, score on a scale | `node ${CLAUDE_PLUGIN_ROOT}/scripts/jev.mjs` (TypeSafe Jev) |
| Pull fields from a long document, classify text, summarize | `node ${CLAUDE_PLUGIN_ROOT}/scripts/sd.mjs` (ScaleDown) |

## When to use
- A file over about 20k tokens that you only need a few facts from: run `sd.mjs extract` or `sd.mjs summarize` and read the result, not the file.
- A judgment that does not need reasoning: "is this log line an error", "which of these 5 files is the config". Use `jev.mjs`.
- Ranking or filtering many items before the expensive step.

## When not to use
- Writing or editing code, creative writing, multi-step reasoning, anything where being wrong is costly. Do that yourself.
- When the answer needs the full context to be right.

## Keys
`TYPESAFE_API_KEY` for Jev and `SCALEDOWN_API_KEY` for ScaleDown, set in the user's environment. If a key is missing, say so and fall back to reading the file yourself. Never print a key.

## Jev
`jev.mjs <state-file|-> <questions.json>`. Questions are a map of name to question:
```json
{
  "is_error": { "type": "noul", "instructions": "Does this log show a failure?" },
  "area": { "type": "choice", "instructions": "Which area is affected?", "criteria": { "auth": null, "billing": null, "ui": null } },
  "severity": { "type": "score", "instructions": "How severe?", "criteria": ["cosmetic", "degraded", "outage"] }
}
```
Results come back as probabilities. Treat anything between 0.35 and 0.65 as unsure and check it yourself.

## ScaleDown
`sd.mjs <extract|classify|summarize> <file> [instructions]`. For extract, put the fields you want in the instructions, for example `"due date, total amount, parties"`.
