# Kanishk Dubey — student portfolio

A professional, multi-page student portfolio for Kanishk Dubey, IIT Patna: project case studies, achievements, Hacke Diaries, education, experience, and direct contact.

## Preview the public website

With Node.js 22+ installed:

```sh
npm run dev
```

Open **http://localhost:5180**. This uses the same HTML, CSS and JavaScript that GitHub Pages serves. Content changes regenerate the pages while this command is running; refresh the browser to see them.

No installation or external API is required to build or preview the public website.

## Build and verify

```sh
npm run build
npm run check:pages
```

The build reads `content/site.json` and `content/repositories.json` and generates real HTML routes at the repository root. The route manifest is `.pages-manifest.json`. Every project and event detail URL works on direct load and refresh. The build safely removes obsolete generated detail HTML from the prior manifest when an entry becomes a draft or its slug changes.

Do not hand-edit generated HTML. Edit the content or `scripts/build-pages.mjs`; presentation is in `public/portfolio.css` and `public/portfolio.js`. Run the build before committing. GitHub Pages serves `main` / root; `.nojekyll` disables Jekyll processing.

The previous single-page site is preserved at `legacy/github-pages-index.html`. The public website no longer requires a Worker or another hosting account.

## Edit content and add real photos/videos

The existing local React content editor is retained. Its dependencies must be installed (`npm install`) to use it:

```sh
npm run dev:studio
```

Open **http://localhost:5173/studio**.

1. Choose Projects, Events, Person, Experience, Education, Skills or Writing.
2. Edit a record, or create a draft.
3. In Events, upload PNG/JPEG/WebP photos or MP4/WebM videos (up to 64 MB each).
4. Add meaningful descriptions, captions, and a video transcript where relevant.
5. Enable Published and save.
6. Run `npm run build` (or keep `npm run dev` running), inspect the public preview, then commit and push the generated pages and uploaded files.

Saving locally does not publish automatically. Private Instagram content must be supplied by its owner; the site does not fetch Instagram highlights.

The local editor writes only through the localhost Vite server. GitHub Pages has no public editing API. The public navigation does not expose a nonfunctional Studio link. The editor's built-in website preview uses the earlier React theme; the public preview at port 5180 is the redesigned site.

The JSON files remain the source of truth. Back up/export the content before large changes. Keep slugs unique and lowercase with hyphens. Source/demo links must use HTTPS. Draft entries are excluded from the public build. Replace the résumé at `public/files/Kanishk-Dubey-Resume.docx` to update the download.

## Design

White and cool-gray surfaces, charcoal text, and cobalt blue. Space Grotesk and Instrument Serif are self-hosted. Real ESC interface and AgroBot hardware images are used; other project visuals are labeled workflow diagrams. No fabricated portrait or event photographs are included.

Mobile navigation, category filters, search, native video playback, photo enlargement, clipboard feedback and reduced-motion controls progressively enhance static HTML. The main content and ordinary navigation remain available without JavaScript.

See `docs/REDESIGN.md` for the design plan and `docs/CONTENT_SOURCES.md` for content provenance. Repository descriptions preserve upstream credit and distinguish individual contributions from the team's complete project.

## Original app

The React/Vinext code and local content studio are preserved under `app/`, `components/`, and `build/`. Use `npm run build:worker` only when deliberately preparing that separate original Worker application. Its Sites registration remains unchanged; the public GitHub portfolio does not use that deployment account.
