import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { HiArrowRight, HiDownload } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Button from "./ui/Button";

// Typing Animation Component
const TypingAnimation = () => {
  const roles = [
    "Full Stack Developer",
    "Web Developer",
    "UI/UX Designer",
    "Software Engineer"
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentRole.length) {
          setCurrentText(currentRole.substring(0, currentText.length + 1));
          setTypingSpeed(150);
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentRole.substring(0, currentText.length - 1));
          setTypingSpeed(100);
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed, roles]);

  return (
    <span className="bg-gradient-to-r  from-primary via-indigo-400 to-primary bg-clip-text sm:text-3xl md:text-4xl lg:text-5xl text-transparent animate-gradient">
      {currentText}
      <span className="inline-block w-1 h-[0.8em] bg-primary ml-1 animate-blink align-middle"></span>
    </span>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />

        {/* Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Welcome Badge - First */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
              👋 Welcome to my portfolio
            </span>
          </motion.div>

          {/* Profile Image - Second */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-indigo-400/30 to-primary/30 rounded-full blur-2xl opacity-60" />

              {/* Image Container */}
              <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-40 md:h-40">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-indigo-400/20 rounded-full" />
                <img
                  src="/portfolioImg2.jpg"
                  alt="Saif Ahmed"
                  className="relative w-full h-full object-cover rounded-full border-4 border-white/10 shadow-2xl"
                />

                {/* Decorative Ring */}
                <div className="absolute -inset-2 border-2 border-primary/30 rounded-full animate-spin-slow" />
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="max-w-4xl">
            {/* Main Heading with Typing Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
            >
              <span className="text-foreground">Hi, I'm Saif-Ur-Rehman</span>
              <br />
              <TypingAnimation />
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              I craft exceptional digital experiences with modern web technologies.
              Specializing in building scalable, user-centered applications that make a difference.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <Button variant="primary" className="group text-base px-8 py-3">
                View My Work
                <HiArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <a
                href="/SAIF_CV.pdf"
                download="Saif_CV.pdf"
                className="inline-flex items-center"
              >
                <Button variant="outline" className="group text-base px-8 py-3">
                  <HiDownload className="inline-block mr-2 group-hover:translate-y-0.5 transition-transform" />
                  Download CV
                </Button>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex justify-center items-center gap-6"
            >
              <a
                href="https://github.com/saif1431"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 text-2xl"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-saif-ur-rehman-791170268/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 text-2xl"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 text-2xl"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs font-medium">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
            <motion.div className="w-1.5 h-2 bg-primary rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;