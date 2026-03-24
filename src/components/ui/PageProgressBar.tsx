import { useEffect, useState } from "react";

type PageProgressBarProps = {
  hidden?: boolean;
};

const PageProgressBar = ({ hidden = false }: PageProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = Math.max(docHeight - viewportHeight, 1);
      const nextProgress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

      setProgress(nextProgress);
    };

    const scheduleUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        updateProgress();
        rafId = 0;
      });
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[60] h-[5px] w-full transition-opacity duration-300 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0" />
      <div
        className="h-full origin-left bg-[#1a1a1a]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};

export default PageProgressBar;
