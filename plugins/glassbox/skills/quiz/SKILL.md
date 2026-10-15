---
name: quiz
description: Quiz the user on a change before they accept it, so they understand what was built. Use when the user asks to be quizzed, or before committing a large change they did not write.
---

# Quiz before accepting

1. Read the current diff (`git diff` plus staged changes).
2. Ask 3 to 5 questions, one at a time. Mix:
   - **What:** what does this function or change do?
   - **Why:** why this approach over the obvious alternative?
   - **Where:** which file handles X, and what calls it?
   - **What if:** what happens on bad input, failure or empty data?
3. Wait for each answer. Grade it: correct, partly correct (say what is missing), or wrong (explain with `file:line`).
4. Never give the answer before the user tries.
5. At the end, give a score and list the parts the user should reread. If the score is under 60%, suggest walking through `docs/FLOW.md` before committing.
