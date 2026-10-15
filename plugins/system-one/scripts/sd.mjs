// Run a ScaleDown model (extract, classify, summarize) on a text file.
// Usage: node sd.mjs <extract|classify|summarize> <file> [instructions]   (needs SCALEDOWN_API_KEY)
// ponytail: text files only and Bearer auth assumed; ScaleDown's docs do not show the header. Add PDF and image input through extra_body.document when needed.
import { readFileSync } from 'node:fs'

const [model, file, ...rest] = process.argv.slice(2)
if (!['extract', 'classify', 'summarize'].includes(model) || !file) {
  console.error('usage: node sd.mjs <extract|classify|summarize> <file> [instructions]'); process.exit(2)
}
const key = process.env.SCALEDOWN_API_KEY
if (!key) { console.error('SCALEDOWN_API_KEY is not set'); process.exit(2) }

const instructions = rest.join(' ') || { extract: 'Extract the key facts.', classify: 'Classify this text.', summarize: 'Summarize this document.' }[model]
const res = await fetch('https://api.scaledown.xyz/v1/chat/completions', {
  method: 'POST',
  headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ model, messages: [{ role: 'user', content: `${instructions}\n\n${readFileSync(file, 'utf8')}` }] }),
})
const text = await res.text()
if (!res.ok) { console.error(`ScaleDown error ${res.status}: ${text}`); process.exit(1) }
const data = JSON.parse(text)
console.log(data.choices?.[0]?.message?.content ?? text)
