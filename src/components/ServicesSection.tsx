import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { content } from "@/data/content";

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  popular?: boolean;
}

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<number | null>(null);
  
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

  const { services } = content;

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-kemada-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,202,186,0.15),transparent_60%)]"></div>
      
      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="reveal inline-block px-4 py-1 mb-4 text-sm font-medium tracking-wider uppercase text-primary bg-primary/10 rounded-full">
            {services.badge}
          </span>
          <h2 className="reveal stagger-delay-1 text-3xl md:text-4xl font-serif font-medium tracking-tight text-kemada-900 mb-6">
            {services.title}
          </h2>
          <p className="reveal stagger-delay-2 text-kemada-600 leading-relaxed">
            {services.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.items.map((service, index) => (
            <div 
              key={service.id}
              className={cn(
                "reveal transition-all duration-300 transform",
                `stagger-delay-${index + 1}`
              )}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              <Card 
                className={cn(
                  "h-full border border-border overflow-hidden transition-all duration-300",
                  activeService === service.id ? "shadow-lg -translate-y-1" : "shadow hover:shadow-md"
                )}
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 z-20 bg-primary text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                    <Star size={12} fill="white" />
                    Beliebt
                  </div>
                )}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-700",
                      activeService === service.id ? "scale-110" : "scale-100"
                    )}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <CardHeader>
                  <CardTitle className="font-serif text-xl text-kemada-900">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-kemada-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button 
                    asChild
                    variant="ghost" 
                    className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent flex items-center gap-1 group"
                  >
                    <Link 
                      to={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center gap-1"
                    >
                      Mehr erfahren
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        <div className="reveal stagger-delay-4 text-center mt-12">
          <Button 
            asChild
            className="bg-white hover:bg-gray-50 text-primary border border-primary rounded-md px-8 py-6 text-lg transition-colors duration-300"
          >
            <Link to={services.cta.link}>{services.cta.text}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
