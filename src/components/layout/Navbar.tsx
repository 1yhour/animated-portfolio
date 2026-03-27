import { useState, useEffect } from "react";
import { navbar } from "../../data/navbar";
import { Button } from "../ui/button";
import LiveClock from "../ui/LiveClock";
import { scrollToSection } from "@/hooks/scrollToSection";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOverWorkSection, setIsOverWorkSection] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScrollDirection = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY + 10) {
        setIsNavbarVisible(false);
      } else if (currentScrollY < lastScrollY - 10) {
        setIsNavbarVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScrollDirection, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScrollDirection);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const handleScrollTheme = () => {
      const aboutSection = document.getElementById("about-link");
      const processSection = document.getElementById("process-link");
      const processSectionItems = document.getElementById("process-section");
      if (!aboutSection || !processSection || !processSectionItems) {
        setIsOverWorkSection(false);
        return;
      }

      const aboutRect = aboutSection.getBoundingClientRect();
      const processRect = processSection.getBoundingClientRect();
      const processItemsRect = processSectionItems.getBoundingClientRect();
      const triggerY = 120;
      const isActive =
        (aboutRect.top <= triggerY && aboutRect.bottom >= triggerY) ||
        (processRect.top <= triggerY && processRect.bottom >= triggerY) ||
        (processItemsRect.top <= triggerY &&
          processItemsRect.bottom >= triggerY);
      setIsOverWorkSection(isActive);
    };

    handleScrollTheme();
    window.addEventListener("scroll", handleScrollTheme, { passive: true });
    window.addEventListener("resize", handleScrollTheme);

    return () => {
      window.removeEventListener("scroll", handleScrollTheme);
      window.removeEventListener("resize", handleScrollTheme);
    };
  }, []);

  const navToneClass = isOverWorkSection ? "text-white" : "text-text";
  const dockToneClass = isOverWorkSection
    ? "bg-black/35 border-white/30"
    : "bg-white/70 border-black/10";

  return (
    <motion.header
      animate={{ y: isNavbarVisible ? 0 : 100 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
    >
      <div
        className={`relative z-50 flex w-max max-w-[calc(100vw-1.5rem)] items-center gap-[clamp(0.35rem,1.4vw,0.85rem)] overflow-x-auto rounded-full border px-[clamp(0.65rem,1.8vw,1.1rem)] py-[clamp(0.45rem,1vw,0.7rem)] backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.22)] ${dockToneClass} ${navToneClass}`}
      >
        <Button
          variant="link"
          onClick={() => scrollToSection("hero")}
          className="whitespace-nowrap px-2 text-[clamp(0.9rem,2vw,1.1rem)] font-extrabold hover:opacity-80 transition-[color,opacity] duration-300 cursor-none"
        >
          Home.
        </Button>

        <div className="whitespace-nowrap px-2 text-[clamp(0.72rem,1.4vw,0.9rem)] font-light opacity-85">
          <LiveClock />
        </div>

        <nav className="flex items-center">
          {navbar.map(({ href, text }) => (
            <Button
              key={href}
              variant="link"
              onClick={() => scrollToSection(href)}
              className="whitespace-nowrap px-[clamp(0.2rem,0.8vw,0.45rem)] text-[clamp(0.78rem,1.5vw,0.95rem)] font-medium group cursor-none transition-colors duration-300"
            >
              {text}
              <span className="opacity-50 ml-1">/</span>
            </Button>
          ))}
        </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
