import { useState } from "react";
import { motion } from "motion/react";
import Section from "./ui/Section";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";
import RevealText from "./ui/RevealText";
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { SITE } from "../content/site";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const socials = [
    { name: "GitHub", icon: FaGithub, url: SITE.social.github },
    { name: "LinkedIn", icon: FaLinkedin, url: SITE.social.linkedin },
    {
      name: "Email",
      icon: FaEnvelope,
      url: `mailto:${SITE.email}?subject=Portfolio%20Inquiry`,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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
    <Section id="contact" className="bg-surface" ariaLabelledby="contact-heading">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-12">
          <RevealText id="contact-heading" text="Get In Touch" className="mb-4 text-foreground" />
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            I&apos;m open to new opportunities. Whether you have a project in mind or just want to
            connect — I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
            >
              <FaEnvelope className="text-primary text-xl shrink-0" aria-hidden="true" />
              <span className="group-hover:underline underline-offset-4">{SITE.email}</span>
            </a>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
            >
              <FaPhone className="text-primary text-xl shrink-0" aria-hidden="true" />
              <span>{SITE.phone}</span>
            </a>
            <p className="flex items-center gap-3 text-muted-foreground">
              <FaMapMarkerAlt className="text-primary text-xl shrink-0" aria-hidden="true" />
              <span>{SITE.location}</span>
            </p>
          </div>

          <div className="flex justify-center md:justify-end items-start gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:rotate-6 text-3xl min-h-12 min-w-12 flex items-center justify-center rounded-lg hover:bg-primary/10"
                aria-label={social.name}
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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

          <Textarea
            label="Message"
            id="message"
            name="message"
            placeholder="Tell me about your project or opportunity..."
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
          />

          {status === "success" && (
            <p className="text-success text-sm text-center" role="status">
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
              className="w-full md:w-auto min-w-[200px]"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </motion.div>
    </Section>
  );
};

export default Contact;
