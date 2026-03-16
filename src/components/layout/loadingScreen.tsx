import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GREETINGS } from "../../data/greetings";

export default function LoadingScreen({
  onComplete,
  minDuration = 4000,
}: {
  onComplete: () => void;
  minDuration?: number;
}) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBotRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const CYCLE = 1;
      const tl = gsap.timeline();
      // ── Progress bar ───────────────────────────────────────────
      tl.to(
        progressRef.current,
        {
          width: "100%",
          duration: GREETINGS.length * CYCLE,
          ease: "power1.inOut",
        },
        0,
      );
      GREETINGS.forEach((_, idx) => {
        const el = textRefs.current[idx];
        const base = idx * CYCLE;
        // animate entrance
        tl.to(
          el,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          base,
        ).call(() => setActiveIndex(idx), [], base + 0.1);
        // animate exit for all but the last greeting so previous text is cleared
        if (idx < GREETINGS.length - 1) {
          const exitStart = base + CYCLE - 0.6; // small hold before exiting
          tl.to(
            el,
            { opacity: 0, y: -6, duration: 0.5, ease: "power2.in" },
            exitStart,
          );
        }
      });
      tl.to({}, { duration: 0.3 });
      tl.to(curtainTopRef.current, {
        scaleY: 0,
        duration: 0.85,
        ease: "power3.inOut",
        transformOrigin: "top",
      })
        .to(
          curtainBotRef.current,
          {
            scaleY: 0,
            duration: 0.85,
            ease: "power3.inOut",
            transformOrigin: "bottom",
          },
          "<",
        )

        // ── 6. Fade out the whole loader div ──────────────────────
        .to(
          loaderRef.current,
          {
            autoAlpha: 0,
            duration: 0.3,
            ease: "power1.out",
            onComplete: () => onComplete?.(),
          },
          "-=0.2",
        );
    });
    return () => ctx.revert();
  }, [onComplete, minDuration]);

  return (
    <div
      ref={loaderRef}
      className="relative w-full h-screen overflow-hidden bg-[#1a1a1a]"
      style={{ fontFamily: "'Raleway', sans-serif" }}
    >
      {/* ── Grain / noise texture ─────────────────────────────── */}
      <svg
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="overlay" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" opacity="0.5" />
      </svg>

      {/* ── Top progress bar ──────────────────────────────────── */}
      <div className="absolute top-0 left-0 z-10 h-[1.5px] w-full bg-white/[0.08]">
        <div
          ref={progressRef}
          className="h-full w-0 rounded-r-[1px] bg-white/90"
          style={{ boxShadow: "0 0 8px rgba(255,255,255,0.4)" }}
        />
      </div>

      {/* ── Center greeting text ──────────────────────────────── */}
      <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center">
        <div className="relative flex h-[4.5rem] w-full items-center justify-center">
          {GREETINGS.map((g, idx) => (
            <span
              key={g.lang}
              ref={(el) => {
                textRefs.current[idx] = el;
              }}
              className={[
                "absolute whitespace-nowrap text-center",
                "text-[2.6rem] font-extralight tracking-[0.25em]",
                "text-white/[0.88]",
                g.font,
                // Khmer script needs slightly different sizing
                g.lang === "km" ? "!text-[2.2rem] !tracking-[0.1em]" : "",
              ].join(" ")}
              style={{ opacity: 0, transform: "translateY(6px)" }}
            >
              {g.text}
            </span>
          ))}
        </div>
      </div>

      {/* ── Step indicator dots ───────────────────────────────── */}
      <div className="absolute bottom-10 left-1/2 z-[5] flex -translate-x-1/2 gap-[7px]">
        {GREETINGS.map((_, idx) => (
          <div
            key={idx}
            className={[
              "h-[4px] w-[4px] rounded-full transition-colors duration-400",
              activeIndex === idx ? "bg-white/75" : "bg-white/[0.18]",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
