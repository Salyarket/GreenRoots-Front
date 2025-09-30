"use client";

import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaTrash } from "react-icons/fa";

export default function PanierPage() {
  // à remplacer plus tard par un vrai state global comme Zustand ?
  const cartItems = [
    {
      id: "1",
      name: "Chêne Vert",
      price: 25,
      quantity: 2,
      image: "/testcard1.webp",
    },
    {
      id: "2",
      name: "Érable Rouge",
      price: 30,
      quantity: 1,
      image: "/testcard2.webp",
    },
  ];

  // avec reduce, on parcourt les produits et on additionne price * quantity pour chacun
  // cartItems est fixe, total ne change jamais quand on clique sur +/- utiliser useState et useEffect plus tard
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0 // le 0 à la fin est la valeur initiale de l'accumulateur (acc)
  );

  return (
    <main className="min-h-screen mt-16 px-4 custom-size-minmax">
      {/* Lien retour */}
      <Link
        href="/catalogue"
        className="flex items-center mb-10 text-brand-lightgreen"
      >
        <FaChevronLeft className="mr-4" />
        Retour
      </Link>

      <h1 className="text-2xl font-extrabold text-brand-darkgreen uppercase mb-8">
        Mon Panier
      </h1>

      {/* si panier vide avec un spread operator */}
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide.</p>
      ) : (
        <section className="grid md:grid-cols-3 gap-8">

          {/* liste des articles */}
          <div className="md:col-span-2">
            {cartItems.map((item) => ( // un map pour afficher chaque item du panier
              <div
                key={item.id} // clé unique pour chaque élément de la liste
                className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4"
              >
                <div className="flex items-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-brand-darkgreen">
                      {item.name}
                    </h2>
                    <p className="text-gray-500">{item.price} €</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <button className="px-2 py-1 bg-brand-green text-white rounded-full hover:bg-brand-lightgreen">
                    -
                  </button>
                  <span className="mx-3 font-bold text-lg">{item.quantity}</span>
                  <button className="px-2 py-1 bg-brand-green text-white rounded-full hover:bg-brand-lightgreen">
                    +
                  </button>
                  <button className="ml-5 text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* résumé du panier */}
          <aside className="bg-brand-white shadow-md rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-brand-darkgreen uppercase mb-4">
                Résumé
              </h3>
              <div className="flex justify-between mb-2">
                <span>Sous-total</span>
                <span>{total} €</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total TTC</span>
                <span>{total} €</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-brand-green text-white py-2 rounded-lg font-bold hover:bg-brand-darkgreen">
              Passer la commande
            </button>
          </aside>
        </section>
      )}
    </main>
  );
}
