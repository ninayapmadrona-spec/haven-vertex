import { BarChart3, Blocks, Brush, CalendarCheck, Film, Layout, Mail, Search, ShoppingBag } from "lucide-react";
import { useToolsBanner } from "@/lib/sanity/hooks";
import type { ToolIcon } from "@/lib/sanity/types";

const ICONS: Record<ToolIcon, typeof Blocks> = {
  blocks: Blocks,
  layout: Layout,
  brush: Brush,
  mail: Mail,
  calendar: CalendarCheck,
  chart: BarChart3,
  search: Search,
  film: Film,
  shopping: ShoppingBag,
};

export const ToolsBanner = () => {
  const { content } = useToolsBanner();

  return (
    <section id="tools" className="py-20 lg:py-28">
      <div className="container text-center mb-12">
        {content.eyebrow && <p className="text-xs uppercase tracking-[0.3em] text-lavender-deep mb-4">{content.eyebrow}</p>}
        <h2 className="font-serif text-4xl lg:text-5xl text-balance max-w-3xl mx-auto">{content.heading}</h2>
        {content.description && <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{content.description}</p>}
      </div>
      <div className="container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {content.items.map((tool) => {
          const Icon = ICONS[tool.icon ?? "layout"] ?? Layout;
          return (
            <div key={tool.name} className="group min-h-28 bg-card border border-border/60 rounded-xl p-4 flex flex-col items-center justify-center gap-3 text-center shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth">
              <Icon className="w-6 h-6 text-lavender-deep group-hover:scale-110 transition-smooth" />
              <span className="text-sm font-medium leading-tight">{tool.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
