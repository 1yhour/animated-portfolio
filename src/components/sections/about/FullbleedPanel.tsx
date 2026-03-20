import type { AboutData } from "@/types";
import LoadingNoiseBg from "@/components/ui/LoadingNoiseBg";
import { TextColumn } from "./TextColumn";

type FullbleedPanelProps = {
  item: AboutData;
};

export function FullbleedPanel({ item }: FullbleedPanelProps) {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={item.image}
          alt={item.heading}
          decoding="async"
          loading="lazy"
          className="about-panel-img absolute inset-0 w-full h-full object-cover object-center"
          style={{
            filter: "grayscale(100%) brightness(0.38)",
            transformOrigin: "center center",
          }}
        />
      </div>

      <div
        className="absolute inset-0 z-2"
        style={{
          background:
            "linear-gradient(to right, #080808 0%, #080808 28%, rgba(8,8,8,0.75) 48%, rgba(8,8,8,0.15) 75%, transparent 100%)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 w-full h-[45%] z-2"
        style={{
          background: "linear-gradient(to top, #080808 0%, transparent 100%)",
        }}
      />

      <LoadingNoiseBg className="z-3 opacity-[0.035]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-12 gap-8 lg:gap-16 items-center">
        <TextColumn item={item} />
          <span className="font-extrabold select-none leading-none text-white/[0.03]" style={{ fontSize: "clamp(15rem, 25vw, 30rem)", opacity: 1 }}>02</span>
      </div>
    </>
  );
}
