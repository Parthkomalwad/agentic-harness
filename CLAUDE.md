# CLAUDE.md

## Git commits and pull requests

- Do not add `Co-Authored-By: Claude ...` or any other Claude or Anthropic attribution to commit messages.
- Do not add "Generated with Claude Code" or similar lines to pull request descriptions.
- The only author and contributor on this repository is Parth Komalwad.
- Never push to `main`. Work on a branch named `<type>/<short-name>` (`pack/`, `feat/`, `external/`, `fix/`, `docs/`) and open a pull request.
- Commit messages follow Conventional Commits: `feat(ui-pack): add design-md-picker skill`.

## Writing

- Never use em dashes (U+2014) in any file, commit message or PR text. Use a comma, a colon or parentheses. CI rejects files that contain one.
- Write plain, concrete English. Short sentences. Say what a thing does, not how great it is.

## Secrets

- Never print, log or commit an API key or token. Packs that need a key declare it as `userConfig` with `"sensitive": true`.
- Before every commit, run `git status` and confirm no `.env` file is staged.

## Catalogue rules

- `.claude-plugin/marketplace.json` is the single source of truth. Every pack has exactly one entry.
- Every pack except `core` sets `"defaultEnabled": false`.
- Plugin names are kebab-case and never start with `claude-`, `anthropic-` or `cc-plugin-`.
- Point to upstream repos with `github` or `git-subdir` sources. Do not copy another project's files into this repo.
- Skill frontmatter `name` matches its folder. Descriptions are 300 characters or fewer and say when to use the skill.
- Prefer a CLI in `bin/` over an MCP server.
- Hooks and mods fail safe: if a guard cannot decide, it asks the user. It never approves on error.

## Project

- Check the catalogue with `node scripts/validate.mjs`, and each pack with `claude plugin validate ./plugins/<pack> --strict`. CI runs both on every PR.
- Try a pack without installing it: `claude --plugin-dir ./plugins/<pack>`.
- A new pack adds one row to the README catalogue (or roadmap) table, and a preset in `templates/` if it is meant to be used with other packs.
- The README hero lives in `docs/assets/hero-dark.svg` and `hero-light.svg`. Keep both in sync.
- `CONTRIBUTING.md` is the public version of these rules. Update it when a rule here changes.
