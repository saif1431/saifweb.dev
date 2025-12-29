import { useState } from "react";
import { motion } from "motion/react";
import Section from "./ui/Section";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const Contact = () => {
      const [formData, setFormData] = useState({
            name: "",
            email: "",
            message: "",
      });

      const handleSubmit = (e) => {
            e.preventDefault();
            // Handle form submission
            console.log("Form submitted:", formData);
            alert("Thank you for your message! I'll get back to you soon.");
            setFormData({ name: "", email: "", message: "" });
      };

      const handleChange = (e) => {
            setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
            });
      };

      const socials = [
            { name: "GitHub", icon: FaGithub, url: "https://github.com" },
            { name: "LinkedIn", icon: FaLinkedin, url: "https://linkedin.com" },
            { name: "Twitter", icon: FaTwitter, url: "https://twitter.com" },
            { name: "Email", icon: FaEnvelope, url: "mailto:your@email.com" },
      ];

      return (
            <Section id="contact" className="bg-muted/20">
                  <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl mx-auto"
                  >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-center">
                              Get In Touch
                        </h2>
                        <p className="text-muted-foreground text-center mb-12">
                              I'm currently looking for new opportunities. Whether you have a question or just want to say hi,
                              I'll try my best to get back to you!
                        </p>

                        {/* Social Links */}
                        <div className="flex justify-center gap-6 mb-12">
                              {socials.map((social) => (
                                    <a
                                          key={social.name}
                                          href={social.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-muted-foreground hover:text-primary transition-colors text-2xl"
                                          aria-label={social.name}
                                    >
                                          <social.icon />
                                    </a>
                              ))}
                        </div>

                        {/* Contact Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                              <Input
                                    label="Name"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                              />

                              <Input
                                    label="Email"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                              />

                              <Textarea
                                    label="Message"
                                    id="message"
                                    name="message"
                                    placeholder="Your message..."
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                              />

                              <div className="flex justify-center">
                                    <Button type="submit" variant="primary" className="w-full md:w-auto">
                                          Send Message
                                    </Button>
                              </div>
                        </form>
                  </motion.div>
            </Section>
      );
};

export default Contact;
