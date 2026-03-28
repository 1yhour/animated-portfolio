import { SiMinutemailer } from "react-icons/si";
import LoadingNoiseBg from "../ui/LoadingNoiseBg";
import { IoIosArrowUp } from "react-icons/io";

export const ContactSection = () => {
  return (
    // 1. The Parallax Wrapper
    <div
      id="contact-link"
      className="relative h-[100vh]"
      // The clip-path masks the fixed child so it only shows when scrolled to
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <LoadingNoiseBg className="absolute inset-0 z-10 opacity-90 pointer-events-none" />
      {/* 2. The Fixed Background & Content */}
      <div className="fixed bottom-0 left-0 right-0 h-[100vh] bg-[#1a1a1a] text-white">
        {/* Noise Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: "url('/images/noise-texture.webp')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        />

        {/* Main Content Container */}
        <div className="h-full flex flex-col justify-between px-[clamp(2rem,8vw,6rem)] py-16 relative z-10">
          {/* Top Row: Contact Info & Socials */}
          <div className="flex flex-col lg:flex-row justify-between gap-12">
            {/* Left Side */}
            <div className="max-w-2xl">
              <span className="text-white/50 font-light text-sm tracking-[0.3em] uppercase block mb-6">
                Let's Connect
              </span>

              <h2
                className="font-extrabold leading-[0.95] tracking-tight mb-8"
                style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
              >
                Have a project in mind?
              </h2>

              <p className="text-white/60 font-light text-lg max-w-md mb-8">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>

              {/* Tailwind Group Hover Effect */}
              <a
                href="mailto:lyhourlucky77@gmail.com"
                className="group inline-flex items-center gap-4 text-xl font-medium hover:gap-6 transition-all duration-300 cursor-none"
              >
                <span className="border-b border-white/40 pb-1">
                  lyhourcoding@gmail.com
                </span>
                <SiMinutemailer className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Right Side: Socials */}
            <div className="flex flex-col gap-4">
              <span className="text-white/50 font-light text-sm tracking-[0.3em] uppercase mb-2">
                Socials
              </span>
              <ul className="list-disc pl-4.5 space-y-3 ">
                <li>
                  <a
                    href="https://www.linkedin.com/in/seng-lyhour-607051383/"
                    className="text-white/70 hover:text-white transition-colors border-b border-white/40 pb-1 cursor-none"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/1yhour"
                    className="text-white/70 hover:text-white transition-colors border-b border-white/40 pb-1 cursor-none"
                    target="_blank"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Row: Footer links */}
          <footer className="border-t border-white/10 pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-2xl font-extrabold">Lyhour.</span>
              <span className="text-white/40 font-light text-sm mb-8">
                © 2026 All rights reserved.
              </span>
            </div>
            <div className="flex flex-col gap-2 lg:items-center">
                <span className="text-white/60 font-light">Based in Phnom Penh, Cambodia</span>
              <span className="text-white/40 font-light">Available for freelance work worldwide</span>
            </div>

            {/* Back to top with Group Hover */}
            <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group cursor-none"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <span className="font-light text-sm">Back to Top</span>
              <IoIosArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};
