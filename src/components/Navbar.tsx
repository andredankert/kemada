import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { label: "Start", path: "/" },
    { label: "Über uns", path: "/about" },
    { label: "Angebote", path: "/services" },
    { label: "Galerie", path: "/gallery" },
    { label: "Referenzen", path: "/testimonials" },
    { label: "Kontakt", path: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 h-16",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-primary font-serif text-lg md:text-xl font-semibold tracking-tight"
            >
              Keramikmalerei Dankert
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="relative px-3 py-2 text-sm font-medium text-kemada-800 hover:text-primary transition-colors group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Button
              asChild
              variant="default"
              size="sm"
              className="ml-4 bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
            >
              <a href="tel:+49123456789">
                <Phone size={14} />
                <span>Jetzt anrufen</span>
              </a>
            </Button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center text-kemada-800"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col pt-20",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="flex flex-col px-6 py-8 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="text-lg font-medium text-kemada-800 py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button
            asChild
            variant="default"
            size="lg"
            className="mt-6 bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
          >
            <a href="tel:+49123456789">
              <Phone size={18} />
              <span>Jetzt anrufen</span>
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
