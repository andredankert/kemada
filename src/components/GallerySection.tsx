'use client';

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { content } from "@/data/content";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

const GallerySection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { gallery } = content;

  // Transform gallery categories into gallery items
  const galleryItems: GalleryItem[] = gallery.categories.map(category => ({
    id: category.id,
    title: category.title,
    description: category.description,
    image: category.image,
    category: category.id.charAt(0).toUpperCase() + category.id.slice(1)
  }));

  const currentItem = galleryItems[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === galleryItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? galleryItems.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen bg-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{
            backgroundImage: `url(${currentItem.image})`,
            opacity: 1
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative flex h-full items-center justify-center">
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white hover:bg-white/30 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div className="text-center max-w-4xl px-4">
          <h2 className="text-4xl font-bold text-white mb-4 transition-opacity duration-700">
            {currentItem.title}
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto transition-opacity duration-700">
            {currentItem.description}
          </p>
          <span className="mt-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm text-white transition-opacity duration-700">
            {currentItem.category}
          </span>
        </div>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white hover:bg-white/30 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default GallerySection; 