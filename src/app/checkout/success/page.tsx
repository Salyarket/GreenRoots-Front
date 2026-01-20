"use client";

import useCartStore from "@/store/CartStore";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import emailjs from "@emailjs/browser";

type PendingOrderEmail = {
  orderId: number;
  email: string;
  user_firstname: string;
  user_lastname: string;
  total: number;
  orders: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
};

export default function CheckoutSuccessPage() {
    const clearCart = useCartStore((state) => state.clearCart);
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    
    const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    useEffect(() => {
        clearCart(); // vide le panier
    }, [clearCart]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (!sessionId) return;

        const raw = sessionStorage.getItem("pendingOrderEmail");
        if (!raw) return;

        let payload: PendingOrderEmail | null = null;
        try {
            payload = JSON.parse(raw) as PendingOrderEmail;
        } catch (error) {
            console.error("Invalid pending email payload", error);
        }

        if (!payload) return;

        const sendEmail = async () => {
            setEmailStatus("sending");
            try {
                const tvaRate = 0.2;
                const tva = +(payload.total * tvaRate / (1 + tvaRate)).toFixed(2);

                await emailjs.send(
                    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ORDER_CONFIRM_ID!,
                    {
                        email: payload.email,
                        user_firstname: payload.user_firstname,
                        user_lastname: payload.user_lastname,
                        order_id: String(payload.orderId),
                        orders: payload.orders,
                        tva,
                        total: +payload.total.toFixed(2),
                    },
                    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
                );
                setEmailStatus("sent");
            } catch (error) {
                console.error("Email confirmation error", error);
                setEmailStatus("error");
            } finally {
                sessionStorage.removeItem("pendingOrderEmail");
            }
        };

        void sendEmail();
    }, [sessionId]);

    return (
        <main className="min-h-screen px-4 py-10 bg-green-50">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6 text-center mt-44">
        <h1 className="text-2xl font-bold text-brand-lightgreen">
          Merci pour votre commande !
        </h1>
        <p className="mt-3 text-gray-600">
          Votre paiement a été effectué avec succès.
        </p>
        {emailStatus === "sending" && (
          <p className="mt-3 text-sm text-gray-500">Envoi de l'email de confirmation...</p>
        )}
        {emailStatus === "sent" && (
          <p className="mt-3 text-sm text-green-700">Email de confirmation envoyé.</p>
        )}
        {emailStatus === "error" && (
          <p className="mt-3 text-sm text-red-600">
            Erreur lors de l'envoi de l'email de confirmation.
          </p>
        )}
      </div>
    </main>
    );
}
