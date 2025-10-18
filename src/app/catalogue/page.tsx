import CardItem from "@/components/Sections/CardItem";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { getProductsPagination } from "@/services/product.api";
import Link from "next/link";
import Search from "@/components/ui/search";

interface CataloguePageProps {
  searchParams: { page: string; search: string };
}

const CataloguePage = async ({ searchParams }: CataloguePageProps) => {
  const { page, search } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 8;

  const productsWithPagination = await getProductsPagination(
    limit,
    currentPage
  );
  const products = productsWithPagination.data;
  const { totalPages } = productsWithPagination.pagination_State;

  const filteredProducts = search
    ? products.filter((product) =>
        product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    : products;

  return (
    <main className="min-h-screen mt-16 px-4 custom-size-minmax">
      {/* section titre */}
      <section>
        <h1 className="text-xl md:text-2xl text-brand-darkgreen font-bold text-center">
          Les arbres soigneusement sélectionnés par GreenRoots
        </h1>
        <p className="mt-4 text-md md:text-xl text-brand-lightgreen font-bold text-center">
          Il y en a pour tous les goûts dans la nature
        </p>
      </section>

      {/* barre de recherche */}
      <Search placeholder="Rechercher un arbre..." />

      {filteredProducts.length === 0 ? (
        <p className="text-center mt-24 font-bold">
          Les produits ne sont pas disponibles pour le moment. Réesayez
          ultérieurement.
        </p>
      ) : (
        <>
          <section className="py-8">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 bg-white items-stretch">
              {filteredProducts.map((product) => (
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
