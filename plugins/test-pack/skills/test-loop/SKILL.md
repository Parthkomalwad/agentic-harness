---
name: test-loop
description: Write focused tests for a change, run them, and fix until green; also finds flaky tests. Use when the user asks for tests, coverage, or a red CI to be fixed.
---

# Test loop

## Write tests for a change
1. Read the diff and the existing tests. Match the project's framework, file layout and naming.
2. Test behaviour, not implementation: one test per rule or branch the change introduced, plus the edge cases (empty, invalid, boundary, failure of a dependency).
3. Prefer the smallest tests that would fail if the change broke. No snapshot tests of large objects unless the project already uses them.
4. Run them. A new test must fail without the change (check with `git stash` when cheap) and pass with it.

## Make CI green
1. Reproduce locally with the same command CI runs. Read the first real error, not the last.
2. Fix the root cause in the code, not the test, unless the test is wrong. Say which.
3. Re-run the full suite. Stop after three rounds without progress and report what is blocking.

## Flaky tests
Run the suspect suite 5 to 10 times (`--count`, `-p` or a loop). A test that both passes and fails is flaky. Look for: time, randomness, order dependence, shared state, network, timeouts. Fix the cause; quarantine only with the user's agreement and a linked issue.

Never delete or skip a failing test to get green without saying so.
