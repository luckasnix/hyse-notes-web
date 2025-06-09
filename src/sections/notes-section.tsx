"use client";
import Grid from "@mui/material/Grid";
import type { SxProps, Theme } from "@mui/material/styles";
import { useLiveQuery } from "dexie-react-hooks";
import { nanoid } from "nanoid";
import { useState } from "react";

import { NoteInput } from "~/components/note-input";
import { NoteList } from "~/components/note-list";
import { TopicHeader } from "~/components/topic-header";
import { localDb, type Note, type Topic } from "~/database/local";
import { TopicUpdateModal } from "~/modals/topic-update-modal";
import { getTimestampInSeconds } from "~/utils/general";

const containerStyle: SxProps<Theme> = {
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
};

export type NotesSectionProps = Readonly<{
  selectedTopic: Topic;
}>;

export const NotesSection = ({ selectedTopic }: NotesSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      <TopicHeader topic={selectedTopic} openModal={openModal} />
      <NoteList notes={notes} />
      <NoteInput onSubmit={addNote} />
      <TopicUpdateModal
        topic={selectedTopic}
        open={isModalOpen}
        onClose={closeModal}
      />
    </Grid>
  );
};
