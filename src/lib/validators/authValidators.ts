import { IFormData } from "@/types/auth";

type FieldName = keyof IFormData;
type ValidatorFn = (value: string, formData: IFormData) => string;

export const validators: Partial<Record<FieldName, ValidatorFn>> = {
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
    value === formData.password ? "" : "Les mots de passe ne correspondent pas",
};
