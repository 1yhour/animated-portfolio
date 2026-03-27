import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { workData } from "@/data/workData";
import WorkSectionCard from "./workSectionCard";
const PEEK_PX = 5;
const CARD_GAP_PX = 16;
const NAVBAR_CLEARANCE_PX = 70;

const WorkSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1 slot for heading + 1 slot per card
  const TOTAL_SLOTS = workData.length + 1;
  const slotSize = 1 / TOTAL_SLOTS; // fraction of scrollYProgress per slot

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="work-link"
      ref={containerRef}
      style={{ height: `${TOTAL_SLOTS * 100}vh` }}
    >
      {/* ── Slot 0: Work heading ─────────────────────────────────────────
          Lowest z-index. Cards slide over it.
          No peek offset needed — it lives beneath the whole stack.        */}
      <div
        className="sticky flex items-center justify-center z-0"
        style={{
          top: NAVBAR_CLEARANCE_PX,
          height: `calc(100vh - ${NAVBAR_CLEARANCE_PX}px)`,
        }}
      >
        <div className="text-center px-8">
          <span className="text-neutral-900/50 font-light text-sm tracking-[0.3em] uppercase block mb-6">
            SELECTED
          </span>
          <h2
            className="text-neutral-900 font-extrabold leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(4rem, 15vw, 12rem)" }}
          >
            Work.
          </h2>
          <div className="h-px w-24 bg-black mx-auto mt-8" />
        </div>
      </div>

      {workData.map((item, index) => {
        const total = workData.length;
        const isLast = index === total - 1;
        const cardsAbove = total - 1 - index; 
        const stickyTop = NAVBAR_CLEARANCE_PX + cardsAbove * PEEK_PX + CARD_GAP_PX;
        
        const enterStart = (index + 1) * slotSize;
        const enterEnd = Math.min((index + 2) * slotSize, 1);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const y = useTransform(
          scrollYProgress,
          [enterStart, enterEnd],
          ["100%", "0%"],
        );


        const scaleStart = (index + 2) * slotSize;
        const targetScale = 1 - cardsAbove * 0.04;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const scale = useTransform(
          scrollYProgress,
          isLast ? [0, 1] : [scaleStart, 1],
          isLast ? [1, 1] : [1, targetScale],
        );

        return (
          <WorkSectionCard
            key={item.id}
            items={item}
            scale={scale}
            y={y}
            stickyTop={stickyTop}
            zIndex={(index + 1) * 10} index={0}/>
        );
      })}
    </section>
  );
};

export default WorkSection;
