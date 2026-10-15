// Checks the catalogue rules that `claude plugin validate` does not cover.
// Usage: node scripts/validate.mjs   (exit 1 on any error)
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/
const RESERVED = /^(claude|anthropic|anthropics|cc-plugin)-|^(claude|anthropic|anthropics|claude-code|claude-mods)$/
const MAX_DESCRIPTION = 300 // skill descriptions load every session, keep them short
const ALWAYS_ON = new Set(['core'])
const errors = []
const fail = (where, msg) => errors.push(`${where}: ${msg}`)

const readJson = (path) => {
  try { return JSON.parse(readFileSync(path, 'utf8')) } catch (e) { fail(path, `invalid JSON (${e.message})`); return null }
}

const frontmatter = (text) => {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) return null
  const out = {}
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([\w-]+):\s*(.*)$/)
    if (kv) out[kv[1]] = kv[2].trim()
  }
  return out
}

const market = readJson('.claude-plugin/marketplace.json')
if (market) {
  const seen = new Set()
  for (const [i, p] of (market.plugins ?? []).entries()) {
    const where = `marketplace.plugins[${i}] (${p.name})`
    if (!p.name || !KEBAB.test(p.name)) fail(where, 'name must be kebab-case')
    if (RESERVED.test(p.name ?? '')) fail(where, 'name is reserved by Anthropic')
    if (seen.has(p.name)) fail(where, 'duplicate name')
    seen.add(p.name)
    if (!p.description) fail(where, 'missing description')
    if (!p.category) fail(where, 'missing category')
    if (p.defaultEnabled !== false && !ALWAYS_ON.has(p.name)) fail(where, 'packs must set "defaultEnabled": false')

    if (typeof p.source !== 'string') continue // external sources are checked at install time
    const dir = p.source.replace(/^\.\//, '')
    if (!existsSync(dir)) { fail(where, `source ${p.source} not found`); continue }

    const manifest = readJson(join(dir, '.claude-plugin', 'plugin.json'))
    if (!manifest) continue
    if (manifest.name !== p.name) fail(where, `plugin.json name "${manifest.name}" differs from entry name`)
    for (const key of ['version', 'description', 'license']) if (!manifest[key]) fail(where, `plugin.json missing ${key}`)

    const skillsDir = join(dir, 'skills')
    if (!existsSync(skillsDir)) continue
    for (const skill of readdirSync(skillsDir)) {
      if (!statSync(join(skillsDir, skill)).isDirectory()) continue
      const file = join(skillsDir, skill, 'SKILL.md')
      if (!existsSync(file)) { fail(file, 'missing'); continue }
      const fm = frontmatter(readFileSync(file, 'utf8'))
      if (!fm) { fail(file, 'missing frontmatter'); continue }
      if (fm.name !== skill) fail(file, `frontmatter name "${fm.name}" must match folder "${skill}"`)
      if (!fm.description) fail(file, 'missing description')
      else if (fm.description.length > MAX_DESCRIPTION) fail(file, `description is ${fm.description.length} chars, max ${MAX_DESCRIPTION}`)
    }
  }
}

// House style: no em dashes anywhere in the repo's text files.
const TEXT = /\.(md|json|mjs|js|ts|yml|yaml|svg|txt)$/
for (const file of readdirSync('.', { recursive: true })) {
  if (/(^|[\\/])(\.git|node_modules)([\\/]|$)/.test(file) || !TEXT.test(file)) continue
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    if (line.includes(String.fromCharCode(0x2014))) fail(`${file}:${i + 1}`, 'contains an em dash (U+2014)')
  })
}

for (const t of existsSync('templates') ? readdirSync('templates') : []) readJson(join('templates', t))

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join('\n'))
  process.exit(1)
}
console.log('✓ catalogue valid')
