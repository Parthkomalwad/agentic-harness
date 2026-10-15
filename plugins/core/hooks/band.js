// Harness band: one line above the prompt with the agentic-harness packs that
// are on, how full the context window is, and what the session has cost.
// Also adds /harness, which prints the same summary instantly, even mid-turn.
const MARKET = '@agentic-harness'
let packs = []
let usage = null

async function refresh($) {
  try {
    const settings = await $.settings.read()
    packs = Object.entries(settings.enabledPlugins ?? {})
      .filter(([id, on]) => on && id.endsWith(MARKET))
      .map(([id]) => id.slice(0, -MARKET.length))
  } catch {
    packs = []
  }
  try {
    usage = await $.session.usage()
  } catch {
    usage = null
  }
}

function contextText() {
  const pct = usage?.context?.percent
  return typeof pct === 'number' ? `context ${Math.round(pct)}%` : null
}

function costText() {
  const usd = usage?.cost?.usd
  return typeof usd === 'number' ? `$${usd.toFixed(2)}` : null
}

function summary() {
  const list = packs.length ? packs.join(', ') : 'none besides core'
  return [`packs on: ${list}`, contextText(), costText()].filter(Boolean).join('  ·  ')
}

export function register(on) {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'harness', description: 'Show active harness packs, context use and session cost', immediate: true })
    await refresh($)
    $.ui.invalidate('ui.render')
    return next(e)
  })

  on('turn.complete', async ($, e, next) => {
    await refresh($)
    $.ui.invalidate('ui.render')
    return next(e)
  })

  on('command.run', { command: 'harness' }, async ($) => {
    await refresh($)
    return { text: summary() }
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const below = await next(e)
    const { Box, Text } = $.ui.resolve(e)
    const pct = usage?.context?.percent ?? 0
    const parts = [
      Text({ color: '#D97757', bold: true, children: ['harness'] }),
      Text({ dimColor: true, wrap: 'truncate-end', children: [packs.length ? packs.join(' · ') : 'core only'] }),
    ]
    if (contextText()) {
      // Only pass props that are set: an unknown or undefined prop makes Claude Code drop the drawing.
      const style = pct >= 80 ? { color: 'red' } : pct >= 60 ? { color: 'yellow' } : { dimColor: true }
      parts.push(Text({ ...style, children: [contextText()] }))
    }
    if (costText()) parts.push(Text({ dimColor: true, children: [costText()] }))
    const line = Box({ key: 'harness-band', flexDirection: 'row', columnGap: 2, children: parts })
    return below ? Box({ flexDirection: 'column', children: [line, below] }) : line
  }).catch(() => undefined)
}
