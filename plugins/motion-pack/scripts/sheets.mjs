// Turn a video into review images Claude can look at.
// Usage: node sheets.mjs out/final.mp4 [--at 4.2]
// Writes out/contact.png, out/phone.png, out/loop_check.mp4, and out/strip.png when --at is given.
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'

const video = process.argv[2]
if (!video) { console.error('usage: node sheets.mjs <video> [--at seconds]'); process.exit(1) }
const dir = dirname(video)
const at = process.argv.includes('--at') ? Number(process.argv[process.argv.indexOf('--at') + 1]) : null

const run = (args) => {
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' })
  if (r.status !== 0) process.exit(r.status ?? 1)
}
run(['-i', video, '-vf', 'fps=2,scale=270:-1,tile=6x5', '-frames:v', '1', join(dir, 'contact.png')])
run(['-i', video, '-vf', 'fps=1,scale=360:-1,tile=5x3', '-frames:v', '1', join(dir, 'phone.png')])
run(['-stream_loop', '1', '-i', video, '-c', 'copy', join(dir, 'loop_check.mp4')])
if (at !== null) run(['-ss', String(Math.max(0, at - 0.1)), '-i', video, '-vf', 'scale=320:-1,tile=12x1', '-frames:v', '1', join(dir, 'strip.png')])
console.log(`review images written to ${dir}`)
