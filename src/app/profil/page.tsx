"use client";

import useAuthStore from "@/store/AuthStore";
import Link from "next/link";
import { BsCart } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { TbMessage } from "react-icons/tb";

const ProfilPage = () => {
  const { user } = useAuthStore();
  console.log("LOG DE PROFIL",user);

  return (
    <main className="min-h-screen mt-16 px-4 custom-size-minmax py-8">
      <h1 className="text-xl md:text-2xl text-brand-darkgreen font-bold text-center mb-6 md:mb-8 capitalize">
        Bonjour {user?.firstname},
      </h1>

      <section className="flex flex-col gap-4 md:flex-row md:gap-6 justify-center max-w-4xl mx-auto">
        {/* Carte Profil */}
        <div className="flex-1 bg-brand-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-brand-lightgreen/30 shadow-sm custom-card-hover text-center">
          <div className="bg-brand-lightgreen/10 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
            <CgProfile className="text-xl md:text-2xl" />
          </div>
          <h2 className="text-base md:text-lg font-semibold text-brand-darkgreen mb-2">
            Mon profil
          </h2>
          <p className="text-brand-green text-xs md:text-sm mb-3 md:mb-4">
            Gérez vos informations personnelles
          </p>
          <Link
            href={"/profil/edit"}
            className="text-brand-lightgreen text-xs md:text-sm font-medium hover:text-brand-darkgreen transition-colors"
          >
            Modifier le profil ›
          </Link>
        </div>

        {/* Carte Commandes */}
        <div className="flex-1 bg-brand-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-brand-lightgreen/30 shadow-sm custom-card-hover text-center">
          <div className="bg-brand-lightgreen/10 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
            <BsCart className="text-xl md:text-2xl" />
          </div>
          <h2 className="text-base md:text-lg font-semibold text-brand-darkgreen mb-2">
            Mes commandes
          </h2>
          <p className="text-brand-green text-xs md:text-sm mb-3 md:mb-4">
            Suivez votre historique d&apos;achat
          </p>
          <Link
            href={"/profil/orders"}
            className="text-brand-lightgreen text-xs md:text-sm font-medium hover:text-brand-darkgreen transition-colors"
          >
            Voir mes commandes ›
          </Link>
        </div>

        {/* Carte Messages */}
        <div className="flex-1 bg-brand-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-brand-lightgreen/30 shadow-sm custom-card-hover text-center">
          <div className="bg-brand-lightgreen/10 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
            <TbMessage className="text-xl md:text-2xl" />
          </div>
          <h2 className="text-base md:text-lg font-semibold text-brand-darkgreen mb-2">
            Messages
          </h2>
          <p className="text-brand-green text-xs md:text-sm mb-3 md:mb-4">
            Échangez avec notre service client
          </p>
          <Link
            href={"/contact"}
            className="text-brand-lightgreen text-xs md:text-sm font-medium hover:text-brand-darkgreen transition-colors"
          >
            Contacter le support ›
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ProfilPage;
