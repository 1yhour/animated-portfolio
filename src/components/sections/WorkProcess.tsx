
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processData } from "@/data/processData";
import type { processType } from "@/types/index";
import ProcessItem from "./process/ProcessStep";
import LoadingNoiseBg from "../ui/LoadingNoiseBg";

gsap.registerPlugin(ScrollTrigger);

export function ProcessSection() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);  // fill bar
  const dotRef      = useRef<HTMLDivElement>(null);   // moving dot
  // Array of refs — one per ProcessItem, populated via callback ref
  const itemsRef    = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section  = sectionRef.current;
    const progress = progressRef.current;
    const dot      = dotRef.current;
    if (!section || !progress || !dot) return;

    // gsap.context() scopes all triggers to this section only
    // ctx.revert() on cleanup kills ONLY these, not other components
    const ctx = gsap.context(() => {
      const CYCLE = 0.3; // scrub lag — feels weighted, not mechanical

      // ── 1. Progress bar fill ───────────────────────────────
      // scaleY: 0 → 1, origin-top → visually fills top-to-bottom
      const tl = gsap.timeline();
      tl.to(progress, {
        scaleY: 1,
        ease: "none", // linear — scroll is the easing
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 10%",      // bar starts when section near viewport top
        end: "bottom 80%",     // fully filled before section exits
        scrub: CYCLE,
        animation: tl,
      });

      // ── 2. Dot — tracks the progress bar fill visually ────
      // Reads self.progress (0→1) and maps it to px position on the line
      ScrollTrigger.create({
        trigger: section,
        start: "top 10%",
        end: "bottom 80%",
        scrub: CYCLE,
        onUpdate: (self) => {
          const line = progress.parentElement;
          if (!line) return;
          const lineHeight = line.getBoundingClientRect().height;
          gsap.set(dot, { y: self.progress * lineHeight });
        },
      });

      // ── 3. Per-item: text fade + slide up ─────────────────
      itemsRef.current.forEach((item) => {
        if (!item) return;

        // Targets class .process-animate inside each ProcessItem
        const textEls = item.querySelectorAll(".process-animate");

        gsap.fromTo(
          textEls,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1, // label → heading → tagline → desc → bullets
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // ── 4. Per-item: bottom rule scaleX ─────────────────
        // origin-left set on the element in ProcessItem
        const rule = item.querySelector(".process-rule");
        if (rule) {
          gsap.fromTo(
            rule,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "bottom 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

    }, section); // scope context to section element

    return () => ctx.revert(); // clean teardown on unmount
  }, []);
  useEffect(() => {
  if (window.innerWidth >= 1024) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  itemsRef.current.forEach(el => el && observer.observe(el));

  return () => observer.disconnect();
}, []);

  return (
    <section ref={sectionRef} className="relative py-32">

      {/* Noise background */}
      <LoadingNoiseBg className="-z-10 bg-black opacity-97" />

      <div className="relative z-10 max-w-7xl mx-auto px-[clamp(2rem,8vw,6rem)] pb-64">

        {/* ── Vertical progress line ── */}
        <div
          className="hidden lg:block absolute top-0 bottom-[16rem] w-px"
          style={{ left: "calc(clamp(2rem, 8vw, 6rem) + 1.5rem)" }}
        >
          {/* Track — background */}
          <div className="absolute inset-0 bg-white/10" />

          {/* Fill — GSAP animates scaleY on this */}
          <div
            ref={progressRef}
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-white/60 to-white/20 origin-top"
            style={{ height: "100%", transform: "scaleY(0)" }}
          />
        </div>

        {/* ── Moving dot ── */}
        <div
          ref={dotRef}
          className="hidden lg:block absolute z-10"
          style={{ left: "calc(clamp(2rem, 8vw, 6rem) + 1.5rem - 6px)", top: 0 }}
        >
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-white" />
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-white/30 animate-ping" />
          </div>
        </div>

        {/* ── Map processData → ProcessItem ── */}
        {/* Callback ref: el => itemsRef.current[i] = el */}
        {/* This gives ProcessSection direct DOM access for GSAP */}
        <div className="flex flex-col gap-0">
          {processData.map((item: processType, index: number) => (
            <ProcessItem
              key={item.id}
              item={item}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
            />
          ))}
        </div>
        <div className="absolute top-1/2 right-[clamp(2rem,8vw,6rem)] -translate-y-1/2 pointer-events-none hidden xl:block">
            <span className="font-extrabold select-none leading-none text-white/[0.02]" style={{ fontSize: "clamp(15rem, 25vw, 30rem)", writingMode: "vertical-rl", opacity: 1 }}>PROCESS</span>
        </div>
      </div>
    </section>
  );
}