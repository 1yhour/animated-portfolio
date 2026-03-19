import type { AboutData } from "@/types";
import LoadingNoiseBg from "@/components/ui/LoadingNoiseBg";
import { TextColumn } from "./TextColumn";

type CardPanelProps = {
  item: AboutData;
};

export function CardPanel({ item }: CardPanelProps) {
  return (
    <>
      <LoadingNoiseBg className="z-[1] bg-black opacity-100" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-12 gap-8 lg:gap-16 items-center">
        <TextColumn item={item} />

        <div className="col-span-12 lg:col-span-5 mt-2 lg:mt-0">
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-none mx-auto lg:mx-0">
            <div className="absolute inset-0 border border-white/25 translate-x-3 translate-y-3" />

            <div
              className="relative border border-white/25 overflow-hidden"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={item.image}
                alt={item.heading}
                decoding="async"
                loading="lazy"
                className="
                  about-panel-img
                  object-cover object-top w-full h-full
                  grayscale-[20%] hover:grayscale-0
                  transition-[filter] duration-700
                "
                style={{ transformOrigin: "center top" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
