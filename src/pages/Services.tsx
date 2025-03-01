import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { content } from "@/data/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

const Services = () => {
  const { services, company } = content;
  const location = useLocation();

  useEffect(() => {
    // Get the hash from the URL (e.g., #kreativkurse)
    const hash = location.hash;
    if (hash) {
      // Remove the # symbol
      const id = hash.slice(1);
      // Find the element with the matching ID
      const element = document.getElementById(id);
      if (element) {
        // Wait a bit for the page to render completely
        setTimeout(() => {
          // Scroll the element into view with some offset for the navbar
          const navbarHeight = 80; // Approximate navbar height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }, 100);
      }
    }
  }, [location.hash]); // Re-run when the hash changes

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <section className="py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-kemada-900 mb-6">
              {services.title}
            </h1>
            <p className="text-kemada-600 leading-relaxed">
              {services.description}
            </p>
          </div>

          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {services.items.map((service, index) => (
                <div 
                  key={service.id} 
                  id={service.title.toLowerCase().replace(/\s+/g, '-')}
                  className="flex flex-col lg:flex-row gap-12 items-center"
                >
                  <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <h2 className="text-3xl font-serif font-medium text-kemada-900">
                          {service.title}
                        </h2>
                        {service.popular && (
                          <span className="px-3 py-1 text-xs font-medium tracking-wider uppercase text-primary bg-primary/10 rounded-full">
                            Beliebt
                          </span>
                        )}
                      </div>
                      <div className="space-y-4">
                        <p className="text-kemada-600 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="p-6 bg-primary/5 rounded-xl">
                          <p className="text-kemada-700 leading-relaxed">
                            {service.detailedInfo}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        <Button 
                          asChild
                          className="bg-primary hover:bg-primary/90 text-white"
                        >
                          <a href="/contact" className="flex items-center gap-2">
                            <Mail size={18} />
                            <span>Anfrage senden</span>
                          </a>
                        </Button>
                        <Button 
                          asChild
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary/5"
                        >
                          <a href={`tel:${company.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2">
                            <Phone size={18} />
                            <span>Anrufen</span>
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-kemada-50">
          <div className="section-container">
            <Card className="border-0 bg-primary/10 overflow-hidden">
              <CardContent className="p-8 text-center">
                <h3 className="font-serif text-2xl font-medium text-primary mb-4">
                  Bereit für Ihr kreatives Erlebnis?
                </h3>
                <p className="text-kemada-700 mb-8 max-w-2xl mx-auto">
                  Kontaktieren Sie uns für eine individuelle Beratung. Wir finden gemeinsam das perfekte Angebot für Sie.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    asChild
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    <a href="/contact" className="flex items-center gap-2">
                      <Mail size={18} />
                      <span>Jetzt anfragen</span>
                    </a>
                  </Button>
                  <Button 
                    asChild
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/5"
                  >
                    <a href={`tel:${company.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2">
                      <Phone size={18} />
                      <span>Anrufen</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
