import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-scroll";
import { HiArrowRight, HiDownload, HiChevronDown } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Button from "./ui/Button";
import RevealText from "./ui/RevealText";
import { SITE } from "../content/site";
import { useReducedMotion } from "../hooks/useReducedMotion";

const TYPING_ROLES = [
  "Full Stack Developer",
  "React Developer",
  "Frontend Engineer",
  "Web Developer",
];

const TypingAnimation = () => {
  const reducedMotion = useReducedMotion();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setCurrentText(TYPING_ROLES[0]);
      return;
    }

    const currentRole = TYPING_ROLES[currentRoleIndex];
    const typingSpeed = isDeleting ? 80 : 120;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentRole.length) {
          setCurrentText(currentRole.substring(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else if (currentText.length > 0) {
        setCurrentText(currentRole.substring(0, currentText.length - 1));
      } else {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % TYPING_ROLES.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, reducedMotion]);

  return (
    <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent animate-gradient">
      {currentText}
      {!reducedMotion && (
        <span className="inline-block w-0.5 h-[0.85em] bg-primary ml-1 animate-blink align-middle" />
      )}
    </span>
  );
};

const Hero = () => {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const blobY1 = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 140]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reducedMotion ? 1 : 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-12"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />

        {!reducedMotion && (
          <>
            <motion.div
              style={{ y: blobY1 }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2], x: [0, 50, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
            />
            <motion.div
              style={{ y: blobY2 }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15], x: [0, -30, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success/10 rounded-full blur-3xl"
            />
          </>
        )}

        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-sm text-muted-foreground">{SITE.proofLine}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mb-8"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/25 via-blue-400/20 to-primary/25 rounded-full blur-2xl opacity-60" />
              <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                <img
                  src={SITE.profileImage}
                  alt={`${SITE.name}, ${SITE.title}`}
                  width={160}
                  height={160}
                  className="relative w-full h-full object-cover rounded-full border-4 border-border shadow-2xl"
                  fetchPriority="high"
                />
                {!reducedMotion && (
                  <div className="absolute -inset-2 border-2 border-primary/25 rounded-full animate-spin-slow" />
                )}
              </div>
            </div>
          </motion.div>

          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mb-6"
            >
              <RevealText
                as="span"
                text={`Hi, I'm ${SITE.name}`}
                className="text-foreground block mb-2"
              />
              <TypingAnimation />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              {SITE.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <Link to="projects" smooth duration={500} offset={-80}>
                <Button variant="primary" magnetic className="group text-base px-8">
                  View My Work
                  <HiArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href={SITE.cvPath} download={SITE.cvFilename} className="inline-flex items-center">
                <Button variant="outline" magnetic className="group text-base px-8">
                  <HiDownload className="inline-block mr-2 group-hover:translate-y-0.5 transition-transform" />
                  Download CV
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center items-center gap-6"
            >
              <a
                href={SITE.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 text-2xl min-h-12 min-w-12 flex items-center justify-center"
                aria-label="GitHub profile"
              >
                <FaGithub />
              </a>
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 text-2xl min-h-12 min-w-12 flex items-center justify-center"
                aria-label="LinkedIn profile"
              >
                <FaLinkedin />
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        aria-hidden="true"
      >
        <Link to="about" smooth duration={500} offset={-80}>
          <div className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer hover:text-primary transition-colors">
            <span className="text-xs font-medium">Scroll Down</span>
            <HiChevronDown className="w-6 h-6 animate-bounce-subtle" />
          </div>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
