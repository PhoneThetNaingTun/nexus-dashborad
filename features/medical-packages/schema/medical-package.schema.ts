import z from "zod";
export const medicalPackageSchema = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.number(),
  isActive: z.boolean().default(false).optional(),
  medicalPackageItemIds: z.array(z.string()),
});

export type MedicalPackageSchema = z.infer<typeof medicalPackageSchema>;
