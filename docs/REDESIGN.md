# Kanishk Dubey — student portfolio redesign

The design leads with Kanishk as an IIT Patna student, developer, AI/IoT builder, and research contributor. White and cool gray surfaces, charcoal text, cobalt accents, generous editorial typography, and real project visuals replace the previous dark orbital theme.

## Reading order
Home: introduction, internship interests, selected work, milestones, personal context.
Projects: filters, case studies, individual contribution, decisions, prototype status, source links, repository directory.
Achievements: separate awards, finalist standings, participation, community work, and research.
Hacke Diaries: event stories and authentic photo/video albums.
About: education, experience, working toolkit, and current interests.
Contact: email, social profiles, resume, internship interests.

## Delivery
Public HTML is generated from content/site.json and content/repositories.json by scripts/build-pages.mjs. Real per-route index files work directly on GitHub Pages, including refreshed detail URLs. This replaces the previous single-page fallback. No Worker, third-party account, browser-side router fallback, or secret is required for the public site.

The local content editor remains available through the original Vinext development command. Published content and media are included when the Pages build is regenerated. Drafts are excluded. No fake portraits, event photos, professional experience, or performance metrics have been added.

Motion is limited to entrances and hover feedback, with a persistent control and system reduced-motion support. Search/filtering and gallery controls enhance otherwise complete server-independent HTML.
