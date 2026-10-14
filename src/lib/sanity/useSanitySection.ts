import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "./client";
import { usePreviewMode } from "./usePreviewMode";

/**
 * Fetches one content section (by its Sanity document type, e.g. "hero").
 *
 * - If Sanity isn't configured yet (no VITE_SANITY_PROJECT_ID), or the fetch
 *   fails, or the document hasn't been created yet, `fallback` is returned —
 *   so the site always renders the original content and a build/deploy
 *   never breaks on a missing or misconfigured Sanity project.
 * - In preview mode (see usePreviewMode), fetches unpublished drafts through
 *   the /api/preview serverless function instead of the public CDN, so
 *   edits can be checked before hitting Publish.
 */
export function useSanitySection<T>(type: string, query: string, fallback: T) {
  const { isPreview } = usePreviewMode();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["sanity-section", type, isPreview],
    queryFn: async (): Promise<T | null> => {
      if (isPreview) {
        const res = await fetch(`/api/preview?type=${encodeURIComponent(type)}`);
        if (!res.ok) throw new Error(`Preview fetch failed for "${type}"`);
        const json = await res.json();
        return json.data ?? null;
      }
      if (!sanityClient) return null;
      return sanityClient.fetch<T | null>(query);
    },
    enabled: isPreview || isSanityConfigured,
    staleTime: isPreview ? 0 : 60_000,
    refetchOnWindowFocus: isPreview,
    retry: false,
  });

  const content = data ?? fallback;
  return { content, isLoading, isError, isPreview };
}
