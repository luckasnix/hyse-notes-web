import { nanoid } from "nanoid";

import { localDb, type Note } from "~/database/local";
import { getTimestampInSeconds } from "~/utils/general";

export const addNote = async (
  topicId: string,
  noteContent: string,
  onSuccess?: () => void,
  onError?: () => void
): Promise<void> => {
  try {
    const noteId = nanoid(6);
    const timestampInSeconds = getTimestampInSeconds();
    const noteToAdd: Note = {
      id: noteId,
      createdAt: timestampInSeconds,
      updatedAt: timestampInSeconds,
      topicId: topicId,
      content: noteContent,
      reactions: [],
    };
    await localDb.notes.add(noteToAdd);
    onSuccess?.();
  } catch {
    onError?.();
  }
};

export const updateNote = async (
  newNote: Note,
  onSuccess?: () => void,
  onError?: () => void
): Promise<void> => {
  try {
    const timestampInSeconds = getTimestampInSeconds();
    const noteToUpdate: Note = {
      ...newNote,
      updatedAt: timestampInSeconds,
    };
    await localDb.notes.update(newNote.id, noteToUpdate);
    onSuccess?.();
  } catch {
    onError?.();
  }
};

export const deleteNote = async (
  currentNoteId: string | null,
  onSuccess?: () => void,
  onError?: () => void
): Promise<void> => {
  if (currentNoteId) {
    try {
      await localDb.notes.delete(currentNoteId);
      onSuccess?.();
    } catch {
      onError?.();
    }
  }
};
