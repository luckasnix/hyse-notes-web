import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";

import type { Note } from "~/database/local";
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

export const NoteList = ({ notes }: NoteListProps) => (
  <Stack direction="column-reverse" spacing={2} sx={containerStyle}>
    {notes.map(({ id, content, createdAt }) => (
      <Stack key={id} sx={noteContainerStyle}>
        <Stack direction="row">
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" whiteSpace="pre-wrap">
              {content}
            </Typography>
          </Box>
          <Box>
            {/* TODO: Add ActionMenu */}
            <IconButton size="small" onClick={() => console.log(`Note ${id}`)}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Stack>
        <Stack direction="row">
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {convertTimestampToDate(createdAt)}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    ))}
  </Stack>
);
