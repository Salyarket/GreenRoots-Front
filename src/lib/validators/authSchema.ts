import { z } from "zod";

// Schéma pour l'inscription
export const registerSchema = z
  .object({
    firstname: z.string().min(2, "Le prénom doit faire au moins 2 caractères"),
    lastname: z.string().min(2, "Le nom doit faire au moins 2 caractères"),
    email: z.string().email("Adresse e-mail invalide"),
    password: z.string().min(8, "Mot de passe trop court (8 caractères min.)"),
    confirmPassword: z.string(),
    accountType: z.string().min(1, "Veuillez choisir un type de compte"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas",
  });

// Schéma pour la connexion
export const loginSchema = z.object({
  email: z.string().email("Adresse e-mail invalide"),
  password: z.string().min(8, "Mot de passe trop court (8 caractères min.)"),
});

// Types TS générés automatiquement par Zod qu'on peut réutiliser
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
