import galleryKitchen from "@/assets/gallery-kitchen.jpg";
import galleryWardrobe from "@/assets/gallery-wardrobe.jpg";
import galleryVanity from "@/assets/gallery-vanity.jpg";
import galleryTvUnit from "@/assets/gallery-tvunit.jpg";
import galleryDoor from "@/assets/gallery-door.jpg";
import galleryPartition from "@/assets/gallery-partition.jpg";

type Product = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: string;
};

// Hardcoded products with images from assets folder
const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Custom Kitchen Cabinets",
    description: "Elegant kitchen cabinetry crafted with precision and attention to detail.",
    image_url: galleryKitchen,
    category: "Kitchen",
  },
  {
    id: "2",
    name: "Wardrobe Solutions",
    description: "Bespoke wardrobes designed to maximize your storage space efficiently.",
    image_url: galleryWardrobe,
    category: "Bedroom",
  },
  {
    id: "3",
    name: "Bathroom Vanity",
    description: "Stylish vanity units that combine functionality with modern aesthetics.",
    image_url: galleryVanity,
    category: "Bathroom",
  },
  {
    id: "4",
    name: "Entertainment Units",
    description: "Custom TV units and entertainment centers for your living space.",
    image_url: galleryTvUnit,
    category: "Living Room",
  },
  {
    id: "5",
    name: "Interior Doors",
    description: "Handcrafted wooden doors that add character to your home.",
    image_url: galleryDoor,
    category: "Doors",
  },
  {
    id: "6",
    name: "Room Partitions",
    description: "Elegant partitions to define spaces while maintaining aesthetic flow.",
    image_url: galleryPartition,
    category: "Partitions",
  },
];

export function Products() {
  return (
    <section id="products" className="bg-secondary/60 py-24 sm:py-32">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <span className="eyebrow">What we make</span>
          <span className="gold-rule mt-4" />
          <h2 className="mt-6 text-4xl sm:text-5xl">Our Products</h2>
          <p className="mt-4 text-muted-foreground">
            Manufactured in our own workshop, finished by hand, and fitted by our own team.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product, index) => (
            <article
              key={product.id}
              className="surface-card surface-card-hover reveal group flex flex-col overflow-hidden rounded-sm"
            >
              <div className="aspect-4/3 overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  loading={index < 4 ? "eager" : "lazy"}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                  {product.category}
                </span>
                <h3 className="mt-2 font-display text-xl leading-snug">{product.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
