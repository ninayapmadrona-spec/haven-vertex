import type { SanityClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || "production";
const apiVersion = (import.meta.env.VITE_SANITY_API_VERSION as string | undefined) || "2024-01-01";

/** True once Nina has set VITE_SANITY_PROJECT_ID (locally or on Vercel). */
export const isSanityConfigured = Boolean(projectId);

let clientPromise: Promise<SanityClient | null> | null = null;

/**
 * Public, read-only client for PUBLISHED content only. Loaded on demand (not
 * in the main bundle) so the first page paint isn't held up by the Sanity
 * library. Resolves to null until Sanity env vars are set.
 */
export const getSanityClient = () => {
  if (!isSanityConfigured) return Promise.resolve(null);
  clientPromise ??= import("@sanity/client").then(({ createClient }) =>
    createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" }),
  );
  return clientPromise;
};
