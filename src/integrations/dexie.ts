import Dexie, { type EntityTable } from "dexie";

import type { Note } from "#/types/notes";
import type { Topic } from "#/types/topics";

export const db = new Dexie("HyseNotes") as Dexie & {
  topics: EntityTable<Topic, "id">;
  notes: EntityTable<Note, "id">;
};

db.version(1).stores({
  topics: "id, createdAt, updatedAt, title, description",
  notes: "id, createdAt, updatedAt, topicId, content, *reactions",
});
