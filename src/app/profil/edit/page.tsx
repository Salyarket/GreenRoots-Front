"use client";

import useAuthStore from "@/store/AuthStore";
import { useForm } from "react-hook-form";
import { updateUser } from "@/services/auth.api";
import Link from "next/link";
import { useState } from "react";

interface UpdateFormData {
  firstname?: string;
  lastname?: string;
  password?: string;
  confirmPassword?: string;
}

const EditPage = () => {
  const { user, setUser } = useAuthStore();
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  console.log("User from profil.page :", user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFormData>({
    defaultValues: {
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
    },
  });

  const onSubmit = async (data: UpdateFormData) => {
    setLoading(true);
    setApiError(null);

    try {
      const updated = await updateUser(data);

      // ✅ mettre à jour le store global
      setUser({ ...user, ...updated });

      console.log("✅ Profil mis à jour :", updated);
    } catch (err: any) {
      setApiError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

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
          Mettre à jour mon profil
        </h1>
        <p className="text-brand-green mt-1 md:mt-2 text-xs md:text-sm">
          Modifiez vos informations personnelles en toute sécurité
        </p>
      </div>

      <section className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Infos personnelles */}
          <div className="bg-brand-white rounded-xl p-6 border border-brand-lightgreen/20">
            <h2 className="text-lg font-semibold text-brand-darkgreen mb-4 pb-3 border-b border-brand-lightgreen/10">
              Informations personnelles
            </h2>

            {/* Email affiché mais verrouillé */}
            <div className="mb-3">
              <label className="block text-brand-darkgreen font-medium text-sm">
                Email (non modifiable)
              </label>
              <input
                type="text"
                value={user?.email || ""}
                disabled
                autoComplete="username"
                className="w-full px-3 py-2 border border-brand-lightgreen/20 rounded-lg bg-gray-100 text-sm select-none"
              />
            </div>

            <div className="mb-3">
              <label className="block text-brand-darkgreen font-medium text-sm">
                Prénom
              </label>
              <input
                {...register("firstname")}
                placeholder={user?.firstname}
                autoComplete="given-name"
                className="w-full px-3 py-2 border border-brand-lightgreen/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
              />
            </div>

            <div>
              <label className="block text-brand-darkgreen font-medium text-sm">
                Nom
              </label>
              <input
                {...register("lastname")}
                autoComplete="family-name"
                placeholder={user?.lastname}
                className="w-full px-3 py-2 border border-brand-lightgreen/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
              />
            </div>
          </div>

          {/* Sécurité */}
          <div className="bg-brand-white rounded-xl p-6 border border-brand-lightgreen/20">
            <h2 className="text-lg font-semibold text-brand-darkgreen mb-4 pb-3 border-b border-brand-lightgreen/10">
              Sécurité du compte
            </h2>

            <div className="mb-3">
              <label className="block text-brand-darkgreen font-medium text-sm">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                autoComplete="new-password"
                {...register("password")}
                placeholder="Laissez vide pour ne pas modifier"
                className="w-full px-3 py-2 border border-brand-lightgreen/20 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-brand-darkgreen font-medium text-sm">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                {...register("confirmPassword")}
                autoComplete="new-password"
                placeholder="Confirmez le mot de passe"
                className="w-full px-3 py-2 border border-brand-lightgreen/20 rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/profil"
              className="order-2 sm:order-1 text-center border border-brand-lightgreen/30 text-brand-darkgreen hover:bg-brand-lightgreen/5 font-semibold py-2 px-6 rounded-lg text-sm"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="order-1 sm:order-2 bg-brand-green hover:bg-brand-darkgreen text-white font-semibold py-2 px-6 rounded-lg text-sm"
            >
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>

          {apiError && <p className="text-red-600">{apiError}</p>}
        </form>
      </section>
    </main>
  );
};

export default EditPage;
