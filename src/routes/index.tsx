import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Footer } from "@/components/site/Footer";
import { Gallery } from "@/components/site/Gallery";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Products } from "@/components/site/Products";
import { Services } from "@/components/site/Services";
import { WhyUs } from "@/components/site/WhyUs";
import { useReveal } from "@/hooks/use-reveal";

const TITLE =
  "S.S. WoodCraft Private Limited | Wooden Doors, Windows, PVC Panels & Interior Works in Moradabad";
const DESCRIPTION =
  "S.S. WoodCraft Private Limited, Moradabad — premium wooden door frames, doors, windows, PVC panels, modular vanities, wardrobes and complete interior works.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      <Header />
      <main>
        <Hero />
        <About />
        <Products />
        <Services />
        <WhyUs />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
