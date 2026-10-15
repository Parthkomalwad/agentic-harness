---
name: ui-build
description: Full UI loop that avoids generic AI design: style, components, build, screenshot, audit, fix. Use when the user asks to build or redesign a page or app UI.
---

# UI build loop

Do these in order. Do not skip the screenshot and audit steps.

1. **Style.** If no `DESIGN.md` exists, use the `design-md-picker` skill or ask for a reference.
2. **Direction.** Apply the `taste-skill` art direction. Banned: centered title on a gradient, everything fading in, purple-blue default gradients, glow on UI, emoji as icons, identical card grids.
3. **Components.** Use the `component-sources` skill before writing a complex component by hand.
4. **Build.** Real content and real data shapes, no lorem ipsum. Mobile first.
5. **Screenshot.** With `playwright-cli`, capture each page at 375px and 1440px. Look at the screenshots yourself.
6. **Audit.** Run the `web-design-guidelines` review on the changed files.
7. **Fix.** Fix the three worst problems from steps 5 and 6, then screenshot again. Repeat until nothing critical is left, at most three rounds.
8. **Report.** List the components used with their licenses, and what you would improve next.
