# Attention and reading

Mostly from Nielsen Norman Group eye-tracking research (nngroup.com) and established cognitive psychology.

## People scan
- Most visitors read a minority of the words on a page. They look for words that match their goal, then read around them.
- Attention drops sharply below the first screen, but people do scroll when the first screen promises something worth scrolling for. "Above the fold" is about earning the scroll, not cramming.
- Visitors decide in the first seconds whether to stay. After that early drop-off, those who stay are much more patient. Win the first seconds.

## Scan patterns, and what to do about each

| Pattern | When it happens | Design response |
|---|---|---|
| **F-pattern** | Dense text with weak structure | Avoid it: add headings and bullets. Put information-carrying words at the start of lines |
| **Layer-cake** | Good headings: eyes jump heading to heading | Write headings that are complete statements, not labels ("Deploys in 2 minutes", not "Speed") |
| **Spotted** | Looking for something specific (a price, a link, a number) | Make specific items visually distinct: numbers as numerals, links that look like links |
| **Z-pattern** | Sparse pages: logo, top-right nav, diagonal, bottom CTA | Logo top-left, primary nav or CTA top-right, final CTA bottom-right of the section |
| **Commitment** | Highly motivated readers read everything | Rare. Do not design for it |
| **Gutenberg diagram** | Even, uniform layouts: top-left strongest, bottom-right is the terminal area | Put the action where the eye finishes |

## Cognitive load
- Working memory holds a handful of chunks (Miller's 7 plus or minus 2 is about memory span, not a rule for menu length). Chunk long information into groups of 3 to 5.
- Recognition beats recall: show options, previous values and examples instead of making people remember.
- Every visual element competes for attention. Decoration that carries no meaning costs attention.

## Text that gets read
- Line length 45 to 75 characters; body text 16px or larger; line height about 1.5.
- Short paragraphs (1 to 3 sentences), one idea each.
- Front-load: the first 2 words of a heading, link or bullet decide whether it is read. "Pricing for teams" beats "Our flexible team pricing".
- Plain words over jargon. Numbers as numerals ("3 steps", not "three steps").
- Inverted pyramid: conclusion first, details after.

## Visual hierarchy
- Size, weight, colour contrast and whitespace decide the reading order. Squint at the page: the blurred shapes should show the order you intend.
- One focal point per view. If everything is bold, nothing is.
- Faces and eyes attract attention; a person looking toward the headline or CTA pulls the viewer's eye there.
- Motion attracts attention involuntarily: use it to direct, never to decorate, and respect `prefers-reduced-motion`.

## Mobile
- Most phone use is one-handed: the bottom-centre of the screen is easiest to reach, the top corners hardest. Put frequent actions in the thumb zone.
- Touch targets at least 44 by 44 points (Apple) or 48 by 48 dp (Material), with space between.
- Single column, short forms, input types that bring up the right keyboard.
