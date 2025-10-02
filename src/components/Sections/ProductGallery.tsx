"use client";

import { useState } from "react";
import Image from "next/image";
import { IProduct } from "@/types/index.types"; // 👈 import type
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface IGalleryProps {
  product: IProduct;
}

const ProductGallery = ({ product }: IGalleryProps) => {
  const [mainImage, setMainImage] = useState(product.image_urls[0]);

  return (
    <article className="flex flex-col w-full md:col-span-1">
      {/* Image principale */}
      <div className="w-full max-w-[500px] aspect-square relative">
        <Image
          src={`${API_URL}/uploads/arbres/${mainImage}`}
          alt={product.name}
          fill
          className="object-cover shadow-xl/20"
        />
      </div>

      {/* Miniatures */}
      <div className="flex justify-between mt-4 gap-2 w-full max-w-[500px]">
        {product.image_urls.map((imgUrl, index) => {
          const isActive = mainImage === imgUrl;
          return (
            <div
              key={index}
              className={`relative basis-[30%] aspect-square cursor-pointer overflow-hidden 
                            ${
                              isActive
                                ? "ring-5 ring-brand-white shadow-[6px_8px_6px_rgba(0,0,0,0.8)]"
                                : "ring-1 ring-gray-200 shadow-xl/30"
                            }`}
              onClick={() => setMainImage(imgUrl)}
            >
              <Image
                src={`${API_URL}/uploads/arbres/${imgUrl}`}
                alt={`${product.name} ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default ProductGallery;
