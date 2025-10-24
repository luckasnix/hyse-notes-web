import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useLiveQuery } from "dexie-react-hooks";
import { type MouseEvent, useMemo, useState } from "react";

import { ActionMenu } from "~/components/action-menu";
import { useUi } from "~/contexts/ui-context";
import { localDb } from "~/database/local";
import { ConfirmationModal } from "~/modals/confirmation-modal";
import { NoteUpdateModal } from "~/modals/note-update-modal";
import { deleteNote } from "~/services/notes";
import type { Topic } from "~/types/topics";
import { convertTimestampToDate } from "~/utils/general";

const containerStyle: SxProps<Theme> = {
  paddingX: 6,
  paddingY: 2,
  overflowY: "scroll",
  flex: 1,
};

const noteContainerStyle: SxProps<Theme> = {
  padding: 2,
  backgroundColor: "background.paper",
  borderRadius: 1,
  boxShadow: 2,
};

const textContainerStyle: SxProps<Theme> = {
  flex: 1,
};

export type NoteListProps = Readonly<{
  topic: Topic;
}>;

export const NoteList = ({ topic }: NoteListProps) => {
  const { showToast } = useUi();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const [isNoteUpdateModalOpen, setIsNoteUpdateModalOpen] =
    useState<boolean>(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const open = Boolean(anchorEl);

  const notes = useLiveQuery(
    () => {
      return localDb.notes
        .where("topicId")
        .equals(topic.id)
        .reverse()
        .sortBy("createdAt");
    },
    [topic.id],
    [],
  );

  const selectedNote = useMemo(() => {
    return notes.find((currentNote) => currentNote.id === selectedNoteId);
  }, [notes, selectedNoteId]);

  const openMenu = (event: MouseEvent<HTMLButtonElement>, noteId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedNoteId(noteId);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const openNoteUpdateModal = () => {
    setIsNoteUpdateModalOpen(true);
  };

  const closeNoteUpdateModal = () => {
    setIsNoteUpdateModalOpen(false);
  };

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleUpdateNoteOptionClick = () => {
    openNoteUpdateModal();
    closeMenu();
  };

  const handleDeleteNoteOptionClick = () => {
    closeMenu();
    openConfirmationModal();
  };

  const handleNoteDeletionConfirmation = () => {
    if (selectedNoteId) {
      deleteNote(selectedNoteId, closeConfirmationModal, () => {
        showToast({
          severity: "error",
          message: "Failed to delete note. Please try again.",
        });
      });
    }
  };

  return (
    <Stack direction="column-reverse" spacing={2} sx={containerStyle}>
      {notes.map((note) => (
        // TODO: Enable user reactions
        <Stack key={note.id} spacing={1} sx={noteContainerStyle}>
          <Stack direction="row" spacing={1}>
            <Box sx={textContainerStyle}>
              <Typography variant="body1" whiteSpace="pre-wrap">
                {note.content}
              </Typography>
            </Box>
            <Box>
              <IconButton
                size="small"
                onClick={(event) => {
                  openMenu(event, note.id);
                }}
              >
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Box sx={textContainerStyle}>
              <Typography variant="caption" color="text.secondary">
                {convertTimestampToDate(note.createdAt)}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      ))}
      <ActionMenu
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        items={[
          {
            type: "neutral",
            label: "Update note",
            icon: <ModeEditIcon />,
            onClick: handleUpdateNoteOptionClick,
          },
          {
            type: "error",
            label: "Delete note",
            icon: <DeleteIcon />,
            onClick: handleDeleteNoteOptionClick,
          },
        ]}
      />
      <ConfirmationModal
        open={isConfirmationModalOpen}
        content="Are you sure you want to delete this note?"
        labels={{
          cancel: "Cancel",
          confirm: "Delete",
        }}
        onCancel={closeConfirmationModal}
        onConfirm={handleNoteDeletionConfirmation}
      />
      {selectedNote && (
        <NoteUpdateModal
          note={selectedNote}
          open={isNoteUpdateModalOpen}
          onClose={closeNoteUpdateModal}
        />
      )}
    </Stack>
  );
};
