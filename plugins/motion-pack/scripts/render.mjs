// Render index.html to MP4 by calling window.seek(t) for every frame.
// Usage: node render.mjs [--page index.html] [--fps 60] [--dur 15] [--sub 4] [--w 1080] [--h 1920] [--out out/silent.mp4]
// --sub renders N sub-frames per frame and blends them for motion blur.
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const arg = (k, d) => {
  const i = process.argv.indexOf('--' + k)
  return i > 0 ? process.argv[i + 1] : d
}
const FPS = Number(arg('fps', 60))
const DUR = Number(arg('dur', 15))
const SUB = Number(arg('sub', 4))
const W = Number(arg('w', 1080))
const H = Number(arg('h', 1920))
const PAGE = resolve(arg('page', 'index.html'))
const OUT = arg('out', 'out/silent.mp4')
mkdirSync(dirname(OUT), { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })
await page.goto(pathToFileURL(PAGE).href)
await page.evaluate(() => document.fonts.ready)
if (!(await page.evaluate(() => typeof window.seek === 'function'))) {
  console.error('index.html must define window.seek(t)')
  process.exit(1)
}

const vf = SUB > 1 ? `tmix=frames=${SUB},select='eq(mod(n\,${SUB})\,${SUB - 1})',setpts=N/${FPS}/TB` : 'null'
const ff = spawn('ffmpeg', ['-y', '-f', 'image2pipe', '-framerate', String(FPS * SUB), '-i', '-', '-vf', vf, '-r', String(FPS),
  '-c:v', 'libx264', '-crf', '16', '-pix_fmt', 'yuv420p', OUT], { stdio: ['pipe', 'inherit', 'inherit'] })

const target = (await page.locator('#c').count()) ? page.locator('#c') : page
const total = Math.round(DUR * FPS * SUB)
for (let i = 0; i < total; i++) {
  await page.evaluate((t) => window.seek(t), i / (FPS * SUB))
  const png = await target.screenshot({ type: 'png' })
  if (!ff.stdin.write(png)) await new Promise((r) => ff.stdin.once('drain', r))
  if (i % (FPS * SUB) === 0) console.log(`rendered ${i / (FPS * SUB)}s / ${DUR}s`)
}
ff.stdin.end()
const code = await new Promise((r) => ff.on('close', r))
await browser.close()
process.exit(code)
