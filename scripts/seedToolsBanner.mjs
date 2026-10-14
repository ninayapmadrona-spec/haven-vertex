// One-time seed for the "Platforms & Tools" section on the Home page.
//
// Why a separate script: migrateToSanity.mjs uses createOrReplace, so re-running
// it would overwrite every section you've since edited in the Studio. This one
// uses createIfNotExists — it only creates the Platforms & Tools document if it
// doesn't exist yet, and never touches anything you've already edited.
//
// Usage (from the repo root):
//   SANITY_PROJECT_ID=xxxx SANITY_DATASET=production SANITY_WRITE_TOKEN=sk... \
//     node scripts/seedToolsBanner.mjs

import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing SANITY_PROJECT_ID (or VITE_SANITY_PROJECT_ID) and/or SANITY_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2024-01-01", token, useCdn: false });

const tools = [
  ["WordPress", "blocks"], ["Wix", "layout"], ["Squarespace", "layout"], ["Elementor", "blocks"],
  ["Canva", "brush"], ["MailerLite", "mail"], ["Mailchimp", "mail"], ["Google Workspace", "calendar"],
  ["Google Analytics", "chart"], ["Google Search Console", "search"], ["Ahrefs", "search"], ["Semrush", "chart"],
  ["Meta Business Suite", "layout"], ["CapCut", "film"], ["Trello", "calendar"], ["Asana", "calendar"],
  ["ClickUp", "calendar"], ["GoHighLevel", "chart"], ["Shopify", "shopping"], ["WooCommerce", "shopping"],
];

const doc = {
  _id: "toolsBanner",
  _type: "toolsBanner",
  eyebrow: "Digital Toolkit",
  heading: "Platforms & Tools I Work With",
  description: "Trusted platforms for website management, content, marketing, analytics, and business operations.",
  items: tools.map(([name, icon], i) => ({ _key: `tool-${i}`, name, icon })),
};

client
  .createIfNotExists(doc)
  .then(() => console.log("✓ toolsBanner is in place (existing content, if any, was left untouched). Open the Studio and publish it."))
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
