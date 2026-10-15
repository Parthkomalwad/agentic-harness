// SessionStart hook: print the project's memory index so Claude starts with it.
// Prints nothing when there is no index. Caps output so a huge index cannot flood context.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const MAX_CHARS = 8000
const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd()
try {
  let index = readFileSync(join(root, '.claude', 'memory', 'INDEX.md'), 'utf8').trim()
  if (index) {
    if (index.length > MAX_CHARS) index = index.slice(0, MAX_CHARS) + '\n... (index truncated; prune .claude/memory/INDEX.md)'
    console.log(`Project memory index (.claude/memory/INDEX.md). Open a file only when relevant:\n\n${index}`)
  }
} catch {
  // No memory yet: say nothing.
}
