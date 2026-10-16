// Fallback content — this is the website's current hardcoded copy, moved
// here verbatim. It renders whenever Sanity isn't configured yet, a
// document hasn't been created, or a fetch fails, so the site never breaks
// and nothing is lost while migrating to the CMS. It is also the source
// text used by scripts/migrateToSanity.mjs to seed the real Sanity project.

import heroImg from "@/assets/hero.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import logoImg from "@/assets/logo.webp";
import type {
  SiteSettingsContent,
  HeroContent,
  ToolsBannerContent,
  AboutContent,
  ServicesSectionContent,
  TestimonialsSectionContent,
  PortfolioSectionContent,
  FinalCtaContactContent,
} from "./types";

export const defaultSiteSettings: SiteSettingsContent = {
  logo: logoImg,
  siteName: "Haven Vertex",
};

export const defaultHero: HeroContent = {
  eyebrow: "12+ Years Supporting Businesses Online",
  brandLine: "Haven Vertex",
  headline: "Website Management & Virtual Assistance for Growing Businesses",
  description: [
    "Keeping your website updated, your content organised, and your business running smoothly—without the cost of a full-time employee.",
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
  heroImage: heroImg,
  statBadgeNumber: "12+",
  statBadgeLabel: "Years supporting businesses",
  tags: ["Small Businesses", "Australian Businesses", "Agencies", "Entrepreneurs"],
};

export const defaultToolsBanner: ToolsBannerContent = {
  eyebrow: "Digital Toolkit",
  heading: "Platforms & Tools I Work With",
  description: "Trusted platforms for website management, content, marketing, analytics, and business operations.",
  items: [
    { name: "WordPress", icon: "blocks" },
    { name: "Wix", icon: "layout" },
    { name: "Squarespace", icon: "layout" },
    { name: "Elementor", icon: "blocks" },
    { name: "Canva", icon: "brush" },
    { name: "MailerLite", icon: "mail" },
    { name: "Mailchimp", icon: "mail" },
    { name: "Google Workspace", icon: "calendar" },
    { name: "Google Analytics", icon: "chart" },
    { name: "Google Search Console", icon: "search" },
    { name: "Ahrefs", icon: "search" },
    { name: "Semrush", icon: "chart" },
    { name: "Meta Business Suite", icon: "layout" },
    { name: "CapCut", icon: "film" },
    { name: "Trello", icon: "calendar" },
    { name: "Asana", icon: "calendar" },
    { name: "ClickUp", icon: "calendar" },
    { name: "GoHighLevel", icon: "chart" },
    { name: "Shopify", icon: "shopping" },
    { name: "WooCommerce", icon: "shopping" },
  ],
};

export const defaultAbout: AboutContent = {
  eyebrow: "About Nina Madrona",
  heading: "Your Reliable Website Manager & Digital Support Partner",
  bodyParagraphs: [
    "Running a business means wearing multiple hats. Between managing clients, handling operations, updating your website, and maintaining your online presence, it's easy to become overwhelmed.",
    "I'm Nina Madrona, founder of Haven Vertex, a website management and virtual assistant business.",
    "For more than 12 years, I've helped businesses stay organised, professional, and visible online through website management, content support, digital administration, and marketing assistance.",
    "My goal is simple: help business owners spend less time managing tasks and more time growing their business.",
  ],
  points: [
    "12+ Years Experience",
    "Website Management Specialist",
    "Supporting Australian Businesses",
    "WordPress • Wix • Squarespace",
  ],
};

export const defaultServicesSection: ServicesSectionContent = {
  eyebrow: "Services",
  heading: "Support Tailored To Your Business",
  description: "Clear, dependable support packages designed around the way your business works.",
  items: [
    {
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
};

// The live site currently shows a "coming soon" placeholder here — there is
// no real testimonial content to lose. Nina adds real ones from the Studio.
export const defaultTestimonialsSection: TestimonialsSectionContent = {
  eyebrow: "Kind Words",
  heading: "Client Testimonials",
  description: "Real client reviews will be added soon.",
  items: [],
};

export const defaultPortfolioSection: PortfolioSectionContent = {
  eyebrow: "Experience",
  heading: "Recent Projects & Experience",
  note: "Available samples upon request",
  items: [
    {
      image: portfolio1,
      tag: "Websites",
      title: "Website Management",
      description: "Managing and maintaining business websites across multiple industries.",
    },
    {
      image: portfolio3,
      tag: "Visibility",
      title: "SEO & Content Publishing",
      description: "Publishing and optimising content for improved visibility and engagement.",
    },
    {
      image: portfolio2,
      tag: "Content",
      title: "Social Media Support",
      description: "Creating, scheduling, and managing digital content.",
    },
    {
      image: portfolio1,
      tag: "Design",
      title: "Website Design & Landing Pages",
      description: "Building and updating websites using WordPress, Wix, and Squarespace.",
    },
  ],
};

export const defaultFinalCtaContact: FinalCtaContactContent = {
  ctaHeading: "Let's Simplify Your Workload",
  ctaDescription:
    "Whether you need website support, content management, or a dependable digital support specialist, Haven Vertex can help keep your business running efficiently.",
  ctaButtonLabel: "Book A Free Discovery Call",
  calendlyUrl: "https://calendly.com/havenvertex/30min",
  contactHeading: "Let's Start The Conversation",
  contactDescription:
    "Tell me about your business, your goals, and where you need support. I typically respond within 1–2 business days.",
  email: "ninayapmadrona@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/nina-ricci-madrona-002191a2/",
  linkedinLabel: "Nina Madrona",
  location: "Philippines",
  locationNote: "Supporting clients worldwide, with extensive experience supporting Australian businesses.",
};
