import Link from "next/link";
import Logo from "@/components/logo";
import { ModeToggle } from "@/components/menu-toggle";

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

export default function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer>
      <div className="bg-background pb-5 xl:pb-5 text-foreground">
        <Link
          className="block w-[6.25rem] mx-auto"
          href="/"
          aria-label="Home page"
        >
          <Logo />
        </Link>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-7">
          {navItems.map((navItem) => (
            <Link
              key={navItem.label}
              href={navItem.href}
              target={navItem.target ? "_blank" : undefined}
              rel={navItem.target ? "noopener noreferrer" : undefined}
              className="transition-colors hover:text-accent text-foreground text-sm"
            >
              {navItem.label}
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-col lg:flex-row gap-6 justify-center text-center lg:mt-5 text-xs pt-8">
          <p className="text-foreground">
            &copy; {getCurrentYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
