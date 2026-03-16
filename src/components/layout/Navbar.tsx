import { useState } from "react";
import { navbar } from "../../data/navbar";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import LiveClock from "../ui/LiveClock";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-[clamp(1rem,5vw,3.5rem)] py-[clamp(1rem,5vw,3.5rem)] transition-transform duration-500 ease-out translate-y-0">
        <div className="flex items-center justify-between">
          <a href="/" className="text-[clamp(1.25rem,2.5vw,1.5625rem)] font-extrabold text-text hover:opacity-80 transition-opacity z-50">
            Lyhour.
          </a> 
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
            <div className="text-[clamp(1rem,2vw,1.25rem)] font-light whitespace-nowrap text-text">
              <LiveClock />
            </div>
          </div>
          <nav className="hidden md:flex items-center">
            {navbar.map(({ href, text }) => (
              <a
                key={href}
                href={href}
                className="text-[clamp(1rem,2.5vw,1.5625rem)] font-light text-text px-[clamp(0.25rem,1vw,0.5rem)] group cursor-pointer"
              >
                {text}
                <span className="opacity-50 ml-1">/</span>
              </a>
            ))}
          </nav>
          <Button
            variant="link"
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900 font-inter_regular"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 flex flex-col items-center gap-4 py-4 md:hidden">
              <div className="h-full flex flex-col items-center justify-center gap-8">
                {navbar.map(({ href, text }) => (
                <a
                  key={href}
                  href={href}
                  className="text-[clamp(2.5rem,10vw,4rem)] font-extrabold text-text hover:text-text/70 transition-colors cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {text}
                </a>
              ))}
              <LiveClock className="text-text/50 font-light text-sm tracking-wider mt-12" />
              </div>
              
            </div>
          )}
        </div>
    </header>
  );
};

export default Navbar;
