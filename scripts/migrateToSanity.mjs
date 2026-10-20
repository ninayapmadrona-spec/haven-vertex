// One-time migration: pushes the website's current hardcoded copy (the same
// text in src/lib/sanity/defaultContent.ts) into Sanity as the starting
// content for each of the six sections, plus uploads the existing images as
// Sanity assets. Safe to re-run — it uses createOrReplace with fixed
// document IDs, so running it twice just overwrites the same six documents
// rather than creating duplicates.
//
// Usage:
//   1. cd into the repo root (where this script's package.json lives).
//   2. Create a Sanity API token with "Editor" (write) permissions at
//      sanity.io/manage -> your project -> API -> Tokens.
//   3. Run:
//        SANITY_PROJECT_ID=xxxx SANITY_DATASET=production SANITY_WRITE_TOKEN=sk... \
//          node scripts/migrateToSanity.mjs
//      (or put those three in a local .env and `node --env-file=.env scripts/migrateToSanity.mjs`
//      on Node 20+, or use `dotenv -e .env -- node scripts/migrateToSanity.mjs`)
//   4. Open the Studio and confirm the six sections are populated, then
//      delete the write token from sanity.io/manage — it's not needed again
//      day-to-day, only for future one-off scripted imports.

import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing SANITY_PROJECT_ID (or VITE_SANITY_PROJECT_ID) and/or SANITY_WRITE_TOKEN.\n" +
      "See the usage comment at the top of this file.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function uploadImage(relativePath, filename) {
  const filePath = path.join(projectRoot, relativePath);
  const buffer = await readFile(filePath);
  const asset = await client.assets.upload("image", buffer, { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function run() {
  console.log(`Migrating starting content into Sanity project ${projectId} (dataset: ${dataset})...`);

  const [heroImage, portfolio1, portfolio2, portfolio3, logoImage] = await Promise.all([
    uploadImage("src/assets/hero.jpg", "hero.jpg"),
    uploadImage("src/assets/portfolio-1.jpg", "portfolio-1.jpg"),
    uploadImage("src/assets/portfolio-2.jpg", "portfolio-2.jpg"),
    uploadImage("src/assets/portfolio-3.jpg", "portfolio-3.jpg"),
    uploadImage("src/assets/logo.png", "logo.png"),
  ]);
  console.log("Uploaded 5 images.");

  const docs = [
    {
      _id: "siteSettings",
      _type: "siteSettings",
      logo: logoImage,
      siteName: "Haven Vertex",
    },
    {
      _id: "hero",
      _type: "hero",
      eyebrow: "12+ Years Supporting Businesses Online",
      brandLine: "Haven Vertex",
      headline: "Website Management & Virtual Assistance for Growing Businesses",
      description: [
        "Keeping your website updated, your content organized, and your business running smoothly—without the cost of a full-time employee.",
        "With over 12 years of experience supporting businesses, agencies, and entrepreneurs, I manage the digital tasks that keep your business moving forward.",
      ],
      highlights: [
        "Website Management",
        "WordPress, Wix & Squarespace Support",
        "Content Publishing & Updates",
        "Social Media Assistance",
        "SEO & Local SEO Support",
      ],
      primaryCtaLabel: "Book a Free Discovery Call",
      useCalendlyForPrimaryCta: true,
      secondaryCtaLabel: "View Services",
      secondaryCtaUrl: "/services",
      heroImage,
      statBadgeNumber: "12+",
      statBadgeLabel: "Years supporting businesses",
      tags: ["Small Businesses", "Australian Businesses", "Agencies", "Entrepreneurs"],
    },
    {
      _id: "about",
      _type: "about",
      eyebrow: "About",
      heading: "Your Reliable Digital Support Partner",
      bodyParagraphs: [
        "Running a business means wearing multiple hats. Between managing clients, handling operations, updating your website, and maintaining your online presence, it's easy to become overwhelmed.",
        "I'm Nina Madrona, founder of Haven Vertex.",
        "For more than 12 years, I've helped businesses stay organized, professional, and visible online through website management, content support, digital administration, and marketing assistance.",
        "My goal is simple: help business owners spend less time managing tasks and more time growing their business.",
      ],
      points: [
        "12+ Years Experience",
        "Website Management Specialist",
        "Supporting Australian Businesses",
        "WordPress • Wix • Squarespace",
      ],
    },
    {
      _id: "servicesSection",
      _type: "servicesSection",
      eyebrow: "Services",
      heading: "Support Tailored To Your Business",
      description: "Clear, dependable support packages designed around the way your business works.",
      items: [
        {
          _key: "essential",
          title: "Essential Website Support",
          icon: "globe",
          description: "Perfect for businesses that need ongoing website updates and maintenance.",
          price: "$500 USD",
          priceLabel: "Starting From",
          features: [
            "Website content updates",
            "WordPress, Wix or Squarespace support",
            "Blog publishing",
            "Image updates",
            "Landing page edits",
            "Basic SEO implementation",
            "Monthly website check-up",
            "Email support",
          ],
          idealFor: "Small businesses that need a reliable website manager.",
        },
        {
          _key: "content-marketing",
          title: "Content & Marketing Support",
          icon: "megaphone",
          description: "Stay consistent with your content and marketing efforts.",
          price: "$800 USD",
          priceLabel: "Starting From",
          features: [
            "Blog publishing",
            "Newsletter formatting",
            "Canva graphic creation",
            "Social media scheduling",
            "Content repurposing",
            "Website content uploads",
            "Marketing support tasks",
            "Monthly reporting",
          ],
          idealFor: "Businesses wanting regular content and marketing support.",
        },
        {
          _key: "dedicated",
          title: "Dedicated Digital Support",
          icon: "briefcase",
          description: "Comprehensive support for growing businesses.",
          price: "$1,500 USD",
          priceLabel: "Starting From",
          features: [
            "Website management",
            "Content publishing",
            "Social media support",
            "Administrative assistance",
            "Research tasks",
            "Calendar management",
            "SEO support",
            "Priority communication",
            "Ongoing business support",
          ],
          idealFor: "Business owners looking for a long-term support partner.",
        },
      ],
    },
    {
      // No real testimonials exist on the live site yet (it currently shows
      // a "coming soon" placeholder) — this just sets up the section so Nina
      // can add real ones from the Studio.
      _id: "testimonialsSection",
      _type: "testimonialsSection",
      eyebrow: "Kind Words",
      heading: "Client Testimonials",
      description: "Real client reviews will be added soon.",
      items: [],
    },
    {
      _id: "portfolioSection",
      _type: "portfolioSection",
      eyebrow: "Experience",
      heading: "Recent Projects & Experience",
      note: "Available samples upon request",
      items: [
        { _key: "p1", image: portfolio1, tag: "Websites", title: "Website Management", description: "Managing and maintaining business websites across multiple industries." },
        { _key: "p2", image: portfolio3, tag: "Visibility", title: "SEO & Content Publishing", description: "Publishing and optimizing content for improved visibility and engagement." },
        { _key: "p3", image: portfolio2, tag: "Content", title: "Social Media Support", description: "Creating, scheduling, and managing digital content." },
        { _key: "p4", image: portfolio1, tag: "Design", title: "Website Design & Landing Pages", description: "Building and updating websites using WordPress, Wix, and Squarespace." },
      ],
    },
    {
      _id: "finalCtaContact",
      _type: "finalCtaContact",
      ctaHeading: "Let's Simplify Your Workload",
      ctaDescription:
        "Whether you need website support, content management, or a dependable digital support specialist, Haven Vertex can help keep your business running efficiently.",
      ctaButtonLabel: "Book A Free Discovery Call",
      calendlyUrl: "https://calendly.com/havenvertex/30min",
      contactHeading: "Let's Start The Conversation",
      contactDescription: "Tell me about your business, your goals, and where you need support. I typically respond within 1–2 business days.",
      email: "hello@havenvertex.com",
      locationNote: "Serving clients worldwide, including Australia, the USA, the UK and Canada, with flexible hours that overlap your time zone.",
    },
  ];

  for (const doc of docs) {
    await client.createOrReplace(doc);
    console.log(`  ✓ ${doc._id}`);
  }

  console.log("\nDone. Open the Studio and check each section, then publish.");
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
