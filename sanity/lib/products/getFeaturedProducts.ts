import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { Product } from "@/sanity.types"; // ✅ make sure this matches your shared type

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const FEATURED_PRODUCTS_QUERY = defineQuery(`
    *[
      _type == "product" && featured == true
    ] | order(_createdAt desc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      name,
      price,
      slug,
      images[]{asset->},
      description,
      featured,
      category->{
        _id,
        _type,
        name,
        slug
      }
    }
  `);

  try {
    const result = await sanityFetch({
      query: FEATURED_PRODUCTS_QUERY,
      params: {},
    });

    return (result.data || []).map((item: any) => ({
      ...item,
      name: item.name === null ? undefined : item.name,
      price: item.price === null ? undefined : item.price,
      slug: item.slug === null ? undefined : item.slug,
      // Add similar conversions for other fields if needed
    }));
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
};