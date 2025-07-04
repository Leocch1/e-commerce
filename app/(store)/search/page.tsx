import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";
import BackToItemsButton from "@/components/BackToItemsButton";

async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    query: string;
  }>;
}) {
  const query = (await searchParams).query;
  const rawProducts = await searchProductsByName(query);
  const products = rawProducts.map((product: any) => ({
    ...product,
    id: product._id,
  }));

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen bg-[#fff2e2] p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <BackToItemsButton />
          <h1 className="text-3xl font-bold mb-6 text-center">
            No Products Found for "{query}"
          </h1>
          <p className="text-gray-600 text-center">
            Try searching with different keywords.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <BackToItemsButton />
        <h1 className="text-3xl font-bold mb-6 text-center">
          Search Results for "{query}"
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default SearchPage;