import { MEDICINE_FORM } from "@/lib/api/types/medicine";
import z from "zod";
export const medicineSchema = z.object({
  name: z.string(),
  strength: z.string(),
  form: z.enum(MEDICINE_FORM),
  categoryId: z.string(),
  brandId: z.string(),
  sideEffects: z.string().optional(),
  requiresPrescription: z.boolean().default(true).optional(),
});

export type MedicineSchema = z.infer<typeof medicineSchema>;
