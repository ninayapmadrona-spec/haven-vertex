import { Link } from "react-router-dom";
import { openCalendly, useCalendly } from "@/lib/calendly";
import { useFinalCtaContact } from "@/lib/sanity/hooks";
import { PageHero, PillLink } from "./PageHero";
import { Availability } from "./Availability";

export const HomeHero = () => {
  useCalendly();
  const { content: contact } = useFinalCtaContact();
  const url = contact.calendlyUrl;
  return (
    <PageHero
      tall
      eyebrow="Connect. Automate. Elevate."
      srPrefix="Website management for small businesses: "
      title="Too busy to look after your website?"
      accent="look after your website?"
      intro="I keep it updated, easy to find on Google and turning visitors into enquiries, so restaurants, clubs, clinics and shops can get back to the work they love."
      note="Same mission. More impact."
    >
      <Availability />
      <PillLink href={url} onClick={openCalendly(url)} newTab>Book a free call</PillLink>
      <Link to="/portfolio" className="hv-pill hv-pill-ghost">See my work</Link>
    </PageHero>
  );
};
