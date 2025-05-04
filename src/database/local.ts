import Dexie, { type EntityTable } from "dexie";

export type Topic = {
  id: string;
  createdAt: number;
  updatedAt: number;
  title: string;
  description: string;
};

export type Note = {
  id: string;
  createdAt: number;
  updatedAt: number;
  topicId: string;
  content: string;
  reactions: Array<string>;
};

export const localDb = new Dexie("HyseNotes") as Dexie & {
  topics: EntityTable<Topic, "id">;
  notes: EntityTable<Note, "id">;
};

localDb.version(1).stores({
  topics: "id, createdAt, updatedAt, title, description",
  notes: "id, createdAt, updatedAt, topicId, content, reactions",
});
