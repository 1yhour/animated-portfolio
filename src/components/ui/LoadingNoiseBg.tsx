import { useId } from "react";
type LoadingNoiseBgProps = {
  className?: string;
};
const LoadingNoiseBg = ({ className = "" }: LoadingNoiseBgProps) => {
  const filterId = useId().replace(/:/g, "");
  return (
    <div
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.80"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="overlay" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter={`url(#${filterId})`}
          opacity="0.15"
        />
      </svg>
    </div>
  );
};

export default LoadingNoiseBg;
