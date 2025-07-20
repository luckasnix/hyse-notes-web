"use client";
import Grid from "@mui/material/Grid";
import { useLiveQuery } from "dexie-react-hooks";
import { useQueryState } from "nuqs";
import { useState } from "react";

import { localDb } from "~/database/local";
import { TopicAdditionModal } from "~/modals/topic-addition-modal";
import { MainSection } from "~/sections/main-section";
import { NotesSection } from "~/sections/notes-section";
import { TopicsSection } from "~/sections/topics-section";

const HomePage = () => {
  const [topicId, setTopicId] = useQueryState("topicId");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const selectedTopic = useLiveQuery(() => {
    if (!topicId) {
      return undefined;
    }
    return localDb.topics.get(topicId);
  }, [topicId]);

  const selectTopic = (id: string) => {
    setTopicId(id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Grid container>
      <TopicsSection
        selectedTopicId={topicId}
        selectTopic={selectTopic}
        onAddTopicButtonClick={openModal}
      />
      <TopicAdditionModal open={isModalOpen} onClose={closeModal} />
      {!selectedTopic ? (
        <MainSection />
      ) : (
        <NotesSection selectedTopic={selectedTopic} />
      )}
    </Grid>
  );
};

export default HomePage;
