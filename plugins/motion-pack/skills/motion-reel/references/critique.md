# Critique rubric

Be a harsh motion director, not a proud author. Open `contact.png`, `phone.png` and any `strip.png`, and look at them.

Score 1 to 10:
1. Hook in the first 2 seconds
2. Readability at phone size (360px wide)
3. Motion quality (weight, overshoot, settle)
4. Variety (something new every 2 to 4 seconds)
5. Composition
6. Brand accuracy
7. Sound sync

List the 3 biggest problems with timestamps. Look for: text overlapping during swaps, anything sliding at constant speed, corner labels or frame borders, centered-on-gradient shots, blurry upscaled text, a dead beat, a stutter at the loop seam.

Fix them, re-render only the affected seconds where possible, and show new sheets and scores.

## When things go wrong
- Looks like every AI video: banned list ignored or no reference given.
- Floaty motion: replace curves with springs.
- Render differs each run: something uses `Math.random` or a live timer.
- Wrong fonts: they did not load before rendering.
- Music drifts: re-run `beats.py` on the exact final track.
