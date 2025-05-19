import Grid from "@mui/material/Grid";
import type { SxProps, Theme } from "@mui/material/styles";

import { NoteInput } from "~/components/note-input";
import { NoteList } from "~/components/note-list";
import { TopicHeader } from "~/components/topic-header";
import type { Topic } from "~/database/local";
import { noteListMock } from "~/mocks/general";

export const containerStyle: SxProps<Theme> = {
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
};

export type NotesSectionProps = Readonly<{
  selectedTopic: Topic;
}>;

export const NotesSection = ({ selectedTopic }: NotesSectionProps) => (
  <Grid size="grow" sx={containerStyle}>
    <TopicHeader
      id={selectedTopic.id}
      title={selectedTopic.title}
      description={selectedTopic.description}
    />
    <NoteList notes={noteListMock} />
    <NoteInput onSubmit={() => console.log("Note saved!")} />
  </Grid>
);
