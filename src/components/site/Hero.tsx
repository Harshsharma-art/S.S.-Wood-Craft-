import heroKitchen from "@/assets/hero-kitchen.jpg";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section id="home" className="relative isolate min-h-[92vh] overflow-hidden">
      <img
        src={heroKitchen}
        alt="Premium modular kitchen with walnut cabinetry and marble counters by S.S. WoodCraft"
        width={1920}
        height={1088}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,oklch(0.2_0.04_163/0.94)_0%,oklch(0.22_0.05_163/0.78)_45%,oklch(0.2_0.04_163/0.35)_100%)]" />

      <div className="container-x relative flex min-h-[92vh] flex-col justify-center pt-28 pb-20">
        <div className="max-w-2xl">
          <span className="eyebrow">{SITE.tagline}</span>
          <span className="gold-rule mt-5" />
          <h1 className="mt-7 font-display text-[2.6rem] leading-[1.05] text-primary-foreground sm:text-6xl lg:text-7xl">
            Crafting Timber into <span className="text-gold-gradient">Timeless Interiors</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-primary-foreground/80 sm:text-lg">
            Premium wooden doors, windows, PVC panels &amp; complete interior works — built to last.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#gallery"
              className="rounded-sm bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              View Our Work
            </a>
            <a
              href="#contact"
              className="rounded-sm border border-primary-foreground/35 px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
