// gestion du bouton de validation de la commande
// au click :
//  1. vérifier les stock
//     -> dispo on passe au 2 / pas dispo msg "stock insuffisant"
//  2. paiement
//     -> affichage d'une modal avec bouton "Confirmer le paiement"
//     -> ok on passe au 3 / pas ok msg "échec du paiement"
//  3. créer la commande
//     -> ok on passe au 4 / pas ok msg "impossible de créer la commande"
//  4. msg confirmation commande
//     -> renvoie sur page confirmation de commande + résumé de la commande

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
    const data = {
      status: "paid",
      userId: user?.id,
      total: getTotal(),
    };
    console.log("data : ", data);

    if (!user) {
      console.log("⚠️ Pas d'user → pas de fetch");
      return;
    }
    const orderRes = await createNewOrder(user.token, data);
    console.log("orderRes", orderRes);
    try {
      const orderRes = await createNewOrder(user.token, data);
      console.log("Commande validée ✅", orderRes);

      setMessage("Commande validée ✅");

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
