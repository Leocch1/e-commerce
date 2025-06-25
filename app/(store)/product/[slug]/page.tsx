import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";
import ProductClientView from "@/components/ProductClientView";

export const dynamic = "force-static";
export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const product = await getProductBySlug(params.slug);

  if (!product) return notFound();

  return <ProductClientView product={product} />;
}
