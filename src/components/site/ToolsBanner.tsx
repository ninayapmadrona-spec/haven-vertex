import { BarChart3, Blocks, Brush, CalendarCheck, Film, Layout, Mail, Search, ShoppingBag } from "lucide-react";

const tools = [
  { name: "WordPress", icon: Blocks }, { name: "Wix", icon: Layout }, { name: "Squarespace", icon: Layout },
  { name: "Elementor", icon: Blocks }, { name: "Canva", icon: Brush }, { name: "MailerLite", icon: Mail },
  { name: "Mailchimp", icon: Mail }, { name: "Google Workspace", icon: CalendarCheck }, { name: "Google Analytics", icon: BarChart3 },
  { name: "Google Search Console", icon: Search }, { name: "Ahrefs", icon: Search }, { name: "Semrush", icon: BarChart3 },
  { name: "Meta Business Suite", icon: Layout }, { name: "CapCut", icon: Film }, { name: "Trello", icon: CalendarCheck },
  { name: "Asana", icon: CalendarCheck }, { name: "ClickUp", icon: CalendarCheck }, { name: "GoHighLevel", icon: BarChart3 },
  { name: "Shopify", icon: ShoppingBag }, { name: "WooCommerce", icon: ShoppingBag },
];

export const ToolsBanner = () => (
  <section id="tools" className="py-20 lg:py-28">
    <div className="container text-center mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-lavender-deep mb-4">Digital Toolkit</p>
      <h2 className="font-serif text-4xl lg:text-5xl text-balance max-w-3xl mx-auto">
        Platforms & Tools I Work With
      </h2>
      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
        Trusted platforms for website management, content, marketing, analytics, and business operations.
      </p>
    </div>
    <div className="container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {tools.map((tool) => (
        <div key={tool.name} className="group min-h-28 bg-card border border-border/60 rounded-xl p-4 flex flex-col items-center justify-center gap-3 text-center shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth">
          <tool.icon className="w-6 h-6 text-lavender-deep group-hover:scale-110 transition-smooth" />
          <span className="text-sm font-medium leading-tight">{tool.name}</span>
        </div>
      ))}
    </div>
  </section>
);
