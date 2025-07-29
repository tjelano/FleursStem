"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DonationForm() {
  const pathname = usePathname();
  const isDonatePage = pathname === "/donate";
  return (
    <div className="text-center">
      {isDonatePage ? (
        <a
          href="https://tikkie.me/pay/ArtistDelfl/e2wehApQq55pVssvhG68Qy"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-accent text-accent-foreground border border-accent hover:bg-accent/80 font-semibold rounded transition"
        >
          Doneer via Tikkie
        </a>
      ) : (
        <Link
          href="/donate"
          className="inline-block px-6 py-3 bg-accent text-accent-foreground border border-accent hover:bg-accent/80 font-semibold rounded transition"
        >
          Doneer
        </Link>
      )}
    </div>
  );
}