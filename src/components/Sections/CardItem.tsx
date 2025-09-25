import Image from "next/image";

interface CardItemProps {
  name: string;
  price: number;
  image_urls: string[];
  scientific_name: string;
  carbon: number;
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

const CardItem = ({ name, price, image_urls, carbon }: CardItemProps) => {
  return (
    <li className="bg-brand-white flex flex-col space-y-2 pb-4 rounded-lg max-w-[400px] m-auto custom-card-hover ">
      <Image
        src={`/${image_urls[0]}`}
        alt={name}
        height={600}
        width={400}
        className="w-full h-full object-cover rounded-t-lg"
      />
      <div className="flex flex-col space-y-1.5 px-2 min-h-[100px]">
        <h4 className="text-lg font-extrabold text-brand-darkgreen uppercase">
          {name}
        </h4>
        <p className="text-brand-green font-semibold">CO² : {carbon} kg/an</p>
        <p className="text-brand-darkgreen font-semibold">Prix : {price}€</p>
      </div>
    </li>
  );
};

export default CardItem;
