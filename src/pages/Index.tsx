import { Hero } from "@/components/site/Hero";
import { HomeIntro } from "@/components/site/HomeIntro";
import { ToolsBanner } from "@/components/site/ToolsBanner";
import { HomeFaq } from "@/components/site/HomeFaq";
import { FinalCTA } from "@/components/site/FinalCTA";
import seo from "@/lib/seo/pages.json";

// Home ("/") — the landing page only. About, Services, Portfolio,
// Testimonials and Contact each live on their own route (see src/pages and
// src/components/site/Navbar.tsx).
const siteUrl = (import.meta.env.VITE_SITE_URL || seo.siteUrl).replace(/\/$/, "");

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#business`,
    name: "Haven Vertex",
    url: `${siteUrl}/`,
    logo: `${siteUrl}/og-image.png`,
    image: `${siteUrl}/og-image.png`,
    slogan: "Connect. Automate. Elevate.",
    description: seo.pages[0].description,
    email: "ninayapmadrona@gmail.com",
    founder: { "@type": "Person", name: "Nina Madrona", jobTitle: "Website Manager & Virtual Assistant" },
    areaServed: [
      { "@type": "Country", name: "Australia" },
      { "@type": "Place", name: "Worldwide" },
    ],
    sameAs: ["https://www.linkedin.com/in/nina-ricci-madrona-002191a2/"],
    knowsAbout: ["Website management", "Website maintenance", "WordPress", "Wix", "Squarespace", "Content publishing", "SEO", "Virtual assistance"],
    serviceType: ["Website Management", "Website Maintenance", "Virtual Assistant Services", "Content Publishing", "SEO Support"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <HomeIntro />
      <ToolsBanner />
      <HomeFaq />
      <FinalCTA />
    </>
  );
};

export default Index;
