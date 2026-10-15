---
name: ux-psychology
description: Ground layout and content decisions in how people actually read, scan and decide: attention, reading patterns, cognitive load, and the right layout per use case. Use when planning or reviewing any page, flow or dashboard.
---

# UX psychology

Design for how people behave, not how we wish they behaved. People **scan, they don't read**. They decide in seconds whether a page is worth their time, and they leave when the next step is unclear.

## 1. Name the job first
Before layout, write one line each:
- **Who** arrives, from where (ad, search, email, internal tool), on which device.
- **The one action** this page exists for.
- **What they need to believe** to take it (proof, price, safety, speed).

Then pick the playbook in `references/use-cases.md`. Different jobs need different layouts: a landing page persuades, a dashboard monitors, docs answer, a form completes.

## 2. Apply attention and reading rules
Read `references/attention.md`. The core rules:
- **Front-load.** The first screen and the first two words of every heading, label and list item carry most of the meaning, because that is what people actually read.
- **Match the scan pattern to the content.** Text-heavy pages are read in an F-pattern, so put key words at the left edge. Sparse marketing pages follow a Z-pattern. Docs need a layer-cake: scannable headings, each a complete statement.
- **One primary action per view.** Make it the most prominent element. Everything else is visibly secondary.
- **Cut choices and words.** Every extra option slows the decision (Hick's law). Remove before you add.

## 3. Apply the laws of UX
Use `references/laws.md` as a checklist on the design: Fitts (size and distance of targets), Hick (number of choices), Jakob (follow conventions), Gestalt proximity and similarity (grouping), Von Restorff (one thing stands out), serial position (first and last are remembered), peak-end (finish strong), Doherty (respond under 400 ms), Tesler (move complexity off the user).

## 4. Check it
For every page you build or review, report a short table:

| Check | Pass or fix |
|---|---|
| The one action is obvious within 5 seconds of first view | |
| The first screen states what it is, for whom, and why it matters | |
| Headings and labels front-load the key word | |
| Choices per decision point are as few as the task allows | |
| Related things are grouped; unrelated things are separated by space | |
| Targets are large and close to where the thumb or cursor already is | |
| Feedback for every action within 400 ms (or a visible loading state) | |
| Readable: 45 to 75 characters per line on desktop, 16px+ body text, sufficient contrast | |

## Rules
- Cite the principle behind each layout decision in one short clause, so the reasoning is visible.
- Evidence beats folklore. The "8-second attention span" figure is a myth; the real finding is that people leave quickly unless the page earns attention, and stay when it does.
- Never use dark patterns: fake urgency, hidden costs, confirm-shaming, pre-checked opt-ins, hard-to-cancel flows. They lift a metric briefly and destroy trust.
- Accessibility is part of psychology: people under stress, on small screens or with impairments are your normal users, not an edge case.
