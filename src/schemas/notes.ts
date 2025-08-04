import { z } from "zod";

export const noteSchema = z.object({
  content: z.string().min(1, "Note must contain at least 1 character"),
});

export type NoteValues = z.infer<typeof noteSchema>;
