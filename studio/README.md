# Haven Vertex Studio

The content editor for the Haven Vertex website. This is a separate app from
the public site — it's never deployed to the same place the public site is,
and the public site's build doesn't depend on it.

## One-time setup (Nina — these steps need your own Sanity login)

1. **Create the free Sanity project.**
   ```sh
   cd studio
   npx sanity@latest login
   npx sanity@latest init --project-plan free
   ```
   Choose "Create new project", name it `Haven Vertex`, and when asked for a
   dataset use `production`. When it asks about a template, choose
   "Schema only / Clean project" — this repo already has the schemas.
   It will print a **Project ID** — copy it.

2. **Wire the Project ID into three places:**
   - `studio/.env` (copy from `studio/.env.example`): `SANITY_STUDIO_PROJECT_ID=<id>`
   - Your local `.env.local` in the repo root (copy from `.env.example`): `VITE_SANITY_PROJECT_ID=<id>`
   - The same `VITE_SANITY_PROJECT_ID` (and `VITE_SANITY_DATASET=production`) as
     **Environment Variables** in the Vercel project settings for the public site.

3. **Run the Studio locally to confirm it works:**
   ```sh
   npm install
   npm run dev
   ```
   Opens at `http://localhost:3333`. You should see six sections in the
   left sidebar: Hero, About / Meet Nina, Services, Testimonials, Portfolio,
   Final CTA / Contact.

4. **Migrate the current website content in** (run once, from the repo root,
   not from `studio/`):
   ```sh
   cd ..
   # Create an "Editor" token at sanity.io/manage -> your project -> API -> Tokens
   SANITY_PROJECT_ID=<id> SANITY_WRITE_TOKEN=<editor-token> npm run migrate:sanity
   ```
   This fills in the six sections with the site's existing copy and images,
   so nothing is lost. Open the Studio afterwards and check each section.

5. **Create a preview token** (for the live site's Preview mode): at
   sanity.io/manage -> your project -> API -> Tokens, create a **Viewer**
   token (read-only — a leak only exposes drafts, never write access). Add it
   to the Vercel project's Environment Variables as `SANITY_PREVIEW_TOKEN`
   (no `VITE_` prefix).

6. **Deploy the Studio** so you have a permanent editor URL, separate from
   the public website:
   ```sh
   cd studio
   npm run deploy
   ```
   It'll ask for a Studio hostname (e.g. `haven-vertex` → `haven-vertex.sanity.studio`).
   That URL is where you log in from now on to edit content.

## Day-to-day use

- Go to your `*.sanity.studio` URL, click a section, edit, hit **Publish**.
- Services / Testimonials / Portfolio are lists: drag the handle on the left
  of each item to reorder, and tick "Hide this ___" to take one off the live
  site without deleting it.
- Changes only appear on the live site once you click **Publish** — editing
  alone never affects what visitors see.
- To check a change before publishing, see "Preview" in the main project's
  `.env.example` / README — visiting the live site with `?preview=1` shows
  your unpublished drafts.

## Why a separate app

Sanity Studio is its own single-page app (it's how the drag-to-reorder,
image uploads, and conditional fields work out of the box). Keeping it in
`studio/` with its own `package.json` means it's built and deployed on its
own (to Sanity's free hosting), and a problem with it can never break the
public website's build on Vercel.
