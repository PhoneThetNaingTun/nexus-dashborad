import z from "zod";
export const brandSchema = z.object({
  name: z.string(),
});

export type BrandSchema = z.infer<typeof brandSchema>;
