import Navbar from "./components/layout/Navbar";
import About from "./components/sections/About";
import Hero from "./components/sections/Hero";

const App = () => {
  return (
    <div className="relative isolate min-h-screen bg-[#f4f4f4] text-neutral-900">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <svg
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="50"
              numOctaves="1"
              stitchTiles="stitch"
            />
          </filter>

          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <div className="relative z-10">
        <Navbar />
        <main className="relative z-10">
        <Hero />
        <About />
        </main>
        <footer className="relative z-10">
          {/* Your footer content goes here */}
        </footer>
      </div>
    </div>
  );
};

export default App;
