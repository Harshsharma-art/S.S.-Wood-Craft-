import { Check } from "lucide-react";

import { SERVICES } from "@/lib/site";

export function Services() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="reveal">
          <span className="eyebrow">Services</span>
          <span className="gold-rule mt-4" />
          <h2 className="mt-6 text-4xl sm:text-5xl">
            From first measurement to final handover
          </h2>
          <p className="mt-5 text-muted-foreground">
            Take one service or the entire project — we plan, manufacture, install and supervise so
            you deal with a single accountable team.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-block rounded-sm bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Discuss your project
          </a>
        </div>

        <ul className="reveal grid gap-3 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <li
              key={service}
              className="surface-card surface-card-hover flex items-center gap-3 rounded-sm px-5 py-4"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary">
                <Check className="size-3.5 text-primary-foreground" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium">{service}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
