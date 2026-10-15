---
name: lean-code
description: Write the smallest change that solves the real problem. Use when writing, fixing or refactoring code.
---

# Lean code

Before writing code, read the code it touches and trace the real flow. Then pick the first option that works:

1. Does this need to exist? If the need is speculative, skip it and say so in one line.
2. Is it already in this codebase? Reuse it.
3. Does the standard library or the platform do it? Use that.
4. Does an installed dependency do it? Use that. Do not add a new dependency for a few lines of code.
5. Only then, write the minimum code that works.

Rules:
- No abstraction with a single implementation. No config for a value that never changes.
- Fix bugs at the root cause, in the shared function, not in each caller.
- Never cut input validation, error handling that prevents data loss, security checks or accessibility basics.
- Leave one runnable check for non-trivial logic.
