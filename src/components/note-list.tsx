import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";

import type { Note } from "~/database/local";

export const containerStyle: SxProps<Theme> = {
  paddingX: 6,
  paddingY: 2,
  overflowY: "scroll",
  flex: 1,
};

export const textBoxStyle: SxProps<Theme> = {
  padding: 2,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 2,
};

export type NoteListProps = Readonly<{
  notes: Note[];
}>;

export const NoteList = ({ notes }: NoteListProps) => (
  <Stack direction="column-reverse" spacing={2} sx={containerStyle}>
    {notes.map(({ id, content }) => (
      <Box key={id} sx={textBoxStyle}>
        <Typography variant="body1" whiteSpace="pre-wrap">
          {content}
        </Typography>
      </Box>
    ))}
  </Stack>
);
