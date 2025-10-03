import { getProductsPagination } from "@/services/product.api";
import { TableHeadCell } from "@/components/admin/TableHeadCell";
import TableWrapper from "@/components/admin/TableWrapper";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

interface CataloguePageProps {
  searchParams: { page: string };
}

const Page = async ({ searchParams }: CataloguePageProps) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 8;

  const productsResponse = await getProductsPagination(limit, currentPage);
  const products = productsResponse.data;
  const pagination = productsResponse.pagination_State;

  console.log(products[0]);

  return (
    <main className="min-h-screen mt-16 px-4 custom-size-minmax">
      <h1 className="font-extrabold text-brand-green text-4xl text-center mb-6">
        Vue d&apos;ensemble des produits
      </h1>

      <section className="pb-10">
        <TableWrapper>
          {/* partie supérieur du tableau avec nom des tables */}
          <thead>
            <tr className="h-14">
              <TableHeadCell label="Id" />
              <TableHeadCell label="Nom" withFilter />
              <TableHeadCell label="Prix" withFilter />
              <TableHeadCell label="Stock" withFilter />
              <TableHeadCell label="Action" />
            </tr>
          </thead>

          {/* partie liste des datas */}
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="h-14">
                  <td className="border border-brand-darkgreen text-center">
                    {product.id}
                  </td>
                  <td className="border border-brand-darkgreen pl-4">
                    {product.name}
                  </td>
                  <td className="border border-brand-darkgreen text-center">
                    {product.price} €
                  </td>
                  <td className="border border-brand-darkgreen text-center">
                    {product.stock}
                  </td>
                  <td className="border border-brand-darkgreen">
                    <div className="flex justify-center items-center gap-4">
                      <Link
                        href={`/catalogue/${product.id}`}
                        className="border border-brand-darkgreen shadow-lg p-2 rounded-lg text-brand-darkgreen hover:bg-brand-lightgreen hover:border-brand-white hover:text-brand-white"
                      >
                        <FaRegEye />
                      </Link>
                      <Link
                        href={`/admin/produits/edition/${product.id}`}
                        className="border border-brand-darkgreen shadow-lg p-2 rounded-lg text-brand-darkgreen hover:bg-brand-lightgreen hover:border-brand-white hover:text-brand-white"
                      >
                        <FiEdit3 />
                      </Link>
                      <Link
                        href={`/admin/produits/suppression/${product.id}`}
                        className="border border-red-800 shadow-lg p-2 rounded-lg text-red-800 hover:bg-red-800 hover:border-brand-white hover:text-brand-white"
                      >
                        <MdDeleteOutline />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-6 text-gray-500 italic"
                >
                  Aucun produit trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </TableWrapper>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-6">
          {pagination.page > 1 && (
            <Link
              href={`/admin/produits?page=${pagination.page - 1}`}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              ← Précédent
            </Link>
          )}
          {pagination.page < pagination.totalPages && (
            <Link
              href={`/admin/produits?page=${pagination.page + 1}`}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Suivant →
            </Link>
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;
