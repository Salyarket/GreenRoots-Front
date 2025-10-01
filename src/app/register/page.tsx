"use client";

import AuthForm from "@/components/AuthForm";

import useAuthStore from "@/store/AuthStore";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

const InscriptionPage = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/profil"); // ⬅️ redirect si déjà connecté
    }
  }, [user, router]);

  return (
    <main className="min-h-screen mt-12 px-4 custom-size-minmax py-12 mb-16">
      <section className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-xl md:text-2xl text-brand-darkgreen font-bold mb-4">
            Inscription
          </h1>
          <p className="text-brand-green">
            Rejoignez la communauté GreenRoots et participez à la reforestation
            !
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-brand-lightgreen/30 shadow-2xl">
          <AuthForm alreadyRegistered={false} />
        </div>

        <div className="text-center mt-6">
          <p className="text-brand-green">
            Déjà un compte ?{" "}
            <a href="/connexion" className="text-brand-darkgreen font-semibold">
              Se connecter
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default InscriptionPage;
