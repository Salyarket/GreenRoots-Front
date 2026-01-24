"use client";

import { useState } from "react";
import Image from "next/image";
import { IProduct } from "@/types/index.types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface IGalleryProps {
  product: IProduct;
}

const ProductGallery = ({ product }: IGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = product.image_urls || [];
  const total = images.length;

  const handleSelect = (index: number) => setCurrentIndex(index);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + total) % total);
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % total);

  // Next.js Image veut juste des chemins relatifs pour localhost
  const normalizedImages = images.map((img) => img.replace(/^http:\/\/localhost:4000/, ''));

  return (
    <article className="h-full relative">
      {/* Image principale */}
      <div className="relative h-full w-full aspect-square overflow-hidden rounded-lg">
        {normalizedImages[currentIndex] ? (
          <Image
            src={normalizedImages[currentIndex]}
            alt={`${product.name} ${currentIndex + 1}`}
            fill
            className="object-cover transition-all duration-300"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-500 italic">Aucune image disponible</span>
          </div>
        )}

        {product.stock > 0 ? (
          <span className="absolute top-4 right-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow">
            En stock
          </span>
        ) : (
          <span className="absolute top-4 right-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow">
            En rupture
          </span>
        )}
      </div>

      {/* Indicateurs */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleSelect(index)}
            className={`w-4 h-4 rounded-full transition cursor-pointer ${
              currentIndex === index ? "bg-green-600" : "bg-gray-300"
            }`}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>

      {/* Flèches */}
      <FaChevronLeft
        onClick={handlePrev}
        className="absolute top-1/2 -translate-y-1/2 left-5 text-brand-darkgreen w-10 h-10 md:w-20 md:h-20 hover:scale-125 hover:cursor-pointer"
      />
      <FaChevronRight
        onClick={handleNext}
        className="absolute top-1/2 -translate-y-1/2 right-5 text-brand-darkgreen w-10 h-10 md:w-20 md:h-20 hover:scale-125 hover:cursor-pointer"
      />
    </article>
  );
};

export default ProductGallery;
