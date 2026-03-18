import { useId } from "react";

type NoiseBackgroundProps = {
  className?: string;
};

const NoiseBackground = ({ className = "" }: NoiseBackgroundProps) => {
  const filterId = useId().replace(/:/g, "");

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="10"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter={`url(#${filterId})`}
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default NoiseBackground;
