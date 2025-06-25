"use client";

import { Product } from "@/sanity.types";
import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { useState } from "react";
import AddToBasketButton from "./AddToBasketButton";
import BackToItemsButton from "./BackToItemsButton";

interface ProductClientViewProps {
  product: Product;
}

export default function ProductClientView({ product }: ProductClientViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const isOutOfStock = product.stock != null && product.stock <= 0;
  const images = product.images ?? [];

  // Debug logging
  console.log("Product images:", images);
  console.log("Selected image index:", selectedImageIndex);
  console.log("Current image:", images[selectedImageIndex]);

  // Add safety check for images
  const hasImages = images.length > 0;
  const currentImage = hasImages ? images[selectedImageIndex] : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <BackToItemsButton />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
          <div
            className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${
              isOutOfStock ? "opacity-50" : ""
            }`}
          >
            {currentImage ? (
              <Image
                src={imageUrl(currentImage).url()}
                alt={product.name ?? "Product Image"}
                fill
                className="object-contain transition-transform duration-300 hover:scale-105"
              />
            ) : (
              // Fallback when no images
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <span className="text-white font-bold text-lg">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Thumbnails - only show if there are multiple images */}
          {hasImages && images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {images.map((img, index) => {
                console.log(`Thumbnail ${index}:`, img); // Debug log
                return (
                  <button
                    key={img._key || index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 border-2 ${
                      selectedImageIndex === index
                        ? "border-blue-500"
                        : "border-transparent"
                    } rounded overflow-hidden`}
                  >
                    <Image
                      src={imageUrl(img).width(100).height(100).url()}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="text-xl font-semibold mb-4">
              {product.price
                ? `₱${product.price.toFixed(2)}`
                : "Price not available"}
            </div>
            <div className="prose max-w-none mb-6">
              {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )}
            </div>
          </div>

          <div className="mt-6">
            <AddToBasketButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
}