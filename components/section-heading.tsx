import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Optional section index — renders a mono numbered prefix (01, 02…). */
  index?: number;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  index,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-14 flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <span className="glass inline-flex w-fit items-center gap-2.5 rounded-full border border-border/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {typeof index === "number" && (
          <span className="font-mono text-gradient not-italic tracking-normal">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        {eyebrow}
      </span>
      <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
