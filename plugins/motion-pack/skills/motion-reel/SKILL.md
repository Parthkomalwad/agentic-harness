---
name: motion-reel
description: Make a launch video, product reel, showreel or motion ad rendered from code, with a self-critique loop. Use when the user asks for any animated video.
---

# Motion reel

Videos are web pages. `window.seek(t)` draws the exact frame for time `t`, a headless browser screenshots every frame, and ffmpeg encodes the MP4. Same code, same video, every time.

Tools in this pack (run them with node or python):
- `${CLAUDE_PLUGIN_ROOT}/scripts/render.mjs`: page to MP4. `--fps 60 --dur 15 --sub 4 --w 1080 --h 1920`
- `${CLAUDE_PLUGIN_ROOT}/scripts/beats.py`: track to `beats.json` (bpm, beats, downbeats, hits)
- `${CLAUDE_PLUGIN_ROOT}/scripts/sheets.mjs`: video to `contact.png`, `phone.png`, `loop_check.mp4`, and `strip.png` with `--at <s>`
- `${CLAUDE_PLUGIN_ROOT}/templates/lib/motion.js`: springs, `track()`, seeded `rng()`. Copy into the project as `lib/motion.js`.

Setup check first: `node`, `ffmpeg`, `npx playwright install chromium`, and for music `pip install numpy librosa soundfile`. Suggest `/effort xhigh` for a new video.

## Inputs to collect
Product and URL, duration, formats (9:16, 1:1, 16:9), brand colors and fonts, a reference (frame, video or image folder), music (file or "synthesize"). Read `references/briefs.md` for the brief templates.

## Pipeline
1. Gather real assets from the URL with Playwright into `./assets`. List them. Never redraw product UI from imagination.
2. With a reference: extract a frame every 0.5s, write `docs/style_guide.md`. Take the grammar, never the content.
3. Measure the track with `beats.py`, or synthesize music in code.
4. Write `docs/shotlist.md` on the beat grid. **Show it and wait for OK.**
5. Build `index.html` with a canvas `#c` and `window.seek(t)`, using `lib/motion.js`.
6. Render, run `sheets.mjs`, look at the images, critique with `references/critique.md`. Fix the 3 worst problems. Minimum 3 rounds, until every score is 8+.
7. Final render in every format, mix audio to -14 LUFS, deliver `out/final.mp4`, `out/contact.png`, `out/poster.png`, and say what you would improve next.

## Hard rules
- Pure function of time: no `Math.random` (use `rng`), no `setTimeout`, no `requestAnimationFrame` in render mode, no CSS transitions, no state carried between frames.
- Springs, not easing curves. A value with several targets uses `track()`.
- Banned looks: centered title on a gradient, everything fading in, corner labels, frame borders, glow on UI, generic particle bursts, dead beats.
- One display font, one UI font, one accent color. Something new every 2 to 4 seconds.
- Keys (for example `ELEVENLABS_API_KEY`) live in `.env`, never in a prompt. Use only music and client assets you have rights to.
