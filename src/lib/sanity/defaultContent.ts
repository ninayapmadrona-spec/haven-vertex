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
    "WordPress, Wix, Squarespace & Duda Support",
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
    "I'm Nina Madrona, founder of Haven Vertex. I'm a virtual assistant with 12+ years of experience supporting businesses with website management, digital marketing, content creation and online operations.",
    "I launched my own VA service in 2022 and spent more than four years working with an Australian digital marketing agency, supporting multiple clients across different industries. My work combines hands-on technical skills, creative design and dependable business support.",
    "My goal is simple: help business owners spend less time managing tasks and more time growing their business.",
  ],
  points: [
    "12+ Years Experience",
    "4+ Years With an Australian Digital Agency",
    "Supporting Australian Businesses",
    "WordPress • Wix • Squarespace • Duda",
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
      hours: "Up to 25 hours / month",
      features: [
        "Up to 25 hours of work each month",
        "Text, image, price and service updates on your live site",
        "Blog posts formatted, optimised and published",
        "Landing page and offer page edits",
        "Monthly health check: broken links, forms, speed and plugin or app updates",
        "Backups and uptime checked, issues fixed",
        "Basic on-page SEO on every page you change",
        "WordPress, Wix, Squarespace or Duda",
        "Replies within 1 business day",
      ],
      idealFor: "Small businesses that need a reliable website manager.",
    },
    {
      title: "Content & Marketing Support",
      icon: "megaphone",
      description: "Stay consistent with your content and marketing efforts.",
      price: "$800 USD",
      priceLabel: "Starting From",
      hours: "Up to 40 hours / month",
      features: [
        "Up to 40 hours of work each month",
        "Everything in Essential Website Support",
        "Blog posts written up, formatted and scheduled",
        "Newsletter layout in Mailchimp or MailerLite",
        "Canva graphics for your site and socials, on brand",
        "Social posts scheduled to a steady rhythm",
        "One piece of content repurposed into several formats",
        "Short monthly report on what changed and what is next",
      ],
      idealFor: "Businesses wanting regular content and marketing support.",
    },
    {
      title: "Dedicated Digital Support",
      icon: "briefcase",
      description: "Comprehensive support for growing businesses.",
      price: "$1,500 USD",
      priceLabel: "Starting From",
      hours: "Up to 75 hours / month",
      features: [
        "Up to 75 hours of work each month",
        "Everything in Content & Marketing Support",
        "Inbox, calendar and routine admin handled",
        "Research on suppliers, tools and competitors",
        "SEO support: keywords, page fixes and Search Console checks",
        "Priority replies, same business day",
        "A monthly planning call to set the next month's focus",
        "Forms, booking and email steps connected",
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
  items: [
    {
      type: "video",
      clientName: "Cherise M.",
      company: "Integrative health coach · 3 years",
      videoUrl: "/testimonials/client-1.mp4",
    },
    {
      type: "video",
      clientName: "Mentorship organisation",
      company: "Mentorship nonprofit · Project-based work",
      videoUrl: "/testimonials/client-2.mp4",
    },
    {
      type: "video",
      clientName: "Raschell H.",
      company: "Wellness speaker and author · 2 years",
      videoUrl: "/testimonials/client-4.mp4",
    },
    {
      type: "written",
      clientName: "Jane M.",
      company: "Client, July 2019",
      writtenText:
        "Nina is my first virtual assistant. ... She is very patient with me, generous and helpful. Even if I have not given her any directions, she comes up with her own ideas and executes them very nicely. She does not take feedback personally and is very nice to work with.",
    },
    {
      type: "written",
      clientName: "Derrick K.",
      company: "Client, May 2016",
      writtenText: "She is a good worker and always on time. She follows instruction very well. I would hire her anytime.",
    },
    {
      type: "linkedin",
      clientName: "Raschell H.",
      company: "Wellness speaker and author, LinkedIn, March 2025",
      linkedinUrl: "https://www.linkedin.com/in/nina-ricci-madrona-002191a2/",
      linkedinText:
        "Nina worked with me as my virtual assistant from 2020 to the beginning of 2021. She was supportive in many of my programs and was a great asset to my business and supported many of my suggestions and ideas. Definitely somebody I would suggest working with.",
    },
    {
      type: "linkedin",
      clientName: "Tyrus P.",
      company: "Home inspector and workshop presenter, LinkedIn, August 2021",
      linkedinUrl: "https://www.linkedin.com/in/nina-ricci-madrona-002191a2/",
      linkedinText:
        "Nina is a fast learner and hard worker. I thoroughly enjoyed my time working with her. She was prompt with her work, took creative initiative when needed, met deadlines, pushed herself to learn new programs and software and made my life much more peaceful and productive.",
    },
    {
      type: "linkedin",
      clientName: "Cassidy L., Esq.",
      company: "Personal injury attorney, LinkedIn, October 2020",
      linkedinUrl: "https://www.linkedin.com/in/nina-ricci-madrona-002191a2/",
      linkedinText:
        "I highly recommend Nina Ricci for all legal administrative tasks. Nina worked for me while I was getting my practice built and was instrumental in helping me automate firm tasks and in helping me manage my email. We practice personal injury and civil litigation and Nina was extremely helpful in creating forms and civil litigation templates. She was responsive, kind, and picked up the tasks quickly. If you are a professional business owner and are looking for assistance in automating your business, Nina is a fantastic choice.",
    },
  ],
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
      description: "Building and updating websites using WordPress, Wix, Squarespace, and Duda.",
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
  email: "hello@havenvertex.com",
  locationNote: "Serving clients worldwide, including Australia, the UK, the Netherlands, the USA and Canada, with flexible hours that overlap your time zone.",
};
