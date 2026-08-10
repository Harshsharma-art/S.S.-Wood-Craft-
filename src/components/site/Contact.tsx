import { useState } from "react";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";
import { SITE, telHref } from "@/lib/site";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20, "Phone number is too long"),
  message: z.string().trim().max(1000, "Message must be under 1000 characters"),
});

export function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSending(true);
    const { error } = await supabase.from("inquiries").insert(parsed.data);
    setSending(false);
    if (error) {
      toast.error("Could not send your enquiry. Please call us instead.");
      return;
    }
    toast.success("Thank you! We will call you back shortly.");
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="bg-secondary/60 py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <div className="reveal">
          <span className="eyebrow">Contact</span>
          <span className="gold-rule mt-4" />
          <h2 className="mt-6 text-4xl sm:text-5xl">Let's talk about your space</h2>
          <p className="mt-4 text-muted-foreground">
            Share your requirement and we will arrange a site measurement and a detailed quotation.
          </p>

          <div className="mt-8 space-y-4">
            <div className="surface-card flex gap-4 rounded-sm p-5">
              <MapPin className="size-5 shrink-0 text-gold" aria-hidden="true" />
              <p className="text-sm">{SITE.address}</p>
            </div>
            <div className="surface-card rounded-sm p-5">
              <div className="flex items-center gap-4">
                <Phone className="size-5 shrink-0 text-gold" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  {SITE.phones.map((p) => (
                    <a key={p} href={telHref(p)} className="text-sm hover:text-primary">
                      {p}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
            </a>
            <a
              href={telHref(SITE.phones[0])}
              className="flex items-center gap-2 rounded-sm bg-gold px-6 py-3 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              <Phone className="size-4" aria-hidden="true" /> Call Now
            </a>
          </div>

          <div className="mt-8 overflow-hidden rounded-sm border border-border">
            <iframe
              title="S.S. WoodCraft location on Google Maps"
              src={SITE.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full"
            />
          </div>
        </div>

        <form onSubmit={onSubmit} className="surface-card reveal h-fit rounded-sm p-7 sm:p-9">
          <h3 className="font-display text-2xl">Request a free quote</h3>
          <p className="mt-1 text-sm text-muted-foreground">We usually reply the same day.</p>

          <label className="mt-6 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Your name
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
              required
              className="mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm normal-case tracking-normal text-foreground outline-hidden focus:border-gold"
            />
          </label>

          <label className="mt-4 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Phone number
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              type="tel"
              maxLength={20}
              required
              className="mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm normal-case tracking-normal text-foreground outline-hidden focus:border-gold"
            />
          </label>

          <label className="mt-4 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Message
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              maxLength={1000}
              className="mt-2 w-full resize-none rounded-sm border border-input bg-background px-4 py-3 text-sm normal-case tracking-normal text-foreground outline-hidden focus:border-gold"
            />
          </label>

          <button
            type="submit"
            disabled={sending}
            className="mt-6 w-full rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send enquiry"}
          </button>
        </form>
      </div>
    </section>
  );
}
