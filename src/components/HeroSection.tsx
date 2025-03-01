import React, { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { content } from "@/data/content";

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
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
          } else {
            elements.forEach((el) => {
              el.classList.remove("active");
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("about-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { hero } = content;

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(to right, #f9f8f4, #f5f2ea)"
      }}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,202,186,0.2),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(214,202,186,0.2),transparent_70%)]"></div>
      </div>

      <div className="section-container relative z-10 pt-20 flex flex-col items-center justify-center text-center">
        <span className="reveal text-primary inline-block px-4 py-1 mb-4 text-sm font-medium tracking-wider uppercase bg-primary/10 rounded-full">
          {hero.welcome}
        </span>
        <h1 className="reveal stagger-delay-1 text-4xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-kemada-900 mb-6 max-w-4xl text-balance">
          {hero.title.split(' ').map((word, i) => 
            word.toLowerCase() === 'jung' ? (
              <React.Fragment key={i}>
                <br className="hidden sm:block" />
                für <span className="text-primary">{word} und Alt</span>
              </React.Fragment>
            ) : word.toLowerCase() === 'und' || word.toLowerCase() === 'alt' ? null : (
              <React.Fragment key={i}>{word} </React.Fragment>
            )
          )}
        </h1>
        <p className="reveal stagger-delay-2 text-kemada-600 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          {hero.description}
        </p>
        <div className="reveal stagger-delay-3 flex flex-col sm:flex-row gap-4 mt-2">
          <Button 
            asChild
            size={isMobile ? "lg" : "default"}
            className="bg-primary hover:bg-primary/90 text-white rounded-md px-8 py-2 text-lg"
          >
            <a href="/contact">{hero.cta.primary}</a>
          </Button>
          <Button 
            asChild
            variant="outline" 
            size={isMobile ? "lg" : "default"}
            className="border-primary/80 text-primary/80 hover:bg-primary/5 hover:border-primary hover:text-primary rounded-md px-8 py-2 text-lg"
          >
            <a href="/services#mobile-events">{hero.cta.secondary}</a>
          </Button>
        </div>
      </div>

      <button
        onClick={scrollToNextSection}
        className="reveal stagger-delay-5 absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary animate-float"
        aria-label="Scroll to next section"
      >
        <ChevronDown size={32} />
      </button>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-[5%] w-64 h-64 bg-primary/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
      <div className="absolute bottom-1/4 left-[10%] w-56 h-56 bg-sand-200/50 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
    </div>
  );
};

export default HeroSection;
