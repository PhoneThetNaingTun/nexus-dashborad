import z from "zod";

export const doctorSchema = (showPassword: boolean) =>
  z.object({
    name: z.string(),
    type_id: z.string(),
    email: z.string(),
    password: showPassword
      ? z
          .string()
          .min(8, "Password must be at least 8 characters")
          .max(32, "Password must be at most 32 characters")
      : z.string().optional(),
    bio: z.string().optional(),
    fee: z.number().min(0),
  });

export type DoctorSchema = z.infer<ReturnType<typeof doctorSchema>>;
