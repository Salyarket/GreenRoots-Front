"use client";

import { useState } from "react";

interface IFormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType: string;
}

interface AuthFormProps {
  alreadyRegistered: boolean;
}

type FieldName = keyof IFormData;
type ValidatorFn = (value: string, formData: IFormData) => string;

type Validators = Partial<Record<FieldName, ValidatorFn>>;

const AuthForm = ({ alreadyRegistered }: AuthFormProps) => {
  // loader pour l'attente de la réponse api
  const [isLoading, setIsLoading] = useState(false);
  // retour du message d'erreur de l'api si email pris etc
  const [apiError, setApiError] = useState<string | null>(null);

  // texte en dessous de chaque input avec message d'erreur ex si mdp trop court
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  // boite avec les données de l'user
  const [formData, setFormData] = useState<IFormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "",
  });

  // validation via regex des inputs
  const validators: Validators = {
    firstname: (value) =>
      /^[A-Za-zÀ-ÖØ-öø-ÿ\- ]+$/.test(value)
        ? ""
        : "Le prénom ne doit contenir que des lettres",
    lastname: (value) =>
      /^[A-Za-zÀ-ÖØ-öø-ÿ\- ]+$/.test(value)
        ? ""
        : "Le nom ne doit contenir que des lettres",
    email: (value) =>
      /^\S+@\S+\.\S+$/.test(value) ? "" : "Adresse e-mail invalide",
    password: (value) =>
      value.length >= 8 ? "" : "Mot de passe trop court (8 caractères min.)",
    confirmPassword: (value, formData) =>
      value === formData.password
        ? ""
        : "Les mots de passe ne correspondent pas",
  };

  // validation inputs via fonction validators
  const handleValidation = (id: FieldName, value: string) => {
    const validator = validators[id];
    if (validator) {
      const error = validator(value, formData);
      setErrors((prev) => ({ ...prev, [id]: error }));
    }
  };

  // event qui ajoute le text ecrit pas l'user dans formData
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    handleValidation(id as FieldName, value);
  };

  // gère la submit du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); //evite le rechargement de la page par défaut

    const newErrors: Partial<Record<FieldName, string>> = {};
    (Object.keys(formData) as FieldName[]).forEach((key) => {
      if (validators[key]) {
        const error = validators[key]!(formData[key], formData);
        if (error) newErrors[key] = error;
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);

      setTimeout(() => {
        console.log("✅ Formulaire valide:", formData);
        setIsLoading(false);
        setApiError("Error de l'api, email déjà utilisé");
      }, 4000);
    } else {
      console.log("❌ Erreurs:", newErrors);
    }
  };

  // 🔹 Utilitaire CSS
  const inputClass = (field: FieldName) =>
    `w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 
    ${
      errors[field]
        ? "border-red-500 focus:ring-red-500"
        : formData[field]
        ? "border-green-500 focus:ring-green-500"
        : "border-gray-300 focus:ring-brand-green"
    }`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
      {!alreadyRegistered && (
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Prénom */}
          <div className="flex-1">
            <label htmlFor="firstname" className="block text-sm font-medium">
              Prénom
            </label>
            <input
              id="firstname"
              type="text"
              placeholder="Votre prénom"
              value={formData.firstname}
              onChange={handleChange}
              className={inputClass("firstname")}
              required
            />
            {errors.firstname ? (
              <p className="text-red-500 text-sm">{errors.firstname}</p>
            ) : formData.firstname ? (
              <p className="text-green-500 text-sm">Prénom valide</p>
            ) : null}
          </div>

          {/* Nom */}
          <div className="flex-1">
            <label htmlFor="lastname" className="block text-sm font-medium">
              Nom
            </label>
            <input
              id="lastname"
              type="text"
              placeholder="Votre nom"
              value={formData.lastname}
              onChange={handleChange}
              className={inputClass("lastname")}
              required
            />
            {errors.lastname ? (
              <p className="text-red-500 text-sm">{errors.lastname}</p>
            ) : formData.lastname ? (
              <p className="text-green-500 text-sm">Nom valide</p>
            ) : null}
          </div>
        </div>
      )}

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Adresse e-mail
        </label>
        <input
          id="email"
          type="email"
          placeholder="exemple@email.com"
          value={formData.email}
          onChange={handleChange}
          className={inputClass("email")}
          required
        />
        {errors.email ? (
          <p className="text-red-500 text-sm">{errors.email}</p>
        ) : formData.email ? (
          <p className="text-green-500 text-sm">Email valide</p>
        ) : null}
      </div>

      {/* Mot de passe */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          placeholder="Votre mot de passe"
          value={formData.password}
          onChange={handleChange}
          className={inputClass("password")}
          required
        />
        {errors.password ? (
          <p className="text-red-500 text-sm">{errors.password}</p>
        ) : formData.password ? (
          <p className="text-green-500 text-sm">Mot de passe valide</p>
        ) : null}
      </div>

      {!alreadyRegistered && (
        <>
          {/* Confirmation mot de passe */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              Confirmation du mot de passe
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirmez votre mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={inputClass("confirmPassword")}
              required
            />
            {errors.confirmPassword ? (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            ) : formData.confirmPassword ? (
              <p className="text-green-500 text-sm">Confirmation OK</p>
            ) : null}
          </div>

          {/* Type de compte */}
          <div>
            <label htmlFor="accountType" className="block text-sm font-medium">
              Type de compte
            </label>
            <select
              id="accountType"
              value={formData.accountType}
              onChange={handleChange}
              className={inputClass("accountType")}
            >
              <option value="">Sélectionnez votre profil</option>
              <option value="professional">Professionnel</option>
              <option value="individual">Particulier</option>
              <option value="association">Association</option>
              <option value="company">Entreprise</option>
              <option value="entrepreneur">Auto-entrepreneur</option>
            </select>
          </div>
        </>
      )}

      {/* Bouton */}
      <button
        type="submit"
        disabled={isLoading} //user ne peut recliquer si réponse envoyée
        className="w-full bg-brand-green hover:bg-brand-darkgreen text-white font-semibold py-2 rounded"
      >
        {alreadyRegistered ? "Se connecter" : "Créer mon compte GreenRoots"}
      </button>

      {/* Erreur API affichée en bas du formulaire */}
      {apiError && (
        <p className="text-red-600 text-xl text-center mt-2">{apiError}</p>
      )}

      {/* loader en attente réponse */}
      {isLoading && (
        <div className="absolute flex items-center justify-center top-0 left-0 h-full w-full bg-red-300 text-xl font-bold">
          LOADING
        </div>
      )}
    </form>
  );
};

export default AuthForm;
