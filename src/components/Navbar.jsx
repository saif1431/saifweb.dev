import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-scroll';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import Button from './ui/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <nav className={`fixed w-full border-b border-white/5 top-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0 cursor-pointer">
          <Link to="hero" smooth={true} duration={500}>
            <div className="flex items-center gap-3 group">
              {/* Logo Icon */}
              <div className="relative w-11 h-11 bg-gradient-to-br from-primary to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-all duration-300 group-hover:shadow-primary/40 group-hover:scale-105">
                <span className="text-white font-bold text-lg font-mono tracking-tighter flex items-center">
                  <span className="text-indigo-200 opacity-80">&lt;</span>
                  <span className="mx-0.5">S</span>
                  <span className="text-indigo-200 opacity-80 decoration-2">/&gt;</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-xl"></div>
              </div>
              {/* Logo Text */}
              <div className="hidden sm:block">
                <div className="text-xl font-bold text-foreground leading-none tracking-tight group-hover:text-primary transition-colors duration-300">
                  Saif Dev
                </div>
                <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest mt-1">
                  Full Stack Developer
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500}
              offset={-70}
              className="text-muted-foreground hover:text-primary text-sm font-medium cursor-pointer transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <a
            href="/SAIF_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" className="!py-2 !px-4 text-xs">
              Resume
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground hover:text-primary p-2 cursor-pointer"
          >
            {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col items-center">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 w-full flex justify-center">
                <a
                  href="/SAIF_CV.pdf"
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
  );
};

export default Navbar;
