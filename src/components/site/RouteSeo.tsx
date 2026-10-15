import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import seo from "@/lib/seo/pages.json";

const siteUrl = (import.meta.env.VITE_SITE_URL || seo.siteUrl).replace(/\/$/, "");

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Keeps <title>, description, canonical and social tags in step with the
 * current route during in-app navigation. The first load already has the
 * right tags in the static HTML (see seoPlugin.mjs); this covers clicking
 * around. Text lives in src/lib/seo/pages.json.
 */
export const RouteSeo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
    const page = seo.pages.find((p) => p.path === path);
    if (!page) return;
    const url = siteUrl + path;
    document.title = page.title;
    setMeta('meta[name="description"]', "name", "description", page.description);
    setMeta('meta[property="og:title"]', "property", "og:title", page.title);
    setMeta('meta[property="og:description"]', "property", "og:description", page.description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", page.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", page.description);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;
  }, [pathname]);

  return null;
};
