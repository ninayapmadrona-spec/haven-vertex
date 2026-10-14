// Normalized, frontend-facing content shapes.
// These are what components consume — already resolved (images are plain URL
// strings), regardless of whether the data came from Sanity or from the
// local fallback defaults in defaultContent.ts.

export interface SiteSettingsContent {
  logo?: string;
  siteName?: string;
}

export interface HeroContent {
  eyebrow?: string;
  brandLine?: string;
  headline: string;
  description?: string[];
  highlights?: string[];
  primaryCtaLabel?: string;
  useCalendlyForPrimaryCta?: boolean;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  heroImage?: string;
  statBadgeNumber?: string;
  statBadgeLabel?: string;
  tags?: string[];
}

export type ToolIcon =
  | "blocks"
  | "layout"
  | "brush"
  | "mail"
  | "calendar"
  | "chart"
  | "search"
  | "film"
  | "shopping";

export interface ToolItem {
  hidden?: boolean;
  name: string;
  icon?: ToolIcon;
}

export interface ToolsBannerContent {
  eyebrow?: string;
  heading?: string;
  description?: string;
  items: ToolItem[];
}

export interface AboutContent {
  eyebrow?: string;
  heading: string;
  bodyParagraphs?: string[];
  points?: string[];
  images?: string[];
}

export interface ServiceItem {
  hidden?: boolean;
  title: string;
  icon?: "globe" | "megaphone" | "briefcase";
  description?: string;
  price?: string;
  priceLabel?: string;
  features?: string[];
  idealFor?: string;
}

export interface ServicesSectionContent {
  eyebrow?: string;
  heading?: string;
  description?: string;
  items: ServiceItem[];
}

export type TestimonialType = "video" | "written" | "linkedin";

export interface TestimonialItem {
  hidden?: boolean;
  type: TestimonialType;
  clientName: string;
  company?: string;
  clientPhoto?: string;
  companyLogo?: string;
  videoUrl?: string;
  writtenText?: string;
  linkedinUrl?: string;
  linkedinScreenshot?: string;
  linkedinText?: string;
}

export interface TestimonialsSectionContent {
  eyebrow?: string;
  heading?: string;
  description?: string;
  items: TestimonialItem[];
}

export interface PortfolioItem {
  hidden?: boolean;
  title: string;
  tag?: string;
  description?: string;
  image?: string;
  url?: string;
}

export interface PortfolioSectionContent {
  eyebrow?: string;
  heading?: string;
  note?: string;
  items: PortfolioItem[];
}

export interface FinalCtaContactContent {
  ctaHeading?: string;
  ctaDescription?: string;
  ctaButtonLabel?: string;
  calendlyUrl?: string;
  contactHeading?: string;
  contactDescription?: string;
  email?: string;
  linkedinUrl?: string;
  linkedinLabel?: string;
  location?: string;
  locationNote?: string;
}
