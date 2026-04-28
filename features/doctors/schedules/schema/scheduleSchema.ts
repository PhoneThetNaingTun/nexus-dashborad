import z from "zod";

export const scheduleSchema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string(),
  endTime: z.string(),
  isActive: z.boolean().default(true).optional(),
});

export type ScheduleSchema = z.infer<typeof scheduleSchema>;
