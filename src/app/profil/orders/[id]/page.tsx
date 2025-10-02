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
    <main className="min-h-screen mt-16 mb-16 px-4 py-6 md:py-8">
      <div className="max-w-2xl lg:max-w-4xl mx-auto">
        <Link
          href="/profil/orders"
          className="inline-flex items-center text-brand-lightgreen hover:text-brand-darkgreen mb-4 md:mb-6 text-sm md:text-base"
        >
          ← Mes commandes
        </Link>

        {!order ? (
          <p className="text-center text-brand-green py-8 md:py-12 text-base md:text-lg">
            Chargement de la commande...
          </p>
        ) : (
          <div className="space-y-6 md:space-y-8">
            {/* Header commande */}
            <div>
              <h1 className="text-xl md:text-3xl text-brand-darkgreen font-bold">
                Commande #{order.id}
              </h1>
              <p className="text-brand-green mt-1 md:mt-2 text-sm md:text-base">
                {order.date} •{" "}
                <span
                  className={
                    order.status === "Terminée"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }
                >
                  {order.status}
                </span>
              </p>
            </div>

            {/* Produits */}
            <section>
              <h2 className="text-lg md:text-xl text-brand-darkgreen font-semibold mb-3 md:mb-4">
                Articles commandés
              </h2>

              <div className="space-y-3 md:space-y-4">
                {order.items?.length ? (
                  order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-3 md:gap-4 p-3 md:p-4 border border-brand-lightgreen/20 rounded-lg md:rounded-xl"
                    >
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-lightgreen/10 rounded flex items-center justify-center flex-shrink-0">
                        {item.product?.image_urls?.[0] && (
                          <Image
                            src={`http://localhost:4000/uploads/arbres/${item.product.image_urls[0]}`}
                            alt={item.product?.name || "Produit"}
                            width={48}
                            height={48}
                            className="w-8 h-8 md:w-12 md:h-12 rounded"
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-brand-darkgreen font-semibold text-sm md:text-base truncate">
                          {item.product?.name}
                        </p>
                        <p className="text-brand-green text-xs md:text-sm">
                          Quantité : {item.quantity}
                        </p>
                      </div>

                      <p className="text-brand-darkgreen font-semibold text-sm md:text-base">
                        {item.unit_price} €
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-brand-green py-4 md:py-6 text-sm md:text-base">
                    Aucun produit trouvé
                  </p>
                )}
              </div>
            </section>

            {/* Total */}
            <div className="flex justify-between items-center p-4 md:p-6 border-t border-brand-lightgreen/20">
              <p className="text-brand-darkgreen font-bold text-lg md:text-xl">
                Total
              </p>
              <p className="text-brand-darkgreen font-bold text-xl md:text-2xl">
                {order.total} €
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default OneOrderPage;
