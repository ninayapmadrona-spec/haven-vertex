import { useSanitySection } from "./useSanitySection";
import {
  SITE_SETTINGS_QUERY,
  HERO_QUERY,
  TOOLS_BANNER_QUERY,
  ABOUT_QUERY,
  SERVICES_SECTION_QUERY,
  TESTIMONIALS_SECTION_QUERY,
  PORTFOLIO_SECTION_QUERY,
  FINAL_CTA_CONTACT_QUERY,
} from "./queries";
import {
  defaultSiteSettings,
  defaultHero,
  defaultToolsBanner,
  defaultAbout,
  defaultServicesSection,
  defaultTestimonialsSection,
  defaultPortfolioSection,
  defaultFinalCtaContact,
} from "./defaultContent";

export const useSiteSettings = () =>
  useSanitySection("siteSettings", SITE_SETTINGS_QUERY, defaultSiteSettings);
export const useHero = () => useSanitySection("hero", HERO_QUERY, defaultHero);
export const useToolsBanner = () =>
  useSanitySection("toolsBanner", TOOLS_BANNER_QUERY, defaultToolsBanner);
export const useAbout = () => useSanitySection("about", ABOUT_QUERY, defaultAbout);
export const useServicesSection = () =>
  useSanitySection("servicesSection", SERVICES_SECTION_QUERY, defaultServicesSection);
export const useTestimonialsSection = () =>
  useSanitySection("testimonialsSection", TESTIMONIALS_SECTION_QUERY, defaultTestimonialsSection);
export const usePortfolioSection = () =>
  useSanitySection("portfolioSection", PORTFOLIO_SECTION_QUERY, defaultPortfolioSection);
export const useFinalCtaContact = () =>
  useSanitySection("finalCtaContact", FINAL_CTA_CONTACT_QUERY, defaultFinalCtaContact);
