import type { AboutData } from "@/types";

type TextColumnProps = {
  item: AboutData;
};

export function TextColumn({ item }: TextColumnProps) {
  return (
    <div className="col-span-12 lg:col-span-7 flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <span className="text-[clamp(0.7rem,1vw,0.85rem)] font-light tracking-[0.3em] text-white/50">
          {item.id}
        </span>
        <div className="h-px w-8 bg-white/25" />
        <span className="text-[clamp(0.6rem,0.85vw,0.75rem)] font-light tracking-[0.2em] uppercase text-white/50">
          {item.tagline}
        </span>
      </div>

      <h2
        className="text-white font-extrabold leading-[0.92] tracking-tight"
        style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
      >
        {item.heading}
      </h2>

      <p
        className="text-white/70 font-light leading-relaxed max-w-[480px]"
        style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)" }}
      >
        {item.body}
      </p>

      <div className="h-px w-20 bg-white/40" />
    </div>
  );
}
