---
name: research
description: Research a topic across web, GitHub, Reddit, X, YouTube and more, cross-check claims and return a cited report. Use when the user asks to research, compare or find out what people say about something.
---

# Research

Uses [Agent Reach](https://github.com/Panniantong/Agent-Reach) for platform access. If `agent-reach` is not installed, tell the user to install it (`pip install agent-reach` then `agent-reach install`), and fall back to WebSearch and WebFetch.

## 0. Pick the depth
- Quick question: answer with a few searches, still citing sources.
- Real research (several angles, needs cross-checking): run the bundled workflow `/research-pack:deep <question>`. It plans angles, collects in parallel, grades sources A to E, fact-checks, and returns only the cited report to this conversation.
- If the `firecrawl` pack is enabled, prefer its tools for reading pages, scraping and site-wide search.

Everything searched or fetched this session is recorded by the sources tracker. `/sources` lists it and opens a Sources pane, so the user can audit what the answer is based on.

## 1. Plan
Turn the question into 3 to 6 angles. For each, pick sources: official docs and changelogs, GitHub issues and code, Reddit and X for practitioner opinion, YouTube transcripts for talks. Run `agent-reach doctor --json` to see which channels work.

## 2. Collect
Fetch in parallel. Keep each source to the facts that answer the question; for long pages or transcripts use `system-one`'s `sd.mjs summarize` if available. Record for each fact: the claim, the source URL, the date.

## 3. Cross-check
Grade each source: **A** official or peer-reviewed primary, **B** reputable secondary, **C** practitioner report with evidence, **D** opinion, **E** unverified. A claim is **verified** when two independent sources agree, or one primary source (official docs, the code itself) states it. Opinions are reported as opinions, with how common they were. Drop claims you cannot trace to a source.

## 4. Report
- **Answer** in three sentences.
- **Findings**: a table of claim, status (verified, opinion, single source), sources.
- **Disagreements**: where sources conflict, and which is more credible and why.
- **Gaps**: what you could not find.
- **Sources**: every URL used, as links.

Never present an unverified claim as fact. Dates matter: say how recent each source is.
