import ProductsView from "@/components/ProductsView";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import Link from "next/link";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import ScrollToTopLink from "@/components/ScrollToTopLink";

export const dynamic = "force-static";
export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const rawProducts = await getAllProducts();
  const categories = await getAllCategories();

  const featuredProductIds = [
  "a4690a28-19da-40ab-abad-80c03a8180c8", // Example Sanity product _id
  "f484b59e-83f1-4f3f-8d83-2a84ceace42c",
  "3e0dafb4-2bf6-4179-ab93-5ad36031f779",
  "172877ad-8028-4fea-9d5c-b427d8b19c55"
];

const featuredProducts = rawProducts.filter(product =>
  featuredProductIds.includes(product._id)
);

  console.log(
    crypto.randomUUID().slice(0, 5) +
    `>>> Rerendered the home page cache with ${ProductsView.length}
    products and ${categories.length} categories`
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">

      <section className="relative w-full min-h-screen bg-white flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 lg:px-20 overflow-hidden">
        {/* Background Slant */}
<div className="absolute inset-0 z-0 overflow-visible">
  <Image
    src="/slanted-bg.svg"
    alt="Slanted Background"
    width={1000}
    height={1000}
    className="
      absolute 
      bottom-0 
      right-0 
      w-[200%] 
      sm:w-[180%] 
      md:w-[140%] 
      translate-y-1 
      md:translate-y-80 
      translate-x-1/4 
      md:translate-x-112 
      z-0
    "
  />
</div>


        {/* Left Text */}
        <div className="w-full md:w-1/2 z-10 text-center md:text-left flex flex-col pt-20 md:pt-1 relative md:pl-7">
          <h1 className="text-4xl sm:text-5xl md:text-8xl leading-tight text-gray-900 font-extralight">
            Your Ultimate <br /> Destination for <br />
            <span className="text-[#9C5B27] font-extrabold">Luxe Bags</span>
          </h1>

          <a
            href="#scroll"
            className="inline-flex items-center justify-center gap-2 mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border border-black text-gray-900 rounded-full font-semibold hover:bg-black hover:text-white transition w-fit mx-auto md:mx-0"
          >
            See More <ChevronDownIcon className="w-5 h-5" />
          </a>
        </div>

        {/* Right Image */}
        <div className="relative w-full md:w-1/2 min-h-[60vh] md:min-h-screen flex items-start justify-center z-10 mt-0">
          <Image
            src="/bag.svg"
            alt="Bia Handbag"
            width={1000}
            height={1000}
            className="absolute top-0 right-1/2 md:right-0 translate-x-1/2 md:translate-x-0 w-[100%] sm:w-[90%] md:w-full h-auto object-contain z-30"
            priority
          />
        </div>

      </section>


      {/* New Hero Section (Fit for Misfits style) */}
      <section id="scroll" className="w-full bg-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-6 md:h-[500px]">
          {/* Text Block */}
          <div className="flex-1 text-center md:text-left py-8 md:py-0">
            <p className="text-black text-sm sm:text-base font-medium mb-1">Own your Style</p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-yellow-900 leading-tight mb-2">
              EVERY TOTE<br className="hidden sm:block" /> HAS A TALE
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              Crafted for the Stories You Live
            </p>
            <ScrollToTopLink
  href="/items"
  className="bg-gray-800 text-white font-semibold text-sm px-6 py-2 rounded-full hover:bg-gray-900 transition whitespace-nowrap w-fit"
>
  Shop Now
</ScrollToTopLink>
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
  <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2 text-center">
    Best Selling Products
  </h2>
  <p className="text-gray-500 mb-8 text-center">
    Tote & Tale for the best of us
  </p>

  {/** Featured products (manually selected by _id) */}
  <ProductsView
    products={featuredProducts}
    categories={categories}
    showCategories={false}
  />
</section>

      {/* Old Hero Section (moved below products) */}
      <section className="relative w-full flex flex-col-reverse md:flex-row bg-[#a26f25] rounded-xl mt-12 mx-auto max-w-6xl px-4 sm:px-8 py-8 sm:py-12 justify-between items-center overflow-hidden">
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
          <ScrollToTopLink
  href="/items"
  className="bg-white text-[#ed1c24] font-bold px-6 py-2 rounded-full shadow hover:bg-red-900 hover:text-white transition"
>
  Shop the Collection
</ScrollToTopLink>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-6 mt-8">
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
