import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from "react-icons/fa";
import { Link } from "react-scroll";
import { SITE } from "../content/site";

const Footer = () => {
  const socials = [
    { icon: FaGithub, url: SITE.social.github, label: "GitHub" },
    { icon: FaLinkedin, url: SITE.social.linkedin, label: "LinkedIn" },
    { icon: FaEnvelope, url: `mailto:${SITE.email}`, label: "Email" },
  ];

  return (
    <footer className="w-full bg-background border-t border-border py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </p>
            <p className="text-muted-foreground/70 text-xs mt-1">
              Built with React, Vite &amp; Tailwind CSS
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socials.map((social) => {
              const SocialIcon = social.icon;
              return (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-xl min-h-10 min-w-10 flex items-center justify-center"
                aria-label={social.label}
              >
                <SocialIcon />
              </a>
              );
            })}

            <Link
              to="hero"
              smooth
              duration={500}
              className="ml-2 p-2 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors min-h-10 min-w-10 flex items-center justify-center"
              aria-label="Back to top"
            >
              <FaArrowUp className="text-sm" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
