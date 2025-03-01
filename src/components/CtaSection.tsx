import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { content } from "@/data/content";

const CtaSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { cta } = content;
  
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

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-primary relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#5a4a3a,transparent_70%)]"></div>
      <div className="absolute right-0 top-0 w-72 h-72 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl"></div>
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="reveal inline-block px-4 py-1 mb-4 text-sm font-medium tracking-wider uppercase text-white bg-white/10 rounded-full">
            {cta.badge}
          </span>
          <h2 className="reveal stagger-delay-1 text-3xl md:text-5xl font-serif font-medium tracking-tight text-white mb-6">
            {cta.title}
          </h2>
          <p className="reveal stagger-delay-2 text-white/90 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            {cta.description}
          </p>
          <div className="reveal stagger-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 rounded-md px-8 text-lg"
            >
              <a href={cta.buttons.primary.link} className="flex items-center gap-2">
                {cta.buttons.primary.text}
                <ArrowRight size={18} />
              </a>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="bg-white border-primary text-primary hover:bg-primary/5 rounded-md px-8 text-lg"
            >
              <a href={cta.buttons.secondary.link}>{cta.buttons.secondary.text}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
