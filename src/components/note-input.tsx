"use client";
import { useState, type ChangeEvent } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import type { SxProps, Theme } from "@mui/material/styles";

export const containerStyle: SxProps<Theme> = {
  paddingX: 3,
  paddingY: 2,
  borderTopWidth: 1,
  borderTopStyle: "solid",
  borderTopColor: "divider",
};

export type NoteInputProps = Readonly<{
  onSubmit: (content: string) => void;
}>;

export const NoteInput = ({ onSubmit }: NoteInputProps) => {
  const [content, setContent] = useState("");

  const saveNote = () => {
    const trimmedContent = content.trim();
    if (trimmedContent) {
      onSubmit(trimmedContent);
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
          disabled={!content.trim()}
          onClick={saveNote}
        >
          <ArrowUpwardIcon />
        </IconButton>
      </Box>
    </Stack>
  );
};
