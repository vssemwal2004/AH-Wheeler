# A.H. Wheeler — "Between Stations"

Heritage landing page. The page is one train journey: the stall shutter opens at dawn, the
history passes through a carriage window, and the shutter comes down at night.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

Stack: Vite · vanilla JS · GSAP (ScrollTrigger, SplitText) · Lenis.

## Where things live
| What | Where |
|---|---|
| Colours, type, spacing | `src/styles/tokens.css` |
| Chapter markup | `index.html` (one `<section class="chapter">` per chapter) |
| Timeline, books, stations, memories, departures | `src/data/*.json` |
| Chapter behaviour | `src/chapters/*.js` |
| Shutter, ticket, split-flap, loupe, placeholders | `src/components/*.js` |

## Before launch
1. **Images.** Every image slot (`HERO-01`, `ORIGIN-01`…) is mapped in `src/data/images.json`
   to a file in `public/images/` with its caption, credit and source. The current set is
   licensed archival material from Wikimedia Commons, mostly public domain (1853–1945 engravings,
   photographs, postcards and the 1893 railway map). Only the 1888–1890 Indian Railway Library
   covers, the 1903 A.H.W. card and the 2023 Prayag Junction stall ("Today") are genuinely
   Wheeler-related. The rest is period railway imagery, not Wheeler's own. CC BY-SA images
   must keep their credit, which the page shows in captions and in the footer list. To use
   company archive photos, replace a file and edit its entry. A slot missing from
   `images.json` falls back to a labelled placeholder.
2. **Facts.** Text with a dotted brass underline is unverified (founder roles, dates, stations).
   Check each against company records. Then remove `data-draft` from `<html>`.
3. **Samples.** Memory cards and the T. K. Banerjee quote are placeholders and must be replaced
   with real, sourced content.
4. **Logo.** Swap the typographic wordmark in the masthead for the official logo SVG.
5. **Station-board yellow** (`--board`) is approximate. Sample it from real board photographs.
6. **Hindi lines** on the boards should be checked by a native reader.

## Accessibility
- `prefers-reduced-motion` turns off Lenis, pins and scrubs. The shutter starts open and
  the timeline stacks vertically.
- Without JS, the static chapters stay readable. The JSON-driven lists (timeline, shelf, map,
  memories, departures) need JS.
