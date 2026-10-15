// Ask TypeSafe Jev typed questions about a state.
// Usage: node jev.mjs <state-file|-> <questions.json>   (needs TYPESAFE_API_KEY)
import { readFileSync } from 'node:fs'

const [stateArg, questionsFile] = process.argv.slice(2)
if (!stateArg || !questionsFile) { console.error('usage: node jev.mjs <state-file|-> <questions.json>'); process.exit(2) }
const key = process.env.TYPESAFE_API_KEY
if (!key) { console.error('TYPESAFE_API_KEY is not set'); process.exit(2) }

const state = readFileSync(stateArg === '-' ? 0 : stateArg, 'utf8')
const questions = JSON.parse(readFileSync(questionsFile, 'utf8'))
const res = await fetch('https://api.typesafe.ai/v1/systemone', {
  method: 'POST',
  headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ state, model: process.env.JEV_MODEL ?? 'jev-latest', questions }),
})
const text = await res.text()
if (!res.ok) { console.error(`Jev error ${res.status}: ${text}`); process.exit(1) }
console.log(text)
