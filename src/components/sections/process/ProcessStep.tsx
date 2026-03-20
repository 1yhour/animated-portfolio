// ============================================================
// 📁 components/process/ProcessItem.tsx
// Pure layout component — zero animation logic
// Receives: item data + two refs (forwarded from parent)
// ============================================================

import { forwardRef } from "react";
import type { processType } from "@/types/index";

type ProcessItemProps = {
  item: processType;
};

// forwardRef — parent (ProcessSection) needs a ref on this DOM node
// to register it in itemsRef[] for GSAP targeting
const ProcessItem = forwardRef<HTMLDivElement, ProcessItemProps>(
  ({ item }, ref) => {
    return (
      <div ref={ref} className="relative py-20 lg:py-32">

        {/* ── 12-col grid: left heading | right description ── */}
        <div className="lg:ml-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

          {/* ── Left col — col-span-5: number + heading + tagline ── */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* Number row: 01 —— */}
            <div className="process-animate flex items-center gap-4">
              <span className="text-white/30 font-extrabold text-sm tracking-[0.3em]">
                {item.id}
              </span>
              <div className="h-px w-8 bg-white/20" />
            </div>

            {/* Heading — Discover / Define / Design / Deliver */}
            <h3
              className="process-animate text-white font-extrabold leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              {item.title}
            </h3>

            {/* Italic tagline */}
            <p
              className="process-animate text-white/70 font-light italic leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.2vw, 1.125rem)" }}
            >
              &ldquo;{item.tagline}&rdquo;
            </p>
          </div>

          {/* ── Right col — col-span-7: description + bullet points ── */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* Description paragraph */}
            <p
              className="process-animate text-white/60 font-light leading-[1.8]"
              style={{ fontSize: "clamp(0.9375rem, 1.2vw, 1.125rem)" }}
            >
              {item.description}
            </p>

            {/* Bullet list — looped from item.keypoints[] */}
            <div className="flex flex-col gap-3">
              {item.keypoints.map((point: string) => (
                <div key={point} className="process-animate flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
                  <span className="text-white/50 font-light text-sm">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom rule — scaleX 0→1 animated by parent, origin-left */}
        <div
          className="process-rule lg:ml-20 h-px bg-white/10 mt-20 lg:mt-32 origin-left"
          style={{ transform: "scaleX(0)" }}
        />

      </div>
    );
  }
);

ProcessItem.displayName = "ProcessItem";
export default ProcessItem;