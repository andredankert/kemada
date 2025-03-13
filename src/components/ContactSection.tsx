import React, { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { content } from "@/data/content";
import config from "@/config";

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { company, contact } = content;
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Sending contact form data:', formState);
      
      // Web3Forms API endpoint
      const apiUrl = 'https://api.web3forms.com/submit';
      
      // Create the form data object for Web3Forms
      const formData = {
        ...formState,
        access_key: config.web3forms.access_key,
        subject: `New contact request from ${formState.name}`,
        from_name: config.web3forms.from_name + ' Contact Form',
        to_name: config.web3forms.to_name,
        redirect: 'false',
        botcheck: ''
      };
        
      console.log('Using Web3Forms API');
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok && data.success) {
        setIsSubmitted(true);
        toast({
          title: contact.form.successMessage.title,
          description: contact.form.successMessage.description,
          variant: "default",
        });
        setFormState({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Fehler",
        description: error instanceof Error ? error.message : "Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
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

  const contactInfo = [
    {
      id: 1,
      icon: <Phone size={20} />,
      title: "Telefon",
      value: company.contact.phone,
      href: `tel:${company.contact.phone.replace(/\s/g, '')}`,
    },
    {
      id: 2,
      icon: <Mail size={20} />,
      title: "E-Mail",
      value: company.contact.email,
      href: `mailto:${company.contact.email}`,
    },
    {
      id: 3,
      icon: <MapPin size={20} />,
      title: "Adresse",
      value: `${company.contact.address.street}, ${company.contact.address.city}`,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${company.contact.address.street}, ${company.contact.address.city}, ${company.contact.address.country}`)}`,
    },
  ];

  return (
    <section
      id="contact-section"
      ref={sectionRef}
      className="py-24 bg-kemada-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(214,202,186,0.2),transparent_70%)]"></div>
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="reveal stagger-delay-1 text-4xl md:text-5xl font-serif font-medium tracking-tight text-kemada-900 mb-6">
          Sprechen Sie <span className="text-primary">mit uns</span>
        </h1>
        <p className="reveal stagger-delay-2 text-kemada-600 leading-relaxed">
          {contact.description}
        </p>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="reveal">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-serif text-2xl font-medium text-kemada-900 mb-6">{contact.form.title}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Hidden honeypot field to prevent spam */}
                <input type="hidden" name="botcheck" style={{ display: 'none' }} />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-kemada-700">
                      {contact.form.fields.name}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Max Mustermann"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="border-gray-200 focus:border-primary focus-visible:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-kemada-700">
                      {contact.form.fields.email}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="max@beispiel.de"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="border-gray-200 focus:border-primary focus-visible:ring-primary/20"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-kemada-700">
                    Telefonnummer (Optional)
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+49 123 456789"
                    value={formState.phone}
                    onChange={handleChange}
                    className="border-gray-200 focus:border-primary focus-visible:ring-primary/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-kemada-700">
                    {contact.form.fields.message}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Wie können wir Ihnen helfen?"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="resize-none border-gray-200 focus:border-primary focus-visible:ring-primary/20"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-md py-2 transition-all duration-300 flex items-center justify-center gap-2"
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Wird gesendet...</span>
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle size={18} />
                      <span>Nachricht gesendet</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>{contact.form.submitButton}</span>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="reveal stagger-delay-1">
              <h3 className="font-serif text-2xl font-medium text-kemada-900 mb-6">Kontaktinformationen</h3>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <Card key={item.id} className="reveal border-0 bg-white shadow-sm overflow-hidden">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-kemada-900">{item.title}</h4>
                        <a
                          href={item.href}
                          className="text-kemada-600 hover:text-primary transition-colors"
                          target={item.id === 3 ? "_blank" : undefined}
                          rel={item.id === 3 ? "noopener noreferrer" : undefined}
                        >
                          {item.value}
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="reveal stagger-delay-2 mt-8">
              <h3 className="font-serif text-2xl font-medium text-kemada-900 mb-6">Öffnungszeiten</h3>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-kemada-700 leading-relaxed">
                  Unsere Werkstatt hat keine festen Öffnungszeiten und wir bitten Sie sich vor einem Besuch bei uns anzumelden. Sie erreichen uns Montag bis Sonntag telefonisch oder via Email.
                </p>
              </div>
            </div>

            <div className="reveal stagger-delay-3 mt-8">
              <Card className="border-0 bg-primary/10 overflow-hidden">
                <CardContent className="p-6">
                  <h4 className="font-serif text-lg font-medium text-primary mb-2">Jetzt Termin vereinbaren</h4>
                  <p className="text-kemada-700 mb-4">Wir freuen uns darauf, Sie in unserer Werkstatt begrüßen zu dürfen.</p>
                  <Button 
                    asChild
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    <a href={`tel:${company.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2">
                      <Phone size={16} />
                      <span>Jetzt anrufen</span>
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
