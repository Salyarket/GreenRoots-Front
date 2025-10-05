"use client";

import { createNewOrder } from "@/services/order.api";
import { getStockForProduct } from "@/services/product.api";
import useAuthStore from "@/store/AuthStore";
import useCartStore from "@/store/CartStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OrderValidation() {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { items } = useCartStore();
  const { user } = useAuthStore();
  const { getTotal } = useCartStore();
  const router = useRouter();

  //  function faux paiement
  const processPayment = () => Promise.resolve({ ok: true });

  //  créer la commande
  const createOrder = async () => {
    if (!user) return;

    const data = {
      status: "paid",
      userId: user.id,
      total: getTotal(),
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: Number(item.price),
      })),
    };

    try {
      const orderRes = await createNewOrder(user.token, data);
      console.log("Commande validée ✅", orderRes);
      router.push(`/profil/orders/confirmation?id=${orderRes.id}`);
    } catch (error) {
      console.error("Commande non validée ❌", error);
      setMessage("Commande non validée ❌");
    }
  };

  // confirmation de paiement
  const handlePayConfirm = async () => {
    const payConfirmation = await processPayment();
    if (payConfirmation.ok) {
      await createOrder();
    } else {
      setMessage("Echec de paiement");
    }
  };

  const handleValidation = async () => {
    //  vérifier les stock
    for (const item of items) {
      const stockResponse = await getStockForProduct(item.id);
      if (stockResponse.stock <= 0) {
        setMessage(`Le produit ${item.name} est en rupture de stock`);
        return;
      }
    }
    setShowModal(true);
  };

  //  msg confirmation commande
  return (
    <div>
      <button
        onClick={handleValidation}
        className="w-full mt-6 bg-brand-green text-white py-2 rounded-lg font-bold hover:bg-brand-darkgreen"
      >
        Passer la commande
      </button>

      {/* Modal de paiement */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-lg font-bold text-brand-darkgreen mb-4">
              Veuillez confirmer votre paiement
            </h2>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Annuler
              </button>
              <button
                onClick={handlePayConfirm}
                className="px-4 py-2 rounded-lg bg-brand-green text-white hover:bg-brand-darkgreen disabled:opacity-50"
              >
                Payer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
