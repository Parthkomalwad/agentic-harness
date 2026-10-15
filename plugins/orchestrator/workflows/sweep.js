export const meta = {
  name: 'sweep',
  description: 'Scan the codebase for a problem, fix each finding in an isolated copy, and keep only verified fixes',
  phases: ['scan', 'fix', 'verify'],
}

// args: the goal, for example "missing auth checks in src/routes"
const goal = typeof args === 'string' ? args : JSON.stringify(args)

phase('scan')
const found = await agent(
  `List up to 40 source files most likely to contain this problem: ${goal}. Return paths only.`,
  { model: 'haiku', schema: { type: 'object', required: ['files'], properties: { files: { type: 'array', items: { type: 'string' } } } } },
)
const findings = (await pipeline(found.files, (file) =>
  agent(`Check ${file} for: ${goal}. If there is a real instance, describe it with line numbers. If not, reply exactly "none".`, { model: 'haiku', label: file }),
)).filter((r) => r && !/^\s*none\s*$/i.test(String(r)))

if (!findings.length) return `No instances of "${goal}" found in ${found.files.length} files.`

phase('fix')
const fixes = (await parallel(findings.map((f) => () =>
  agent(`Fix this problem with the smallest correct change, working in your own isolated copy. Run any relevant tests. Report the diff and test result.\n\n${f}`, { model: 'sonnet' }),
))).filter(Boolean)

phase('verify')
return agent(
  `You are the verifier. For each proposed fix below, decide KEEP or REJECT. Keep only fixes that address the problem without changing behaviour elsewhere and whose tests pass. Return a table of file, verdict, reason, and then the list of kept diffs.\n\nGoal: ${goal}\n\n${fixes.join('\n\n---\n\n')}`,
  { model: 'opus' },
)
