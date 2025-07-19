import { Button } from "@/components/ui/button";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERYResult } from "@/sanity.types";

type Hero2Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "hero-2" }
>;

export default function Hero2({ tagLine, title, body, links }: Hero2Props) {
  return (
    <section className="w-full bg-background py-20 relative overflow-hidden">
      {/* Spotlight/Glow Effect */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400/20 via-transparent to-transparent blur-3xl z-0" />
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Text Content */}
          <div className="text-start flex flex-col justify-center h-full z-10">
            {tagLine && (
              <div className="mb-4">
                <span className="inline-block rounded px-3 py-1 text-xs font-semibold tracking-wide bg-muted/30 text-muted-foreground uppercase">
                  {tagLine}
                </span>
              </div>
            )}
            {title && (
              <h1 className="font-bold leading-tight text-4xl md:text-5xl lg:text-6xl mb-6">
                {title}
              </h1>
            )}
            {body && (
              <div className="text-lg mb-8 max-w-xl">
                <PortableTextRenderer value={body} />
              </div>
            )}
            {links && links.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {links.map((link: any) => (
                  link.href ? (
                    <Button
                      key={link.title}
                      variant={stegaClean(link?.buttonVariant)}
                      asChild
                    >
                      <Link
                        href={link.href as string}
                        target={link.target ? "_blank" : undefined}
                        rel={link.target ? "noopener" : undefined}
                      >
                        {link.title}
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      key={link.title}
                      variant={stegaClean(link?.buttonVariant)}
                      disabled
                    >
                      {link.title}
                    </Button>
                  )
                ))}
              </div>
            )}
          </div>
          {/* Right: Placeholder for potential future image */}
          <div className="flex justify-center items-start h-full">
            <div className="w-64 h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">Image placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
