import { useState, useEffect } from "react";
import { navbar } from "../../data/navbar";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import LiveClock from "../ui/LiveClock";
import NoiseBackground from "../ui/NoiseBackground";
import { scrollToSection } from "@/hooks/scrollToSection";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverWorkSection, setIsOverWorkSection] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

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

  const navToneClass = isMenuOpen
    ? "text-[#111]"
    : isOverWorkSection
      ? "text-white"
      : "text-text";

  // --- Framer Motion Animation Variants ---
  const menuEase: [number, number, number, number] = [0.76, 0, 0.24, 1];
  const itemEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      y: "-100%", // Slides up and out
      transition: { duration: 0.7, ease: menuEase }, // Custom smooth easing
    },
    open: {
      opacity: 1,
      y: "0%", // Slides down into view
      transition: { duration: 0.7, ease: menuEase },
    },
  };

  const containerVariants: Variants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }, // Creates the 1-by-1 effect
    },
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, y: 40 }, // Starts hidden and pushed down
    open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: itemEase } },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-[clamp(1rem,5vw,3.5rem)] py-[clamp(1rem,5vw,3.5rem)]">
      {/* Make sure this top bar stays above the overlay with relative z-50 */}
      <div className="flex items-center justify-between relative z-50">
        {/* Logo */}
        <Button
          variant="link"
          onClick={() => scrollToSection("hero", setIsMenuOpen)}
          className={`text-[clamp(1.25rem,2.5vw,1.5625rem)] font-extrabold hover:opacity-80 transition-[color,opacity] duration-300 ${navToneClass}`}
        >
          Lyhour.
        </Button>

        {/* Desktop Clock */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
          <div
            className={`text-[clamp(1rem,2vw,1.25rem)] font-light whitespace-nowrap transition-colors duration-300 ${navToneClass}`}
          >
            <LiveClock />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center">
          {navbar.map(({ href, text }) => (
            <Button
              key={href}
              variant="link"
              onClick={() => scrollToSection(href, setIsMenuOpen)}
              className={`text-[clamp(1rem,2.5vw,1.5625rem)] font-light px-[clamp(0.25rem,1vw,0.5rem)] group cursor-pointer transition-colors duration-300 ${navToneClass}`}
            >
              {text}
              <span className="opacity-50 ml-1">/</span>
            </Button>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <Button
          variant="link"
          onClick={toggleMenu}
          className={`md:hidden p-2 hover:opacity-80 font-inter_regular transition-[color,opacity] duration-300 ${navToneClass}`}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Full-Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            // Use fixed inset-0 and 100dvh to cover mobile screens accurately, -z-10 keeps it behind the logo/toggle
            className="fixed inset-0 h-dvh w-full bg-[#EAEAEA]/95 flex flex-col items-center justify-center -z-10 md:hidden overflow-hidden"
          >
            <NoiseBackground className="opacity-30" />
            <motion.div
              variants={containerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="relative z-10 flex flex-col items-center justify-center gap-10 w-full"
            >
              {navbar.map(({ href, text }) => (
                <motion.div
                  key={href}
                  variants={itemVariants}
                  className="overflow-hidden"
                >
                  <Button
                    variant="link"
                    className="text-[clamp(2.5rem,10vw,4rem)] font-extrabold text-[#111] hover:text-[#111]/70 transition-colors cursor-pointer"
                    onClick={() => {
                      toggleMenu();
                      // Wait a fraction of a second for the menu to start closing before scrolling to avoid lag
                      setTimeout(
                        () => scrollToSection(href, setIsMenuOpen),
                        300,
                      );
                    }}
                  >
                    {text}
                  </Button>
                </motion.div>
              ))}

              <motion.div variants={itemVariants}>
                <LiveClock className="text-[#111]/50 font-light text-sm tracking-wider mt-8" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
