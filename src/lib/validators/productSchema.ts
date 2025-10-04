import z from "zod";

// regex
const onlyLetters = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/;
const onlyNumbersWithDecimal = /^\d{1,10}(\.\d{1,2})?$/;

export const productSchemaForCreate = z.object({
  name: z.string().min(1, "Nom obligatoire").max(255).regex(onlyLetters),
  price: z
    .string()
    .min(1, "Prix obligatoire, seulement des chiffres")
    .max(8)
    .regex(onlyNumbersWithDecimal, "Format invalide)"),
  description: z.string().min(1, "Description obligatoire").max(2500),
  stock: z
    .string()
    .min(1)
    .max(8)
    .regex(/^\d+$/, "Stock doit être un nombre entier")
    .optional()
    .or(z.literal("")),
  scientific_name: z
    .string()
    .min(1)
    .max(255)
    .regex(onlyLetters, "Seulement des lettres")
    .optional()
    .or(z.literal("")),
  carbon: z
    .string()
    .min(1, "Prix obligatoire, seulement des chiffres")
    .max(8, "8 chiffres maximum")
    .regex(onlyNumbersWithDecimal, "Format invalide")
    .optional()
    .or(z.literal("")),
  available: z.boolean().default(true),
});

export type ProductFormData = z.infer<typeof productSchemaForCreate>;
