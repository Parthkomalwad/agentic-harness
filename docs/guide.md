# Guide

Everything the README leaves out: how to use the harness day to day, in cloud sessions and claude.ai, and how it is built.

## Use it in three steps

**1. Add the marketplace and the core pack** (once per machine):

```text
/plugin marketplace add Parthkomalwad/agentic-harness
/plugin install core@agentic-harness
/plugin install harness-band@agentic-harness
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

**See what is on.** `harness-band` draws a line above the prompt with the harness packs that are on, context use and session cost. `/harness` prints the same line, even while Claude is working.

**3. Say yes.** It writes `.claude/settings.json` in that project. Run `/reload-plugins`, then ask for the work:

```text
/ui-pack:ui-build pricing page in the Linear style
/deploy-pack:deploy-strategy
```

Installing a pack by hand leaves it **off** (every pack except `core` defaults to off). Turn it on with `claude plugin enable <pack>@agentic-harness`, in `/plugin` under Installed, or per project in `.claude/settings.json`.

**Workflows:** packs with workflows (`/research-pack:deep`, `/orchestrator:sweep`) need Dynamic workflows. On the Pro plan, turn them on in `/config`.

**Check it loaded:** `/plugin` shows `1 mod active · harness-band` under its tabs when the band mod is running (needs Claude Code v2.1.287 or later, and a trusted folder). `/harness` prints the band's summary.

Prefer to choose by hand? Copy a preset from [`templates/`](../templates/) into `.claude/settings.json`:

| Preset | Packs |
|---|---|
| [`minimal.json`](../templates/minimal.json) | `core` |
| [`ui.json`](../templates/ui.json) | `core`, `ui-pack` (and its dependencies) |
| [`methodology.json`](../templates/methodology.json) | `core`, `superpowers` |

## Use it in cloud sessions

Cloud sessions ([claude.ai/code](https://claude.ai/code), `claude --cloud`, the mobile and Desktop apps) start from a fresh clone of your repo and **do not install plugins** that a repo lists in `.claude/settings.json`. Set the harness up once on the cloud environment instead, and every session that uses it gets the packs:

1. Open [claude.ai/code](https://claude.ai/code), edit your environment, and set network access to **Trusted** (or allow `github.com`).
2. Paste this as the **Setup script**, listing the packs you want:

```bash
git clone --depth 1 https://github.com/Parthkomalwad/agentic-harness /tmp/agentic-harness
HARNESS_PACKS="core harness-band memory-pack ui-pack deploy-pack" bash /tmp/agentic-harness/scripts/cloud-setup.sh
```

3. Start a session. New packs you add to this repo arrive automatically, because the script installs from the latest `main`.

Keys that packs need (such as `TYPESAFE_API_KEY`) go in the environment's **network secrets**, never in the setup script, which anyone using the environment can read.

`memory-pack` is built for this: its memory is Markdown committed under `.claude/memory/`, so it is in every clone, local or cloud.

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

More in [docs/claude-code-primitives.md](claude-code-primitives.md).

## Roadmap

| Item | Purpose |
|---|---|
| More upstream entries | Remotion and HyperFrames skills for motion-pack, Agent Reach as a plugin when it ships one |
| Pack evals in CI | Run the eval suites on every release once an API budget is set |

Have an idea? [Open a pack proposal](https://github.com/Parthkomalwad/agentic-harness/issues/new?template=pack-proposal.md).

## Security

Hooks and mods run code on your machine with your permissions. Install packs only from sources you trust, and read any hook or mod first. `claude plugin validate <dir>` lists what a mod hooks into. Keys go in your system keychain through `userConfig`, never in a file.

## Credits

`motion-pack` adapts the method from the guide *How to Build a Motion Design Studio With Opus 5.5* (raycfu). `council-pack` follows the design of Andrej Karpathy's [LLM Council](https://github.com/karpathy/llm-council). `architect-pack` uses the six pillars of the [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/).
