import React from "react";
import { Link } from "react-router-dom";
import { content } from "@/data/content";
import { version } from '@/config/version';

const Footer: React.FC = () => {
  const { company, footer } = content;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-kemada-900 text-white py-16">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h2 className="text-2xl font-serif font-medium mb-4">{company.name}</h2>
            <p className="text-kemada-300 leading-relaxed mb-6">
              {footer.description}
            </p>
            <div className="space-y-3">
              <p className="text-kemada-300">
                {company.contact.address.street}<br />
                {company.contact.address.city}<br />
                {company.contact.address.country}
              </p>
              <p className="text-kemada-300">
                Tel: <a href={`tel:${company.contact.phone}`} className="hover:text-primary transition-colors">{company.contact.phone}</a>
              </p>
              <p className="text-kemada-300">
                Email: <a href={`mailto:${company.contact.email}`} className="hover:text-primary transition-colors">{company.contact.email}</a>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-white mb-4">Schnellzugriff</h3>
            <ul className="space-y-3">
              {footer.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="text-kemada-300 hover:text-primary transition-colors">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-white mb-4">Unsere Angebote</h3>
            <ul className="space-y-3">
              {footer.serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="text-kemada-300 hover:text-primary transition-colors">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-md font-medium text-white mb-4">Rechtliches</h3>
            <ul className="space-y-3">
              {footer.legal.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="text-kemada-300 hover:text-primary transition-colors">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-kemada-800 mt-12 pt-8 text-center text-kemada-400">
          <p>© {currentYear} {company.name}. Alle Rechte vorbehalten.</p>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 py-4">
        <p>Version {new Date(version.buildDate).toLocaleDateString('de-DE')}</p>
      </div>
    </footer>
  );
};

export default Footer;
