// app/(store)/product/[slug]/page.tsx

import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";
import ProductClientView from "@/components/ProductClientView";

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60;

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  return <ProductClientView product={product} />;
}
