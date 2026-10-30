import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { openCalendly, useCalendly } from "@/lib/calendly";
import { useFinalCtaContact, useSiteSettings } from "@/lib/sanity/hooks";
import { usePreviewMode } from "@/lib/sanity/usePreviewMode";
import { setViewMode } from "@/lib/viewMode";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
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
    <header className={`fixed inset-x-0 z-50 px-4 sm:px-6 pt-3 transition-smooth ${isPreview ? "top-9" : "top-0"}`}>
      <nav className="mx-auto flex h-16 max-w-[1232px] items-center justify-between rounded-full border border-border/70 bg-white/90 pl-5 pr-2.5 backdrop-blur-md shadow-soft">
        <Link to="/" className="flex items-center gap-3">
          {siteSettings.logo ? (
            <img
              src={siteSettings.logo}
              alt={siteSettings.siteName || "Haven Vertex"}
              className="h-11 sm:h-12 w-auto object-contain"
            />
          ) : (
            <span className="font-serif text-2xl text-ink">
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
          <Link to="/kiosk" onClick={() => setViewMode("kiosk")} className="hidden lg:inline-flex h-11 items-center rounded-full border border-border px-4 text-sm font-semibold text-lavender-deep transition-smooth hover:bg-accent">Try kiosk mode</Link>
          <Button asChild variant="default" size="sm" className="rounded-full h-11 px-6 bg-primary text-primary-foreground border-0 hover:bg-primary hover:-translate-y-0.5 hover:shadow-elegant transition-smooth">
            <a href={calendlyUrl} onClick={openCalendly(calendlyUrl)} target="_blank" rel="noopener noreferrer">Book a free call</a>
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
        <ul id="mobile-menu" className="md:hidden mx-auto mt-2 max-w-[1232px] rounded-3xl border border-border/70 bg-white/95 px-6 py-3 flex flex-col text-base font-semibold shadow-elegant">
          <li><Link to="/kiosk" onClick={() => setViewMode("kiosk")} className="block py-3 text-lavender-deep font-bold">Try kiosk mode</Link></li>
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
