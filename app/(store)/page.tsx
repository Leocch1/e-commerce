import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";


export default async function Home() {
  const rawProducts = await getAllProducts();
  const categories = await getAllCategories();
  const products = rawProducts.map((product: any) => ({
    ...product,
    id: product._id,
  }));
  return (
    <div>
      <h2>Hello World</h2>

      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <ProductsView products={products} categories={categories}/>
      </div>
    </div>
  );
}
