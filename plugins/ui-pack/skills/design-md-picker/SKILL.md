---
name: design-md-picker
description: Copy one brand's DESIGN.md (Stripe, Linear, Vercel, Notion and more) into the project as the design spec. Use when the user names a style to copy or asks for a design system.
---

# DESIGN.md picker

Source: https://github.com/VoltAgent/awesome-design-md (MIT). Each file covers palette, type, components, layout, elevation, and do's and don'ts.

1. List what is available: `gh api repos/VoltAgent/awesome-design-md/contents/design-md --jq '.[].name'`
2. Pick the closest match to what the user asked for. If unclear, offer three.
3. Download only that one file into the project root as `DESIGN.md`. Never load several at once.
4. Read it and follow it for every UI change. Treat it as the source of truth for tokens.
5. Do not copy logos, brand names or product copy. Take the system, not the identity.
