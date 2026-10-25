import { Link } from "react-router-dom";
import { openCalendly, useCalendly } from "@/lib/calendly";
import { useFinalCtaContact } from "@/lib/sanity/hooks";
import { PageHero, PillLink } from "./PageHero";

export const HomeHero = () => {
  useCalendly();
  const { content: contact } = useFinalCtaContact();
  const url = contact.calendlyUrl;
  return (
    <PageHero
      tall
      eyebrow="Connect. Automate. Elevate."
      srPrefix="Website management for small businesses: "
      title="Your website, quietly taken care of."
      accent="quietly taken care of."
      intro="I manage, automate and grow websites for small businesses in Australia, the USA, the UK and Canada, so you can get on with the work you love."
      note="Same mission. More impact."
    >
      <PillLink href={url} onClick={openCalendly(url)} newTab>Book a free call</PillLink>
      <Link to="/portfolio" className="hv-pill hv-pill-ghost">See my work</Link>
    </PageHero>
  );
};
