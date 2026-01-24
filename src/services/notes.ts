import { db } from "#/integrations/dexie";
import type { Note } from "#/types/notes";
import { generateBase62Id, getTimestampInSeconds } from "#/utils/general";

export const addNote = async (
  topicId: string,
  noteContent: string,
  onSuccess?: () => void,
  onError?: () => void,
): Promise<void> => {
  try {
    const noteId = generateBase62Id(6);
    const timestampInSeconds = getTimestampInSeconds();
    const noteToAdd: Note = {
      id: noteId,
      createdAt: timestampInSeconds,
      updatedAt: timestampInSeconds,
      topicId: topicId,
      content: noteContent,
      reactions: [],
    };
    await db.notes.add(noteToAdd);
    onSuccess?.();
  } catch {
    onError?.();
  }
};

export const updateNote = async (
  newNote: Note,
  onSuccess?: () => void,
  onError?: () => void,
): Promise<void> => {
  try {
    const timestampInSeconds = getTimestampInSeconds();
    const noteToUpdate: Note = {
      ...newNote,
      updatedAt: timestampInSeconds,
    };
    await db.notes.update(newNote.id, noteToUpdate);
    onSuccess?.();
  } catch {
    onError?.();
  }
};

export const deleteNote = async (
  currentNoteId: string | null,
  onSuccess?: () => void,
  onError?: () => void,
): Promise<void> => {
  if (currentNoteId) {
    try {
      await db.notes.delete(currentNoteId);
      onSuccess?.();
    } catch {
      onError?.();
    }
  }
};
