// Build-time SEO: gives every route its own <head> (title, description,
// canonical, social tags, JSON-LD) in the static HTML that Google and social
// scrapers read BEFORE any JavaScript runs, and writes sitemap.xml.
// Source of truth for the text: src/lib/seo/pages.json
import fs from "node:fs";
import path from "node:path";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const START = "<!--seo:start-->";
const END = "<!--seo:end-->";

const loadData = () => JSON.parse(fs.readFileSync(path.resolve("src/lib/seo/pages.json"), "utf8"));
const siteUrlOf = (data) => (process.env.VITE_SITE_URL || data.siteUrl).replace(/\/$/, "");

function head(data, page) {
  const site = siteUrlOf(data);
  const url = site + (page.path === "/" ? "/" : page.path);
  const img = site + data.ogImage;
  const t = esc(page.title);
  const d = esc(page.description);
  return [
    START,
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...(page.noindex ? [`<meta name="robots" content="noindex, follow" />`] : []),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(data.siteName)}" />`,
    `<meta property="og:locale" content="en_AU" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    END,
  ].join("\n    ");
}

const swapHead = (html, block) => html.replace(new RegExp(`${START}[\\s\\S]*?${END}`), () => block);

export default function seoPlugin() {
  return {
    name: "haven-vertex-seo",
    // Dev server + the base dist/index.html get the Home head.
    transformIndexHtml(html) {
      const data = loadData();
      return swapHead(html, head(data, data.pages[0]));
    },
    // After the build, emit one HTML file per route + sitemap.xml.
    closeBundle() {
      const dist = path.resolve("dist");
      const indexPath = path.join(dist, "index.html");
      if (!fs.existsSync(indexPath)) return;
      const data = loadData();
      const site = siteUrlOf(data);
      const base = fs.readFileSync(indexPath, "utf8");

      for (const page of data.pages) {
        let html = swapHead(base, head(data, page));
        // Plain-HTML fallback for crawlers / link scrapers that don't run JS.
        // React replaces everything inside #root as soon as it loads.
        const fallback = `<div id="root"><main><h1>${esc(page.h1)}</h1><p>${esc(page.intro)}</p><nav>${data.pages
          .map((p) => `<a href="${p.path}">${esc(p.path === "/" ? "Home" : p.path.slice(1).replace(/^./, (c) => c.toUpperCase()))}</a>`)
          .join(" ")}</nav></main></div>`;
        html = html.replace('<div id="root"></div>', fallback);
        if (page.path === "/") {
          fs.writeFileSync(indexPath, html);
        } else {
          const dir = path.join(dist, page.path.slice(1));
          fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(path.join(dir, "index.html"), html);
        }
      }

      const today = new Date().toISOString().slice(0, 10);
      const urls = data.pages
        .filter((p) => !p.noindex)
        .map((p) => `  <url>\n    <loc>${site}${p.path === "/" ? "/" : p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${p.priority}</priority>\n  </url>`)
        .join("\n");
      fs.writeFileSync(
        path.join(dist, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      );
      fs.writeFileSync(
        path.join(dist, "robots.txt"),
        fs.readFileSync(path.resolve("public/robots.txt"), "utf8").trimEnd() + `\n\nSitemap: ${site}/sitemap.xml\n`,
      );
    },
  };
}
