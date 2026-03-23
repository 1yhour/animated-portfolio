import { motion, type MotionValue } from "framer-motion";
import type { workProjectType } from "@/types";

type WorkProjectProps = {
  items: workProjectType;
  scale: MotionValue<number>;
  y: MotionValue<string>;
  stickyTop: number; // px — larger = more buried in the stack
  zIndex: number;
};

const WorkSectionCard = ({
  items,
  scale,
  y,
  stickyTop,
  zIndex,
}: WorkProjectProps) => {
  const isExternalLink = /^https?:\/\//.test(items.link);

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
          // Card height shrinks so buried cards don't overflow the viewport bottom.
          // stickyTop accounts for the peek offset; +32 adds a small bottom gap.
          height: `calc(100vh - ${stickyTop + 32}px)`,
        }}
        className="relative w-[calc(100vw-4rem)] lg:w-[calc(100vw-16rem)] rounded-3xl overflow-hidden pointer-events-auto"
      >
        <div
          className="absolute inset-0 rounded-3xl"
          style={{ backgroundColor: "#2A2A2A" }}
        >
          <div className="absolute inset-0 flex flex-col lg:flex-row">
            {/* ── LEFT: Text ── */}
            <div className="flex-1 p-8 lg:p-16 xl:p-24 flex flex-col justify-between">
              {/* Top meta */}
              <div className="flex items-center gap-4">
                <span className="text-white/40 font-light text-sm tracking-wider">
                  {items.id}
                </span>
                <div className="h-px bg-white/40 max-w-25 flex-1" />
                <span className="text-white/40 font-light text-sm tracking-wider">
                  {items.year}
                </span>
              </div>

              {/* Center: category + heading + description */}
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

              {/* Bottom: links */}
              <div className="flex items-center gap-6">
                <a
                  href={items.link}
                  target={isExternalLink ? "_blank" : undefined}
                  rel={isExternalLink ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-8 font-medium text-sm hover:gap-5 transition-all duration-300"
                >
                  {items.linkText?.map((link, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-2 text-white"
                    >
                      {link.text}
                      {link.icon && <link.icon />}
                    </span>
                  ))}
                </a>
              </div>
            </div>

            {/* ── RIGHT: Image ── */}
            <div className="flex-1 relative overflow-hidden rounded-r-3xl">
              <div className="absolute inset-0">
                <img
                  src={items.image}
                  alt={items.heading}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
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
