import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import TickerStrip from "./components/TickerStrip";
import SelectedWork from "./components/SelectedWork";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import CustomCursor from "./components/ui/CustomCursor";
import IntroLoader from "./components/ui/IntroLoader";
import MarqueeBanner from "./components/ui/MarqueeBanner";
import ScrollProgress from "./components/ui/ScrollProgress";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground antialiased">
      <IntroLoader />
      <CustomCursor />
      <ScrollProgress />
      <div className="noise-overlay" aria-hidden="true" />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-grow">
        <Hero />
        {/* Rises up and visibly covers the Hero as you scroll past it — see the pin in
            Hero.jsx. A visibly distinct surface tone (not the same near-black as Hero) plus the
            rounded top edge and shadow is what actually sells the "card sliding over it" read —
            two identical dark backgrounds meeting at a rounded corner is invisible. */}
        <div className="relative z-20 bg-surface rounded-t-[2rem] lg:rounded-t-[3rem] shadow-[0_-50px_70px_-25px_rgba(0,0,0,0.75)]">
          <TickerStrip />
          <SelectedWork />
        </div>
        <MarqueeBanner text="Full Stack" />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <MarqueeBanner text="Let's Talk" filled />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
