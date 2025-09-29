import Image from "next/image";
import CardItem from "@/components/Sections/CardItem";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { getProducts } from "@/services/api";

const CataloguePage = async () => {
  const products = await getProducts();
  console.log(products);

  return (
    <main className="min-h-screen mt-16 px-4 custom-size-minmax">
      {/* section titre */}
      <section>
        <h1 className="text-xl md:text-2xl text-brand-darkgreen uppercase font-bold text-center">
          les arbres soigneusement sélectionnés par greenroots
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
          {products.slice(0, 20).map((product) => (
            <CardItem
              key={product.id}
              avalaible={product.available}
              name={product.name}
              price={product.price}
              image_urls={product.image_urls}
              scientific_name={product.scientific_name}
              carbon={product.carbon}
              description={product.description}
              slug={product.slug}
              id={product.id}
              variant="detailed"
            />
          ))}
        </ul>
        <div className=" flex justify-center items-center space-x-8 mt-4 ">
          <MdNavigateBefore className="w-20 h-20 text-brand-lightgreen custom-btn-hover" />
          <p className="bg-brand-green text-white p-2 w-10 h-10 flex items-center justify-center rounded-full ">
            1
          </p>
          <MdNavigateNext className="w-20 h-20 text-brand-lightgreen custom-btn-hover" />
        </div>
      </section>
    </main>
  );
};

export default CataloguePage;
