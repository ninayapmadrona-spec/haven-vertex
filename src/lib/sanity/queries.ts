// Shared GROQ queries. Used both by the browser client (client.ts, published
// content only) and by the /api/preview serverless function (draft content,
// server-side token). Keep this file free of `import.meta` / browser-only
// APIs so it can be imported from the Vercel Node function too.

export const SITE_SETTINGS_QUERY = /* groq */ `
*[_type == "siteSettings"][0]{
  "logo": logo.asset->url,
  siteName
}`;

export const HERO_QUERY = /* groq */ `
*[_type == "hero"][0]{
  eyebrow,
  brandLine,
  headline,
  description,
  highlights,
  primaryCtaLabel,
  useCalendlyForPrimaryCta,
  secondaryCtaLabel,
  secondaryCtaUrl,
  "heroImage": heroImage.asset->url,
  statBadgeNumber,
  statBadgeLabel,
  tags
}`;

export const TOOLS_BANNER_QUERY = /* groq */ `
*[_type == "toolsBanner"][0]{
  eyebrow,
  heading,
  description,
  "items": items[!hidden]{
    name,
    icon
  }
}`;

export const ABOUT_QUERY = /* groq */ `
*[_type == "about"][0]{
  eyebrow,
  heading,
  bodyParagraphs,
  points,
  "images": images[].asset->url
}`;

export const SERVICES_SECTION_QUERY = /* groq */ `
*[_type == "servicesSection"][0]{
  eyebrow,
  heading,
  description,
  "items": items[!hidden]{
    title,
    icon,
    description,
    price,
    priceLabel,
    hours,
    features,
    idealFor
  }
}`;

export const TESTIMONIALS_SECTION_QUERY = /* groq */ `
*[_type == "testimonialsSection"][0]{
  eyebrow,
  heading,
  description,
  "items": items[!hidden]{
    type,
    clientName,
    company,
    "clientPhoto": clientPhoto.asset->url,
    "companyLogo": companyLogo.asset->url,
    videoUrl,
    writtenText,
    linkedinUrl,
    "linkedinScreenshot": linkedinScreenshot.asset->url,
    linkedinText
  }
}`;

export const PORTFOLIO_SECTION_QUERY = /* groq */ `
*[_type == "portfolioSection"][0]{
  eyebrow,
  heading,
  note,
  "items": items[!hidden]{
    title,
    tag,
    description,
    "image": image.asset->url,
    url
  }
}`;

export const FINAL_CTA_CONTACT_QUERY = /* groq */ `
*[_type == "finalCtaContact"][0]{
  ctaHeading,
  ctaDescription,
  ctaButtonLabel,
  calendlyUrl,
  contactHeading,
  contactDescription,
  email,
  linkedinUrl,
  linkedinLabel,
  location,
  locationNote
}`;

// For draft previews, the same queries work — Sanity just needs
// perspective: "previewDrafts" and a token on the client used to run them
// (see api/preview.ts). Centralized here so both sides of the preview
// feature always ask for the exact same shape.
export const QUERIES_BY_TYPE: Record<string, string> = {
  siteSettings: SITE_SETTINGS_QUERY,
  hero: HERO_QUERY,
  toolsBanner: TOOLS_BANNER_QUERY,
  about: ABOUT_QUERY,
  servicesSection: SERVICES_SECTION_QUERY,
  testimonialsSection: TESTIMONIALS_SECTION_QUERY,
  portfolioSection: PORTFOLIO_SECTION_QUERY,
  finalCtaContact: FINAL_CTA_CONTACT_QUERY,
};
