import React, { useEffect, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { content } from "@/data/content";

const Privacy = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="py-24">
          <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-serif font-medium text-kemada-900 mb-8">
              Datenschutzerklärung
            </h1>
            <p className="text-kemada-600 mb-8">Stand: 01.03.2024</p>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-serif font-medium text-kemada-900 mb-4">
                  1. Datenschutz auf einen Blick
                </h2>
                <div className="prose prose-kemada">
                  <p>
                    Diese Datenschutzerklärung informiert Sie über die Art und den Umfang der Verarbeitung Ihrer personenbezogenen Daten auf unserer Website. Wir legen großen Wert auf den Schutz Ihrer Privatsphäre und die Einhaltung der datenschutzrechtlichen Bestimmungen.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-medium text-kemada-900 mb-4">
                  2. Verantwortlicher
                </h2>
                <div className="prose prose-kemada">
                  <p>
                    {content.company.name}<br />
                    {content.company.contact.address.street}<br />
                    {content.company.contact.address.city}<br />
                    Email: {content.company.contact.email}<br />
                    Telefon: {content.company.contact.phone}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-medium text-kemada-900 mb-4">
                  3. Datenerfassung und Verwendung
                </h2>
                <div className="prose prose-kemada">
                  <p>
                    Wir erfassen und verarbeiten nur die personenbezogenen Daten, die Sie uns aktiv zur Verfügung stellen:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Kontaktdaten (Name, E-Mail, Telefon) bei Anfragen über unser Kontaktformular</li>
                    <li>Referenzen und Erfahrungsberichte, wenn Sie uns diese zur Veröffentlichung zur Verfügung stellen</li>
                  </ul>
                  <p className="mt-4">
                    Diese Daten verwenden wir ausschließlich, um:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Ihre Anfragen zu beantworten</li>
                    <li>Mit Ihrer Zustimmung Referenzen auf unserer Website zu veröffentlichen</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-medium text-kemada-900 mb-4">
                  4. Datenspeicherung und -löschung
                </h2>
                <div className="prose prose-kemada">
                  <p>
                    Wir speichern Ihre Daten nur so lange, wie es für die genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen dies vorschreiben. Referenzen werden bis zu Ihrem Widerruf gespeichert.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-medium text-kemada-900 mb-4">
                  5. Ihre Rechte
                </h2>
                <div className="prose prose-kemada">
                  <p>Sie haben das Recht auf:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Auskunft über Ihre bei uns gespeicherten Daten</li>
                    <li>Berichtigung unrichtiger Daten</li>
                    <li>Löschung Ihrer Daten</li>
                    <li>Widerruf erteilter Einwilligungen</li>
                  </ul>
                  <p className="mt-4">
                    Für die Ausübung dieser Rechte oder bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy; 