# Kanishk Dubey — Builder’s Observatory

A personal portfolio with original orbital art, GSAP scroll motion, project case studies, a searchable archive, profile, experience, achievements, notes and a local content editor.

## Run locally

Install Node.js 22+ and run `npm install`, then `npm run dev`. Open http://localhost:5173.

On this Windows installation, if the npm launcher cannot resolve its own modules, use:

```powershell
node 'C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js' install
node node_modules/vinext/dist/cli.js dev --port 5173
```

## Update your content

1. With the local server running, open http://localhost:5173/studio.
2. Choose Projects, Writing, Person, Experience, Education, Recognition, or Skills.
3. Add an entry or edit an existing one. New projects and notes start as drafts.
4. Project architecture uses exactly four steps. Keep project and note slugs unique, lowercase, and hyphenated.
5. Upload PNG, JPEG, or WebP images up to 8 MB. Add descriptive Image Alt text. The editor stores images in `public/media`.
6. Enable Published to show a project or note; enable Featured to add a project to the homepage. Use the arrows to reorder entries.
7. Save changes, review the local website, then ask Codex to publish the updated site.

**Saving locally does not update the hosted site.** The hosted `/studio` page explains this workflow. File-writing endpoints only exist in the local Vite development server. They reject foreign origins and require an explicit studio header. No credentials or public administration API are included in the website.

Backup exports the complete content JSON. The source of truth is `content/site.json`. To restore, replace that file with a saved backup. Notes use plain text with blank lines between paragraphs; HTML is escaped. Replace the résumé in `public/files` and update the Resume path in Person if its filename changes.

## Validation

```sh
npx tsc --noEmit
npm run lint
node scripts/check-content.mjs # requires the dev server; restores content after checks
npm run build
```

## Design and motion

Midnight navy `#080d14`, warm ivory `#f4f0e8`, copper `#e96b3f`, teal `#75c7b9`, and mineral green `#d9e2d0`. Space Grotesk provides the structural typography; Instrument Serif Italic adds contrast. Both are self-hosted Google Fonts. Layouts adapt at 760 and 1100 px. Native scrolling preserves expected keyboard and anchor behavior. GSAP adds entrance reveals, desktop-only image parallax, and collection navigation state. The persistent Reduce motion control and system preference remove optional animation. Content remains readable if animation fails.

The shared `public/portfolio-polish.css` and `public/scroll-motion.js` serve both the React app and the static GitHub Pages homepage. The orbit supports native scrolling, numbered buttons, arrow keys, and horizontal touch swipes. Reduced motion and short viewports show a readable grid.

The KD identity is a font-independent SVG in `public/favicon.svg`. Run `node scripts/build-identity.mjs` after editing it to regenerate PNG, ICO, and Apple touch icons (uses the installed Sharp dependency). The root `favicon.ico` supports GitHub Pages' default favicon lookup.

## Content provenance

Profile, education, experience, and awards come from the supplied Kanishk Dubey résumé and previous research notes. Project records distinguish individual work, collaborative repositories, prototypes, and research in preparation. LinkedIn could not be independently read. Repository feature descriptions do not establish individual authorship or production reliability. Review facts before making the site public.

Hero art is original AI-generated artwork. ESC uses an actual local interface capture. AgroBot hardware photography comes from the user’s public project repository. Functional project diagrams are conceptual rather than measured performance charts. This build has no fabricated testimonials, visitor counters, client logos, paper publication claims, or invented articles.

## Hosting

The public GitHub Pages site at https://kanishkdubey1946-del.github.io/ serves the repository-root `index.html` and `public/` assets. Preview that exact entry with `python -m http.server 5173`. Keep the static homepage synchronized with React/content changes; the React studio does not regenerate it automatically. GitHub publishing uses the `github` remote.

Sites project registration is in `.openai/hosting.json`. Preserve the Sites Vite plugin and Cloudflare Worker build configuration. Publishing starts private; change audience only when the owner requests it. No database or paid model key is required. Search-engine indexing is currently disabled for private review.

## Scope

The local editor replaces the originally proposed Keystatic integration with a small validated file-based workflow compatible with the chosen build. Design tokens, motion, and the KD icon are implemented directly in source. The September 2026 enhancement attempted the requested integrations: Higgsfield image generation required a paid plan, and Figma editing reached the Starter plan tool limit after creating an empty file. No completed Figma design or Higgsfield media is included in this update. GitHub repositories are linked manually to preserve attribution; automatic importing is not enabled.
