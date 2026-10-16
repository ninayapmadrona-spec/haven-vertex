# Haven Vertex

The Haven Vertex marketing website — a Vite + React + TypeScript + Tailwind
(shadcn/ui) single-page site, with content managed through a Sanity Studio
content editor (see `studio/`) instead of being hand-edited in the code.

## Structure

- `/` — the public website (deploys to Vercel).
- `/studio` — the Sanity Studio content editor, a separate app with its own
  `package.json` (deploys to Sanity's own hosting, e.g. `haven-vertex.sanity.studio`).
- `/api/preview.ts` — a Vercel serverless function used only by the site's
  draft-preview mode (see below); it never runs in the Studio.
- `/scripts/migrateToSanity.mjs` — one-time script that seeds Sanity with the
  site's original hardcoded content.

## Local development

```sh
npm install
npm run dev
```

The site renders its original built-in content even with no Sanity project
connected yet (see `src/lib/sanity/defaultContent.ts`). To connect it to a
real Sanity project, see `studio/README.md` for one-time setup, then copy
`.env.example` to `.env.local` and fill in the values.

## Content editing

Content (Hero, About, Services, Testimonials, Portfolio, Final CTA/Contact)
is edited from the Sanity Studio, not from this code — see `studio/README.md`.

## Previewing unpublished changes

Visit the live site with `?preview=1` in the URL (e.g.
`https://haven-vertex-main.vercel.app/?preview=1`) to see unpublished draft
content from the Studio, with a banner confirming you're in preview mode.
Click "Exit preview" in the banner, or revisit with `?preview=0`, to go back
to the normal published site.

## Deployment

- **Public site:** deploys to Vercel as normal (`npm run build`, output
  `dist/`). Set `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, and
  `SANITY_PREVIEW_TOKEN` as Environment Variables in the Vercel project —
  see `.env.example`.
- **Studio:** deployed separately via `cd studio && npm run deploy`, not
  through Vercel.

## Other scripts

```sh
npm run lint      # eslint
npm run build     # production build (dist/)
```
