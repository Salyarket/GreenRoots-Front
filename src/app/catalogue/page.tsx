import CardItem from "@/components/Sections/CardItem";
import { dataProducts } from "@/components/Sections/data";
import Image from "next/image";
const CataloguePage = () => {
  // {
  //   id: 1,
  //   name: "Chêne pédonculé",
  //   slug: "chene-pedoncule",
  //   price: 60,
  //   description:
  //     "Arbre majestueux d’Europe, symbole de longévité. Excellent pour stocker du carbone et abriter la biodiversité.",
  //   image_urls: ["testcard1.webp"],
  //   stock: 120,
  //   scientific_name: "Quercus robur",
  //   carbon: 20,
  // },

  return (
    <main className="min-h-screen mt-16 px-4 custom-size-minmax">
      {/* section titre */}
      <section>
        <h1 className="text-xl md:text-2xl text-brand-darkgreen uppercase font-bold text-center">
          les arbres soigneuseement séléctionnés par greenroots
        </h1>
        <p className="mt-4 text-md md:text-xl text-brand-lightgreen font-bold uppercase text-center">
          il a en a pour tous les goûts dans la nature
        </p>
      </section>

      {/* section barre de recherche/filtres */}
      <section className="flex flex-col md:flex-row justify-center mt-8 space-x-8">
        <div className="flex  border border-gray-300 rounded-full overflow-hidden w-full md:w-1/2 cursor-pointer">
          <input
            type="text"
            placeholder="Rechercher une plante"
            className="flex-1 px-4 py-2 outline-none"
          />
          <button className="bg-brand-green text-white px-4 hover:bg-brand-darkgreen cursor-pointer">
            <Image src={"/search.svg"} width={15} height={15} alt="search" />
          </button>
        </div>
        <button className="bg-brand-green mt-8 md:mt-0 w-full md:w-fit   px-6 py-2 rounded-lg text-white font-semibold hover:bg-brand-darkgreen cursor-pointer">
          Filtre
        </button>
      </section>

      {/* section ul avec cards */}
      <section className="py-8">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 bg-white items-stretch">
          {dataProducts.slice(0, 8).map((product) => (
            <CardItem
              key={product.id}
              name={product.name}
              price={product.price}
              image_urls={product.image_urls}
              scientific_name={product.scientific_name}
              carbon={product.carbon}
              description={product.description}
              variant="detailed"
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default CataloguePage;
