"use client";
import Grid from "@mui/material/Grid";
import type { SxProps, Theme } from "@mui/material/styles";
import { useState } from "react";

import { NoteInput } from "~/components/note-input";
import { NoteList } from "~/components/note-list";
import { TopicHeader } from "~/components/topic-header";
import type { Topic } from "~/database/local";
import { TopicUpdateModal } from "~/modals/topic-update-modal";

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

  return (
    <Grid size="grow" sx={containerStyle}>
      <TopicHeader topic={selectedTopic} openModal={openModal} />
      <NoteList topic={selectedTopic} />
      <NoteInput topic={selectedTopic} />
      <TopicUpdateModal
        topic={selectedTopic}
        open={isModalOpen}
        onClose={closeModal}
      />
    </Grid>
  );
};
