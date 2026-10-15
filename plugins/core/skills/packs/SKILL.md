---
name: packs
description: Find and enable the agentic-harness packs that fit the user's problem or this project. Use when the user describes a task a pack might cover, asks which packs exist, or wants a pack turned on or off.
---

# Find and manage harness packs

The catalogue is the semantic index. Every pack entry in `marketplace.json` has:
- `description`: what it does
- `metadata.intents`: problems it solves, in a user's words
- `relevance.signals`: files, commands and dependencies that suggest it
- `tags` and `category`

## 1. Load the catalogue
Read the local copy first:
`~/.claude/plugins/marketplaces/agentic-harness/.claude-plugin/marketplace.json`

If it is missing, fetch it:
`gh api repos/Parthkomalwad/agentic-harness/contents/.claude-plugin/marketplace.json --jq .content | base64 -d`

## 2. Match
Match on meaning, not exact words. Compare the user's problem with each pack's `intents`, `description` and `tags`. Also look at the project: its files, manifests and the commands in use, against each pack's `relevance.signals`.

Pick the fewest packs that cover the need, at most three. Fewer packs means less context.

## 3. Propose, then enable
Show a short table: pack, why it fits (which intent or signal matched), what it adds. Ask before changing anything.

After the user agrees, add the packs to `enabledPlugins` in the project's `.claude/settings.json` (merge, do not overwrite other keys):

```json
{
  "enabledPlugins": {
    "ui-pack@agentic-harness": true
  }
}
```

If a pack is not installed yet, tell the user to run `/plugin install <pack>@agentic-harness`. Then tell them to run `/reload-plugins`.

To turn a pack off, set its value to `false`.

## 4. Nothing fits
Say so plainly. Do not force a pack. Suggest opening a pack proposal: https://github.com/Parthkomalwad/agentic-harness/issues/new?template=pack-proposal.md
