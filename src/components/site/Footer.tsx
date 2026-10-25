import { Link } from "react-router-dom";

const links = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

const LINKEDIN_URL = "https://www.linkedin.com/company/haven-vertex";

export const Footer = () => (
  <footer className="py-12 border-t border-border/60">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
      <div>
        <p className="font-serif text-2xl">Haven Vertex</p>
        <p className="text-xs text-muted-foreground mt-1">Website Management • Virtual Assistance • Digital Support</p>
        <p className="text-xs text-muted-foreground mt-1">Serving Australia, USA, UK &amp; Canada</p>
      </div>
      <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        {links.map((l) => (
          <Link key={l.to} to={l.to} className="text-lavender-deep/70 hover:text-lavender-deep transition-smooth">{l.label}</Link>
        ))}
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-lavender-deep/70 hover:text-lavender-deep transition-smooth">LinkedIn</a>
      </nav>
      <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Haven Vertex. All rights reserved.</p>
    </div>
  </footer>
);
