import { MessageCircle, Phone } from "lucide-react";

import { SITE, telHref } from "@/lib/site";

export function FloatingActions() {
  return (
    <div className="fixed right-4 bottom-4 z-60 flex flex-col gap-3">
      <a
        href={telHref(SITE.phones[0])}
        aria-label="Call S.S. WoodCraft"
        className="grid size-13 place-items-center rounded-full bg-gold text-accent-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-105 md:hidden"
      >
        <Phone className="size-5" aria-hidden="true" />
      </a>
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with S.S. WoodCraft on WhatsApp"
        className="grid size-13 place-items-center rounded-full bg-[oklch(0.62_0.17_150)] text-white shadow-[var(--shadow-lift)] transition-transform hover:scale-105"
      >
        <MessageCircle className="size-6" aria-hidden="true" />
      </a>
    </div>
  );
}
