import JuneSale from "@/components/JuneSale";
import ProductsView from "@/components/ProductsView";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const rawProducts = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* New Hero Section (Fit for Misfits style) */}
<section className="w-full bg-gray-100">
  <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-6 md:h-[500px]">
    {/* Text Block */}
    <div className="flex-1 text-center md:text-left py-8 md:py-0">
      <p className="text-black text-sm sm:text-base font-medium mb-1">Own your Style</p>
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-black leading-tight mb-2">
        EVERY TOTE<br className="hidden sm:block" /> HAS A TALE
      </h1>
      <p className="text-gray-600 text-sm sm:text-base mb-4">
        Crafted for the Stories You Live.
      </p>
      <Link
        href="/items"
        className="inline-block bg-black text-white font-semibold px-6 py-2 rounded-full hover:bg-gray-800 transition"
      >
        Shop Now
      </Link>
    </div>

    {/* Image Block - hidden on mobile */}
    <div className="flex-1 hidden md:flex justify-end items-center h-full">
      <Image
        src="/model2.png"
        alt="New Hero Look"
        width={400}
        height={500}
        priority
        className="h-full w-auto object-cover"
      />
    </div>
  </div>
</section>


      {/* Best Selling Products */}
      <section className="w-full max-w-5xl mx-auto mt-12 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
          Best selling products
        </h2>
        <p className="text-gray-500 mb-8 text-center">
          Tote & Tale for the best of us
        </p>
        <ProductsView
          products={rawProducts.slice(0, 4)}
          categories={categories}
          showCategories={false}
        />
      </section>

      {/* Old Hero Section (moved below products) */}
      <section className="relative w-full flex flex-col-reverse md:flex-row bg-[#ed1c24] rounded-xl mt-12 mx-auto max-w-6xl px-4 sm:px-8 py-8 sm:py-12 justify-between items-center overflow-hidden">
  {/* Left text */}
  <div className="flex-1 text-white text-center md:text-left flex flex-col justify-center z-10 mt-6 md:mt-0">
    <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-2 leading-tight">
      Every Bag<br className="hidden sm:block" />Tells a Story
    </h2>
    <p className="text-sm sm:text-base mb-4">
      Discover designs that carry more than just essentials.
    </p>
  </div>

  {/* Image - hidden on mobile */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0 hidden md:block">
    <Image
      src="/model.png"
      alt="Hero Bag"
      width={360}
      height={700}
      priority
      className="h-[300px] sm:h-[400px] md:h-[420px] w-auto object-bottom object-cover"
    />
  </div>

  {/* Right text */}
  <div className="flex-1 flex flex-col items-center md:items-end justify-center text-white z-10 mt-6 md:mt-0">
    <p className="text-sm sm:text-base font-semibold mb-2">Own your Style</p>
    <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-2 text-right">Own Your Look</h2>
    <p className="text-sm sm:text-base mb-4 text-right">Crafted for those who carry style with meaning.</p>
    <Link
      href="/items"
      className="bg-white text-[#ed1c24] font-bold px-6 py-2 rounded-full shadow hover:bg-gray-100 transition"
    >
      Shop the Collection
    </Link>
  </div>
</section>

      {/* Footer */}
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
