import z from "zod";
export const medicalRecordSchema = z.object({
  appointmentId: z.string().optional(),
  patientId: z.string().optional(),
  doctorId: z.string().optional(),
  diagnosis: z.string(),
  symptoms: z.string(),
  weight: z.number().optional(),
  bloodPressure: z.string().optional(),
  followUpDate: z.string().optional(),
  advice: z.string().optional(),
});

export type MedicalRecordSchema = z.infer<typeof medicalRecordSchema>;
