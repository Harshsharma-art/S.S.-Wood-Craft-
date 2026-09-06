import { Award, Hammer, Ruler } from "lucide-react";

import workshop from "@/assets/about-workshop.jpeg";
import logo from "/favicon.svg";
import { SITE } from "@/lib/site";

const STATS = [
  { icon: Hammer, label: "Doors, frames & interiors", value: "In-house manufacturing" },
  { icon: Ruler, label: "Measured, made & fitted", value: "End-to-end execution" },
  { icon: Award, label: "Seasoned, graded timber", value: "Material you can trust" },
];

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div className="reveal relative">
          <img
            src={workshop}
            alt="S.S. WoodCraft workshop with stacked seasoned timber and woodworking tools"
            width={1024}
            height={1024}
            loading="lazy"
            className="w-full rounded-sm object-cover shadow-[var(--shadow-lift)]"
          />
          <div className="surface-card absolute -bottom-8 left-6 right-6 rounded-sm p-6 sm:left-10 sm:right-auto sm:w-72">
            <div className="flex items-center gap-4">
              <div className="grid size-14 shrink-0 place-items-center rounded-full bg-forest-gradient p-2 overflow-hidden">
                <img 
                  src={logo} 
                  alt="S.S. WoodCraft Logo" 
                  className="size-full object-contain"
                />
              </div>
              <div>
                <p className="font-display text-lg leading-tight">{SITE.founder}</p>
                <p className="text-xs tracking-wide text-muted-foreground">{SITE.founderTitle}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal mt-12 lg:mt-0">
          <span className="eyebrow">About the company</span>
          <span className="gold-rule mt-4" />
          <h2 className="mt-6 text-4xl sm:text-5xl">
            Woodwork with a signature you can feel
          </h2>
          <p className="mt-6 text-muted-foreground">
            S.S. WoodCraft Private Limited is a Moradabad-based timber and interior manufacturing
            company. From raw timber supply to wooden door frames, doors, windows, ventilators and
            PVC wall panels, we handle every stage under one roof — and then take it further into
            modular vanities, wardrobes, TV units and full home and office interiors.
          </p>
          <p className="mt-4 text-muted-foreground">
            Founded and led by <strong className="font-medium text-foreground">{SITE.founder}</strong>,
            the company was built on a simple promise: honest material, precise workmanship and
            delivery on the date we commit. That promise is our tagline —{" "}
            <em className="not-italic text-foreground">{SITE.tagline}</em>
          </p>

          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {STATS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="surface-card rounded-sm p-5">
                <Icon className="size-5 text-gold" aria-hidden="true" />
                <dt className="mt-3 font-display text-lg leading-tight">{value}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
