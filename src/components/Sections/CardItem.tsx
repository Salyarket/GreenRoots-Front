import Image from "next/image";

interface CardItemProps {
  name: string;
  price: number;
  image_urls: string[];
  scientific_name?: string;
  carbon: number;
  description?: string;
  variant?: "simple" | "detailed";
}

//    {
//     name: "Chêne pédonculé",
//     slug: "chene-pedoncule",
//     price: 60,
//     description:
//       "Arbre majestueux d’Europe, symbole de longévité. Excellent pour stocker du carbone et abriter la biodiversité.",
//     image_urls: ["chene.jpg"],
//     stock: 120,
//     scientific_name: "Quercus robur",
//     carbon: 20,
//   },

const CardItem = ({
  name,
  price,
  image_urls,
  scientific_name,
  carbon,
  description,
  variant,
}: CardItemProps) => {
  return (
    <li className="bg-brand-white flex flex-col space-y-2 pb-4 rounded-lg w-full h-full custom-card-hover max-w-[400px] mx-auto relative">
      <Image
        src={`http://localhost:4000/uploads/arbres/chene.jpg`}
        alt={name}
        height={600}
        width={400}
        className="w-full h-full object-cover rounded-t-lg"
      />
      <div className="flex flex-col px-2">
        <h4 className="text-lg font-extrabold text-brand-darkgreen uppercase">
          {name}
        </h4>
        <p className="text-brand-green font-semibold">CO² : {carbon} kg/an</p>
        {variant === "detailed" && (
          <p className="text-black font-semibold mb-8  line-clamp-2">
            {description} kg/an
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
