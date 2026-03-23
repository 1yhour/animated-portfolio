import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { workData } from "@/data/workData";
import WorkProject from "./workProject";
const PEEK_PX = 5;
const CARD_GAP_PX = 16;
const NAVBAR_CLEARANCE_PX = 90;

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

      {/* ── Slots 1…N: Cards ─────────────────────────────────────────────
          Key ideas:
          1. stickyTop   — decreases per card → buried cards have larger top
                           offsets, so their top strips peek above front card
          2. z-index     — increases per card → later cards layer on top
          3. y animation — each card slides from 100% → 0% during its slot
      */}
      {workData.map((item, index) => {
        const total = workData.length;
        const isLast = index === total - 1;
        const cardsAbove = total - 1 - index; // cards that will stack on top
        

        /**
         * stickyTop:
         *   card 0 (deepest): top = (N-1) × PEEK  →  e.g. 96px
         *   card 1 (middle):  top = (N-2) × PEEK  →  e.g. 48px
         *   card 2 (front):   top = 0              →  e.g. 0px
         *
         * This means card 1's top edge is 48px above card 0's top edge,
         * so 48px of card 0 peeks above card 1. Same logic for all layers.
         */
        const stickyTop = NAVBAR_CLEARANCE_PX + cardsAbove * PEEK_PX + CARD_GAP_PX;
        /**
         * translateY: card enters from off-screen bottom → rests at 0
         * Happens strictly during this card's scroll slot.
         */
        const enterStart = (index + 1) * slotSize;
        const enterEnd = Math.min((index + 2) * slotSize, 1);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const y = useTransform(
          scrollYProgress,
          [enterStart, enterEnd],
          ["100%", "0%"],
        );

        /**
         * Subtle scale: top card is always 1.
         * Buried cards compress very slightly for depth perception.
         * SCALE_STEP kept small (0.04) — the peek does most of the visual work.
         */
        const scaleStart = (index + 2) * slotSize;
        const targetScale = 1 - cardsAbove * 0.04;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const scale = useTransform(
          scrollYProgress,
          isLast ? [0, 1] : [scaleStart, 1],
          isLast ? [1, 1] : [1, targetScale],
        );

        return (
          <WorkProject
            key={item.id}
            items={item}
            scale={scale}
            y={y}
            stickyTop={stickyTop}
            zIndex={(index + 1) * 10}
          />
        );
      })}
    </section>
  );
};

export default WorkSection;
