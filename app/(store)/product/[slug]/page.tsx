import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";
import ProductClientView from "@/components/ProductClientView";

export const dynamic = "force-static";
export const revalidate = 60;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: Props) {
  // Await the params Promise
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  return <ProductClientView product={product} />;
}