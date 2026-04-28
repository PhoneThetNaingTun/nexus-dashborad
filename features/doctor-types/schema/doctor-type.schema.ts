import z from "zod";
export const doctorTypeSchema = z.object({
  name: z.string(),
});

export type DoctorTypeSchema = z.infer<typeof doctorTypeSchema>;
