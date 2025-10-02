"use client";

import { useState } from "react";
import Image from "next/image";
import { IProduct } from "@/types/index.types";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface IGalleryProps {
  product: IProduct;
}

const ProductGallery = ({ product }: IGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = product.image_urls?.length
    ? product.image_urls
    : [product.image];

  const handleSelect = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <article className="h-full relative">
      {/* Bloc image principale */}
      <div className="relative h-full w-full aspect-square overflow-hidden rounded-lg">
        <Image
          src={`${API_URL}/uploads/arbres/${images[currentIndex]}`}
          alt={`${product.name} ${currentIndex + 1}`}
          fill
          sizes="max-width: 100px"
          className="object-cover   transition-all duration-300"
          priority
        />
        {product.stock > 0 && (
          <span className="absolute top-4 right-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow">
            En stock
          </span>
        )}
      </div>

      {/* Mobile : petits indicateurs (boules) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex  justify-center mt-4 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleSelect(index)}
            className={`w-6 h-6 rounded-full transition 
              ${currentIndex === index ? "bg-green-600" : "bg-gray-300"}`}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>
    </article>
  );
};

export default ProductGallery;
