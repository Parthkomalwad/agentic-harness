---
name: council
description: Convene a council of Claude agents on a hard decision: independent answers, anonymous peer ranking, then a chairman synthesis. Use for architecture, product or tech-choice decisions where one pass is not enough.
---

# Council

Modeled on Karpathy's LLM Council, with Claude agents instead of several vendors. Diversity comes from four lenses and two model sizes, not from different companies. Say this limit to the user once.

Members (agents in this pack): `pragmatist` (Sonnet), `skeptic` (Opus), `user-advocate` (Sonnet), `architect` (Opus).

## Stage 0: Frame
Restate the question in one paragraph with the facts that matter: goal, constraints, what has been tried, files to read. If the question is vague, ask up to three questions first. Every member gets the identical brief.

## Stage 1: Independent answers
Spawn all four members **in parallel**, in one message, with the identical brief. They must not see each other's work.

## Stage 2: Anonymous peer ranking
Shuffle the four answers and label them Response A to D. Keep the mapping to yourself. Spawn the four members again in parallel. Give each the brief and all four labelled answers, without names or models, and ask:
- Rank A to D from best to worst for accuracy and insight.
- One line per response: its strongest point and its biggest flaw.
- End with a line `RANKING: X, Y, Z, W`.

Compute the average rank of each response.

## Stage 3: Chairman synthesis
You are the chairman. Write the final answer from the answers, the reviews and the average ranks:
1. **Decision**: one or two sentences.
2. **Why**: the reasoning the council agreed on.
3. **Dissent**: the strongest objection that did not win, and when it would become right.
4. **Next steps**: three concrete actions.
5. **Scoreboard**: a table of each member, its label, its average rank.

Do not average opinions into mush. Pick a position. If the council split badly, say so and name the one fact that would settle it.

Cost: about 8 agent runs. For small questions, answer directly instead and say why.
