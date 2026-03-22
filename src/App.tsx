import LoadingScreen from "./components/layout/loadingScreen";
import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import About from "./components/sections/About";
import Hero from "./components/sections/Hero";
import NoiseBackground from "./components/ui/NoiseBackground";
import { AboutSection } from "./components/sections/AboutCard";
import Process from "./components/sections/Process";
import { ProcessSection } from "./components/sections/WorkProcess";
import WorkSection from "./components/sections/workSection";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
   
    <div className="relative isolate min-h-screen bg-[#f4f4f4] text-neutral-900">
      {loading && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          <LoadingScreen onComplete={() => setLoading(false)} />
        </div>
      )}
      <NoiseBackground />

      <div className="relative z-10">
        <Navbar />

        <main>
          <div className="relative overflow-hidden">
            <Hero />
            <About />
            <AboutSection />  
            <Process />
            <ProcessSection />
            
          </div>

         
          <WorkSection />
        </main>

        <footer className="relative">
        </footer>
      </div>
    </div>
  );
};

export default App;