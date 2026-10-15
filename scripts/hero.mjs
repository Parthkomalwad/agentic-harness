// Generates docs/assets/hero-dark.svg and hero-light.svg.
// Usage: node scripts/hero.mjs
import { writeFileSync } from 'node:fs'

const PACKS = [
  ['core', true], ['ui-pack', true], ['motion-pack', false], ['docs-pack', false], ['deploy-pack', true],
  ['architect-pack', true], ['council-pack', false], ['superpowers', false], ['taste-skill', true], ['playwright-cli', true],
]

const THEMES = {
  dark: { bg: '#1F1E1D', panel: '#2A2927', line: '#3D3B38', text: '#F5F4ED', muted: '#A39E93', accent: '#D97757', accentSoft: '#3A2A22', off: '#6B675F' },
  light: { bg: '#FAF9F5', panel: '#F0EEE6', line: '#DDD9CE', text: '#1F1E1D', muted: '#6B675F', accent: '#C15F3C', accentSoft: '#F6E3D9', off: '#B5B0A5' },
}

const W = 900, H = 420, CX = 450, CY = 205, RX = 330, RY = 135

function svg(t) {
  const nodes = PACKS.map(([name, on], i) => {
    const a = -Math.PI / 2 + (i / PACKS.length) * 2 * Math.PI
    const x = CX + RX * Math.cos(a), y = CY + RY * Math.sin(a)
    const w = name.length * 8.4 + 34
    return { name, on, x, y, w }
  })
  const spokes = nodes.map((n) =>
    `<line x1="${CX}" y1="${CY}" x2="${n.x.toFixed(1)}" y2="${n.y.toFixed(1)}" stroke="${n.on ? t.accent : t.line}" stroke-width="${n.on ? 1.6 : 1}" ${n.on ? '' : 'stroke-dasharray="3 5"'} opacity="${n.on ? 0.7 : 1}"/>`).join('\n  ')
  const pills = nodes.map((n) => `<g>
    <rect x="${(n.x - n.w / 2).toFixed(1)}" y="${(n.y - 15).toFixed(1)}" width="${n.w.toFixed(1)}" height="30" rx="15" fill="${n.on ? t.accentSoft : t.panel}" stroke="${n.on ? t.accent : t.line}"/>
    <circle cx="${(n.x - n.w / 2 + 15).toFixed(1)}" cy="${n.y.toFixed(1)}" r="4" fill="${n.on ? t.accent : 'none'}" stroke="${n.on ? t.accent : t.off}"/>
    <text x="${(n.x - n.w / 2 + 25).toFixed(1)}" y="${(n.y + 4.5).toFixed(1)}" font-size="13" fill="${n.on ? t.text : t.off}">${n.name}</text>
  </g>`).join('\n  ')
  // Hub: concentric rings with six small nodes, an original mark for "harness".
  const dots = [0, 1, 2, 3, 4, 5].map((i) => {
    const a = (i / 6) * 2 * Math.PI
    return `<circle cx="${(CX + 40 * Math.cos(a)).toFixed(1)}" cy="${(CY + 40 * Math.sin(a)).toFixed(1)}" r="4" fill="${t.accent}"/>`
  }).join('')
  const onCount = PACKS.filter((p) => p[1]).length
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">
  <rect width="${W}" height="${H}" rx="18" fill="${t.bg}"/>
  <ellipse cx="${CX}" cy="${CY}" rx="${RX}" ry="${RY}" fill="none" stroke="${t.line}" stroke-dasharray="2 6"/>
  ${spokes}
  <circle cx="${CX}" cy="${CY}" r="62" fill="${t.panel}" stroke="${t.accent}" stroke-width="2"/>
  <circle cx="${CX}" cy="${CY}" r="40" fill="none" stroke="${t.accent}" stroke-opacity="0.35"/>
  ${dots}
  <circle cx="${CX}" cy="${CY}" r="16" fill="${t.accent}"/>
  ${pills}
  <rect x="${CX - 82}" y="${CY + 74}" width="164" height="24" rx="12" fill="${t.bg}"/>
  <text x="${CX}" y="${CY + 90}" font-size="15" font-weight="700" fill="${t.text}" text-anchor="middle">agentic-harness</text>
  <text x="32" y="${H - 22}" font-size="12" fill="${t.muted}"><tspan fill="${t.accent}">●</tspan> on in this project: ${onCount}</text>
  <text x="${W - 32}" y="${H - 22}" font-size="12" fill="${t.muted}" text-anchor="end">packs that are off cost <tspan fill="${t.accent}" font-weight="700">0 tokens</tspan></text>
</svg>
`
}

for (const [name, t] of Object.entries(THEMES)) writeFileSync(`docs/assets/hero-${name}.svg`, svg(t))
console.log('hero written')
