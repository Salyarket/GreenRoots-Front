"use client";

import Link from "next/link";
import Image from "next/image";
import { FaInfoCircle, FaChevronLeft } from "react-icons/fa";
import ProductGallery from "@/components/Sections/ProductGallery";
import useCartStore from "@/store/CartStore";
import { useState } from "react";
import { Product } from "@/types/index.types";
import { redirect } from "next/navigation";

const PageClient = ({ product }: { product: Product | null }) => {
  if (!product) return <p>Produit indispo</p>;
  const add = useCartStore((state) => state.add);
  const [quantity, setQuantity] = useState(1);

  return (
    <main className="min-h-screen mt-16 px-4 custom-size-minmax">
      <Link
        href={"/catalogue"}
        className="flex items-center mb-10 text-brand-lightgreen"
      >
        <FaChevronLeft className="mr-4" />
        Retour au catalogue
      </Link>

      <section className="grid md:grid-cols-3 gap-8 w-full mb-20">
        <ProductGallery product={product} />

        <article className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h1 className="text-lg font-extrabold text-brand-darkgreen uppercase">
              {product.name}
            </h1>
            <p className="text-gray-400 italic mb-6">
              Nom scientifique : {product.scientific_name}
            </p>
            <div className="flex flex-row justify-between w-full mb-4">
              <div className="flex">
                <p className="text-brand-green font-semibold">
                  CO2 : -{product.carbon}g
                </p>
                <FaInfoCircle className="text-brand-green ml-2" />
              </div>
              <p
                className={`font-semibold ${
                  product.stock === 0
                    ? "text-red-500"
                    : product.stock <= 80
                    ? "text-orange-500"
                    : "text-brand-green"
                }`}
              >
                Stock : {product.stock}
              </p>
            </div>
            <h2 className="text-lg font-extrabold text-center uppercase mb-2 md:text-start">
              De quel type d’arbre s’agit-il ?
            </h2>
            <p className="mb-8">{product.description}</p>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <p className="text-center font-extrabold mb-6 md:mb-0 md:text-start text-2xl md:text-3xl">
                {product.price} €
              </p>
              <div className="flex items-center justify-center mb-6 md:mb-0">
                <button
                  onClick={() => setQuantity(Math.max(0, quantity - 1))}
                  className="text-white bg-brand-green px-4 py-2 font-bold rounded-full cursor-pointer hover:bg-brand-lightgreen"
                >
                  -
                </button>
                <p className="text-brand-green font-bold text-3xl mx-5">
                  {quantity}
                </p>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-white bg-brand-green px-4 py-2 font-bold rounded-full cursor-pointer hover:bg-brand-lightgreen"
                >
                  +
                </button>
              </div>
              <button
                onClick={() =>
                  add({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity,
                    image_urls: product.image_urls,
                  })
                }
                className="flex items-center justify-center text-white bg-brand-green px-6 py-2 font-bold rounded-lg cursor-pointer hover:bg-brand-lightgreen"
              >
                Ajouter
                <Image
                  src="/icon_cart.svg"
                  alt="GreenRoots"
                  width={20}
                  height={20}
                  className="custom-btn-hover ml-5"
                />
              </button>
            </div>
            <button
              onClick={() => {
                add({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: quantity,
                  image_urls: product.image_urls,
                }),
                  redirect("/panier");
              }}
              className="text-center text-white bg-brand-green w-full py-2 font-bold rounded-lg cursor-pointer hover:bg-brand-lightgreen mt-10"
            >
              Achat Direct
            </button>
          </div>
        </article>
      </section>

      <section className="flex flex-col md:flex-row md:justify-between">
        <div className="mr-0 md:mr-20 mb-15 md:mb:0">
          <Image
            src="/baby_tree_small.webp"
            alt="map"
            width={1000}
            height={1000}
          />
        </div>
        <div className="flex flex-col items-center justify-center md:items-start md:min-w-1/3">
          <h3 className="text-lg font-extrabold text-brand-darkgreen uppercase">
            Zone de plantation
          </h3>
          <ul>
            {product.productLocations?.map((pl: any) => (
              <li key={pl.location.id} className="text-center md:text-start">
                {pl.location.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex flex-col md:flex-row my-20 text-center">
        <article className="flex flex-col justify-center bg-brand-white shadow-md p-5 rounded-md py-10 mb-5 md:mb-0 md:mr-8">
          <div className="flex mb-4">
            <FaInfoCircle className="text-brand-green mr-2" />
            <p>
              <b>CO₂</b> absorbé : en plantant un {product.name}, vous
              absorberez <b>{product.carbon} KG de CO₂</b>
            </p>
          </div>
          <p className="mb-4">
            Période d'absorption du CO₂ : 0 ans / 10 ans* <br />
            Absorption annuelle moyenne : <b>-{product.carbon / 10} Kg</b>
          </p>
          <p className="text-xs italic">
            * L'arbre continuera à absorber du CO₂ même après la dixième année.
            Il s'agit donc d'une estimation prudente.
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
            quelques semaines et plusieurs mois avant qu'il soit prêt à être
            planté.
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

export default PageClient;
