import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { AboutData } from "@/types";
import { ABOUTDATA } from "@/data/aboutData";
import { CardPanel } from "./about/CardPanel";
import { FullbleedPanel } from "./about/FullbleedPanel";

gsap.registerPlugin(ScrollTrigger);
export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const slider = sliderRef.current;
    if (!section || !slider) return;

    const ctx = gsap.context(() => {
      const panels = slider.querySelectorAll<HTMLDivElement>(".about-panel");
      const images = slider.querySelectorAll<HTMLImageElement>(".about-panel-img");
      
      // Calculate based on index, not vw for better transform performance
      const totalMove = -100 * (panels.length - 1); 

      // Only force3D on the main container to save mobile GPU memory. 
      // Applying it to every image can actually cause lag on lower-end phones.
      gsap.set(slider, { force3D: true });

      const mm = gsap.matchMedia();

      // --- MOBILE SETUP (< 1024px) ---
      mm.add("(max-width: 1023px)", () => {
        const scrollTween = gsap.to(slider, {
          xPercent: totalMove, // Use xPercent instead of vw
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            anticipatePin: 1,
            scrub: true, // Use true instead of 0.55 to prevent interpolation lag
            start: "top top",
            end: () => `+=${slider.offsetWidth}`, // Tie end directly to DOM width
            invalidateOnRefresh: true,
          },
        });

        // HIGHLY RECOMMENDED: Disable the nested image scaling on mobile.
        // If you absolutely must have it, use true scrubbing without delays.
        images.forEach((img) => {
          const panel = img.closest(".about-panel");
          if (!panel) return;

          gsap.fromTo(
            img,
            { scale: 1 },
            {
              scale: 1.05, // Reduce scale amount for better performance
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: true, // No decimals on mobile
              },
            }
          );
        });
      });

      // --- DESKTOP SETUP (>= 1024px) ---
      mm.add("(min-width: 1024px)", () => {
        const scrollTween = gsap.to(slider, {
          xPercent: totalMove,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1, // Desktops can handle the interpolation
            start: "top top",
            end: () => `+=${slider.offsetWidth * 2}`, // Extend scroll area for smoothness
            invalidateOnRefresh: true,
          },
        });

        images.forEach((img) => {
          const panel = img.closest(".about-panel");
          if (!panel) return;

          gsap.fromTo(
            img,
            { scale: 1 },
            {
              scale: 1.15,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
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
