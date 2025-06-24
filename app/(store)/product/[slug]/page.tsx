import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";
import ProductClientView from "@/components/ProductClientView";

export const dynamic = "force-static";
export const revalidate = 60;

export default async function Productpage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // now continue with your logic:
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  return <ProductClientView product={product} />;
}
