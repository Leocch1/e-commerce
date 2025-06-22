"use client";

import { Product } from "@/sanity.types";
import useBasketStore from "@/store/store";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { Metadata } from "@/actions/createCheckoutSession";
import { createCheckoutSEssion } from "@/actions/createCheckoutSession";
import { useRouter } from "next/navigation";

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
}

function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleCheckoutNow = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    setIsLoading(true);

    try {
      // Add the item to the basket if not already present
      if (itemCount === 0) {
        addItem(product);
      }

      // Prepare metadata for checkout
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      };

      // Only checkout this single product
      const checkoutUrl = await createCheckoutSEssion(
        [{ product, quantity: getItemCount(product._id) || 1 }],
        metadata
      );
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => removeItem(product._id)}
        className={`w-8 h-8 rounded-full flex items-center justify-center
                transition-colors duration-200 ${
                  itemCount === 0
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
        disabled={itemCount === 0 || disabled}
      >
        <span
          className={`text-xl font-bold ${
            itemCount === 0 ? "text-gray-400" : "text-gray-600"
          }`}
        >
          -
        </span>
      </button>
      <span className="w-8 text-center font-semibold">{itemCount}</span>
      <button
        onClick={() => addItem(product)}
        className={`w-8 h-8 rounded-full flex items-center justify-center 
                transition-colors duration-200 ${
                  disabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
        disabled={disabled}
      >
        <span className="text-xl font-bold text-white">+</span>
      </button>
      <button
        onClick={handleCheckoutNow}
        className="ml-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
        disabled={disabled || isLoading}
      >
        {isLoading ? "Processing..." : "Checkout Now"}
      </button>
    </div>
  );
}

export default AddToBasketButton;