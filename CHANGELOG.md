# Changelog

All notable changes. Each pack also carries its own `version` in `plugins/<pack>/.claude-plugin/plugin.json`, bumped whenever the pack changes.

## Unreleased

### Added
- `research-pack` 0.2.0: `/research-pack:deep` workflow (plan, parallel collect, A to E source grading, fact-check, cited report) and a sources tracker mod with `/sources` and a Sources pane, with a unit test.
- Upstream `firecrawl` entry. CI now runs mod tests with `claude plugin test`.

### Fixed
- `research-pack` 0.2.1: when workflows are off, the research skill runs parallel subagents instead, and never answers research from memory alone.
- The band mod never loaded: Claude Code reserves the plugin name `core` for its own layer. The mod now ships as its own always-on pack, `harness-band`. `core` 0.2.1 keeps the skills.

### Added
- `deploy-pack` 0.2.0: `devops` skill for CI/CD, infrastructure as code, containers, environments, rollout and rollback.
- `architect-pack` 0.2.0: deployment and operations phase that hands off to deploy-pack, with a compact fallback for claude.ai.
- `ui-pack` 0.2.0: `ux-psychology` skill with attention and reading patterns, laws of UX, and layout playbooks per use case; wired into `ui-build`.
- `memory-pack`: repo-committed Markdown memory with a SessionStart index loader, and an upstream entry for claude-mem (as `session-mem`).
- `scripts/cloud-setup.sh` and a README section for installing packs in cloud sessions.
- `core` 0.2.0: harness band mod above the prompt (active packs, context %, cost) and the instant `/harness` command.
- Ten packs: `glassbox`, `system-one`, `research-pack`, `orchestrator`, `test-pack`, `security-pack` (with a dangerous-command guard), `db-pack`, `observability-pack`, `ship-pack`, `launch-pack`.
- Original 3D voxel mascot in the hero.
- `scripts/build-docs.mjs` generates the README catalogue, packs badge and hero from `marketplace.json`. CI fails when they drift.
- Behaviour evals for every local skill (`plugins/<pack>/evals/`), run on demand by the `evals` workflow.
- CI requires a version bump in any pack whose files change.
- Monthly `price-check` workflow opens an issue when deploy-pack prices are older than 60 days.
- `SECURITY.md` and this changelog.

## v0.2.0 (2026-10-16)

### Added
- `council-pack`: an LLM council of four Claude agents with anonymous peer ranking and a chairman synthesis.
- `architect-pack`: system and product design with a Well-Architected pillar review and design artifacts. Ships as a claude.ai skill zip.
- Release workflow that publishes every skill as an uploadable zip.
- README rewrite with a TL;DR and a three-step guide, and a Claude-palette hero.

## v0.1.0 (2026-10-15)

### Added
- Marketplace with `core` and upstream entries for `superpowers`, `taste-skill`, `playwright-cli` and `web-design-guidelines`.
- `ui-pack`, `motion-pack`, `docs-pack` and `deploy-pack`.
- Semantic index: `metadata.intents` and `relevance` signals, and the `packs` skill that matches a problem to packs.
- Catalogue validator, CI, branch protection and contributor guide.

### Fixed
- Catalogue entries lost in a merge (duplicate JSON keys). The validator now rejects duplicate keys.
