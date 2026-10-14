import { Hero } from "@/components/site/Hero";
import { ToolsBanner } from "@/components/site/ToolsBanner";
import { FinalCTA } from "@/components/site/FinalCTA";

// Home ("/") — the landing page only. About, Services, Portfolio,
// Testimonials and Contact each live on their own route now (see
// src/pages and src/components/site/Navbar.tsx); Home closes with a CTA
// that points people toward booking a call or visiting Contact.
const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Haven Vertex",
    founder: { "@type": "Person", name: "Nina Madrona" },
    description: "Professional website management and digital support for entrepreneurs, agencies, and growing businesses.",
    areaServed: "Worldwide",
    serviceType: ["Website Management", "Digital Support", "Content Publishing", "SEO Support"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <ToolsBanner />
      <FinalCTA />
    </>
  );
};

export default Index;
