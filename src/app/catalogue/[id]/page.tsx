import Link from "next/link";
import { FaInfoCircle, FaChevronLeft } from "react-icons/fa";
import ProductGallery from "@/components/Sections/ProductGallery";
import { getOneProductWithLocation } from "@/services/product.api";
import { IProduct } from "@/types/index.types";
import CartForm from "@/components/CartForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const product: IProduct = await getOneProductWithLocation(Number(id));
  console.log(product);

  return (
    <main className="md:w-[90vw] 2xl:w-[60vw] mx-auto py-8 px-4 custom-size-minmax">
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

      <section className="flex flex-col md:flex-row gap-8 bg-brand-white rounded-md py-8 px-4">
        {/* Image produit */}
        <article className="rounded-xl shadow  md:w-1/2">
          <div className="relative w-full h-[500px] md:h-[700px]">
            <ProductGallery product={product} />
          </div>
        </article>

        {/* Infos produit */}
        <aside className="flex flex-col justify-between md:w-1/2 ">
          <header className="">
            <h1 className="text-3xl font-bold text-green-700">
              {product.name}
            </h1>
            <h3 className=" font-bold text-black mt-4">
              Nom scientifique : {product.scientific_name}
            </h3>
            <p className="text-xl font-semibold mt-2">
              {product.price} € / unité
            </p>
            <p className="mt-4 text-gray-700">{product.description}</p>
          </header>

          <section className="mt-6 ">
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
              <li>Carbone absorbé : {product.carbon} kg CO₂/an</li>
              <li>
                Localisation :{" "}
                {product.productLocations?.map((pl, i) => (
                  <span key={i} className="mr-2">
                    {pl.location?.name}
                  </span>
                ))}
              </li>
            </ul>
          </section>

          {/* Commander */}
          <CartForm price={product.price} stock={product.stock} />
        </aside>
      </section>

      {/* section texte explicatif */}
      <section className="flex flex-col md:flex-row my-8 ">
        <article className="flex flex-col justify-center bg-brand-white shadow-md p-5 rounded-md py-10 mb-5 md:mb-0 md:mr-8">
          <div className="flex mb-4">
            <FaInfoCircle className="text-brand-green mr-2" />
            <p>
              <b>CO₂</b> absorbé : en plantant un {product.name}, vous
              absorberez <b>{product.carbon} KG de CO₂</b>
            </p>
          </div>
          <p className="mb-4">
            Période d&apos;absorption du CO₂ : 0 ans / 10 ans* <br />
            Absorption annuelle moyenne :{" "}
            <b>{Number(product.carbon) / 10} Kg</b>
          </p>
          <p className="text-xs italic">
            * L&apos;arbre continuera à absorber du CO₂ même après la dixième
            année. Il s&apos;agit donc d&apos;une estimation prudente.
          </p>
        </article>
        <article className="flex flex-col justify-center bg-brand-white shadow-md p-5 rounded-md py-10">
          <h4 className="text-lg font-extrabold text-brand-darkgreen mb-4">
            Ce qui est inclus ?
          </h4>
          <p className="text-lg font-bold text-brand-lightgreen mb-4">
            Transparence et traçabilité
          </p>
          <p className="mb-6">
            Tous les arbres de GreenRoots sont géolocalisés et photographiés
            lors de leur plantation. Une fois acheté, il faut compter entre
            quelques semaines et plusieurs mois avant qu&apos;il soit prêt à
            être planté.
          </p>
          <p className="text-lg font-bold text-brand-lightgreen mb-4">
            Une histoire qui dure
          </p>
          <p>
            En plantant un arbre, vous aurez accès à notre plateforme numérique
            riche en contenus pour suivre l’évolution de vos arbres.
          </p>
        </article>
      </section>
    </main>
  );
};

export default Page;
