---
name: packs
description: List agentic-harness packs and enable or disable them for this project. Use when the user asks which packs exist or wants to turn one on or off.
---

# Manage harness packs

Packs are plugins in the `agentic-harness` marketplace. Every pack except `core` is off by default. A project turns packs on in its own `.claude/settings.json`, so other projects pay no context for them.

To list packs, run:

```bash
claude plugin list
```

To enable a pack for this project only, add it to `enabledPlugins` in `.claude/settings.json` at the project root:

```json
{
  "enabledPlugins": {
    "taste-skill@agentic-harness": true
  }
}
```

Set the value to `false` to disable it. Tell the user to run `/reload-plugins` afterwards.

Ready-made presets: https://github.com/Parthkomalwad/agentic-harness/tree/main/templates
