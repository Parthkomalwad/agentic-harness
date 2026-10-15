---
name: ship
description: Create a branch, write conventional commits, open a pull request and draft release notes following the repo rules. Use when the user asks to commit, open a PR, or release.
---

# Ship

## Before anything
Read the repo rules: `CLAUDE.md`, `CONTRIBUTING.md`, PR templates. **Their rules override everything below**, including attribution: if they say no AI attribution, add no `Co-Authored-By` trailer and no "Generated with" line.

## Branch
Never commit to `main` or `master` when it is protected or the rules say PRs only. Name: `<type>/<short-kebab-name>` (`feat/`, `fix/`, `docs/`, `chore/`), unless the repo says otherwise.

## Commit
- Check `git status` first. Never stage `.env`, keys, build output or large binaries.
- Conventional Commits: `type(scope): imperative summary` under 72 characters. Body says why, not what.
- One logical change per commit.

## Pull request
- Title like the commit summary. Body: what changed, why, how it was tested, risks. Fill the repo's PR template if one exists.
- Run the project's checks before opening (tests, lint, validators). Report results honestly.
- `gh pr create`; then watch checks with `gh pr checks --watch` and fix failures.

## Release notes
From merged PRs since the last tag: group into Added, Changed, Fixed, Security. User-facing language. Update `CHANGELOG.md` if the repo keeps one, and bump versions the repo tracks.
