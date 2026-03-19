import LoadingNoiseBg from "../ui/LoadingNoiseBg";

const Process = () => {
  return (
    
    <section
      className="relative h-screen flex items-center justify-center"
    >
        <LoadingNoiseBg className="-z-10 bg-black opacity-100" />
      <div className="text-center px-8 ">
        <span className="text-text/50 font-light text-sm tracking-[0.3em] uppercase block mb-6 text-gray-300">
        HOW I WORK
        </span>
        <h2
          className="text-text font-extrabold leading-[0.9] tracking-tight text-white"
          style={{ fontSize: "clamp(4rem, 15vw, 12rem)" }}
        >
          Process.
        </h2>
        <div className="h-px w-24 bg-white mx-auto mt-8 origin-center"></div>
      </div>
    </section>
  );
};

export default Process;
