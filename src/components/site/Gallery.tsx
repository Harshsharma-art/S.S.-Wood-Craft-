import { useEffect, useState } from "react";
import { X } from "lucide-react";

import galleryKitchen from "@/assets/gallery-kitchen.jpg";
import galleryWardrobe from "@/assets/gallery-wardrobe.jpg";
import galleryVanity from "@/assets/gallery-vanity.jpg";
import galleryTvUnit from "@/assets/gallery-tvunit.jpg";
import galleryDoor from "@/assets/gallery-door.jpg";
import galleryPartition from "@/assets/gallery-partition.jpg";

type GalleryItem = {
  id: string;
  title: string;
  image_url: string;
  category: string;
};

// Hardcoded gallery items with images from assets folder
const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "Modern Kitchen Design",
    image_url: galleryKitchen,
    category: "Kitchen",
  },
  {
    id: "2",
    title: "Custom Wardrobe",
    image_url: galleryWardrobe,
    category: "Wardrobe",
  },
  {
    id: "3",
    title: "Elegant Vanity",
    image_url: galleryVanity,
    category: "Vanity",
  },
  {
    id: "4",
    title: "TV Unit & Media Wall",
    image_url: galleryTvUnit,
    category: "TV Unit",
  },
  {
    id: "5",
    title: "Premium Door Design",
    image_url: galleryDoor,
    category: "Door",
  },
  {
    id: "6",
    title: "Room Partition",
    image_url: galleryPartition,
    category: "Partition",
  },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const current = active !== null ? GALLERY_ITEMS[active] : null;

  return (
    <section id="gallery" className="py-24 sm:py-32">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <span className="eyebrow">Our work</span>
          <span className="gold-rule mt-4" />
          <h2 className="mt-6 text-4xl sm:text-5xl">Recently completed projects</h2>
          <p className="mt-4 text-muted-foreground">
            Kitchens, wardrobes, vanities, partitions and media walls delivered across Moradabad and
            nearby districts.
          </p>
        </div>

        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {GALLERY_ITEMS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              className="reveal group block w-full break-inside-avoid overflow-hidden rounded-sm text-left"
            >
              <div className="relative">
                <img
                  src={item.image_url}
                  alt={item.title}
                  loading={index < 3 ? "eager" : "lazy"}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-[linear-gradient(to_top,oklch(0.2_0.04_163/0.85),transparent_55%)] p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div>
                    <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                      {item.category}
                    </span>
                    <p className="font-display text-lg text-primary-foreground">{item.title}</p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[oklch(0.16_0.03_150/0.92)] p-4"
        >
          <button
            type="button"
            aria-label="Close image"
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-primary-foreground/30 text-primary-foreground"
          >
            <X className="size-5" />
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-h-full max-w-4xl">
            <img
              src={current.image_url}
              alt={current.title}
              className="max-h-[78vh] w-auto rounded-sm object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-primary-foreground/80">
              {current.title} — {current.category}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
