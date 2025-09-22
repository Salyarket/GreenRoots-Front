import CardItem from "./CardItem";
import { dataProducts } from "./data";
const BestSellers = () => {
  console.log(dataProducts[0]);
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

  return (
    <div className="bg-brand-green py-24 ">
      <div className="flex w-full text-white text-2xl">
        <div className="flex-1 w-full border-t-2 translate-y-1/2  border-slate-400 opacity-50"></div>
        <h3 className="text-center uppercase px-4 font-bold">
          nos best sellers
        </h3>
        <div className="flex-1 w-full border-t-2 translate-y-1/2  border-slate-400 opacity-50"></div>
      </div>

      {/* partie ul  */}
      <div className="grid bg-red-300 w-full ">
        <ul>
          {dataProducts.map((el) => (
            <CardItem key={el.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BestSellers;
