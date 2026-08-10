import { BadgeIndianRupee, Clock, Cog, PencilRuler, ShieldCheck, TreePine, Users } from "lucide-react";

import { WHY_US } from "@/lib/site";

const ICONS = [TreePine, Users, Cog, PencilRuler, BadgeIndianRupee, Clock, ShieldCheck];

export function WhyUs() {
  return (
    <section id="why-us" className="bg-forest-gradient py-24 text-primary-foreground sm:py-32">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <span className="eyebrow">Why choose us</span>
          <span className="gold-rule mt-4" />
          <h2 className="mt-6 text-4xl text-primary-foreground sm:text-5xl">
            Reasons clients keep coming back
          </h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_US.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={item.title}
                className="reveal rounded-sm border border-primary-foreground/12 bg-primary-foreground/5 p-6 transition-colors hover:border-gold/60"
              >
                <Icon className="size-6 text-gold" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl text-primary-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-primary-foreground/70">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
