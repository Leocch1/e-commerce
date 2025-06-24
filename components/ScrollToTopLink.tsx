"use client";

import { useRouter } from "next/navigation";

interface ScrollToTopLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ScrollToTopLink({ href, children, className }: ScrollToTopLinkProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}