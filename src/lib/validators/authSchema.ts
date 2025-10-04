import { z } from "zod";

// regex pour prenom nom
const onlyLetters = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/;
// Schéma pour l'inscription
export const registerSchema = z
  .object({
    firstname: z
      .string()
      .min(2, "Minimum 2 charactères, pas de charactères spéciaux ou nombre")
      .max(255, "Maximum 255 charactères")
      .regex(onlyLetters),
    lastname: z
      .string()
      .min(2, "Minimum 2 charactères, pas de charactères spéciaux ou nombre")
      .max(255, "Maximum 255 charactères")
      .regex(onlyLetters),
    email: z.email("Adresse e-mail invalide"),
    password: z
      .string()
      .min(8, "Mot de passe trop court (8 caractères min.)")
      .max(255, {
        message: "Le mot de passe ne peut pas dépasser 255 caractères",
      }),
    confirmPassword: z.string(),
    user_type_id: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => [1, 2, 3].includes(val), {
        message: "Veuillez choisir un type de compte",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas",
  });

// Schéma pour la connexion
export const loginSchema = z.object({
  email: z.email("Adresse e-mail invalide"),
  password: z.string().min(8, "Mot de passe trop court (8 caractères min.)"),
});

// update user /profil
export const updateUserSchema = z
  .object({
    firstname: z
      .string()
      .min(2, "Minimum 2 caractères")
      .max(255, "Maximum 255 caractères")
      .regex(onlyLetters, "Seulement des lettres")
      .optional()
      .or(z.literal("")), // autorise vide (pas de modif)
    lastname: z
      .string()
      .min(2, "Minimum 2 caractères")
      .max(255, "Maximum 255 caractères")
      .regex(onlyLetters, "Seulement des lettres")
      .optional()
      .or(z.literal("")),
    password: z
      .string()
      .min(8, "8 caractères minimum")
      .max(255, "Maximum 255 caractères")
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine((data) => !data.password || data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas",
  });

// Types TS générés automatiquement par Zod qu'on peut réutiliser
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
