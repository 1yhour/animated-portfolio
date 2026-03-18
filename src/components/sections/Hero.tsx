const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen px-[clamp(1rem,5vw,3.5rem)] flex flex-col justify-between pt-[clamp(5rem,15vw,8rem)]"
    >
      <div className="flex-1 flex items-center justify-center pb-[clamp(1.25rem,5vw,5rem)]">
        <h1 className="text-[clamp(2rem,8vw,3.125rem)] leading-[1.2] text-center sm:text-left text-text">
          <span className="font-light">creative </span>
          <span className="font-extrabold underline decoration-1 underline-offset-[clamp(4px,0.5vw,6px)]">
            designer
          </span>
          <span className="font-light"> & </span>
          <span className="font-extrabold underline decoration-1 underline-offset-[clamp(4px,0.5vw,6px)]">
            developer
          </span>
          <span className="font-light">.</span>
        </h1>
      </div>
      <div className="pb-[clamp(3rem,8vw,4rem)] flex justify-center">
        <div className="flex flex-col text-center items-center gap-3 cursor-pointer">
          <span className="text-[clamp(0.75rem,2vw,0.875rem)] font-light">
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
