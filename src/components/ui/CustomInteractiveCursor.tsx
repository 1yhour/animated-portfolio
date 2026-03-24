import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, summary, label[for], [data-cursor='interactive']";

const CustomInteractiveCursor = () => {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isOverDarkSection, setIsOverDarkSection] = useState(false);

  useEffect(() => {
    const supportsCustomCursor = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    if (!supportsCustomCursor) {
      return;
    }

    document.documentElement.classList.add("cursor-none");
    document.body.classList.add("cursor-none");

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let dotX = pointerX;
    let dotY = pointerY;
    let rafId = 0;

    const handleScrollTheme = () => {
      const aboutSection = document.getElementById("about-link");
      const processSection = document.getElementById("process-link");
      const processSectionItems = document.getElementById("process-section");
      const contactSection = document.getElementById("contact-link");
      if (!aboutSection || !processSection || !processSectionItems || !contactSection) {
        setIsOverDarkSection(false);
        return;
      }

      if (!aboutSection || !processSection || !processSectionItems || !contactSection) {
        setIsOverDarkSection(false);
        return;
      }

      const aboutRect = aboutSection.getBoundingClientRect();
      const processRect = processSection.getBoundingClientRect();
      const processItemsRect = processSectionItems.getBoundingClientRect();
      const contactRect = contactSection.getBoundingClientRect();
      const triggerY = 120;

      const isDarkActive =
        (aboutRect.top <= triggerY && aboutRect.bottom >= triggerY) ||
        (processRect.top <= triggerY && processRect.bottom >= triggerY) ||
        (processItemsRect.top <= triggerY &&
          processItemsRect.bottom >= triggerY) ||
        (contactRect.top <= triggerY && contactRect.bottom >= triggerY);

      setIsOverDarkSection(isDarkActive);
    };

    const updateInteractiveState = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        setIsInteractive(false);
        return;
      }

      setIsInteractive(Boolean(target.closest(INTERACTIVE_SELECTOR)));
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      setIsVisible(true);
      updateInteractiveState(event.target);
    };

    const onPointerOver = (event: PointerEvent) => {
      updateInteractiveState(event.target);
    };

    const onPointerDown = () => setIsPressed(true);
    const onPointerUp = () => setIsPressed(false);
    const onPointerLeave = () => {
      setIsVisible(false);
      setIsPressed(false);
      setIsInteractive(false);
    };

    const animate = () => {
      ringX += (pointerX - ringX) * 0.14;
      ringY += (pointerY - ringY) * 0.14;
      dotX += (pointerX - dotX) * 0.32;
      dotY += (pointerY - dotY) * 0.32;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }

      rafId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("scroll", handleScrollTheme, { passive: true });
    window.addEventListener("resize", handleScrollTheme);

    handleScrollTheme();
    rafId = window.requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      document.body.classList.remove("cursor-none");
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", handleScrollTheme);
      window.removeEventListener("resize", handleScrollTheme);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-70">
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 rounded-full border will-change-transform transition-[opacity,width,height,border-color,background-color,transform] duration-200 ease-out motion-reduce:transition-none ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isInteractive ? "h-13 w-13" : "h-8.5 w-8.5"} ${
          isOverDarkSection
            ? "border-white/80 bg-white/10"
            : "border-[rgba(26,26,26,0.5)] bg-[rgba(26,26,26,0.06)]"
        } ${
          isPressed
            ? isOverDarkSection
              ? "h-10 w-10 bg-white/25"
              : "h-10 w-10 bg-[rgba(26,26,26,0.2)]"
            : ""
        }`}
      />
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 rounded-full will-change-transform transition-[opacity,width,height,background-color,transform] duration-200 ease-out motion-reduce:transition-none ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isInteractive
            ? isOverDarkSection
              ? "h-1.5 w-1.5 bg-white"
              : "h-1.5 w-1.5 bg-[rgba(26,26,26,1)]"
            : isOverDarkSection
              ? "h-2 w-2 bg-white/90"
              : "h-2 w-2 bg-[rgba(26,26,26,0.85)]"
        } ${isPressed ? "h-1 w-1" : ""}`}
      />
    </div>
  );
};

export default CustomInteractiveCursor;
