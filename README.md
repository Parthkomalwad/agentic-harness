<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/assets/hero-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="docs/assets/hero-light.svg">
  <img src="docs/assets/hero-dark.svg" alt="The agentic-harness marketplace lists packs. A project switches some packs on in its own settings file, and packs that are off cost zero tokens." width="900">
</picture>

<br>

### A plug-and-play catalogue for Claude Code. Small packs of skills, agents, workflows, hooks and mods, switched on only in the projects that need them.

[![validate](https://github.com/Parthkomalwad/agentic-harness/actions/workflows/validate.yml/badge.svg)](https://github.com/Parthkomalwad/agentic-harness/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-2DD4BF?labelColor=0F1117)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude_Code-plugin_marketplace-2DD4BF?labelColor=0F1117)](https://code.claude.com/docs/en/plugins-reference)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-2DD4BF?labelColor=0F1117)](CONTRIBUTING.md)
[![Status](https://img.shields.io/badge/status-early-E7B24B?labelColor=0F1117)](#roadmap)

[Quick start](#quick-start) ·
[Catalogue](#catalogue) ·
[How it works](#how-it-works) ·
[Roadmap](#roadmap) ·
[Contributing](CONTRIBUTING.md)

</div>

<br>

## What it solves

Claude Code can do a lot more than chat: skills, subagents, dynamic workflows, hooks, mods. The good ones are scattered across dozens of repos, and most setups go one of two ways. Either they force one method on every task, or they install everything at once and fill the context window before you type a word.

agentic-harness is one marketplace with small packs. Every pack except `core` is **off by default**. A UI project switches on the UI tools. A backend project leaves them off and pays nothing for them.

> **Off means zero.** A pack that is off adds no skills, no agents and no tokens to your session. You choose per project, in one settings file.

- **One catalogue.** Every pack is one entry in [`marketplace.json`](.claude-plugin/marketplace.json). Add an entry and a folder, and CI checks the rest.
- **Upstream, not copied.** Great tools stay in their own repos. The harness links to them and adds the glue between them.
- **Context is a budget.** Short skill descriptions, workflows that return only the final answer, and CLIs instead of MCP servers wherever a CLI works.
- **No black box.** Packs on the roadmap record why the agent made each decision and how the code flows, and quiz you before you accept a change.
- **Safe by default.** Keys go in your system keychain, never in a file. Guards that cannot decide ask you. They never approve on their own.

## Quick start

In Claude Code:

```text
/plugin marketplace add Parthkomalwad/agentic-harness
/plugin install core@agentic-harness
```

Or from your shell:

```bash
claude plugin marketplace add Parthkomalwad/agentic-harness
claude plugin install core@agentic-harness
```

Switch packs on for **one project only**. Copy a preset from [`templates/`](templates/) into that project's `.claude/settings.json`:

```json
{
  "enabledPlugins": {
    "core@agentic-harness": true,
    "ui-pack@agentic-harness": true
  }
}
```

Then run `/reload-plugins`.

| Preset | Packs |
|---|---|
| [`minimal.json`](templates/minimal.json) | `core` |
| [`ui.json`](templates/ui.json) | `core`, `ui-pack` (and its dependencies) |
| [`methodology.json`](templates/methodology.json) | `core`, `superpowers` |

## Find the right pack

You don't need to know the catalogue. With `core` on, describe the problem:

```text
I need to put this site online cheaply
```

The `packs` skill reads the catalogue, matches your problem against each pack's intents and your project's files, proposes the fewest packs that fit, and switches them on for this project after you agree.

Each catalogue entry carries the index it matches on:

| Field | What it holds |
|---|---|
| `metadata.intents` | Problems the pack solves, in a user's words |
| `relevance.signals` | Files, commands and dependencies that suggest the pack. Claude Code can also show these as install tips |
| `tags`, `category` | Grouping for search |

## Catalogue

| Pack | Source | What it does |
|---|---|---|
| `core` | this repo, **on** | Lean-code rules, and the `packs` skill that switches packs on and off |
| `ui-pack` | this repo | UI without the AI look: DESIGN.md style, curated shadcn registries ([Planes](https://useplanes.com), [Arc](https://uiarc.dev), [Space UI](https://spaceui.one), [Componentry](https://componentry.dev), [Skecher](https://skecher-ui.com)), build, screenshot, audit, fix. Pulls in `taste-skill`, `playwright-cli` and `web-design-guidelines` |
| `motion-pack` | this repo | Launch videos, product reels and showreels rendered from code: `seek(t)` renderer, springs, beat grid, contact-sheet critique loop. Method adapted from the guide *How to Build a Motion Design Studio With Opus 5.5* (raycfu) |
| `docs-pack` | this repo | `readme` skill: create, restructure or update a README with a hero, clear tagline, quick start and checked links |
| `deploy-pack` | this repo | `deploy-strategy` skill: audits a project and recommends the cheapest fitting stack (Cloudflare Pages and R2, S3 and CloudFront, Vercel, Render, Fly.io, VPS, Neon, Supabase, Turso) with cost tables, risks and an exit plan |
| `taste-skill` | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | Art direction for UI work: image-to-code, redesign and style skills |
| `playwright-cli` | [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli) | Token-efficient browser automation for screenshots and checks. Needs `npm i -g @playwright/cli` |
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | About 100 rules for auditing UI: accessibility, UX, performance |
| `superpowers` | [obra/superpowers](https://github.com/obra/superpowers) | Brainstorm, plan, TDD, subagent execution and review, as one method |

## How it works

```text
agentic-harness/                       one repo is one marketplace
├── .claude-plugin/marketplace.json    the catalogue, the single source of truth
├── plugins/
│   └── <pack>/
│       ├── .claude-plugin/plugin.json
│       ├── skills/      know-how, loaded only when used
│       ├── agents/      roles that run in their own context
│       ├── workflows/   scripts that run many agents in phases
│       ├── hooks/       guards and automation (settings hooks or mods)
│       └── bin/         CLIs on PATH while the pack is on
├── templates/                         per-project presets
├── scripts/validate.mjs               catalogue rules, run in CI
└── docs/                              reference and design notes
```

| Piece | Cost while idle | Use it for |
|---|---|---|
| Skill | its description only | Know-how, procedures, checklists |
| Agent | its description only | Roles: reviewer, tracer, auditor |
| Workflow | none | Many agents in phases. Only the final answer reaches your context |
| Hook or mod | none | Guards, panes, instant `/commands` |
| `bin/` tool | none | CLIs Claude runs by name |
| MCP server | high, every session | Last resort, for systems with no CLI |

Full table: [docs/claude-code-primitives.md](docs/claude-code-primitives.md).

## Roadmap

| Pack | Purpose | Built from |
|---|---|---|
| `glassbox` | Open the black box: `DECISIONS.md`, `FLOW.md`, and a quiz before you accept a change | Skills, a tracer agent, a quiz-gate mod |
| `orchestrator` | Haiku scans, Sonnet edits, agents cross-check, Opus signs off | Dynamic workflows, role agents |
| `system-one` | Cheap small models for judgment and extraction, so the big model only decides | [TypeSafe Jev](https://docs.typesafe.ai), [ScaleDown](https://docs.scaledown.ai) |
| `research-pack` | Research across the web, GitHub, Reddit, X and YouTube, cross-checked and cited | [Agent Reach](https://github.com/Panniantong/Agent-Reach), workflows |

## Contributing

New packs, skills and upstream entries are welcome. `main` only accepts pull requests, and every PR must pass CI. [CONTRIBUTING.md](CONTRIBUTING.md) is the step-by-step guide.

## Security

Hooks and mods run code on your machine with your permissions. Install packs only from sources you trust, and read the code of any hook or mod first. `claude plugin validate <dir>` lists what a mod hooks into before you install it.

## License

[MIT](LICENSE). Upstream packs keep their own licenses.
