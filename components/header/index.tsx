import Link from "next/link";
import { Feather } from "lucide-react";
import MobileNav from "@/components/header/mobile-nav";
import DesktopNav from "@/components/header/desktop-nav";
import { ModeToggle } from "@/components/menu-toggle";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    label: "Home",
    href: "/",
    target: false,
  },
  {
    label: "Blog",
    href: "/blog",
    target: false,
  },
  {
    label: "Over mij",
    href: "/over-mij",
    target: false,
  },
];

export default function Header() {
  return (
    <header className="sticky top-0 w-full border-b border-[#bfa76a] bg-background z-50">
      <div className="flex items-center justify-between h-14 max-w-7xl mx-auto px-8">
        <Link
          href="/"
          aria-label="Home page"
          className="flex items-center gap-2 font-serif font-bold text-xl text-accent"
        >
          <Feather className="w-6 h-6" />
          Fleur's Stem
        </Link>
        <div className="flex gap-7 items-center ml-auto hidden xl:flex">
          <DesktopNav navItems={navItems} />
          <ModeToggle />
        </div>
        <Button asChild variant="default" className="bg-accent text-accent-foreground border border-accent hover:bg-accent/80 font-medium hidden xl:flex ml-4">
          <Link href="/donate">Doneer</Link>
        </Button>
        <div className="flex items-center xl:hidden">
          <MobileNav navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
