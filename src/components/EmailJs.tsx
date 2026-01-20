"use client";

import emailjs from "@emailjs/browser";
import Image from "next/image";
import { useRef, useState } from "react";

function useEmailJs() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // formulaire de contact
  const contact = async () => {
    if (!formRef.current) return;

    setIsLoading(true);
    setStatus("Envoi en cours...");

    try {
      const target = formRef.current;

      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT_ID!,
        target!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("Message envoyé avec succès");

      // réinitialiser le form après envoi
      target.reset();
    } catch (error) {
      setStatus("Erreur lors de l'envoi du message");
    }
    setIsLoading(false);
  };

  return { isLoading, status, contact, formRef };
}

export const ContactForm = () => {
  const { isLoading, status, contact, formRef } = useEmailJs();




  return (
    <section className="mt-12 max-w-2xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-brand-darkgreen mb-2 text-center">
        Ou envoyez-nous un message
      </h2>
      <p className="text-brand-green text-center mb-6 md:mb-8 text-sm md:text-base">
        Remplissez le formulaire ci-dessous
      </p>

      <form
        className="space-y-4"
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          contact();
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex-1">
            <label
              htmlFor="lastname"
              className="block text-brand-darkgreen font-medium mb-1 text-sm"
            >
              Nom
            </label>
            <input
              id="lastname"
              type="text"
              placeholder="Votre nom"
              name="lastname"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-brand-green"
              required
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="firstname"
              className="block text-brand-darkgreen font-medium mb-1 text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
            >
              Prénom
            </label>
            <input
              id="firstname"
              type="text"
              placeholder="Votre prénom"
              name="firstname"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-brand-green"
              required
            />
          </div>
        </div>

        <div className="flex-1">
          <label
            htmlFor="email"
            className="block text-brand-darkgreen font-medium mb-1 text-sm"
          >
            Adresse e-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Votre adresse email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-brand-green"
            required
          />
        </div>

        <div className="flex-1">
          <label
            htmlFor="message"
            className="block text-brand-darkgreen font-medium mb-1 text-sm"
          >
            Message
          </label>
          <textarea
            id="message"
            placeholder="Votre message..."
            name="message"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none resize-vertical focus:outline-none focus:ring-1 focus:ring-brand-green"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-brand-green text-white px-6 py-3 rounded-lg font-semibold transition-colors relative ${
            isLoading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-brand-darkgreen cursor-pointer"
          }`}
        >
          {isLoading && (
            <div className="absolute flex items-center justify-center top-0 left-0 h-full w-full  text-xl font-bold text-white">
              <Image
                width={80}
                height={80}
                src="/loader-clair.svg"
                alt="Loader GreenRoots"
                className="w-40 animate-spin"
              />
            </div>
          )}
          <span className={isLoading ? "invisible" : "visible"}>
            {isLoading ? "Envoi en cours..." : "Envoyer mon message"}
          </span>
        </button>

        {/* Confirmation d'envoi */}
        {status && (
          <div
            className={`text-center p-3 rounded-lg ${
              status.includes("succès") || status.includes("envoyé")
                ? "bg-green-100 text-brand-darkgreen"
                : "bg-red-100 text-brand-warning"
            }`}
          >
            {status}
          </div>
        )}
      </form>
    </section>
  );
};
