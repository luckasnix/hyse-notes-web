import { z } from "zod";

export const topicSchema = z.object({
  title: z.string().min(2, "Title must contain at least 2 characters"),
  description: z
    .string()
    .min(2, "Description must contain at least 2 characters"),
});

export type TopicValues = z.infer<typeof topicSchema>;
