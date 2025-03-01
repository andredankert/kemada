import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { content } from "@/data/content";
import { testimonials } from "@/data/testimonials";

interface Testimonial {
  id: number;
  content: string;
  author: string;
  position?: string;
  rating: number;
}

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { testimonials: testimonialsContent } = content;

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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [animating]);

  const nextTestimonial = () => {
    if (animating) return;
    setAnimating(true);
    setActiveIndex((current) => (current + 1) % testimonials.length);
    setTimeout(() => setAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (animating) return;
    setAnimating(true);
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setAnimating(false), 500);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-sand-100 rounded-full filter blur-xl opacity-50"></div>
      
      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="reveal inline-block px-4 py-1 mb-4 text-sm font-medium tracking-wider uppercase text-primary bg-primary/10 rounded-full">
            {testimonialsContent.badge}
          </span>
          <h2 className="reveal stagger-delay-1 text-3xl md:text-4xl font-serif font-medium tracking-tight text-kemada-900 mb-6">
            {testimonialsContent.title}
          </h2>
          <p className="reveal stagger-delay-2 text-kemada-600 leading-relaxed">
            {testimonialsContent.description}
          </p>
        </div>

        <div className="reveal stagger-delay-3 relative max-w-4xl mx-auto">
          <Quote className="absolute text-primary/10 h-24 w-24 -top-6 -left-4 z-0" />
          
          <div className="relative overflow-hidden">
            <div 
              className={cn(
                "transition-opacity duration-500",
                animating ? "opacity-0" : "opacity-100"
              )}
            >
              <Card className="border-0 bg-transparent shadow-none">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        size={20} 
                        className={i < testimonials[activeIndex].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                      />
                    ))}
                  </div>
                  <p className="text-kemada-700 text-center text-lg md:text-xl mb-8 italic leading-relaxed">
                    "{testimonials[activeIndex].content}"
                  </p>
                  <div className="flex flex-col items-center">
                    <h4 className="font-serif text-kemada-900 text-xl font-medium">
                      {testimonials[activeIndex].author}
                    </h4>
                    {testimonials[activeIndex].position && (
                      <p className="text-kemada-500 text-sm mt-1">
                        {testimonials[activeIndex].position}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-center items-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === activeIndex 
                    ? "bg-primary w-6" 
                    : "bg-primary/30 hover:bg-primary/50"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex justify-between items-center absolute top-1/2 left-0 right-0 -mx-4 transform -translate-y-1/2 pointer-events-none">
            <Button
              onClick={prevTestimonial}
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/80 shadow-sm border border-gray-100 hover:bg-white pointer-events-auto"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} className="text-kemada-800" />
            </Button>
            <Button
              onClick={nextTestimonial}
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/80 shadow-sm border border-gray-100 hover:bg-white pointer-events-auto"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} className="text-kemada-800" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
