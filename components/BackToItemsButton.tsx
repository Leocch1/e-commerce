"use client";

import { useRouter } from "next/navigation";

export default function BackToItemsButton() {
  const router = useRouter();

  const handleClick = () => {
    // This clears the search query by navigating to the base path
    router.push("/items");
  };

  return (
    <button
      onClick={handleClick}
      className="mb-6 bg-yellow-800 text-white px-4 py-2 rounded hover:bg-yellow-900 transition"
    >
      ← Continue Shopping
    </button>
  );
}