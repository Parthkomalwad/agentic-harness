// PreToolUse guard: asks the user before dangerous shell commands run.
// It never blocks outright and never approves; on any error it stays silent and normal permissions apply.
import { readFileSync } from 'node:fs'

const RULES = [
  [/\brm\s+-[a-z]*r[a-z]*f?[a-z]*\s+(\/|~|\$HOME|\*)(\s|$)/i, 'recursive delete of a root, home or wildcard path'],
  [/\bgit\s+push\b.*(--force|-f\b)(?!-with-lease)/, 'force push'],
  [/\bgit\s+reset\s+--hard\b/, 'hard reset discards local changes'],
  [/\bgit\s+clean\s+-[a-z]*f/, 'git clean deletes untracked files'],
  [/(curl|wget)[^|]*\|\s*(sudo\s+)?(ba|z)?sh\b/, 'piping a download into a shell'],
  [/\bchmod\s+(-R\s+)?777\b/, 'world-writable permissions'],
  [/\b(drop|truncate)\s+(table|database)\b/i, 'destructive SQL'],
  [/\bmkfs(\.|\s)|\bdd\s+if=.*\bof=\/dev\//, 'writing to a disk device'],
  [/\b(aws\s+s3\s+rb|terraform\s+destroy|kubectl\s+delete\s+(ns|namespace))\b/, 'deleting cloud infrastructure'],
]

export function check(command) {
  for (const [re, why] of RULES) if (re.test(command)) return why
  return null
}

if (process.argv[1]?.endsWith('guard.mjs')) {
  try {
    const input = JSON.parse(readFileSync(0, 'utf8'))
    const why = check(input?.tool_input?.command ?? '')
    if (why) {
      console.log(JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'ask',
          permissionDecisionReason: `security-pack: ${why}. Confirm this is intended.`,
        },
      }))
    }
  } catch {
    // Fail safe: say nothing, so Claude Code's normal permission rules apply.
  }
}
