'use client';

import * as React from 'react';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface GalleryImage {
  src: string;
  category: string;
  title: string;
  description: string;
}

const galleryImages: GalleryImage[] = [
  // Christmas Category
  {
    src: "/images/gallery/christmas/SAM_3231-.jpg",
    category: "Christmas",
    title: "Christmas Angel",
    description: "Delicate handcrafted Christmas angel"
  },
  {
    src: "/images/gallery/christmas/SAM_3199-.jpg",
    category: "Christmas",
    title: "Festive Ornament",
    description: "Traditional Christmas decoration"
  },
  {
    src: "/images/gallery/christmas/P1030204-800.jpg",
    category: "Christmas",
    title: "Holiday Scene",
    description: "Detailed Christmas scene"
  },
  
  // Decoration Category
  {
    src: "/images/gallery/deco/SAM_0250-.jpg",
    category: "Decoration",
    title: "Garden Gnome",
    description: "Charming ceramic garden gnome"
  },
  {
    src: "/images/gallery/deco/Blaettervase-800.jpg",
    category: "Decoration",
    title: "Decorative Vase",
    description: "Elegant ceramic vase"
  },
  {
    src: "/images/gallery/deco/SAM_0388-.jpg",
    category: "Decoration",
    title: "Home Accent",
    description: "Beautiful ceramic decoration"
  },
  
  // Animals Category
  {
    src: "/images/gallery/animals/SAM_0349.jpg",
    category: "Animals",
    title: "Woodland Animals",
    description: "Ceramic woodland creatures"
  },
  {
    src: "/images/gallery/animals/SAM_2957a.JPG",
    category: "Animals",
    title: "Forest Friends",
    description: "Whimsical animal figures"
  },
  {
    src: "/images/gallery/animals/SAM_0297-.jpg",
    category: "Animals",
    title: "Nature Collection",
    description: "Garden wildlife collection"
  }
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const categories = ['all', ...new Set(galleryImages.map(img => img.category))];
  
  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Our Gallery</h1>
        
        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(image)}
              className="cursor-pointer group relative overflow-hidden rounded-lg shadow-lg aspect-square"
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold">{image.title}</h3>
                  <p className="text-sm opacity-90">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Preview Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
                <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
                <p className="text-sm opacity-90">{selectedImage.description}</p>
                <p className="text-xs mt-2">{selectedImage.category}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
} 