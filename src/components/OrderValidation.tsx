"use client";

import { createNewOrder } from "@/services/order.api";
import { getStockForProduct } from "@/services/product.api";
import useAuthStore from "@/store/AuthStore";
import useCartStore from "@/store/CartStore";
import { useState } from "react";
import Link from "next/link";

export default function OrderValidation() {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { items, getTotal } = useCartStore();
  const { user } = useAuthStore();
  const loginPrompt =
    "Veuillez créer un compte ou vous connecter pour valider votre panier.";

  // 1- au clic "Passer la commande" : on vérifie stock puis on ouvre la modale
  const handleValidation = async () => {
    try {
      setMessage("");
      if (!user) return;

      // vérifier les stocks
      for (const item of items) {
        const stockResponse = await getStockForProduct(item.id);
        if (stockResponse.stock <= 0) {
          setMessage(`Le produit ${item.name} est en rupture de stock`);
          return;
        }
      }

      setShowModal(true);
    } catch (error) {
      console.error(error);
      setMessage("Une erreur est survenue lors de la validation du panier.");
    }
  };

  // 2- au clic "payer" dans la modale : on crée la commande Pending et on redirige vers Stripe
  const handlePay = async () => {
    if (loading) return; // évite les doubles clics
    setLoading(true); // désactive le bouton pendant le traitement
    try {
      setMessage("");
      if (!user) return;

    const data = {
      status: "pending",
      userId: user.id,
      total: getTotal(),
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: Number(item.price),
      })),
    };
    const orderRes = await createNewOrder(user.token, data);

    const pendingEmail = {
      orderId: orderRes.id,
      email: user.email,
      user_firstname: user.firstname?.trim() || "Client",
      user_lastname: user.lastname?.trim() || "",
      total: getTotal(),
      orders: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: Number(item.price),
      })),
    };

    if (typeof window !== "undefined") {
      sessionStorage.setItem("pendingOrderEmail", JSON.stringify(pendingEmail));
    }

    // appeler Stripe
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4001";

    const stripeRes = await fetch(`${API_URL}/payments/checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      credentials: "include",
      body: JSON.stringify({
        orderId: orderRes.id,
      }),
    });

    if (!stripeRes.ok) {
      const errText = await stripeRes.text();
      console.error(errText);
      setMessage("Une erreur est survenue lors de la création de la session de paiement.");
      return;
    }

    const { url } = await stripeRes.json();
      // redirige vers Stripe
      window.location.href = url;
    } catch (error) {
      console.error("Erreur de paiement :", error);
      setMessage("Une erreur est survenue lors de la validation de la commande.");
    }
    finally {
      setLoading(false); // réactive le bouton
    }
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

      {!user && (
        <p className="text-sm text-brand-darkgreen mt-2 text-center">
          {loginPrompt}{" "}
          <Link href="/connexion" className="underline">
            Se connecter
          </Link>
        </p>
      )}

      {message && (
        <p className="text-red-500 text-sm mt-2 text-center">{message}</p>
      )}

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
                onClick={handlePay}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-brand-green text-white hover:bg-brand-darkgreen disabled:opacity-50"
              >
                {loading ? "Redirection..." : "Payer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
