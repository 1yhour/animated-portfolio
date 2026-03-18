const About = () => {
  return (
    <section
      id="about-link"
      className="relative h-screen flex items-center justify-center"
    >
      <div className="text-center px-8">
        <span className="text-text/50 font-light text-sm tracking-[0.3em] uppercase block mb-6">
          GET TO KNOW ME
        </span>
        <h2
          className="text-text font-extrabold leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(4rem, 15vw, 12rem)" }}
        >
          About.
        </h2>
        <div className="h-px w-24 bg-black mx-auto mt-8 origin-center"></div>
      </div>
    </section>
  );
};

export default About;
