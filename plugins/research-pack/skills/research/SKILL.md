---
name: research
description: Research a topic across web, GitHub, Reddit, X, YouTube and more, cross-check claims and return a cited report. Use when the user asks to research, compare or find out what people say about something.
---

# Research

Uses [Agent Reach](https://github.com/Panniantong/Agent-Reach) for platform access. If `agent-reach` is not installed, tell the user to install it (`pip install agent-reach` then `agent-reach install`), and fall back to WebSearch and WebFetch.

## 1. Plan
Turn the question into 3 to 6 angles. For each, pick sources: official docs and changelogs, GitHub issues and code, Reddit and X for practitioner opinion, YouTube transcripts for talks. Run `agent-reach doctor --json` to see which channels work.

## 2. Collect
Fetch in parallel. Keep each source to the facts that answer the question; for long pages or transcripts use `system-one`'s `sd.mjs summarize` if available. Record for each fact: the claim, the source URL, the date.

## 3. Cross-check
A claim is **verified** when two independent sources agree, or one primary source (official docs, the code itself) states it. Opinions are reported as opinions, with how common they were. Drop claims you cannot trace to a source.

## 4. Report
- **Answer** in three sentences.
- **Findings**: a table of claim, status (verified, opinion, single source), sources.
- **Disagreements**: where sources conflict, and which is more credible and why.
- **Gaps**: what you could not find.
- **Sources**: every URL used, as links.

Never present an unverified claim as fact. Dates matter: say how recent each source is.
