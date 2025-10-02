"use client";

import useAuthStore from "@/store/AuthStore";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, registerUser } from "@/services/auth.api";
import {
  registerSchema,
  loginSchema,
  RegisterFormData,
  LoginFormData,
} from "@/lib/validators/authSchema";
import Image from "next/image";

interface AuthFormProps {
  alreadyRegistered: boolean;
}

interface AuthFormData {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  confirmPassword?: string;
  user_type_id?: number;
}

const AuthForm = ({ alreadyRegistered }: AuthFormProps) => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // pour la redirection apres connexion
  const router = useRouter();

  // Choix du schéma selon login ou register
  const schema = alreadyRegistered ? loginSchema : registerSchema;

  // useForm est le hook principal de react-hook-form (donne acces a register / handlesubmit / errors)
  // on crée le "form manager"
  const form = useForm<AuthFormData>({
    resolver: zodResolver(schema),
    mode: "onChange", // validation en direct
  });

  // maintenant on récupère juste ce qu’on veut
  const register = form.register;
  const handleSubmit = form.handleSubmit;
  const errors = form.formState.errors;

  const onSubmit = async (data: RegisterFormData | LoginFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      if (alreadyRegistered) {
        // SE CONNECTER
        const loggedUser = await login({
          email: data.email,
          password: data.password,
        });
        console.log("✅ Utilisateur connecté :", loggedUser);
        // on envoie au store zustand la res de la BDD avec l'USER
        useAuthStore.getState().setUser(loggedUser.user);
        router.push("/profil");
      } else {
        // S'ENREGISTRER
        const newUser = await registerUser({
          firstname: (data as RegisterFormData).firstname,
          lastname: (data as RegisterFormData).lastname,
          email: data.email,
          password: data.password,
          confirmPassword: (data as RegisterFormData).confirmPassword,
          user_type_id: (data as RegisterFormData).user_type_id,
        });
        console.log("✅ Utilisateur inscrit :", newUser);

        router.push("/login");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Une erreur est survenue";
      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Class CSS messages d'erreurs (rouge si erreur, vert si champ valide)
  const inputClass = (fieldName: keyof (RegisterFormData & LoginFormData)) =>
    `w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 
    ${
      (errors as any)[fieldName]
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-brand-green"
    }`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 relative"
    >
      {!alreadyRegistered && (
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Prénom */}
          <div className="flex-1">
            <label className="block text-sm font-medium">Prénom</label>
            <input
              {...register("firstname")}
              placeholder="Votre prénom"
              className={inputClass("firstname")}
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm">
                {errors.firstname.message as string}
              </p>
            )}
          </div>

          {/* Nom */}
          <div className="flex-1">
            <label className="block text-sm font-medium">Nom</label>
            <input
              {...register("lastname")}
              placeholder="Votre nom"
              className={inputClass("lastname")}
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm">
                {errors.lastname.message as string}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Email */}
      <div>
        <label className="block text-sm font-medium">Adresse e-mail</label>
        <input
          type="email"
          {...register("email")}
          placeholder="exemple@email.com"
          className={inputClass("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">
            {errors.email.message as string}
          </p>
        )}
      </div>

      {/* Mot de passe */}
      <div>
        <label className="block text-sm font-medium">Mot de passe</label>
        <input
          type="password"
          {...register("password")}
          placeholder="Votre mot de passe"
          className={inputClass("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">
            {errors.password.message as string}
          </p>
        )}
      </div>

      {!alreadyRegistered && (
        <>
          {/* Confirmation mot de passe */}
          <div>
            <label className="block text-sm font-medium">
              Confirmation du mot de passe
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirmez votre mot de passe"
              className={inputClass("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message as string}
              </p>
            )}
          </div>

          {/* Type de compte */}
          <div>
            <label className="block text-sm font-medium">Type de compte</label>
            <select
              {...register("user_type_id")}
              className={inputClass("user_type_id")}
            >
              <option value="">Sélectionnez votre profil</option>
              <option value={1}>Particulier</option>
              <option value={2}>Association</option>
              <option value={3}>Entreprise</option>
            </select>
            {errors.user_type_id && (
              <p className="text-red-500 text-sm">
                {errors.user_type_id.message as string}
              </p>
            )}
          </div>
        </>
      )}

      {/* Bouton */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-brand-green hover:bg-brand-darkgreen text-white font-semibold py-2 rounded"
      >
        {alreadyRegistered ? "Se connecter" : "Créer mon compte GreenRoots"}
      </button>

      {/* Erreur API */}
      {apiError && (
        <p className="text-red-600 text-xl text-center mt-2">{apiError}</p>
      )}

      {/* Loader */}
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
    </form>
  );
};

export default AuthForm;
