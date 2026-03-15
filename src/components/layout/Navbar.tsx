import { useState } from "react";
import { navbar } from "../../data/navbar";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] =useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md">
      <div className="mx-auto max-w-8xl px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Button variant="link" size="sm">
            <span className="text-md font-bold">LYHOUR</span>
          </Button>
          <nav className="hidden items-center gap-8 md:flex">
            {navbar.map(({ href, text }) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                {text}
              </a>
            ))}
          </nav>
          <Button variant="link" size="sm">
            <span className="text-sm font-bold hidden md:inline-flex">Contact me</span>
          </Button>
          <Button variant="link" onClick={toggleMenu} className="md:hidden p-2 text-gray-700 hover:text-gray-900 font-inter_regular">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden">
                {navbar.map(({ href, text }) => (
                    <a
                    key={href}
                    href={href}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                    >
                        {text}
                    </a>
                ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
