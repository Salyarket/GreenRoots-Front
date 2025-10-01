"use client";

import { getMyOrders } from "@/services/api";
import useAuthStore, { Order } from "@/store/AuthStore";

import Link from "next/link";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const data = await getMyOrders(user.token);
        setOrders(Array.isArray(data) ? data : data.orders || []);
      } catch (e) {
        console.error(e);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <main className="min-h-screen mt-16 mb-16 px-4 custom-size-minmax py-6 md:py-8">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8">
        <Link
          href="/profil"
          className="inline-flex items-center text-brand-lightgreen hover:text-brand-darkgreen transition-colors mb-3 md:mb-4 text-xs md:text-sm font-medium"
        >
          ← Retour à mon compte
        </Link>
        <h1 className="text-lg md:text-2xl text-brand-darkgreen font-bold">
          Mes commandes
        </h1>
        <p className="text-brand-green mt-1 md:mt-2 text-xs md:text-sm">
          Consulter mon historique d'achat
        </p>
      </div>

      <section className="max-w-4xl mx-auto">
        {/* Compteur */}
        <div className="mb-4 md:mb-6">
          <p className="text-brand-darkgreen font-medium text-sm md:text-base">
            {orders.length} commande{orders.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Cartes des commandes */}
        <div className="space-y-4 md:space-y-6">
          {orders.length === 0 && (
            <p className="text-center text-brand-green">
              Aucune commande pour le moment.
            </p>
          )}
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-brand-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-brand-lightgreen/20"
            >
              <div className="flex justify-between items-start mb-3 md:mb-4">
                <div>
                  <p className="text-brand-darkgreen font-semibold text-sm md:text-base">
                    Commande #{order.id}
                  </p>
                  <p className="text-brand-green text-xs md:text-sm mt-1">
                    {order.date}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
                    order.status === "Terminée"
                      ? "bg-green-200 text-brand-green"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-brand-darkgreen font-medium text-sm md:text-base">
                  Total : {order.total} €
                </p>
                <Link
                  href={`/profil/orders/${order.id}`}
                  className="text-brand-lightgreen hover:text-brand-darkgreen font-medium text-sm md:text-base"
                >
                  Voir en détail ›
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 md:mt-8">
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-brand-lightgreen/30 rounded-lg text-brand-darkgreen text-sm">
              Précédent
            </button>
            <button className="px-3 py-1 bg-brand-green text-white rounded-lg text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-brand-lightgreen/30 rounded-lg text-brand-darkgreen text-sm">
              Suivant
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrdersPage;
