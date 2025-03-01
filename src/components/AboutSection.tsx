import React, { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { content } from "@/data/content";

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elements = entry.target.querySelectorAll(".reveal");
          if (entry.isIntersecting) {
            elements.forEach((el) => {
              el.classList.add("active");
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const { about } = content;

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="py-20 bg-white relative overflow-hidden"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <span className="reveal inline-block px-4 py-1 mb-4 text-sm font-medium tracking-wider uppercase text-primary bg-primary/10 rounded-full">
              {about.badge}
            </span>
            <h2 className="reveal stagger-delay-1 text-3xl md:text-4xl font-serif font-medium tracking-tight text-kemada-900 mb-6">
              {about.title}
            </h2>
            {about.description.map((paragraph, index) => (
              <p key={index} className={`reveal stagger-delay-${index + 2} text-kemada-600 mb-6 leading-relaxed`}>
                {paragraph}
              </p>
            ))}
            <div className="reveal stagger-delay-4 flex flex-col sm:flex-row gap-8 mt-8">
              {about.stats.map((stat, index) => (
                <div key={index}>
                  <h3 className="font-serif text-primary text-4xl font-bold mb-2">{stat.value}</h3>
                  <p className="text-kemada-600">{stat.label}</p>
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
  );
};

export default AboutSection;
