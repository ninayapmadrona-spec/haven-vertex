import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@sanity/client";
import { QUERIES_BY_TYPE } from "../src/lib/sanity/queries";

/**
 * Serverless preview endpoint (Vercel).
 *
 * Fetches UNPUBLISHED DRAFT content using a server-only Sanity token
 * (SANITY_PREVIEW_TOKEN — note: no VITE_ prefix, so it is never bundled
 * into the public browser JS). The browser never sees the token; it only
 * calls this endpoint while in preview mode (see usePreviewMode.ts).
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");

  const projectId = process.env.VITE_SANITY_PROJECT_ID;
  const dataset = process.env.VITE_SANITY_DATASET || "production";
  const apiVersion = process.env.VITE_SANITY_API_VERSION || "2024-01-01";
  const token = process.env.SANITY_PREVIEW_TOKEN;

  if (!projectId || !token) {
    res.status(503).json({
      error:
        "Preview isn't configured yet. Set VITE_SANITY_PROJECT_ID and SANITY_PREVIEW_TOKEN in the Vercel project's Environment Variables.",
    });
    return;
  }

  const type = typeof req.query.type === "string" ? req.query.type : "";
  const query = QUERIES_BY_TYPE[type];
  if (!query) {
    res.status(400).json({ error: `Unknown content type "${type}".` });
    return;
  }

  try {
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: false,
      perspective: "previewDrafts",
    });
    const data = await client.fetch(query);
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch preview content from Sanity." });
  }
}
