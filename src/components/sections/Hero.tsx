import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { scrollToSection } from "@/hooks/scrollToSection";

const Hero = () => {
  const heroLinks = [
    { label: "About", target: "about-link", index: "01" },
    { label: "Work", target: "work-link", index: "02" },
    { label: "Contact", target: "contact-link", index: "03" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden px-[clamp(1rem,5vw,3.5rem)] flex flex-col justify-between pt-[clamp(5rem,15vw,8rem)] pb-[clamp(2rem,5vw,3rem)]"
    >
      {/* Background Video */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source
            src="/models/Vintage_Train_Window_Landscape_Video (1).webm"
            type="video/webm"
          />
        </video>
      </div>

      {/* Cinematic Gradient Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14)_0%,rgba(4,12,24,0.42)_100%)]"
      ></div>

      {/* Top Tagline */}

      {/* Main Content - Centered */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-[clamp(1.5rem,4vw,2.5rem)] max-w-3xl ">
          {/* Heading */}
          <div className="relative z-10 flex justify-center">
            <p className="text-[clamp(0.8rem,1.5vw,0.95rem)] font-light text-white/90 text-center border border-white/30 rounded-full px-[clamp(1rem,2vw,1.5rem)] py-2 backdrop-blur-md bg-white/10">
              Building robust full-stack systems with product-level clarity.
            </p>
          </div>
          <h1 className="text-[clamp(2.5rem,9vw,4.5rem)] leading-[1.1] text-center font-heading tracking-tight text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.6)]">
            Hi! I am Lyhour
          </h1>

          {/* Subtitle / Description */}
          <p className="text-[clamp(0.95rem,2vw,1.125rem)] text-center text-white/90 font-light leading-relaxed max-w-2xl [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
            A computer science student with hands-on full-stack experience,
            building functional applications from initial idea to
            production-style interfaces.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-[clamp(0.75rem,2vw,1.25rem)] mt-[clamp(0.5rem,1.5vw,1rem)]">
            {heroLinks.map(({ label, target, index }) => (
              <Button
                key={target}
                variant="outline"
                onClick={() => scrollToSection(target)}
                className="h-auto rounded-full border border-white/40 backdrop-blur-md px-[clamp(1rem,2vw,1.5rem)] py-2.5 text-white transition-all duration-300 hover:bg-slate-600/60 hover:border-white/60 cursor-none group"
              >
                <span className="mr-2.5 text-[0.7rem] font-semibold tracking-widest text-white/90">
                  {index}
                </span>
                <span className="text-[clamp(0.9rem,1.5vw,1rem)] font-semibold">
                  {label}
                </span>
                <ArrowUpRight className="ml-2.5 h-4 w-4 text-white/90 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 flex justify-center">
        <div className="flex flex-col items-center gap-2 cursor-pointer text-white/80 hover:text-white transition-colors">
          <span className="text-[clamp(0.75rem,1.5vw,0.875rem)] font-light tracking-wide">
            Scroll to explore
          </span>
          <svg
            className="w-5 h-5 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  );
};
export default Hero;
