import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-scroll";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Button from "./ui/Button";
import Logo from "./ui/Logo";
import { SITE } from "../content/site";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Experience", to: "experience" },
    { name: "Contact", to: "contact" },
  ];

  const navLinkClass =
    "relative text-muted-foreground hover:text-foreground text-sm font-medium cursor-pointer transition-colors py-1 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 after:w-0 hover:after:w-full";

  return (
    <header>
      <nav
        aria-label="Main navigation"
        className={`fixed w-full border-b border-border/50 top-0 left-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/90 backdrop-blur-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          <div className="flex-shrink-0 cursor-pointer">
            <Link to="hero" smooth duration={500} aria-label="Go to top">
              <Logo />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                spy={true}
                smooth={true}
                duration={500}
                offset={-80}
                activeClass="!text-primary after:!w-full"
                className={navLinkClass}
              >
                {link.name}
              </Link>
            ))}
            <a href={SITE.cvPath} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" magnetic className="!py-2 !px-4 !min-h-10 text-xs">
                Resume
              </Button>
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary p-2 cursor-pointer min-h-12 min-w-12 flex items-center justify-center"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col items-center">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    activeClass="!text-primary after:!w-full"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-3 min-h-12 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 w-full flex justify-center">
                  <a
                    href={SITE.cvPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-xs"
                  >
                    <Button variant="primary" className="!w-full">
                      Resume
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
