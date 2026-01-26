"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface CardItemProps {
  avalaible: boolean;
  carbon: string;
  description?: string;
  id: number;
  image_urls: string[];
  name: string;
  price: string;
  scientific_name?: string;
  stock?: number;
  slug: string;
  variant?: "simple" | "detailed";
}

const CardItem = ({
  name,
  price,
  slug,
  image_urls,
  scientific_name,
  carbon,
  description,
  variant,
  id,
}: CardItemProps) => {
  // pour faire la redirection slug
  const router = useRouter();
  return (
    <li
      onClick={() => router.push(`/catalogue/${id}`)}
      className={`bg-brand-white flex flex-col space-y-2 pb-4 rounded-lg custom-card-hover max-w-[400px] mx-auto relative ${
        variant === "detailed" ? "min-h-[700px]" : "min-h-[500px]"
      }  `}
    >
      {image_urls?.length > 0 && image_urls[0] ? (
        <Image
          src={image_urls[0]}
          alt={name}
          height={600}
          width={400}
          className={`w-full object-cover rounded-t-lg ${
            variant === "simple" ? "h-64" : "h-full"
          }`}
        />
      ) : (
        <div
          className={`w-full ${
            variant === "simple" ? "h-64" : "h-[300px]"
          } bg-gray-200 flex items-center justify-center rounded-t-lg`}
        >
          <span className="text-gray-500">Pas d&apos;image</span>
        </div>
      )}
      <div className="flex flex-col px-2">
        <h4 className="text-lg font-extrabold text-brand-darkgreen uppercase">
          {name}
        </h4>
        {carbon && (
          <p className="text-brand-green font-semibold">CO² : {carbon} kg/an</p>
        )}
        {variant === "detailed" && (
          <p className="text-black font-semibold mb-8  line-clamp-2">
            {description}
          </p>
        )}
        <p className="text-black font-semibold">Prix : {price}€</p>
      </div>
      {variant === "detailed" && (
        <button className="absolute bottom-6 right-6 text-white bg-brand-green px-4 py-2 font-bold rounded-lg cursor-pointer hover:bg-brand-lightgreen">
          Découvrir
        </button>
      )}
    </li>
  );
};

export default CardItem;
