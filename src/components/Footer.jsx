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
      { label: "Nouveautés", href: "/new" },
      { label: "Populaire", href: "/popular" },
      { label: "Genres", href: "/genres" },
      { label: "Saisons", href: "/seasons" }
    ],
    legal: [
      { label: "Conditions d'utilisation", href: "/terms" },
      { label: "Politique de confidentialité", href: "/privacy" }
    ]
  };

  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-blue-900/30 mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo et description */}
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
              Ani<span className="text-blue-500">Watch</span>
            </div>
            <p className="text-sm mb-4">
              Votre plateforme de streaming d'animés préférée, offrant une expérience unique et immersive pour tous les passionnés d'animation japonaise.
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

          {/* Explorer */}
          <FooterSection title="Explorer">
            <ul className="space-y-2">
              {links.explore.map(({ label, href }) => (
                <li key={href}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Newsletter */}
          <FooterSection title="Newsletter">
            <p className="text-sm mb-3">
              Restez informé des dernières sorties d'animés.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-3 py-2 rounded bg-gray-900 border border-blue-900/30 
                          text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500
                          transition-colors duration-200 text-sm"
                required
              />
              <button
                type="submit"
                className="w-full px-3 py-2 bg-blue-600 text-white rounded 
                          hover:bg-blue-700 transition-colors duration-200 text-sm"
              >
                S'abonner
              </button>
            </form>
          </FooterSection>
        </div>

        {/* Barre de séparation */}
        <div className="border-t border-blue-900/30" />

        {/* Section basse */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {links.legal.map(({ label, href }) => (
              <FooterLink key={href} href={href}>{label}</FooterLink>
            ))}
          </div>
          <div className="text-sm">
            © {new Date().getFullYear()} AniWatch. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;