import z from "zod";
export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
