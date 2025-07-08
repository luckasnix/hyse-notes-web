"use client";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import type { SxProps, Theme } from "@mui/material/styles";
import { useState, type ChangeEvent } from "react";

import { useUi } from "~/contexts/ui-context";
import { addNote } from "~/services/notes";
import type { Topic } from "~/types/topics";

const containerStyle: SxProps<Theme> = {
  paddingX: 3,
  paddingY: 2,
  borderTopWidth: 1,
  borderTopStyle: "solid",
  borderTopColor: "divider",
};

export type NoteInputProps = Readonly<{
  topic: Topic;
}>;

export const NoteInput = ({ topic }: NoteInputProps) => {
  const { showToast } = useUi();
  const [content, setContent] = useState("");

  const trimmedContent = content.trim();

  const handleSubmitButtonClick = () => {
    if (trimmedContent) {
      addNote(topic.id, trimmedContent, undefined, () => {
        showToast({
          severity: "error",
          message: "Failed to add note. Please try again.",
        });
      });
      setContent("");
    }
  };

  const handleNoteContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setContent(value);
  };

  return (
    <Stack direction="row" spacing={2} sx={containerStyle}>
      <TextField
        variant="outlined"
        fullWidth
        multiline
        minRows={2}
        maxRows={6}
        placeholder="Write a note"
        value={content}
        onChange={handleNoteContentChange}
      />
      <Box>
        <IconButton
          color="primary"
          disabled={!trimmedContent.length}
          onClick={handleSubmitButtonClick}
        >
          <ArrowUpwardIcon />
        </IconButton>
      </Box>
    </Stack>
  );
};
