import Link from "next/link";
import Image from "next/image";
import { FaInfoCircle, FaChevronLeft } from "react-icons/fa";
import ProductGallery from "@/components/Sections/ProductGallery";
import { getOneProductWithLocation } from "@/services/product.api";
import { IProduct } from "@/types/index.types";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const product: IProduct = await getOneProductWithLocation(Number(id));
  console.log(product);

  return (
    <main className="container mx-auto py-8 px-4 bg-amber-200 custom-size-minmax">
      {/* Fil d’ariane */}
      <nav
        aria-label="breadcrumb"
        className="mb-6 flex items-center text-sm text-gray-600"
      >
        <Link href="/" className="flex items-center gap-1 hover:underline">
          <FaChevronLeft /> Accueil
        </Link>
        <span className="mx-2">/</span>
        <Link href="/catalogue" className="hover:underline">
          Nos arbres
        </Link>
        <span className="mx-2">/</span>
        <span aria-current="page" className="font-medium text-green-700">
          {product.name}
        </span>
      </nav>

      <section className="flex flex-col md:flex-row gap-8">
        {/* Image produit */}
        <article className="rounded-xl shadow  md:w-1/2">
          <div className="relative w-full h-[500px]">
            <ProductGallery product={product} />
          </div>
        </article>

        {/* Infos produit */}
        <aside className="flex flex-col justify-between md:w-1/2 bg-amber-400 grow">
          <header>
            <h1 className="text-3xl font-bold text-green-700">
              {product.name}
            </h1>
            <p className="text-xl font-semibold mt-2">
              {product.price} € / unité
            </p>
            <p className="mt-4 text-gray-700">{product.description}</p>
          </header>

          <section className="mt-6">
            <h2 className="flex items-center gap-2 font-semibold text-gray-800">
              <FaInfoCircle /> Détails du produit
            </h2>
            <ul className="mt-2 space-y-1 text-gray-700">
              <li>
                Stock disponible :{" "}
                <span className="font-semibold text-green-600">
                  {product.stock} unités
                </span>
              </li>
              <li>Référence : {product.reference}</li>
            </ul>
          </section>

          {/* Commander */}
          <form className="mt-6">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantité
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min={1}
              max={product.stock}
              defaultValue={1}
              className="mt-2 w-20 border rounded px-2 py-1"
            />
            <button
              type="submit"
              className="mt-4 w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
            >
              Ajouter au panier
            </button>
          </form>
        </aside>
      </section>
    </main>
  );
};

export default Page;
