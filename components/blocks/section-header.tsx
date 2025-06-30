import { cn } from "@/lib/utils";
import SectionContainer from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";

import { PAGE_QUERYResult } from "@/sanity.types";

type SectionHeaderProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "section-header" }
>;

export default function SectionHeader({
  padding,
  colorVariant,
  sectionWidth = "default",
  stackAlign = "left",
  tagLine,
  title,
  description,
}: SectionHeaderProps) {
  const isNarrow = stegaClean(sectionWidth) === "narrow";
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      <div
        className={cn(
          align === "center" ? "max-w-[48rem] text-center mx-auto" : undefined,
          isNarrow ? "max-w-[48rem] mx-auto" : undefined
        )}
      >
        <div
          className={cn(color === "primary" ? "text-background" : undefined)}
        >
          {tagLine && (
            <h1 className="leading-[0] mb-4">
              <span className="text-xs font-medium bg-transparent text-[#bfa76a] px-3 py-1 rounded-xl border border-[#bfa76a] border-[1px] opacity-80 tracking-wide">{tagLine}</span>
            </h1>
          )}
          <h2 className="text-3xl md:text-5xl mb-4 text-foreground">{title}</h2>
        </div>
        <p className="text-foreground">{description}</p>
      </div>
    </SectionContainer>
  );
}
