import { useState } from "react";
import { motion, type MotionValue } from "framer-motion";
import type { workProjectType } from "@/types";
import { scrollToSection } from "@/hooks/scrollToSection";

type WorkProjectProps = {
  items: workProjectType;
  scale: MotionValue<number>;
  y: MotionValue<string>;
  stickyTop: number; // px — larger = more buried in the stack
  zIndex: number;
  index: number; // ADDED: Need this to check if it's the first card
};

const WorkSectionCard = ({
  items,
  scale,
  y,
  stickyTop,
  zIndex,
  index, // ADDED
}: WorkProjectProps) => {
  // ADDED: State to track when the image finishes downloading
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div
      className="sticky flex items-start justify-center pointer-events-none"
      style={{
        top: stickyTop,
        zIndex,
        height: `calc(100vh - ${stickyTop}px)`,
      }}
    >
      <motion.div
        style={{
          scale,
          y,
          transformOrigin: "top center",
          height: `calc(100vh - ${stickyTop + 32}px)`,
        }}
        className="relative w-[calc(100vw-4rem)] lg:w-[calc(100vw-16rem)] rounded-3xl overflow-hidden pointer-events-auto"
      >
        <div
          className="absolute inset-0 rounded-3xl"
          style={{ backgroundColor: "#2A2A2A" }}
        >
          <div className="absolute inset-0 flex flex-col lg:flex-row">
            {/* ── LEFT: Text (Unchanged) ── */}
            <div className="flex-1 p-8 lg:p-16 xl:p-24 flex flex-col justify-between">
              <div className="flex items-center gap-4">
                <span className="text-white/40 font-light text-sm tracking-wider">
                  {items.id}
                </span>
                <div className="h-px bg-white/40 max-w-25 flex-1" />
                <span className="text-white/40 font-light text-sm tracking-wider">
                  {items.year}
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <span className="text-white/40 font-light text-sm tracking-wider uppercase mb-6 block">
                  {items.title}
                </span>
                <h3
                  className="text-white font-extrabold leading-[0.95] mb-8"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
                >
                  {items.heading}
                </h3>
                <p
                  className="text-white/60 font-light leading-relaxed max-w-lg"
                  style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
                >
                  {items.description}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => scrollToSection("contact-link")}
                  className="group inline-flex items-center gap-8 font-medium text-sm hover:gap-5 transition-all duration-300"
                >
                  {items.linkText?.map((link, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-2 text-white border-b border-white/30 pb-0.5 cursor-none"
                    >
                      {link.text}
                      {link.icon && <link.icon />}
                    </span>
                  ))}
                </button>
              </div>
            </div>

            {/* ── RIGHT: Image (Updated with Skeleton & Fade) ── */}
            <div className="flex-1 relative overflow-hidden rounded-r-3xl bg-[#1a1a1a]">
              <div className="absolute inset-0">
                {/* 1. Skeleton Pulse Background */}
                <div
                  className={`absolute inset-0 bg-white/5 animate-pulse transition-opacity duration-500 ${
                    isImageLoaded ? "opacity-0" : "opacity-100"
                  }`}
                />

                {/* 2. Actual Image */}
                <img
                  src={items.image}
                  alt={items.heading}
                  loading={index === 0 ? "eager" : "lazy"} // Eager load the very first one
                  decoding="async"
                  onLoad={() => setIsImageLoaded(true)} // Trigger fade-in when ready
                  className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkSectionCard;
