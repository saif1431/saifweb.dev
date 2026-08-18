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

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground antialiased">
      <IntroLoader />
      <CustomCursor />
      <div className="noise-overlay" aria-hidden="true" />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-grow">
        <Hero />
        <TickerStrip />
        <SelectedWork />
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
