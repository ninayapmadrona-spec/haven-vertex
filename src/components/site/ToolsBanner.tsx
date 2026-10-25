import { useToolsBanner } from "@/lib/sanity/hooks";

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
        {content.items.map((tool) => (
          <div key={tool.name} className="min-h-16 bg-card border border-border/60 rounded-full px-4 py-3 flex items-center justify-center text-center shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth">
            <span className="text-sm font-medium leading-tight">{tool.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
