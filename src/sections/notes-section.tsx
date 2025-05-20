import { useLiveQuery } from "dexie-react-hooks";
import { nanoid } from "nanoid";
import Grid from "@mui/material/Grid";
import type { SxProps, Theme } from "@mui/material/styles";

import { NoteInput } from "~/components/note-input";
import { NoteList } from "~/components/note-list";
import { TopicHeader } from "~/components/topic-header";
import { localDb, type Note, type Topic } from "~/database/local";
import { getTimestampInSeconds } from "~/utils/general";

export const containerStyle: SxProps<Theme> = {
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
};

export type NotesSectionProps = Readonly<{
  selectedTopic: Topic;
}>;

export const NotesSection = ({ selectedTopic }: NotesSectionProps) => {
  const notes = useLiveQuery(
    () => {
      return localDb.notes
        .where("topicId")
        .equals(selectedTopic.id)
        .reverse()
        .sortBy("createdAt");
    },
    [selectedTopic.id],
    []
  );

  const addNote = async (noteContent: string) => {
    const noteId = nanoid(6);
    const timestampInSeconds = getTimestampInSeconds();
    const noteToAdd: Note = {
      id: noteId,
      createdAt: timestampInSeconds,
      updatedAt: timestampInSeconds,
      topicId: selectedTopic.id,
      content: noteContent,
      reactions: [],
    };
    await localDb.notes.add(noteToAdd);
  };

  return (
    <Grid size="grow" sx={containerStyle}>
      <TopicHeader
        id={selectedTopic.id}
        title={selectedTopic.title}
        description={selectedTopic.description}
      />
      <NoteList notes={notes} />
      <NoteInput onSubmit={addNote} />
    </Grid>
  );
};
