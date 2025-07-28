"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavItem } from "@/types";
import Logo from "@/components/logo";
import { useState } from "react";
import { AlignRight } from "lucide-react";
import { ModeToggle } from "@/components/menu-toggle";

export default function MobileNav({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const activePath = "/";
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open Menu"
          variant="ghost"
          className="w-10 p-5 focus-visible:ring-1 focus-visible:ring-offset-1"
        >
          <AlignRight className="dark:text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="mx-auto">
            <Logo />
          </div>
          <div className="sr-only">
            <SheetTitle>Main Navigation</SheetTitle>
            <SheetDescription>Navigate to the website pages</SheetDescription>
          </div>
        </SheetHeader>
        <div className="pt-10 pb-20">
          <div className="container">
            <ul className="list-none text-center space-y-3">
              <>
                {navItems.map((navItem: any) => {
                  const isActive = navItem.href === activePath;
                  return (
                    <li key={navItem.label}>
                      <Link
                        onClick={() => setOpen(false)}
                        href={navItem.href}
                        target={navItem.target ? "_blank" : undefined}
                        rel={navItem.target ? "noopener noreferrer" : undefined}
                        className={`text-lg px-2 py-1 font-medium transition-colors ${
                          isActive
                            ? "text-accent border-b-2 border-accent"
                            : "text-foreground/80 hover:text-accent hover:border-b-2 hover:border-accent"
                        }`}
                      >
                        {navItem.label}
                      </Link>
                    </li>
                  );
                })}
              </>
              <li className="pt-4">
                <a
                  href="https://tikkie.me/pay/ArtistDelfl/e2wehApQq55pVssvhG68Qy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg px-2 py-1 font-medium transition-colors text-foreground/80 hover:text-accent hover:border-b-2 hover:border-accent"
                >
                  Doneer
                </a>
              </li>
            </ul>
            <div className="flex justify-center mt-8">
              <ModeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
