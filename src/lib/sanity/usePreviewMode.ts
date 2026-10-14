import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "hv_preview";

function readPreviewFlag(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("preview") === "1") {
      sessionStorage.setItem(STORAGE_KEY, "1");
      return true;
    }
    if (params.get("preview") === "0") {
      sessionStorage.removeItem(STORAGE_KEY);
      return false;
    }
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    // sessionStorage can throw in some privacy modes — just treat as "not in preview".
    return false;
  }
}

/**
 * Lightweight draft-preview toggle for a client-only SPA.
 *
 * Visit the site with ?preview=1 to turn preview mode on (persisted for the
 * tab via sessionStorage, since a static SPA has no server-side preview
 * cookie to set). While on, content hooks fetch unpublished drafts through
 * /api/preview instead of the public published content.
 * Visit with ?preview=0, or use the banner's Exit button, to turn it off.
 */
export function usePreviewMode() {
  const [isPreview, setIsPreview] = useState(readPreviewFlag);

  useEffect(() => {
    setIsPreview(readPreviewFlag());
  }, []);

  const exitPreview = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setIsPreview(false);
    const url = new URL(window.location.href);
    url.searchParams.delete("preview");
    window.history.replaceState({}, "", url.toString());
  }, []);

  return { isPreview, exitPreview };
}
