"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { useState, type MouseEvent } from "react";

import { ActionMenu } from "~/components/action-menu";
import { useUi } from "~/contexts/ui-context";
import { localDb, type Note } from "~/database/local";
import { convertTimestampToDate } from "~/utils/general";

export const containerStyle: SxProps<Theme> = {
  paddingX: 6,
  paddingY: 2,
  overflowY: "scroll",
  flex: 1,
};

export const noteContainerStyle: SxProps<Theme> = {
  padding: 2,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 2,
};

export type NoteListProps = Readonly<{
  notes: Note[];
}>;

export const NoteList = ({ notes }: NoteListProps) => {
  const { showToast } = useUi();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);
  const open = Boolean(anchorEl);

  const openMenu = (event: MouseEvent<HTMLButtonElement>, noteId: string) => {
    setAnchorEl(event.currentTarget);
    setCurrentNoteId(noteId);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const deleteNote = async () => {
    if (currentNoteId) {
      try {
        await localDb.notes.delete(currentNoteId);
        closeMenu();
      } catch {
        showToast({
          severity: "error",
          message: "Failed to delete note. Please try again.",
        });
      }
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
            label: "Edit note",
            icon: <ModeEditIcon />,
            onClick: () => {}, // TODO: Add note editing
            disabled: true,
          },
          {
            type: "error",
            label: "Delete note",
            icon: <DeleteIcon />,
            onClick: deleteNote,
          },
        ]}
      />
    </Stack>
  );
};
