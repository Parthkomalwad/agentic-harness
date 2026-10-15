export const meta = {
  name: 'deep',
  description: 'Deep research across web, GitHub, Reddit, X and YouTube: plan angles, collect in parallel, grade sources A to E, cross-check claims, write a cited report',
  phases: ['plan', 'collect', 'verify', 'report'],
}

// args: the research question
const question = typeof args === 'string' ? args : JSON.stringify(args)

phase('plan')
const plan = await agent(
  `Plan research for: ${question}\nReturn 4 to 6 distinct angles. For each, the best channel: "web" (official docs, papers, changelogs), "github" (issues, code), "community" (Reddit, X, Hacker News), or "video" (YouTube talks). Prefer primary sources.`,
  { model: 'sonnet', schema: { type: 'object', required: ['angles'], properties: { angles: { type: 'array', items: { type: 'object', required: ['angle', 'channel'], properties: { angle: { type: 'string' }, channel: { type: 'string' } } } } } } },
)

phase('collect')
const notes = (await parallel(plan.angles.map((a) => () => agent(
  `Research this angle of "${question}": ${a.angle}\nChannel: ${a.channel}. Use WebSearch and WebFetch; if the agent-reach CLI is installed, use it for Reddit, X, YouTube and GitHub (run "agent-reach doctor --json" first).\nReturn claims as bullet points. Each claim: the claim, source URL, source date, and a grade: A peer-reviewed or official primary source, B reputable secondary, C practitioner report with evidence, D opinion, E unverified or speculative.`,
  { model: 'sonnet', label: a.angle },
)))).filter(Boolean)

phase('verify')
const verified = await agent(
  `You are a skeptical fact-checker. Below are claims gathered about "${question}". Group duplicates. Mark each claim VERIFIED (two independent sources agree, or one grade A source), CONTESTED (sources disagree; say which is stronger), or UNVERIFIED (single weak source). Spot-check the three most important claims by opening their sources. Drop anything with no source.\n\n${notes.join('\n\n---\n\n')}`,
  { model: 'opus' },
)

phase('report')
return agent(
  `Write the final research report on "${question}" from these checked claims. Sections: Answer (3 sentences), Findings (table: claim, status, grade, sources), Disagreements, Gaps, Sources (every URL, as Markdown links, with dates). Never state an UNVERIFIED claim as fact. Note how recent the sources are.\n\n${verified}`,
  { model: 'opus' },
)
