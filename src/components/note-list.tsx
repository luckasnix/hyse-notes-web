"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { useLiveQuery } from "dexie-react-hooks";
import { useMemo, useState, type MouseEvent } from "react";

import { ActionMenu } from "~/components/action-menu";
import { useUi } from "~/contexts/ui-context";
import { localDb, type Topic } from "~/database/local";
import { NoteUpdateModal } from "~/modals/note-update-modal";
import { deleteNote } from "~/services/notes";
import { convertTimestampToDate } from "~/utils/general";

const containerStyle: SxProps<Theme> = {
  paddingX: 6,
  paddingY: 2,
  overflowY: "scroll",
  flex: 1,
};

const noteContainerStyle: SxProps<Theme> = {
  padding: 2,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 2,
};

export type NoteListProps = Readonly<{
  topic: Topic;
}>;

export const NoteList = ({ topic }: NoteListProps) => {
  const { showToast } = useUi();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);
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
    []
  );

  const currentNote = useMemo(() => {
    return notes.find(({ id }) => id === currentNoteId);
  }, [notes, currentNoteId]);

  const openMenu = (event: MouseEvent<HTMLButtonElement>, noteId: string) => {
    setAnchorEl(event.currentTarget);
    setCurrentNoteId(noteId);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateNoteOptionClick = () => {
    openModal();
    closeMenu();
  };

  const handleDeleteNoteOptionClick = () => {
    if (currentNoteId) {
      deleteNote(currentNoteId, closeMenu, () => {
        showToast({
          severity: "error",
          message: "Failed to delete note. Please try again.",
        });
      });
    }
  };

  return (
    <Stack direction="column-reverse" spacing={2} sx={containerStyle}>
      {notes.map(({ id, content, createdAt }) => (
        <Stack key={id} spacing={1} sx={noteContainerStyle}>
          <Stack direction="row" spacing={1}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" whiteSpace="pre-wrap">
                {content}
              </Typography>
            </Box>
            <Box>
              <IconButton
                size="small"
                onClick={(event) => {
                  openMenu(event, id);
                }}
              >
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {convertTimestampToDate(createdAt)}
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
      {currentNote && (
        <NoteUpdateModal
          note={currentNote}
          open={isModalOpen}
          onClose={closeModal}
        />
      )}
    </Stack>
  );
};
