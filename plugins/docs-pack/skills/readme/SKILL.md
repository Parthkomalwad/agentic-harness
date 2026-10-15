---
name: readme
description: Create a new README, or restructure and update an existing one, so it explains clearly what the project does and looks good on GitHub. Use when the user asks for a README or better docs.
---

# README

Goal: a visitor knows what the project does, who it is for and how to start within ten seconds of opening the page.

## 1. Read before writing
- Read the code, the manifest (`package.json`, `pyproject.toml`, etc.), CI, LICENSE and any existing README. Never describe a feature you have not found in the code.
- Find the real install command, the real first command to run, and what it outputs. Run them if it is safe.
- If a README exists, keep every fact, link and section the user wrote that is still true. Restructure; do not throw content away. Show the user what you removed and why.

## 2. Structure
Follow `references/structure.md`. Order by what a visitor needs: what it is, why, how to start, then details.

## 3. Visuals
- A hero at the top: a screenshot, a short GIF, or a diagram SVG with dark and light versions (`<picture>` with `prefers-color-scheme`). See `references/visuals.md`.
- Badges in one accent color, at most five, each linking somewhere real (CI, license, package, docs).
- Tables for options, commands and comparisons. Code blocks for anything the reader types.

## 4. Writing rules
- Plain, concrete sentences. Say what it does, not how amazing it is. No "blazing fast", "revolutionary", "seamless".
- No em dashes. Use a comma, colon or parentheses.
- One idea per sentence. Short paragraphs. Active voice.
- Every command block must work when pasted.
- Respect the project's own rules (its CLAUDE.md or CONTRIBUTING.md) about tone and attribution.

## 5. Check
- Every relative link and image path exists in the repo.
- The quick start works from a fresh clone.
- Headings make a clean table of contents.
- Read the rendered result as a stranger: can you say what it does after the first screen? If not, fix the tagline and the first section.
