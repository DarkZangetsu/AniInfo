import React from 'react';
import { Github } from 'lucide-react';

const FooterLink = ({ href, children }) => (
  <a 
    href={href} 
    className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
  >
    {children}
  </a>
);

const FooterSection = ({ title, children }) => (
  <div>
    <h3 className="font-semibold text-gray-200 mb-3">{title}</h3>
    {children}
  </div>
);

const Footer = () => {
  const links = {
    explore: [
      { label: "What's New", href: "/new" },
      { label: "Popular", href: "/popular" },
      { label: "Genres", href: "/genres" },
      { label: "Seasons", href: "/seasons" }
    ],
    legal: [
      { label: "Terms of Use", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" }
    ]
  };

  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-blue-900/30 mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and description */}
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
              Ani<span className="text-blue-500">Watch</span>
            </div>
            <p className="text-sm mb-4">
              Your go-to platform for comprehensive anime information, providing detailed insights and updates for all Japanese animation enthusiasts.
            </p>
            <a 
              href="https://github.com/yourusername" 
              className="inline-block hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>

          {/* Explore */}
          <FooterSection title="Explore">
            <ul className="space-y-2">
              {links.explore.map(({ label, href }) => (
                <li key={href}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Community Section (replacing Newsletter) */}
          <FooterSection title="Community">
            <p className="text-sm mb-3">
              Join our growing community of anime enthusiasts!
            </p>
            <div className="space-y-2">
              <a 
                href="/discord"
                className="w-full px-3 py-2 bg-gray-900 border border-blue-900/30 
                          text-gray-100 rounded flex items-center justify-center gap-2
                          hover:bg-gray-800 transition-colors duration-200 text-sm"
              >
                Join our Discord
              </a>
              <a 
                href="/forum"
                className="w-full px-3 py-2 bg-blue-600 text-white rounded 
                          hover:bg-blue-700 transition-colors duration-200 text-sm
                          flex items-center justify-center"
              >
                Visit our Forum
              </a>
            </div>
          </FooterSection>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-900/30" />

        {/* Bottom Section */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {links.legal.map(({ label, href }) => (
              <FooterLink key={href} href={href}>{label}</FooterLink>
            ))}
          </div>
          <div className="text-sm">
            © {new Date().getFullYear()} AniWatch. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;