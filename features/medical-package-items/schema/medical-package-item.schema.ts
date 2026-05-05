import z from "zod";

export const medicalPackageItemSchema = z.object({
  name: z.string(),
});

export type MedicalPackageItemSchema = z.infer<typeof medicalPackageItemSchema>;
