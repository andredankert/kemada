import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { content } from '@/data/content';

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/gallery-data.json')
      .then(response => response.json())
      .then(data => {
        setImages(data.images);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading gallery:', err);
        setError('Galerie konnte nicht geladen werden');
        setLoading(false);
      });
  }, []);

  const categories = ['Alle', ...new Set(images.map(img => img.category))].sort();
  
  const filteredImages = selectedCategory === 'Alle'
    ? images
    : images.filter(img => img.category === selectedCategory);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-kemada-900"></div>
    </div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        <div className="section-container py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-kemada-900 mb-6">
              {content.gallery.title}
            </h1>
            <p className="text-kemada-600 leading-relaxed mb-8">
              {content.gallery.description}
            </p>

            {/* Category Filter */}
            <div className="flex flex-nowrap justify-center gap-1.5 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full whitespace-nowrap px-3 min-w-fit text-sm"
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="group aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-100"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative h-full w-full">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-medium truncate">
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              Keine Bilder in dieser Kategorie gefunden
            </div>
          )}
        </div>
      </main>

      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-[90vw] h-[90vh] p-0 overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-50 bg-white/10 hover:bg-white/20 text-white"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </Button>
          {selectedImage && (
            <div className="w-full h-full flex items-center justify-center bg-black/90">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
} 