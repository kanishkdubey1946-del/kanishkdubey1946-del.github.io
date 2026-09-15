# Portfolio scroll choreography

The homepage adapts all ten techniques from [Framer University's scroll-animation collection](https://framer.university/blog/10-scroll-animations-to-make-your-website-stand-out) to Kanishk Dubey's content and Orbital Copper design system.

| Reference effect | Portfolio implementation |
| --- | --- |
| Fey website scroll animation | Perspective tilt and depth on the ESC project visual |
| Text reveal effect | Word-by-word reveal across the biography |
| Zoom scroll effect | Scroll-controlled scale on the AgroBot system visual |
| Scroll media component | Drishti diagram reveal with a scroll-scrubbed progress rail |
| Tedy website scroll animation | Sticky observe → connect → build sequence |
| Ticker scroll component | Focus-area ticker movement driven by page scroll |
| Scroll rotation animation | Rotating orbital instrument with counter-rotated labels |
| Spiral 3D scroll animation | Five practice cards moving through a perspective spiral |
| Horizontal scrolling effect | Pinned toolkit gallery translating on the x-axis |
| Mountain parallax effect | Three blended hero layers moving at different depths |

## Implementation

- `public/scroll-motion.js` runs every scroll-driven effect through one `requestAnimationFrame` render loop.
- `public/scroll-motion.css` contains the sticky stages, 3D treatment, responsive layouts, and fallbacks.
- Below 900 px, pinned and 3D sequences become normal document sections.
- The motion control and `prefers-reduced-motion` both disable transforms, reveal all text, and remove extended scroll distances.
