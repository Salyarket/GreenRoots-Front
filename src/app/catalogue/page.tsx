import Image from "next/image";
import CardItem from "@/components/Sections/CardItem";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { getProductsPagination } from "@/services/product.api";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";

interface CataloguePageProps {
  searchParams: { page: string };
}
const CataloguePage = async ({ searchParams }: CataloguePageProps) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 6;

  const productsWithPagination = await getProductsPagination(
    limit,
    currentPage
  );
  const products = productsWithPagination.data;
  const { totalPages } = productsWithPagination.pagination_State;

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

      {products.length === 0 ? (
        <p className="text-center mt-24 font-bold">
          Les produits ne sont pas disponibles pour le moment. Réesayez
          ultérieurement.
        </p>
      ) : (
        <>
          {/* section barre de recherche/filtres */}
          {/* <section className="flex flex-col md:flex-row justify-center mt-8 space-x-8">
            <div className="flex  border border-gray-300 rounded-full overflow-hidden w-full md:w-1/2 cursor-pointer">
              <input
                type="text"
                placeholder="Rechercher une plante"
                className="flex-1 px-4 py-2 outline-none"
              />
              <button className="bg-brand-green text-white px-4 hover:bg-brand-darkgreen cursor-pointer">
                <CiSearch className="font-extrabold " />
              </button>
            </div>
          </section> */}
          {/*  */}
          {/* section ul avec cards */}
          <section className="py-8">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 bg-white items-stretch">
              {products.map((product) => (
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

            {/* section pagination */}
            <div className="flex justify-center items-center space-x-4 mt-6">
              {/* Flèche gauche */}
              {/* si page dans url est plus grande que 2 alors on affiche fleche de gauche ex "catalogue?page=2" */}
              {currentPage > 1 && (
                <Link href={`/catalogue?page=${currentPage - 1}`}>
                  <MdNavigateBefore className="w-10 h-10 text-brand-lightgreen custom-btn-hover" />
                </Link>
              )}

              {/* Pages numérotées (le back renvoie dans pagination_state le nombre de page max) */}
              {/* Array.from() methode JS crée un tableau à partir d'une longueur */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Link
                    key={page}
                    href={`/catalogue?page=${page}`}
                    className={`px-4 py-2 rounded-full ${
                      page === currentPage
                        ? "bg-brand-green text-white"
                        : "bg-gray-300 text-gray-700 hover:bg-brand-lightgreen hover:text-white"
                    }`}
                  >
                    {page}
                  </Link>
                )
              )}

              {/* Flèche droite */}
              {currentPage < totalPages && (
                <Link href={`/catalogue?page=${currentPage + 1}`}>
                  <MdNavigateNext className="w-10 h-10 text-brand-lightgreen custom-btn-hover" />
                </Link>
              )}
            </div>
          </section>{" "}
        </>
      )}
    </main>
  );
};

export default CataloguePage;
