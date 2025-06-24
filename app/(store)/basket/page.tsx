"use client";
import AddToBasketButton from "@/components/AddToBasketButton";
import { imageUrl } from "@/lib/imageUrl";
import useBasketStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/Loader";
import { Metadata } from "@/actions/createCheckoutSession";
import { createCheckoutSEssion } from "@/actions/createCheckoutSession";

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [id: string]: boolean }>({});

  useEffect(() => {
    setIsClient(true);
    setCheckedItems(
      Object.fromEntries(groupedItems.map((item) => [item.product._id, true]))
    );
    // eslint-disable-next-line
  }, [groupedItems.length]);

  if (!isClient) return <Loader />;

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
        <p className="text-gray-600 text-lg">Your basket is empty.</p>
      </div>
    );
  }

  const checkedGroupedItems = groupedItems.filter(
    (item) => checkedItems[item.product._id]
  );

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      };

      const checkoutUrl = await createCheckoutSEssion(checkedGroupedItems, metadata);
      if (checkoutUrl) window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Error creating checkout session", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="mb-4">
          <button
            onClick={() => router.push("/items")}
            className="bg-yellow-800 text-white px-4 py-2 rounded hover:bg-yellow-900 transition"
          >
            ← Continue Shopping
          </button>
        </div>

        <h1 className="text-4xl font-bold mb-6 text-gray-900">Your Basket</h1>

        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* Basket Items */}
          <div className="flex-grow">
            {groupedItems.map((item) => (
              <div
                key={item.product._id}
                className="mb-4 p-4 border rounded flex flex-col sm:flex-row items-center justify-between gap-4 bg-white"
              >
                <div className="flex items-center w-full sm:w-auto">
                  <input
                    type="checkbox"
                    className="mr-4 w-5 h-5"
                    checked={!!checkedItems[item.product._id]}
                    onChange={(e) =>
                      setCheckedItems((prev) => ({
                        ...prev,
                        [item.product._id]: e.target.checked,
                      }))
                    }
                  />
                  <div
                    className="flex items-center cursor-pointer min-w-0"
                    onClick={() =>
                      router.push(`/product/${item.product.slug?.current}`)
                    }
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                      {item.product.image && (
                        <Image
                          src={imageUrl(item.product.image).url()}
                          alt={item.product.name ?? "Product image"}
                          className="w-full h-full object-cover rounded"
                          width={96}
                          height={96}
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg sm:text-xl font-semibold truncate">
                        {item.product.name}
                      </h2>
                      <p className="text-sm sm:text-base">
                        Price: ₱
                        {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <AddToBasketButton product={item.product} />
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80 h-fit bg-white p-6 border rounded shadow-md order-none lg:order-first mb-6 lg:mb-0">
            <h3 className="text-xl font-semibold">Order Summary</h3>
            <div className="mt-4 space-y-2">
              <p className="flex justify-between">
                <span>Items:</span>
                <span>
                  {checkedGroupedItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </p>
              <p className="flex justify-between text-2xl font-bold border-t pt-2">
                <span>Total:</span>
                <span>
                  ₱
                  {checkedGroupedItems
                    .reduce(
                      (total, item) =>
                        total + (item.product.price ?? 0) * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </p>
            </div>

            {isSignedIn ? (
              <button
                onClick={handleCheckout}
                disabled={isLoading || checkedGroupedItems.length === 0}
                className="mt-4 w-full bg-yellow-800 text-white px-4 py-2 rounded hover:bg-yellow-900 disabled:bg-gray-400"
              >
                {isLoading
                  ? "Processing..."
                  : checkedGroupedItems.length === 0
                  ? "Select items to checkout"
                  : "Checkout"}
              </button>
            ) : (
              <SignInButton mode="modal">
                <button className="mt-4 w-full bg-yellow-800 text-white px-4 py-2 rounded hover:bg-yellow-900">
                  Sign in to Checkout
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketPage;
