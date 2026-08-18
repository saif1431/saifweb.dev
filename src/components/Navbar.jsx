import { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import { HiArrowUpRight } from "react-icons/hi2";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { gsap, useGSAP } from "../lib/gsap";
import Button from "./ui/Button";
import Logo from "./ui/Logo";
import { SITE } from "../content/site";
import { useReducedMotion } from "../hooks/useReducedMotion";

const LINKS = [
  { name: "Work", to: "work" },
  { name: "About", to: "about" },
  { name: "Skills", to: "skills" },
  { name: "Experience", to: "experience" },
  { name: "Contact", to: "contact" },
];

const MenuToggle = ({ open, onClick }) => (
  <button
    onClick={onClick}
    aria-expanded={open}
    aria-controls="site-menu"
    aria-label={open ? "Close menu" : "Open menu"}
    className="relative z-[161] flex items-center gap-3 min-h-12 px-2 cursor-pointer text-foreground"
  >
    <span className="font-mono text-xs uppercase tracking-widest hidden sm:inline">
      {open ? "Close" : "Menu"}
    </span>
    <span className="relative flex flex-col items-end justify-center w-7 h-5 gap-[7px]">
      <span
        className={`block h-px bg-current transition-transform duration-300 ${
          open ? "w-7 translate-y-[7.5px] rotate-45" : "w-7"
        }`}
      />
      <span
        className={`block h-px bg-current transition-all duration-300 ${
          open ? "w-7 opacity-0" : "w-5"
        }`}
      />
      <span
        className={`block h-px bg-current transition-transform duration-300 ${
          open ? "w-7 -translate-y-[7.5px] -rotate-45" : "w-7"
        }`}
      />
    </span>
  </button>
);

const Navbar = () => {
  const reducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useGSAP(
    () => {
      if (!overlayRef.current) return;

      if (isOpen) {
        gsap.set(overlayRef.current, { display: "flex", overwrite: "auto" });
        gsap.fromTo(
          overlayRef.current,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: reducedMotion ? 0 : 0.6, ease: "power4.out", overwrite: "auto" }
        );
        gsap.fromTo(
          "[data-menu-item]",
          reducedMotion ? {} : { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.06,
            delay: reducedMotion ? 0 : 0.2,
            ease: "power3.out",
            overwrite: "auto",
          }
        );
      } else {
        gsap.to(overlayRef.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: reducedMotion ? 0 : 0.5,
          ease: "power3.inOut",
          overwrite: "auto",
          onComplete: () => gsap.set(overlayRef.current, { display: "none" }),
        });
      }
    },
    { scope: overlayRef, dependencies: [isOpen, reducedMotion] }
  );

  const closeMenu = () => setIsOpen(false);

  return (
    <header>
      <nav
        aria-label="Main navigation"
        className={`fixed w-full top-0 left-0 z-[160] transition-all duration-300 ${
          scrolled || isOpen ? "bg-background/90 backdrop-blur-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          <div className="flex-shrink-0 cursor-pointer">
            <Link to="hero" smooth duration={500} onClick={closeMenu} aria-label="Go to top">
              <Logo />
            </Link>
          </div>

          <MenuToggle open={isOpen} onClick={() => setIsOpen((o) => !o)} />
        </div>
      </nav>

      <div
        id="site-menu"
        ref={overlayRef}
        style={{ display: "none", clipPath: "inset(0 0 100% 0)" }}
        className="fixed inset-0 z-[155] flex flex-col justify-between bg-background px-4 sm:px-6 lg:px-12 pt-28 pb-10"
      >
        <nav aria-label="Site sections" className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full">
          <ol className="w-full">
            {LINKS.map((link, i) => (
              <li key={link.name} className="border-b border-border first:border-t overflow-hidden">
                <Link
                  to={link.to}
                  smooth
                  duration={500}
                  offset={-80}
                  onClick={closeMenu}
                  className="group flex items-center justify-between py-4 sm:py-6 cursor-pointer"
                >
                  <span
                    data-menu-item
                    className="flex items-baseline gap-4 sm:gap-6 font-display text-4xl sm:text-6xl lg:text-7xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300"
                  >
                    <span className="font-mono text-sm sm:text-base text-primary align-top">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.name}
                  </span>
                  <HiArrowUpRight
                    className="text-3xl sm:text-4xl text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div
          data-menu-item
          className="max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8"
        >
          <a
            href={`mailto:${SITE.email}`}
            className="font-mono text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors break-all"
          >
            {SITE.email}
          </a>
          <div className="flex items-center gap-5">
            <a
              href={SITE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors text-xl min-h-12 min-w-12 flex items-center justify-center"
              aria-label="GitHub profile"
            >
              <FaGithub />
            </a>
            <a
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors text-xl min-h-12 min-w-12 flex items-center justify-center"
              aria-label="LinkedIn profile"
            >
              <FaLinkedin />
            </a>
            <a href={SITE.cvPath} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="!py-2 !px-4 !min-h-10 text-xs">
                Resume
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
