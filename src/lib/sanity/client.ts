import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || "production";
const apiVersion = (import.meta.env.VITE_SANITY_API_VERSION as string | undefined) || "2024-01-01";

/** True once Nina has set VITE_SANITY_PROJECT_ID (locally or on Vercel). */
export const isSanityConfigured = Boolean(projectId);

/**
 * Public, read-only client for PUBLISHED content only. Safe to use in the
 * browser bundle — no token, no access to drafts. Returns null until
 * Sanity env vars are set, so callers must handle that (the useSanitySection
 * hook does this and falls back to the bundled default content).
 */
export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;
