import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import { darken } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { IconChevronUp } from "@tabler/icons-react";
import { type ChangeEvent, useState } from "react";

import { useUi } from "#/contexts/ui-context";
import { addNote } from "#/services/notes";
import type { Topic } from "#/types/topics";

const containerStyle: SxProps<Theme> = {
  paddingX: 3,
  paddingY: 2,
  borderTopWidth: 1,
  borderTopStyle: "solid",
  borderTopColor: "divider",
};

const submitButtonStyle: SxProps<Theme> = {
  backgroundColor: "primary.main",
  color: "primary.contrastText",
  boxShadow: 2,
  "&:hover": {
    backgroundColor: (theme) => darken(theme.palette.primary.main, 0.05),
  },
};

export type NoteInputProps = Readonly<{
  topic: Topic;
}>;

// TODO: Enable Markdown notes
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
          sx={submitButtonStyle}
          disabled={!trimmedContent.length}
          onClick={handleSubmitButtonClick}
        >
          <IconChevronUp />
        </IconButton>
      </Box>
    </Stack>
  );
};
