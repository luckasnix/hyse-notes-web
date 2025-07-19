import { z } from "zod";

export const noteSchema = z.object({
	content: z.string({
		required_error: "Content cannot be empty",
	}),
});

export type NoteValues = z.infer<typeof noteSchema>;
