import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { content } from "@/data/content";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const { about } = content;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with reveal class
    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      // Cleanup: unobserve all elements
      document.querySelectorAll('.reveal').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-white">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <span className="reveal inline-block px-4 py-1 mb-4 text-sm font-medium tracking-wider uppercase text-primary bg-primary/10 rounded-full">
                  {about.badge}
                </span>
                <h1 className="reveal stagger-delay-1 text-4xl md:text-5xl font-serif font-medium tracking-tight text-kemada-900 mb-6">
                  {about.title}
                </h1>
                <div className="reveal stagger-delay-2 space-y-4">
                  {about.description.map((paragraph, index) => (
                    <p key={index} className="text-kemada-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="reveal stagger-delay-3 grid grid-cols-3 gap-8 mt-12">
                  {about.stats.map((stat, index) => (
                    <div key={index}>
                      <p className="text-3xl font-serif font-medium text-primary mb-2">
                        {stat.value}
                      </p>
                      <p className="text-sm text-kemada-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-1 lg:order-2 relative">
                <div className="reveal relative z-10 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/images/Werkstatt/keramikmalerei.dankert_1450798661_1145704668656533570_2234629575.jpg" 
                    alt="Keramik Workshop" 
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="reveal stagger-delay-1 absolute -bottom-6 -right-6 w-1/2 h-1/2 bg-primary/10 rounded-2xl -z-10"></div>
                <div className="reveal stagger-delay-2 absolute -top-6 -left-6 w-1/2 h-1/2 bg-sand-100 rounded-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Workshop Section */}
        <section className="py-20 bg-white">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="reveal text-3xl md:text-4xl font-serif font-medium tracking-tight text-kemada-900 mb-6">
                {about.workshop.title}
              </h2>
              <p className="reveal text-kemada-600 leading-relaxed">
                {about.workshop.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {about.workshop.features.map((feature, index) => (
                <div key={index} className="reveal p-6 bg-primary/5 rounded-2xl">
                  <h3 className="text-xl font-serif font-medium text-kemada-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-kemada-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="reveal relative mx-auto max-w-4xl">
              <img
                src={about.workshop.image}
                alt="Unsere Werkstatt"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </section>

        {/* Production Process Section */}
        <section className="py-20 bg-white">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="reveal text-3xl md:text-4xl font-serif font-medium tracking-tight text-kemada-900 mb-6">
                {about.production.title}
              </h2>
              <p className="reveal text-kemada-600 leading-relaxed">
                {about.production.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="reveal">
                <img
                  src={about.production.image}
                  alt="Produktionsablauf"
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
              <div className="space-y-8">
                {about.production.steps.map((step, index) => (
                  <div key={index} className="reveal relative pl-12">
                    <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-medium">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-serif font-medium text-kemada-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-kemada-600">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="section-container">
            <div className="reveal bg-primary rounded-2xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-white mb-6">
                {about.cta.title}
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-8">
                {about.cta.description}
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">
                  {about.cta.button.text}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
