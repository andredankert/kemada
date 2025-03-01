import React, { useEffect, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { content } from "@/data/content";

const Terms = () => {
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
              Allgemeine Geschäftsbedingungen (AGB)
            </h1>
            <p className="text-kemada-600 mb-8">Stand: 01.03.2024</p>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-serif font-medium text-kemada-900 mb-4">
                  1. Geltungsbereich
                </h2>
                <div className="prose prose-kemada">
                  <p>
                    Diese Allgemeinen Geschäftsbedingungen gelten für alle Geschäftsbeziehungen zwischen {content.company.name} und unseren Kunden. Sie regeln die Durchführung unserer kreativen Keramik-Workshops, mobilen Events und sonstigen Dienstleistungen.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-medium text-kemada-900 mb-4">
                  2. Vertragsschluss
                </h2>
                <div className="prose prose-kemada">
                  <p>
                    Der Vertrag kommt durch Ihre Bestellung und unsere Annahme zustande. Die Annahme erfolgt durch ausdrückliche Bestätigung oder durch Ausführung der Leistung. Bei Workshops und Events ist eine vorherige Anmeldung erforderlich.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-medium text-kemada-900 mb-4">
                  3. Preise und Zahlung
                </h2>
                <div className="prose prose-kemada">
                  <p>
                    Alle Preise verstehen sich in Euro inklusive der gesetzlichen Mehrwertsteuer. Die Zahlung erfolgt während oder nach der Veranstaltung nach Vereinbarung.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-medium text-kemada-900 mb-4">
                  4. Stornierung und Rücktritt
                </h2>
                <div className="prose prose-kemada">
                  <p>
                    Eine Stornierung Ihrer Buchung ist jederzeit kostenlos möglich. Wir bitten Sie lediglich darum, uns über eine Stornierung zu informieren, damit wir entsprechend planen können.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-medium text-kemada-900 mb-4">
                  5. Durchführung der Veranstaltungen
                </h2>
                <div className="prose prose-kemada">
                  <p>
                    Wir behalten uns vor, die Durchführung von Workshops oder Events bei zu geringer Teilnehmerzahl oder aus anderen wichtigen Gründen abzusagen. In diesem Fall werden bereits geleistete Zahlungen vollständig erstattet.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-medium text-kemada-900 mb-4">
                  6. Haftung
                </h2>
                <div className="prose prose-kemada">
                  <p>
                    Wir haften für Schäden nur bei Vorsatz oder grober Fahrlässigkeit. Dies gilt nicht für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie bei der Verletzung wesentlicher Vertragspflichten.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-medium text-kemada-900 mb-4">
                  7. Kontakt
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms; 