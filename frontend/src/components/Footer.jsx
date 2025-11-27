import { Link } from "react-router-dom";
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";
import logoImg from "../assets/blucia-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiGithub, url: "https://github.com", label: "GitHub" },
    { icon: FiTwitter, url: "https://twitter.com", label: "Twitter" },
    { icon: FiLinkedin, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: FiMail, url: "mailto:blucialabs@gmail.com", label: "Email" },
  ];

  const footerLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-blucia-dark border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-6 mb-4">
              <div className="w-24 h-24 rounded-[1.75rem] overflow-hidden">
                <img src={logoImg} alt="BluCia Labs logo" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-blucia-white/60 font-semibold">
                  BluCia Labs
                </p>
                <p className="text-3xl font-heading font-bold text-white">
                  Beyond Limits
                </p>
              </div>
            </div>
            <p className="text-blucia-white/70 font-body mb-4 max-w-md">
              Beyond Limits Ultimate Creativity and Intelligence Advancement. We
              push the boundaries of software innovation to deliver cutting-edge
              solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center text-blucia-white/80 hover:text-blucia-accent hover:bg-white/20 transition-all"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-blucia-white/70 hover:text-blucia-accent transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-blucia-white/70 font-body">
              <li>Email: blucialabs@gmail.com</li>
              <li>Phone: +(255) 7 72662181</li>
              <li>24/7 Support Available</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-blucia-white/60 font-body">
            © {currentYear} BluCia Labs. All rights reserved. Built with
            innovation and creativity.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
