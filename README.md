<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/assets/hero-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="docs/assets/hero-light.svg">
  <img src="docs/assets/hero-dark.svg" alt="The agentic-harness hub in the centre with eleven packs around it. Six packs are switched on for this project and linked to the hub; the rest are dimmed and cost zero tokens." width="900">
</picture>

<br>

### A plug-and-play catalogue for Claude Code. Describe your problem, get the right skills and agents, and pay nothing for the rest.

[![validate](https://github.com/Parthkomalwad/agentic-harness/actions/workflows/validate.yml/badge.svg)](https://github.com/Parthkomalwad/agentic-harness/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-D97757?labelColor=1F1E1D)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude_Code-plugin_marketplace-D97757?labelColor=1F1E1D)](https://code.claude.com/docs/en/plugins-reference)
[![Packs](https://img.shields.io/badge/packs-11-D97757?labelColor=1F1E1D)](#catalogue)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-D97757?labelColor=1F1E1D)](CONTRIBUTING.md)

[TL;DR](#tldr) ·
[Use it](#use-it-in-three-steps) ·
[Catalogue](#catalogue) ·
[claude.ai](#use-skills-in-claudeai-and-claude-desktop) ·
[How it works](#how-it-works) ·
[Contributing](CONTRIBUTING.md)

</div>

<br>

## TL;DR

- **What:** one Claude Code marketplace with small packs: UI design, motion video, deployment strategy, READMEs, architecture, a multi-agent council, and more.
- **Why:** most setups install everything and fill the context window. Here every pack except `core` is **off**, and a pack that is off costs **zero tokens**.
- **How:** add the marketplace, install `core`, then tell Claude your problem. It picks the packs that fit and switches them on for that project only.

```text
/plugin marketplace add Parthkomalwad/agentic-harness
/plugin install core@agentic-harness
```

> **Off means zero.** No skills, no agents, no tokens from a pack you did not switch on. You choose per project, in one settings file.

## Use it in three steps

**1. Add the marketplace and the core pack** (once per machine):

```text
/plugin marketplace add Parthkomalwad/agentic-harness
/plugin install core@agentic-harness
```

**2. Say what you are working on.** The `packs` skill matches your problem to the catalogue:

```text
I need a landing page that does not look AI-generated, and then a cheap place to host it
```

```text
Pack           Why it fits                                   Adds
ui-pack        "build a landing page", tsx files in repo      style, components, screenshot audit
deploy-pack    "where should I deploy this"                   cost-ranked hosting plan
Enable both for this project? (y/n)
```

**3. Say yes.** It writes `.claude/settings.json` in that project. Run `/reload-plugins`, then ask for the work:

```text
/ui-pack:ui-build pricing page in the Linear style
/deploy-pack:deploy-strategy
```

Prefer to choose by hand? Copy a preset from [`templates/`](templates/) into `.claude/settings.json`:

| Preset | Packs |
|---|---|
| [`minimal.json`](templates/minimal.json) | `core` |
| [`ui.json`](templates/ui.json) | `core`, `ui-pack` (and its dependencies) |
| [`methodology.json`](templates/methodology.json) | `core`, `superpowers` |

## Catalogue

### Build

| Pack | What it does | Try |
|---|---|---|
| `ui-pack` | UI without the AI look. DESIGN.md style from real brands, components from curated shadcn registries ([Planes](https://useplanes.com), [Arc](https://uiarc.dev), [Space UI](https://spaceui.one), [Componentry](https://componentry.dev)), then build, screenshot, audit, fix | `build a dashboard in the Vercel style` |
| `motion-pack` | Launch videos and product reels rendered from code: frame-exact renderer, springs, beat grid, a critique loop on contact sheets | `make a 20s vertical launch video for <url>` |
| `docs-pack` | Creates or restructures a README: hero, tagline, quick start, checked links | `rewrite this README so people get it in 10 seconds` |

### Decide

| Pack | What it does | Try |
|---|---|---|
| `architect-pack` | Requirements, two or three real options, a review against the six Well-Architected pillars, a decision record, and design artifacts. Also runs in claude.ai | `design the architecture for a booking app` |
| `council-pack` | An LLM council made of Claude agents: four lenses answer alone, rank each other anonymously, and a chairman decides | `/council-pack:council Postgres or DynamoDB for this?` |
| `deploy-pack` | Audits the project, then a cost table per traffic level across Cloudflare, AWS, Vercel, Render, Fly.io, a VPS, Neon, Supabase and Turso, with risks and an exit plan | `where should I deploy this, cheaply?` |

### Foundation

| Pack | What it does |
|---|---|
| `core` (**on**) | Lean-code rules, and the `packs` skill that finds and switches on packs |

### Upstream (linked, not copied)

| Pack | Source | What it does |
|---|---|---|
| `taste-skill` | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | Art direction for UI, image-to-code, redesign styles |
| `playwright-cli` | [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli) | Token-efficient browser automation. Needs `npm i -g @playwright/cli` |
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | About 100 rules for auditing UI |
| `superpowers` | [obra/superpowers](https://github.com/obra/superpowers) | Brainstorm, plan, TDD, subagent execution and review |

## Use skills in claude.ai and Claude Desktop

Some skills help in plain chats too, not only in Claude Code. `architect` is the main one: brainstorm a product in a chat, and it walks through requirements, options and the pillar review, and draws diagrams and UI concepts as artifacts when they help.

1. Download the skill zip (for example `architect.zip`) from the [latest release](https://github.com/Parthkomalwad/agentic-harness/releases/latest).
2. In claude.ai, open **Settings**, find **Skills** under Capabilities (some accounts show it under Features), and upload the zip. Code execution must be on.
3. Start a chat: `Help me design the architecture for my product idea: ...`

Every skill in the repo is published as a zip on each release.

## How it works

```text
agentic-harness/                       one repo is one marketplace
├── .claude-plugin/marketplace.json    the catalogue and its semantic index
├── plugins/<pack>/
│   ├── .claude-plugin/plugin.json
│   ├── skills/      know-how, loaded only when used
│   ├── agents/      roles that run in their own context
│   ├── workflows/   scripts that run many agents in phases
│   ├── hooks/       guards and automation
│   └── *.json       data the skills read (registries, providers)
├── templates/                         per-project presets
├── scripts/validate.mjs               catalogue rules, run in CI
└── .github/workflows/                 validation and skill-zip releases
```

Each catalogue entry carries the index the `packs` skill matches on:

| Field | What it holds |
|---|---|
| `metadata.intents` | Problems the pack solves, in a user's words |
| `relevance.signals` | Files, commands and dependencies that suggest the pack |
| `tags`, `category` | Grouping for search |

What each Claude Code piece costs while idle:

| Piece | Cost while idle | Use it for |
|---|---|---|
| Skill | its description only | Know-how, procedures, checklists |
| Agent | its description only | Roles: reviewer, council member |
| Workflow | none | Many agents in phases; only the final answer reaches your context |
| Hook or mod | none | Guards, panes, instant commands |
| MCP server | high, every session | Last resort, for systems with no CLI |

More in [docs/claude-code-primitives.md](docs/claude-code-primitives.md).

## Roadmap

| Pack | Purpose |
|---|---|
| `glassbox` | Open the black box: `DECISIONS.md`, `FLOW.md`, and a quiz before you accept a change |
| `orchestrator` | Haiku scans, Sonnet edits, agents cross-check, Opus signs off, as dynamic workflows |
| `system-one` | Cheap small models ([Jev](https://docs.typesafe.ai), [ScaleDown](https://docs.scaledown.ai)) for judgment and extraction |
| `research-pack` | Research across the web, GitHub, Reddit, X and YouTube with [Agent Reach](https://github.com/Panniantong/Agent-Reach), cross-checked and cited |

## Contributing

New packs, skills and upstream entries are welcome. `main` only accepts pull requests, and every PR must pass CI. [CONTRIBUTING.md](CONTRIBUTING.md) is the step-by-step guide.

## Security

Hooks and mods run code on your machine with your permissions. Install packs only from sources you trust, and read any hook or mod first. `claude plugin validate <dir>` lists what a mod hooks into. Keys go in your system keychain through `userConfig`, never in a file.

## Credits

`motion-pack` adapts the method from the guide *How to Build a Motion Design Studio With Opus 5.5* (raycfu). `council-pack` follows the design of Andrej Karpathy's [LLM Council](https://github.com/karpathy/llm-council). `architect-pack` uses the six pillars of the [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/).

## License

[MIT](LICENSE). Upstream packs keep their own licenses.
