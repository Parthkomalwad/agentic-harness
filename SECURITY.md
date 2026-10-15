# Security

## What runs on your machine

Packs can contain code that runs with your permissions:

- **Hooks** run shell commands on Claude Code events.
- **Mods** run JavaScript inside Claude Code. They are not sandboxed and can read files, environment variables and your session.
- **Scripts** that skills tell Claude to run (for example `motion-pack/scripts/render.mjs`).

Upstream packs (`superpowers`, `taste-skill`, `playwright-cli`, `web-design-guidelines`) come from their own repositories. This repository does not review every upstream change.

Before you install a pack with hooks or mods, read its code. `claude plugin validate ./plugins/<pack>` lists every event a mod hooks and every API it calls.

## Rules every pack follows

- No secrets in the repository. Keys are declared as `userConfig` with `"sensitive": true` and stored in your system keychain.
- Guards fail safe. A hook or mod that cannot decide asks you. It never approves on error.
- No MCP server where a CLI works, which keeps the attack surface small.
- CI rejects packs that break the catalogue rules, and GitGuardian scans every PR for leaked secrets.

## Report a vulnerability

Do not open a public issue. Use [GitHub private vulnerability reporting](https://github.com/Parthkomalwad/agentic-harness/security/advisories/new), or email parthkomalwad99@gmail.com with:

- the pack and file affected,
- what an attacker can do,
- steps to reproduce.

You will get a reply within 7 days. Fixes ship as a patch release, and the advisory credits you unless you ask otherwise.
