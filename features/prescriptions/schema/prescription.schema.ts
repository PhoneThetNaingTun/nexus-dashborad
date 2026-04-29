import z from "zod";

export const prescriptionSchema = z.object({
  medicalRecordId: z.string().optional(),
  medicineId: z.string(),
  dosage: z.string(),
  frequency: z.string(),
  duration: z.string(),
  totalQuantity: z.number(),
  instructions: z.string().optional(),
});

export type PrescriptionSchema = z.infer<typeof prescriptionSchema>;
