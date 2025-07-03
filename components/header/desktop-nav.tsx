import Link from "next/link";
import { NavItem } from "@/types";

export default function DesktopNav({ navItems }: { navItems: NavItem[] }) {
  const activePath = "/";
  return (
    <div className="hidden xl:flex items-center gap-7 text-foreground -mr-4">
      {navItems.map((navItem: any) => {
        const isActive = navItem.href === activePath;
        return (
          <Link
            key={navItem.label}
            href={navItem.href}
            target={navItem.target ? "_blank" : undefined}
            rel={navItem.target ? "noopener noreferrer" : undefined}
            className={`transition-colors text-base px-1 font-medium ${
              isActive
                ? "text-accent border-b-2 border-accent pb-0.5"
                : "text-foreground hover:text-accent hover:border-b-2 hover:border-accent"
            }`}
          >
            {navItem.label}
          </Link>
        );
      })}
    </div>
  );
}
