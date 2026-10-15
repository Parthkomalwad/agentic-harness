---
name: component-sources
description: Pick and install real components from curated shadcn registries instead of writing UI from scratch. Use when building a hero, dashboard, AI chat, or any animated UI.
---

# Component sources

The curated registries live in `${CLAUDE_PLUGIN_ROOT}/registries.json`. Read it first.

1. Match the job to a registry by its `bestFor` tags. Prefer `tier: "free"`, then `"freemium"` free components.
2. Never install from a registry with `tier: "inspiration-only"`. Study its demos for ideas, then build your own version.
3. Fetch the docs for the one component you need. Do not load whole-library docs files.
4. Install with the registry's `install` command, filling `{name}`. The source lands in the project, so edit it to fit the design tokens.
5. Never use a Pro component unless the user says they have a license.
6. Tell the user which registry and component you used, and its license.

The project needs shadcn set up (`components.json`). If it is missing, run `npx shadcn@latest init` first and ask before changing an existing setup.
