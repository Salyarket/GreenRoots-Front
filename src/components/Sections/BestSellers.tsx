import CardItem from "./CardItem";
import { dataProducts } from "../../services/data";
const BestSellers = () => {
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
    <div className="bg-brand-green py-8">
      <div className="flex w-full text-white text-2xl">
        <div className="flex-1 w-full border-t-2 translate-y-1/2  border-slate-400 opacity-50"></div>
        <h3 className="text-center uppercase px-4 font-bold pb-8 select-none ">
          nos best sellers
        </h3>
        <div className="flex-1 w-full border-t-2 translate-y-1/2  border-slate-400 opacity-50"></div>
      </div>

      {/* partie des cards  */}
      <div className="px-4 ">
        <ul className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {dataProducts.slice(0, 3).map((el) => (
            <CardItem
              key={el.id}
              name={el.name}
              price={el.price}
              carbon={el.carbon}
              scientific_name={el.scientific_name}
              image_urls={el.image_urls}
              variant={"simple"}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BestSellers;
