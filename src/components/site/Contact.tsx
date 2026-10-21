import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Mail, Linkedin, MapPin, CheckCircle2 } from "lucide-react";
import { useFinalCtaContact } from "@/lib/sanity/hooks";
import { openCalendly, useCalendly } from "@/lib/calendly";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  business: z.string().trim().max(100).optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

export const Contact = () => {
  const { content } = useFinalCtaContact();
  const [form, setForm] = useState({ name: "", email: "", business: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  useCalendly();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast({ title: "Please check the form", description: result.error.issues[0].message, variant: "destructive" });
      return;
    }
    const data = result.data;
    const subject = `Website enquiry from ${data.name}${data.business ? ` (${data.business})` : ""}`;
    const body = `Name: ${data.name}\nEmail: ${data.email}\nBusiness: ${data.business || "-"}\nService: ${data.service}\n\n${data.message}`;
    // Web3Forms access key: public by design (it can only deliver messages to
    // hello@havenvertex.com). Can be overridden with VITE_WEB3FORMS_KEY.
    const key = (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) || "f05e4f0f-cbb4-45ca-9f3b-193145b7fe3c";
    const fields = { name: data.name, email: data.email, business: data.business || "-", service: data.service, message: data.message };

    const request = fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: key, subject, from_name: "Haven Vertex website", botcheck: "", ...fields }),
    });

    setLoading(true);
    request
      .then((r) => r.json())
      .then((json) => {
        if (!(json.success === true || json.success === "true")) throw new Error(json.message);
        const first = data.name.trim().split(/\s+/)[0] || "";
        setSentTo(first.charAt(0).toUpperCase() + first.slice(1));
        setForm({ name: "", email: "", business: "", service: "", message: "" });
      })
      .catch((err: Error) => {
        const reason = err?.message && err.message !== "Failed to fetch" ? `${err.message} ` : "";
        toast({ title: "Couldn't send your message", description: `${reason}Please email ${content.email} directly.`, variant: "destructive" });
      })
      .finally(() => setLoading(false));
  };

  return (
    <section id="contact" className="py-24 lg:py-32 gradient-soft">
      <div className="container grid lg:grid-cols-5 gap-12 lg:gap-16">
        <div className="lg:col-span-2">
          <p className="text-xs uppercase tracking-[0.3em] text-lavender-deep mb-4">Contact</p>
          <h1 className="font-serif text-4xl lg:text-5xl leading-tight text-balance">{content.contactHeading}</h1>
          {content.contactDescription && (
            <p className="mt-5 text-muted-foreground leading-relaxed">{content.contactDescription}</p>
          )}

          <div className="mt-10 space-y-4">
            {content.email && (
              <a href={`mailto:${content.email}`} className="flex items-center gap-3 text-foreground hover:text-lavender-deep transition-smooth">
                <span className="w-10 h-10 rounded-full bg-accent flex items-center justify-center"><Mail className="w-4 h-4 text-lavender-deep" /></span>
                <span><span className="block text-xs uppercase tracking-wider text-muted-foreground">Email</span>{content.email}</span>
              </a>
            )}
            {content.linkedinUrl && (
              <a href={content.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground hover:text-lavender-deep transition-smooth">
                <span className="w-10 h-10 rounded-full bg-accent flex items-center justify-center"><Linkedin className="w-4 h-4 text-lavender-deep" /></span>
                <span><span className="block text-xs uppercase tracking-wider text-muted-foreground">LinkedIn</span>{content.linkedinLabel}</span>
              </a>
            )}
            {(content.location || content.locationNote) && (
              <div className="flex items-start gap-3 text-foreground">
                <span className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0"><MapPin className="w-4 h-4 text-lavender-deep" /></span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground">Location</span>
                  {content.location && <span className="block">{content.location}</span>}
                  {content.locationNote && <span className={`block ${content.location ? "text-sm text-muted-foreground mt-1" : ""}`}>{content.locationNote}</span>}
                </span>
              </div>
            )}
          </div>
        </div>

        {sentTo !== null ? (
          <div role="status" className="lg:col-span-3 bg-card rounded-3xl p-8 lg:p-12 border border-border/60 shadow-soft text-center flex flex-col items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-lavender-deep" />
            <h2 className="mt-5 font-serif text-3xl lg:text-4xl text-balance">Thank you{sentTo ? `, ${sentTo}` : ""}!</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
              Your message is on its way to me. I'll reply within 1–2 business days. If you'd like to talk sooner, you can book a free 30-minute discovery call.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild className="rounded-full h-12 px-6 gradient-primary text-primary-foreground border-0">
                <a href={content.calendlyUrl} onClick={openCalendly(content.calendlyUrl)} target="_blank" rel="noopener noreferrer">Book a Free Call</a>
              </Button>
              <Button variant="outline" className="rounded-full h-12 px-6" onClick={() => setSentTo(null)}>Send another message</Button>
            </div>
          </div>
        ) : (
        <form onSubmit={submit} className="lg:col-span-3 bg-card rounded-3xl p-8 lg:p-10 border border-border/60 shadow-soft space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} className="h-12 rounded-xl bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} className="h-12 rounded-xl bg-background" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="business">Business Name</Label>
              <Input id="business" value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} maxLength={100} className="h-12 rounded-xl bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">Service Needed</Label>
              <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
                <SelectTrigger id="service" className="h-12 rounded-xl bg-background"><SelectValue placeholder="Select a service" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="essential">Essential Website Support</SelectItem>
                  <SelectItem value="content">Content & Marketing Support</SelectItem>
                  <SelectItem value="dedicated">Dedicated Digital Support</SelectItem>
                  <SelectItem value="other">Something else</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} className="rounded-xl bg-background resize-none" placeholder="Tell me about your business and what you need help with..." />
          </div>

          <Button type="submit" disabled={loading} size="lg" className="w-full rounded-full h-14 gradient-primary text-primary-foreground border-0 shadow-soft hover:shadow-elegant transition-smooth">
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
        )}
      </div>
    </section>
  );
};
