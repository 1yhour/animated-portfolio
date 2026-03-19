"use client";

// ============================================================
// AboutSection.tsx
//
// Both panels share IDENTICAL text layout (col-span-7 left).
// What differs per panel:
//   "card"      → dark noise bg  + portrait card right + dot beside card
//   "fullbleed" → grayscale bg image + empty right side + dot top-center
// ============================================================

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { AboutData } from "@/types";
import { ABOUTDATA } from "@/data/aboutData";
import { CardPanel } from "./about/CardPanel";
import { FullbleedPanel } from "./about/FullbleedPanel";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// TYPE — add to @/types
// ============================================================
//
// export type PanelLayout = "card" | "fullbleed";
//
// export type AboutData = {
//   id: string;
//   tagline: string;
//   heading: string;
//   body: string;
//   image: string;
//   background?: string;
//   layout: PanelLayout;
// };

// ============================================================
// DATA — @/data/aboutData.ts
// ============================================================
//
// export const ABOUTDATA: AboutData[] = [
//   {
//     id: "01",
//     tagline: "Designer & Developer",
//     heading: "Hello.",
//     body: "...",
//     image: "/images/about-portrait.webp",
//     layout: "card",
//   },
//   {
//     id: "02",
//     tagline: "Less, But Better",
//     heading: "Craft.",
//     body: "...",
//     image: "/images/about-statue.webp",
//     layout: "fullbleed",
//   },
// ];

// ============================================================
// Main — GSAP horizontal scroll + pin + Ken Burns
// ============================================================
export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const slider = sliderRef.current;
    if (!section || !slider) return;

    const panels = slider.querySelectorAll<HTMLDivElement>(".about-panel");
    const images =
      slider.querySelectorAll<HTMLImageElement>(".about-panel-img");
    const totalWidth = (panels.length - 1) * 100;
    const scrollDistanceFactor = 1.5;

    // ── Horizontal scroll + pin ──────────────────────────
    const scrollTween = gsap.to(slider, {
      x: () => `-${totalWidth}vw`,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${totalWidth * scrollDistanceFactor}vw`,
        invalidateOnRefresh: true,
      },
    });

    // ── Ken Burns per panel ──────────────────────────────
    images.forEach((img) => {
      gsap.fromTo(
        img,
        { scale: 1.0 },
        {
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: img.closest(".about-panel"),
            containerAnimation: scrollTween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="about-link">
      <div ref={sliderRef} className="flex will-change-transform">
        {ABOUTDATA.map((item: AboutData) => (
          <div
            key={item.id}
            className="
              about-panel
              relative w-screen h-screen shrink-0
              flex items-center justify-center
              px-[clamp(2rem,8vw,6rem)]
              overflow-hidden
            "
          >
            {item.layout === "card" ? (
              <CardPanel item={item} />
            ) : (
              <FullbleedPanel item={item} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
