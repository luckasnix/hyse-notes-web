import Modal from "@mui/material/Modal";

import { NoteForm } from "#/components/note-form";
import { useUi } from "#/contexts/ui-context";
import type { NoteValues } from "#/schemas/notes";
import { updateNote } from "#/services/notes";
import type { Note } from "#/types/notes";

export type NoteUpdateModalProps = Readonly<{
  note: Note;
  open: boolean;
  onClose: () => void;
}>;

export const NoteUpdateModal = ({
  note,
  open,
  onClose,
}: NoteUpdateModalProps) => {
  const { showToast } = useUi();

  const handleSubmit = (values: NoteValues) => {
    const newNote: Note = {
      ...note,
      content: values.content,
    };
    updateNote(newNote, undefined, () => {
      showToast({
        severity: "error",
        message: "Failed to update note. Please try again.",
      });
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <NoteForm
        title="Update note"
        labels={{ submit: "Update", cancel: "Cancel" }}
        initialValues={{
          content: note.content,
        }}
        onCancel={onClose}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};
