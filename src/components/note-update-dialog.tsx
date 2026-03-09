import Dialog from "@mui/material/Dialog";

import { NoteForm } from "#/components/note-form";
import { useUi } from "#/contexts/ui-context";
import type { NoteValues } from "#/schemas/notes";
import { updateNote } from "#/services/notes";
import type { Note } from "#/types/notes";

export type NoteUpdateDialogProps = Readonly<{
  note: Note;
  open: boolean;
  onClose: () => void;
}>;

export const NoteUpdateDialog = ({
  note,
  open,
  onClose,
}: NoteUpdateDialogProps) => {
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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <NoteForm
        title="Update note"
        labels={{ submit: "Update", cancel: "Cancel" }}
        initialValues={{
          content: note.content,
        }}
        onCancel={onClose}
        onSubmit={handleSubmit}
      />
    </Dialog>
  );
};
