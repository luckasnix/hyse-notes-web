import Grid from "@mui/material/Grid";
import type { SxProps, Theme } from "@mui/material/styles";
import { useState } from "react";

import { NoteInput } from "~/components/note-input";
import { NoteList } from "~/components/note-list";
import { TopicHeader } from "~/components/topic-header";
import { TopicUpdateModal } from "~/modals/topic-update-modal";
import type { Topic } from "~/types/topics";

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
    <Grid component="section" size="grow" sx={containerStyle}>
      <TopicHeader topic={selectedTopic} openModal={openModal} />
      <NoteList topic={selectedTopic} />
      {/* TODO: Make React distinguish note inputs from different topics (perhaps using the "key" prop) */}
      <NoteInput topic={selectedTopic} />
      <TopicUpdateModal
        topic={selectedTopic}
        open={isModalOpen}
        onClose={closeModal}
      />
    </Grid>
  );
};
