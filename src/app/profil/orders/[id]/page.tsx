"use client";

import { getOneOrder } from "@/services/api";
import useAuthStore, { Order } from "@/store/AuthStore";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const OneOrderPage = () => {
  const { user } = useAuthStore();
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!user) {
      console.log("⚠️ Pas d'user → pas de fetch");
      return;
    }
    if (!id) {
      console.log("⚠️ Pas d'id → pas de fetch");
      return;
    }

    const fetchOrder = async () => {
      try {
        const data = await getOneOrder(user.token, Number(id));
        console.log("✅ Réponse brute API getOneOrder:", data);
        setOrder(data);
      } catch (e) {
        console.error("❌ Erreur API getOneOrder:", e);
        setOrder(null);
      }
    };

    fetchOrder();
  }, [user, id]);

  console.log("📦 State order:", order);

  return (
    <main className="min-h-screen mt-16 mb-16 px-16 custom-size-minmax py-8 md:py-8">
      <Link
        href="/profil/orders"
        className="inline-flex items-center text-brand-lightgreen hover:text-brand-darkgreen mb-6 text-sm"
      >
        ← Mes commandes
      </Link>

      {!order ? (
        <p className="text-center text-brand-green">
          Chargement de la commande...
        </p>
      ) : (
        <>
          <h1 className="text-xl md:text-2xl text-brand-darkgreen font-bold mb-2">
            Commande #{order.id}
          </h1>
          <p className="text-brand-green mb-6 md:mb-8 text-sm">
            {order.date} •{" "}
            <span
              className={`${
                order.status === "Terminée"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {order.status}
            </span>
          </p>

          {/* Produits */}
          <section className="mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl text-brand-darkgreen font-semibold mb-4">
              Articles achetés
            </h2>

            <div className="space-y-4">
              {order.items?.length ? (
                order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-start p-4 border border-brand-lightgreen/20 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-brand-lightgreen/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.product?.image_urls?.[0] && (
                        <Image
                          src={`http://localhost:4000/uploads/arbres/${item.product.image_urls[0]}`}
                          alt={item.product?.name || "Produit"}
                          width={60}
                          height={60}
                          className="w-15 h-15 rounded-lg"
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-brand-darkgreen font-semibold text-sm md:text-base truncate">
                        {item.product?.name}
                      </p>
                      <p className="text-brand-green text-sm">
                        Quantité : {item.quantity}
                      </p>
                    </div>

                    <p className="text-brand-darkgreen font-semibold text-base flex-shrink-0">
                      {item.unit_price} €
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-brand-green">
                  Aucun produit trouvé dans cette commande.
                </p>
              )}
            </div>
          </section>

          {/* Total */}
          <div className="flex justify-between items-center p-4 border-t border-brand-lightgreen/20">
            <p className="text-brand-darkgreen font-bold text-lg">Total</p>
            <p className="text-brand-darkgreen font-bold text-xl">
              {order.total} €
            </p>
          </div>
        </>
      )}
    </main>
  );
};

export default OneOrderPage;
