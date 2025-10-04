"use client";

import useAuthStore from "@/store/AuthStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUser } from "@/services/auth.api";
import { useState } from "react";
import {
  updateUserSchema,
  UpdateUserFormData,
} from "@/lib/validators/authSchema";

const EditPage = () => {
  const { user, setUser } = useAuthStore();
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: UpdateUserFormData) => {
    setLoading(true);
    setApiError(null);
    setSuccessMessage(null);

    try {
      const payload = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== "" && v !== undefined)
      );

      if (Object.keys(payload).length === 0) {
        setLoading(false);
        return;
      }

      const updated = await updateUser(payload);

      // mise à jour du store pour affichage conditionnel
      setUser({ ...user, ...updated });

      // reset du formulaire avec les nouvelles données
      reset({
        firstname: updated.firstname,
        lastname: updated.lastname,
      });

      setSuccessMessage("✅ Données mises à jour !");
    } catch (err: any) {
      setApiError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen mt-16 mb-16 px-4 py-6 md:py-8 ">
      <section className="max-w-2xl mx-auto bg-brand-white rounded-lg p-4 relative">
        {loading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-lg">
            <p className="text-lg font-semibold text-brand-darkgreen animate-pulse">
              🔄 Mise à jour en cours...
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email affiché mais verrouillé */}
          <div>
            <label>Email (non modifiable)</label>
            <input
              type="text"
              value={user?.email || ""}
              disabled
              autoComplete="username"
              className="bg-gray-100 w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>

          {/* Prénom */}
          <div>
            <label>Prénom</label>
            <input
              {...register("firstname")}
              placeholder={user?.firstname || "Votre prénom"}
              autoComplete="given-name"
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
            {errors.firstname && (
              <p className="text-red-500">{errors.firstname.message}</p>
            )}
          </div>

          {/* Nom */}
          <div>
            <label>Nom</label>
            <input
              {...register("lastname")}
              placeholder={user?.lastname || "Votre nom"}
              autoComplete="family-name"
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
            {errors.lastname && (
              <p className="text-red-500">{errors.lastname.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label>Nouveau mot de passe</label>
            <input
              type="password"
              autoComplete="new-password"
              {...register("password")}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label>Confirmer le mot de passe</label>
            <input
              type="password"
              autoComplete="new-password"
              {...register("confirmPassword")}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-brand-green text-white py-2 px-6 rounded-lg"
          >
            Enregistrer
          </button>

          {apiError && <p className="text-red-600">{apiError}</p>}
          {successMessage && (
            <p className="text-green-600 font-semibold">{successMessage}</p>
          )}
        </form>
      </section>
    </main>
  );
};

export default EditPage;
