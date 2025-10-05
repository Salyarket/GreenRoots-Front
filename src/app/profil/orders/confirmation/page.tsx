"use client";

import { getOneOrder, getOrderItems } from "@/services/order.api";
import useAuthStore, { Item, Order } from "@/store/AuthStore";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ConfirmationOrderPage = () => {
  const { user } = useAuthStore();
  const searchId = useSearchParams();
  const orderId = searchId.get("id");

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (user && orderId) {
        // récupérer la commande
        const order = await getOneOrder(user.token, Number(orderId));

        // récuperer le contenu de la commande
        const orderItems = await getOrderItems(user.token, Number(orderId));

        setOrder({ ...order, items: orderItems.data });
      }
    };
    fetchOrder();
  }, [user, orderId]);

  if (!order)
    return (
      <p className="text-center text-brand-green py-8">
        Chargement de votre commande...
      </p>
    );

  return (
    <main className="min-h-screen mt-16 px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/profil/orders"
          className="inline-flex items-center text-brand-lightgreen hover:text-brand-darkgreen mb-6 text-sm"
        >
          ← Mes commandes
        </Link>

        {/* Confirmation */}
        <div className="text-center mb-8">
          <h1 className="text-2xl text-brand-darkgreen font-bold mb-2">
            Commande confirmée !
          </h1>
          <p className="text-brand-green">
            Votre commande #{orderId} a bien été enregistrée
          </p>
        </div>

        {/* Infos commande */}
        <div className="bg-brand-white p-4 border border-brand-lightgreen/20 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-brand-darkgreen font-semibold">Statut</span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {order.status}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-brand-darkgreen font-semibold">Date</span>
            <span className="text-brand-green">{order.date}</span>
          </div>
        </div>

        {/* Articles */}
        <div className="mb-6">
          <h3 className="text-lg text-brand-darkgreen font-semibold mb-3">
            Votre commande
          </h3>

          <div className="space-y-2">
            {order.items.map((item: Item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-3 bg-brand-lightgreen/5 rounded"
              >
                <span className="text-brand-darkgreen font-medium text-sm">
                  {item.product?.name}
                </span>
                <span className="text-brand-green text-sm">
                  {item.quantity} × {item.unit_price}€
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center p-4 border-t border-brand-lightgreen/20">
          <p className="text-brand-darkgreen font-bold text-lg">Total</p>
          <p className="text-brand-darkgreen font-bold text-xl">
            {order.total} €
          </p>
        </div>
      </div>
    </main>
  );
};

export default ConfirmationOrderPage;
