# Contributing to agentic-harness

Thanks for helping. This guide is the standard process for adding anything to the harness. Follow it and your pull request should pass review on the first try.

## Ground rules

1. **`main` is protected.** Nobody pushes to it directly. Every change is a pull request from a branch, and it must pass CI.
2. **Off by default.** Every pack except `core` sets `"defaultEnabled": false`.
3. **Context is a budget.** Keep skill descriptions short (300 characters or fewer) and specific about *when* to use the skill. Put long reference material in extra files the skill links to, so it loads only when needed.
4. **Point upstream, don't copy.** If a good tool already lives in another repo, add a marketplace entry that points to it. Don't paste its files here.
5. **Prefer a CLI over an MCP server.** MCP tool schemas load every session. A script in `bin/` costs nothing until it runs.
6. **No secrets.** Declare keys as `userConfig` with `"sensitive": true`. Never commit a key, token or `.env` file.
7. **Hooks and mods fail safe.** If a guard can't decide, it asks the user. It never auto-approves on error.
8. **No AI attribution.** Commits and PR descriptions must not contain `Co-Authored-By` trailers or "Generated with" lines for AI tools. You are the author of what you submit. CI checks this.
9. **No em dashes.** Use a comma, a colon or parentheses instead. CI rejects files that contain one.

## Branch names

Create a branch from an up-to-date `main`:

```bash
git checkout main
git pull
git checkout -b <type>/<short-name>
```

| Prefix | Use for | Example |
|---|---|---|
| `pack/` | A new pack | `pack/ui-pack` |
| `feat/` | New skill, agent, workflow, hook or mod in an existing pack | `feat/glassbox-quiz-gate` |
| `external/` | A new upstream entry | `external/agent-reach` |
| `fix/` | A bug fix | `fix/validate-frontmatter` |
| `docs/` | Documentation only | `docs/primitives-table` |

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): `feat(ui-pack): add design-md-picker skill`.

## Add a new pack

1. **Create the folder.**

   ```text
   plugins/<pack-name>/
   ├── .claude-plugin/plugin.json
   └── skills/<skill-name>/SKILL.md
   ```

   Add `agents/`, `workflows/`, `hooks/`, `bin/` only if the pack needs them.

2. **Write `plugin.json`.** `name` must be kebab-case and match the folder. It must not start with `claude-`, `anthropic-` or `cc-plugin-`. Include `version`, `description` and `license`.

   ```json
   {
     "name": "my-pack",
     "version": "0.1.0",
     "description": "One sentence: what the pack does.",
     "author": { "name": "Your Name" },
     "license": "MIT"
   }
   ```

3. **Write each skill.** The frontmatter `name` must match the skill's folder name.

   ```markdown
   ---
   name: my-skill
   description: What it does. Use when <specific trigger>.
   ---

   # My skill

   Instructions for Claude...
   ```

4. **Register the pack** in `.claude-plugin/marketplace.json`:

   ```json
   {
     "name": "my-pack",
     "source": "./plugins/my-pack",
     "description": "One sentence for the /plugin listing.",
     "category": "ui",
     "tags": ["ui", "audit"],
     "defaultEnabled": false,
     "metadata": {
       "intents": ["audit my UI", "check accessibility", "review UX"]
     },
     "relevance": {
       "topic": "UI audits",
       "signals": { "filesRead": ["**/*.tsx"] }
     }
   }
   ```

   `metadata.intents` is required (at least 3): the problems the pack solves, written the way a user would say them. The `packs` skill matches on these. `relevance.signals` is optional: files, commands or dependencies that suggest the pack.

5. **Update the README** catalogue table, and add a preset to `templates/` if the pack is meant to be used with others.

## Add an upstream (external) entry

Add one entry to `.claude-plugin/marketplace.json`. No files are needed.

```json
{
  "name": "tool-name",
  "source": { "source": "github", "repo": "owner/repo" },
  "description": "Upstream: what it does.",
  "category": "external",
  "tags": ["..."],
  "defaultEnabled": false
}
```

If the plugin lives in a subfolder of a bigger repo, use `git-subdir`:

```json
"source": { "source": "git-subdir", "url": "owner/repo", "path": "skills/tool-name" }
```

Check the upstream license allows use, and say which license it is in the PR.

## Which Claude Code piece to use

| You want to... | Use |
|---|---|
| Give Claude know-how or a procedure | Skill |
| Run a role in its own context (reviewer, tracer) | Agent |
| Run many agents in a fixed order | Workflow (`workflows/*.js`) |
| Block, allow or log a tool call with a script | Settings hook (`hooks/hooks.json`) |
| Draw a pane, hold a tool call and ask the user, or add an instant `/command` | Mod |
| Ship a command-line tool | `bin/` |
| Reach an external system that has no CLI | MCP server (last resort) |

See [docs/claude-code-primitives.md](docs/claude-code-primitives.md) for details.

## Test before you open the PR

```bash
# Catalogue rules (the same check CI runs)
node scripts/validate.mjs

# Claude Code's own validator
claude plugin validate .
claude plugin validate ./plugins/<pack-name> --strict

# Try the pack in a real session without installing it
claude --plugin-dir ./plugins/<pack-name>
```

## Open the pull request

```bash
git push -u origin <type>/<short-name>
gh pr create --fill
```

Fill in the PR template checklist. A maintainer reviews it, CI must be green, and then it is squash-merged into `main`.
