import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";
import ProductClientView from "@/components/ProductClientView";

export const dynamic = "force-static";
export const revalidate = 60;

type PageProps = {
  params: { slug: string };
};

export default async function Page({ params }: PageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) return notFound();

  return <ProductClientView product={product} />;
}
