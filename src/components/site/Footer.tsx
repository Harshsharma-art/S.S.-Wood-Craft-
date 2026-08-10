import { TreePine } from "lucide-react";

import { NAV, SITE, telHref } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-gradient pt-16 pb-8 text-primary-foreground">
      <div className="container-x grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-sm border border-gold/60">
              <TreePine className="size-4 text-gold" aria-hidden="true" />
            </span>
            <span className="font-display text-xl">S.S. WoodCraft</span>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/70">{SITE.name}</p>
          <p className="mt-2 text-sm text-gold-soft">{SITE.tagline}</p>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-[0.2em] text-gold">Quick links</h3>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-primary-foreground/75">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-gold">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-[0.2em] text-gold">Reach us</h3>
          <p className="mt-4 text-sm text-primary-foreground/75">{SITE.address}</p>
          <div className="mt-3 flex flex-col gap-1 text-sm">
            {SITE.phones.map((p) => (
              <a key={p} href={telHref(p)} className="text-primary-foreground/85 hover:text-gold">
                {p}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x mt-12 border-t border-primary-foreground/12 pt-6 text-center text-xs text-primary-foreground/60">
        © {year} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
