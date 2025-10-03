import z from "zod";

// type ZOD pour création produit (admin)
const toNumberWith2Decimals = (val: unknown) =>
  val !== null && val !== undefined && val !== ""
    ? parseFloat(Number(val).toFixed(2))
    : 0.0;

// regex
const onlyLetters = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/;
const onlyNumbersWithDecimal = /^[0-9]+(\.[0-9]{1,2})?$/;

export const productSchemaForCreate = z.object({
  name: z.string().min(1, "Nom obligatoire").max(255).regex(onlyLetters),
  price: z
    .string()
    .min(1, "Prix obligatoire")
    .regex(onlyNumbersWithDecimal, "Format invalide (ex: 12.34)"),
  description: z.string().min(1, "Description obligatoire").max(2500),
  stock: z.string().regex(/^\d+$/, "Stock doit être un nombre entier"),
  scientific_name: z.string().max(255).optional(),
  carbon: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Carbone doit être un nombre")
    .optional()
    .nullable(),
  available: z.boolean().default(true),
});

export type ProductFormData = z.infer<typeof productSchemaForCreate>;
