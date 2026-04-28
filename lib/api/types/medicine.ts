import { Brand } from "./brand";
import { Category } from "./category";

export const MEDICINE_FORM = [
  "TABLET",
  "CAPSULE",
  "SYRUP",
  "INJECTION",
  "CREAM",
  "DROPS",
  "INHALER",
] as const;

export type MedicineForm = (typeof MEDICINE_FORM)[number];

export interface Medicine {
  id: string;
  name: string;
  strength: string;
  form: MedicineForm;
  categoryId: string;
  category: Category;
  brandId: string;
  brand: Brand;
  requiresPrescription?: boolean;
  sideEffects?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
