import { useRef, useState } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import Section from "./ui/Section";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";
import RevealText from "./ui/RevealText";
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone, FaArrowRight } from "react-icons/fa";
import { SITE } from "../content/site";
import { useReducedMotion } from "../hooks/useReducedMotion";

const CircularBadge = () => {
  const reducedMotion = useReducedMotion();
  const spinRef = useRef(null);
  const magnetRef = useRef(null);

  useGSAP(
    () => {
      if (spinRef.current && !reducedMotion) {
        gsap.to(spinRef.current, { rotation: 360, duration: 16, repeat: -1, ease: "none" });
      }

      const el = magnetRef.current;
      if (!el || reducedMotion) return;
      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
      const handleMove = (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.35);
        yTo((e.clientY - r.top - r.height / 2) * 0.35);
      };
      const handleLeave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);
      return () => {
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
      };
    },
    { dependencies: [reducedMotion] }
  );

  return (
    <a
      ref={magnetRef}
      href={`mailto:${SITE.email}`}
      aria-label={`Email ${SITE.name}`}
      className="relative flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 shrink-0 rounded-full border border-primary/40 text-primary hover:border-primary transition-colors"
    >
      <svg ref={spinRef} viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
        <path id="contactCirclePath" d="M 100,100 m -82,0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0" fill="none" />
        <text className="uppercase font-mono" fontSize="13" letterSpacing="2" fill="currentColor">
          <textPath href="#contactCirclePath">Say Hello • Say Hello • Say Hello • </textPath>
        </text>
      </svg>
      <FaArrowRight className="text-2xl -rotate-45" aria-hidden="true" />
    </a>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const sectionRef = useRef(null);

  const socials = [
    { name: "GitHub", icon: FaGithub, url: SITE.social.github },
    { name: "LinkedIn", icon: FaLinkedin, url: SITE.social.linkedin },
    { name: "Email", icon: FaEnvelope, url: `mailto:${SITE.email}?subject=Portfolio%20Inquiry` },
  ];

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      gsap.fromTo(
        "[data-contact-fade]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio contact from ${formData.name}`,
          _captcha: "false",
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setError("Something went wrong. Please email me directly.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Section id="contact" className="relative overflow-hidden bg-surface" ariaLabelledby="contact-heading">
      <span
        aria-hidden="true"
        className="absolute -bottom-[8%] left-1/2 -translate-x-1/2 whitespace-nowrap font-display font-semibold text-stroke text-[22vw] leading-none select-none pointer-events-none"
      >
        HELLO
      </span>
      <div ref={sectionRef} className="relative max-w-4xl mx-auto">
        <div data-contact-fade className="flex items-center gap-3 mb-6 justify-center">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-pulse-dot" />
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {SITE.availability}
          </span>
        </div>

        <div data-contact-fade className="text-center mb-12">
          <RevealText
            id="contact-heading"
            text="Let's build something worth shipping"
            className="mb-4 text-foreground text-4xl sm:text-6xl lg:text-7xl"
          />
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Got a project in mind, or just want to say hi? My inbox is open.
          </p>
        </div>

        <div data-contact-fade className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
          <CircularBadge />
          <a
            href={`mailto:${SITE.email}`}
            className="group flex items-center gap-3 font-display text-2xl sm:text-4xl font-medium text-foreground hover:text-primary transition-colors text-center break-all"
          >
            {SITE.email}
            <FaArrowRight className="text-xl sm:text-2xl shrink-0 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </a>
        </div>

        <div data-contact-fade className="grid sm:grid-cols-3 gap-4 mb-12 text-sm">
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors justify-center sm:justify-start"
          >
            <FaPhone className="text-primary shrink-0" aria-hidden="true" />
            <span>{SITE.phone}</span>
          </a>
          <p className="flex items-center gap-3 text-muted-foreground justify-center sm:justify-start">
            <FaMapMarkerAlt className="text-primary shrink-0" aria-hidden="true" />
            <span>{SITE.location}</span>
          </p>
          <div className="flex justify-center sm:justify-end items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-xl min-h-10 min-w-10 flex items-center justify-center"
                aria-label={social.name}
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>

        <form data-contact-fade onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto" noValidate>
          <div className="grid sm:grid-cols-2 gap-6">
            <Input
              label="Name"
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <Textarea
            label="Message"
            id="message"
            name="message"
            placeholder="Tell me about your project or opportunity..."
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          />

          {status === "success" && (
            <p className="text-primary text-sm text-center" role="status">
              Message sent successfully! I&apos;ll get back to you soon.
            </p>
          )}

          {error && (
            <p className="text-destructive text-sm text-center" role="alert">
              {error}{" "}
              <a href={`mailto:${SITE.email}`} className="underline hover:text-destructive/80">
                Email me directly
              </a>
            </p>
          )}

          <div className="flex justify-center">
            <Button
              type="submit"
              variant="primary"
              magnetic
              className="w-full sm:w-auto min-w-[200px]"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </div>
    </Section>
  );
};

export default Contact;
