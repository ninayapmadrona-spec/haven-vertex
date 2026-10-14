import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { openCalendly, useCalendly } from "@/lib/calendly";
import { useFinalCtaContact, useSiteSettings } from "@/lib/sanity/hooks";
import { usePreviewMode } from "@/lib/sanity/usePreviewMode";

const links = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  useCalendly();
  const { content } = useFinalCtaContact();
  const { content: siteSettings } = useSiteSettings();
  const { isPreview } = usePreviewMode();
  const calendlyUrl = content.calendlyUrl;

  return (
    <header
      className={`fixed inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/40 transition-smooth ${
        isPreview ? "top-9" : "top-0"
      }`}
    >
      <nav className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          {siteSettings.logo ? (
            <img
              src={siteSettings.logo}
              alt={siteSettings.siteName || "Haven Vertex"}
              className="h-10 sm:h-12 w-auto object-contain"
            />
          ) : (
            <span className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
              {siteSettings.siteName || "Haven Vertex"}
            </span>
          )}
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className="hover:text-foreground transition-smooth"
                activeClassName="text-foreground font-medium"
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Button asChild variant="default" size="sm" className="rounded-full px-5 gradient-primary text-primary-foreground border-0 shadow-soft hover:shadow-elegant transition-smooth">
          <a href={calendlyUrl} onClick={openCalendly(calendlyUrl)} target="_blank" rel="noopener noreferrer">Book a Call</a>
        </Button>
      </nav>
    </header>
  );
};
