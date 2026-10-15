// Sources tracker: records every web search, page fetch and agent-reach call this
// session makes, so research is auditable. /sources lists them and opens a pane.
const PANE = 'sources'
const MAX = 200
const items = [] // { kind: 'search' | 'page' | 'reach', text, at }

function record(kind, text) {
  if (!text) return
  const value = String(text).slice(0, 300)
  if (items.some((i) => i.kind === kind && i.text === value)) return
  items.push({ kind, text: value, at: new Date().toISOString().slice(11, 19) })
  if (items.length > MAX) items.shift()
}

function summary() {
  if (!items.length) return 'No sources yet this session.'
  const count = (k) => items.filter((i) => i.kind === k).length
  const lines = items.map((i, n) => `${n + 1}. [${i.kind}] ${i.text}`)
  return [`${count('search')} searches, ${count('page')} pages, ${count('reach')} agent-reach calls`, '', ...lines].join('\n')
}

export function register(on) {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'sources', description: 'List the searches and pages used this session', immediate: true })
    return next(e)
  })

  on('tool.call', async ($, e, next) => {
    if (e.tool === 'WebSearch') record('search', e.query)
    else if (e.tool === 'WebFetch') record('page', e.url)
    else if (e.tool === 'Bash' && /\bagent-reach\b/.test(e.command ?? '')) record('reach', e.command)
    $.ui.invalidate('ui.render')
    return next(e)
  })

  on('command.run', { command: 'sources' }, async ($) => {
    await $.ui.open({ id: PANE, title: 'Sources' })
    return { text: summary() }
  })

  on('ui.render', { component: 'Pane' }, async ($, e, next) => {
    if (e.requestId !== PANE) return next(e)
    const { Box, Text } = $.ui.resolve(e)
    const rows = items.length
      ? items.map((i, n) => Text({ key: `s${n}`, wrap: 'truncate-end', children: [`${String(n + 1).padStart(3)}  ${i.at}  ${i.kind.padEnd(6)} ${i.text}`] }))
      : [Text({ dimColor: true, children: ['No sources yet. They appear as Claude searches and reads pages.'] })]
    return Box({ flexDirection: 'column', children: [Text({ bold: true, color: '#D97757', children: [`Sources (${items.length})`] }), ...rows] })
  }).catch(() => undefined)
}
