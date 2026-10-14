import { Quote, Linkedin, ExternalLink } from "lucide-react";
import { useTestimonialsSection } from "@/lib/sanity/hooks";
import { getEmbedUrl } from "@/lib/video";
import type { TestimonialItem } from "@/lib/sanity/types";

const ClientByline = ({ item }: { item: TestimonialItem }) => (
  <div className="flex items-center gap-3 mt-5">
    {item.clientPhoto ? (
      <img src={item.clientPhoto} alt={item.clientName} className="w-10 h-10 rounded-full object-cover" />
    ) : (
      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-lavender-deep font-serif">
        {item.clientName?.[0]}
      </div>
    )}
    <div className="text-left">
      <p className="text-sm font-medium text-foreground">{item.clientName}</p>
      {item.company && <p className="text-xs text-muted-foreground">{item.company}</p>}
    </div>
    {item.companyLogo && <img src={item.companyLogo} alt={item.company} className="h-6 ml-auto object-contain" />}
  </div>
);

const TestimonialCard = ({ item }: { item: TestimonialItem }) => {
  const embedUrl = item.type === "video" ? getEmbedUrl(item.videoUrl) : null;

  return (
    <article className="rounded-3xl bg-card border border-border/60 shadow-soft p-8 flex flex-col">
      {item.type === "video" && embedUrl && (
        <div className="aspect-video rounded-2xl overflow-hidden mb-5 bg-ink/5">
          <iframe
            src={embedUrl}
            title={`Video testimonial from ${item.clientName}`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      )}

      {item.type === "written" && (
        <>
          <Quote className="w-8 h-8 text-lavender-deep/30 mb-3" />
          <p className="text-foreground leading-relaxed flex-1">{item.writtenText}</p>
        </>
      )}

      {item.type === "linkedin" && (
        <>
          {item.linkedinScreenshot ? (
            <img src={item.linkedinScreenshot} alt={`LinkedIn recommendation for ${item.clientName}`} className="rounded-xl mb-4 w-full object-cover" />
          ) : (
            <Quote className="w-8 h-8 text-lavender-deep/30 mb-3" />
          )}
          {item.linkedinText && <p className="text-foreground leading-relaxed flex-1">{item.linkedinText}</p>}
          {item.linkedinUrl && (
            <a
              href={item.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-lavender-deep hover:text-lavender-deep/80 transition-smooth"
            >
              <Linkedin className="w-3.5 h-3.5" /> View on LinkedIn <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </>
      )}

      <ClientByline item={item} />
    </article>
  );
};

export const Testimonials = () => {
  const { content } = useTestimonialsSection();
  const items = content.items || [];

  return (
    <section id="testimonials" className="py-24 lg:py-32 gradient-soft">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          {content.eyebrow && <p className="text-xs uppercase tracking-[0.3em] text-lavender-deep mb-4">{content.eyebrow}</p>}
          <h2 className="font-serif text-4xl lg:text-5xl text-balance">{content.heading}</h2>
        </div>

        {items.length === 0 ? (
          <div className="max-w-2xl mx-auto rounded-3xl bg-card border border-border/60 shadow-soft p-10 lg:p-14 text-center">
            <Quote className="w-10 h-10 text-lavender-deep/30 mx-auto mb-5" />
            <p className="font-serif text-2xl text-foreground">Client stories coming soon</p>
            <p className="mt-3 text-muted-foreground">{content.description || "Verified written and video reviews will appear here as they become available."}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <TestimonialCard key={i} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
