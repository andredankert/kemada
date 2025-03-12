import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { testimonials, suggestedRoles } from "@/data/testimonials";

const TestimonialsPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
    position: suggestedRoles[Math.floor(Math.random() * suggestedRoles.length)] // Random default role
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/testimonial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Vielen Dank für Ihre Bewertung!",
          description: "Wir werden sie nach Überprüfung veröffentlichen.",
        });
        
        setFormData({
          name: "",
          email: "",
          message: "",
          rating: 5,
          position: suggestedRoles[Math.floor(Math.random() * suggestedRoles.length)] // New random role for next submission
        });
      } else {
        throw new Error(data.message || 'Failed to send testimonial');
      }
    } catch (error) {
      console.error('Error sending testimonial:', error);
      toast({
        title: "Fehler",
        description: "Es gab ein Problem beim Senden Ihrer Bewertung. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="section-container py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-kemada-900 mb-6">
              Was unsere <span className="text-primary">Kunden</span> sagen
            </h1>
            <p className="text-kemada-600 leading-relaxed">
              Entdecken Sie die Erfahrungen unserer zufriedenen Kunden und teilen Sie Ihre eigene Geschichte mit uns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[...testimonials].sort((a, b) => {
              // Parse German date format "DD. MMMM YYYY"
              const germanMonths = {
                'Januar': '01', 'Februar': '02', 'März': '03', 'April': '04',
                'Mai': '05', 'Juni': '06', 'Juli': '07', 'August': '08',
                'September': '09', 'Oktober': '10', 'November': '11', 'Dezember': '12'
              };
              
              const parseGermanDate = (dateStr: string) => {
                const [day, month, year] = dateStr.split(' ');
                const monthNum = germanMonths[month as keyof typeof germanMonths];
                return new Date(`${year}-${monthNum}-${day.replace('.', '')}`);
              };

              return parseGermanDate(b.date).getTime() - parseGermanDate(a.date).getTime();
            }).map((testimonial) => (
              <Card key={testimonial.id} className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-serif text-lg font-medium text-kemada-900">
                        {testimonial.author}
                      </h3>
                      {testimonial.position && (
                        <p className="text-kemada-500 text-sm">{testimonial.position}</p>
                      )}
                    </div>
                    <span className="text-kemada-500 text-sm">{testimonial.date}</span>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <p className="text-kemada-600 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-serif font-medium text-kemada-900 mb-6">
                  Ihre Erfahrung teilen
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-kemada-700 mb-1">
                      Name *
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-kemada-700 mb-1">
                      E-Mail *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-kemada-700 mb-1">
                      Ihre Erfahrung *
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="min-h-[120px]"
                    />
                  </div>
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-kemada-700 mb-1">
                      Ihre Rolle
                    </label>
                    <div className="relative">
                      <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        list="role-suggestions"
                        placeholder="Wählen oder geben Sie Ihre Rolle ein"
                        className="w-full"
                      />
                      <datalist id="role-suggestions">
                        {suggestedRoles.map((role) => (
                          <option key={role} value={role} />
                        ))}
                      </datalist>
                    </div>
                    <p className="text-sm text-kemada-500 mt-1">
                      Wählen Sie aus den Vorschlägen oder geben Sie Ihre eigene Rolle ein
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-kemada-700 mb-1">
                      Bewertung
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating })}
                          className="focus:outline-none"
                        >
                          <Star
                            size={24}
                            className={rating <= formData.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Wird gesendet...</span>
                      </>
                    ) : (
                      "Bewertung abschicken"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
