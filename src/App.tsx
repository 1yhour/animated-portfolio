import LoadingScreen from "./components/layout/loadingScreen";
import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import About from "./components/sections/About";
import Hero from "./components/sections/Hero";
import NoiseBackground from "./components/ui/NoiseBackground";
import { AboutSection } from "./components/sections/AboutCard";
import Process from "./components/sections/Process";
const App = () => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="relative isolate min-h-screen bg-[#f4f4f4] text-neutral-900">
      {loading && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          <LoadingScreen onComplete={() => setLoading(false)} />
        </div>
      )}

      <div className="relative isolate overflow-hidden">
        <NoiseBackground />
        <div className="relative z-10">
          <Navbar />
          <main className="relative ">
            <Hero />
            <About />
            <AboutSection />
            <Process /> 
          </main>
          <footer className="relative">
            {/* Your footer content goes here */}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
