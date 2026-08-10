import { useEffect, useState } from "react";
import { Menu, Phone, TreePine, X } from "lucide-react";

import { NAV, SITE, telHref } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-forest-gradient shadow-[0_10px_40px_-24px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-sm border border-gold/60">
            <TreePine className="size-4 text-gold" aria-hidden="true" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-xl font-semibold tracking-tight text-primary-foreground">
              S.S. WoodCraft
            </span>
            <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.28em] text-gold-soft/80">
              Private Limited
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-primary-foreground/85 transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={telHref(SITE.phones[0])}
            className="flex items-center gap-2 text-sm text-primary-foreground/90 transition-colors hover:text-gold"
          >
            <Phone className="size-4 text-gold" aria-hidden="true" />
            {SITE.phones[0]}
          </a>
          <a
            href="#contact"
            className="rounded-sm bg-gold px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            Get a Quote
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-sm border border-primary-foreground/25 text-primary-foreground lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="bg-forest-gradient lg:hidden">
          <nav className="container-x flex flex-col gap-1 pb-6">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-primary-foreground/10 py-3 text-sm text-primary-foreground/90"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              {SITE.phones.map((p) => (
                <a
                  key={p}
                  href={telHref(p)}
                  className="flex items-center gap-2 text-sm text-gold-soft"
                >
                  <Phone className="size-4" aria-hidden="true" /> {p}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-sm bg-gold px-5 py-3 text-center text-sm font-medium text-accent-foreground"
              >
                Get a Quote
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
