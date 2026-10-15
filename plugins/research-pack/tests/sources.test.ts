import { expect, test } from 'claude-code/testing'

test('records searches, pages and agent-reach calls once each', async ($, on) => {
  on('tool.call', () => ({ result: 'ok' }))
  on('ui.open', () => ({ value: undefined }))

  await $.tool.call({ tool: 'WebSearch', query: 'bun vs node 2026' })
  await $.tool.call({ tool: 'WebFetch', url: 'https://bun.sh/blog', prompt: 'read' })
  await $.tool.call({ tool: 'WebFetch', url: 'https://bun.sh/blog', prompt: 'read again' })
  await $.tool.call({ tool: 'Bash', command: 'agent-reach doctor --json' })
  await $.tool.call({ tool: 'Bash', command: 'ls' })

  const { text } = await $.command.run({ command: 'sources', args: '' })
  expect(text).toContain('1 searches, 1 pages, 1 agent-reach calls')
  expect(text).toContain('[search] bun vs node 2026')
  expect(text).toContain('[page] https://bun.sh/blog')
})
