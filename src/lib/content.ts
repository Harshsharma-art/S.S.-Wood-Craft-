import { supabase } from "@/integrations/supabase/client";

import galleryKitchen from "@/assets/gallery-kitchen.jpg";
import galleryWardrobe from "@/assets/gallery-wardrobe.jpg";
import galleryVanity from "@/assets/gallery-vanity.jpg";
import galleryTvUnit from "@/assets/gallery-tvunit.jpg";
import galleryDoor from "@/assets/gallery-door.jpg";
import galleryPartition from "@/assets/gallery-partition.jpg";

export type Product = {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  category: string;
  display_order: number;
  is_active: boolean;
};

export type GalleryItem = {
  id: string;
  title: string;
  image_url: string | null;
  category: string;
  display_order: number;
  is_active: boolean;
};

export const FALLBACK_IMAGES = [
  galleryKitchen,
  galleryWardrobe,
  galleryVanity,
  galleryTvUnit,
  galleryDoor,
  galleryPartition,
];

export const fallbackImage = (index: number) => FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

export const productsQuery = {
  queryKey: ["products", "public"],
  queryFn: async (): Promise<Product[]> => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Product[];
  },
  staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
};

export const galleryQuery = {
  queryKey: ["gallery", "public"],
  queryFn: async (): Promise<GalleryItem[]> => {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as GalleryItem[];
  },
  staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
};
