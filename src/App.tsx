import LoadingScreen from "./components/layout/loadingScreen";
import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import AboutTitle from "./components/sections/AboutTitle";
import Hero from "./components/sections/Hero";
import NoiseBackground from "./components/ui/NoiseBackground";
import { AboutSection } from "./components/sections/AboutCard";
import { ProcessSection } from "./components/sections/WorkProcess";
import WorkSection from "./components/sections/workSection";
import ProcessTitle from "./components/sections/ProcessTitle";
import { ContactSection } from "./components/sections/contactMe";
import CustomInteractiveCursor from "./components/ui/CustomInteractiveCursor";
import PageProgressBar from "./components/ui/PageProgressBar";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative isolate min-h-screen bg-[#f4f4f4] text-neutral-900">
      <CustomInteractiveCursor />
      <PageProgressBar hidden={loading} />
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
            <AboutTitle />
            <AboutSection />
            <ProcessTitle />
            <ProcessSection />
          </div>

          <WorkSection />
        </main>

        <footer className="relative">
          <ContactSection />
        </footer>
      </div>
    </div>
  );
};

export default App;
