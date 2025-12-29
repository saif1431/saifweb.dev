import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
      return (
            <footer className="w-full bg-background border-t border-white/5 py-8 mt-auto">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-muted-foreground text-sm">
                              © {new Date().getFullYear()} Saif. All rights reserved.
                        </div>

                        <div className="flex items-center space-x-6">
                              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xl">
                                    <FaGithub />
                              </a>
                              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xl">
                                    <FaLinkedin />
                              </a>
                              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xl">
                                    <FaTwitter />
                              </a>
                        </div>
                  </div>
            </footer>
      );
};

export default Footer;
