import JuneSale from "@/components/JuneSale";
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
      <JuneSale/>

      <div className="flex flex-col items-center justify-top min-h-screen bg-[#fff2e2] p-4">
        <ProductsView products={products} categories={categories} showCategories={true}/>
      </div>
      <footer className="w-full bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto flex flex-col items-center">
          <span className="font-semibold text-lg">Tote & Tale</span>
          <span className="text-sm mt-2">© {new Date().getFullYear()} All rights reserved.</span>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}