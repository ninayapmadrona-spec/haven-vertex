import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { openCalendly, useCalendly } from "@/lib/calendly";
import { useFinalCtaContact, useSiteSettings } from "@/lib/sanity/hooks";
import { usePreviewMode } from "@/lib/sanity/usePreviewMode";

const links = [
  { to: "/", label: "Home", end: true },
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
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

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
        <ul className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className="text-lavender-deep/55 hover:text-lavender-deep transition-smooth"
                activeClassName="text-lavender-deep font-bold"
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Button asChild variant="default" size="sm" className="rounded-full px-5 gradient-primary text-primary-foreground border-0 shadow-soft hover:shadow-elegant transition-smooth">
            <a href={calendlyUrl} onClick={openCalendly(calendlyUrl)} target="_blank" rel="noopener noreferrer">Book a Call</a>
          </Button>
          <button
            type="button"
            className="md:hidden p-2 text-lavender-deep"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>
      {open && (
        <ul id="mobile-menu" className="md:hidden container pb-4 flex flex-col text-base font-semibold border-t border-border/40 bg-background/95">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className="block py-3 text-lavender-deep/55 hover:text-lavender-deep transition-smooth"
                activeClassName="text-lavender-deep font-bold"
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};
