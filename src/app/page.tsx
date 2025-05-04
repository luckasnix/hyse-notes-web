"use client";
import { useState } from "react";
import { useQueryState } from "nuqs";
import { useLiveQuery } from "dexie-react-hooks";
import Grid from "@mui/material/Grid";

import { MainSection } from "~/sections/main-section";
import { TopicsSection } from "~/sections/topics-section";
import { TopicAdditionModal } from "~/modals/topic-addition-modal";
import { localDb } from "~/database/local";

const Home = () => {
  const [topicId, setTopicId] = useQueryState("t");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const topicList = useLiveQuery(() => {
    return localDb.topics.orderBy("updatedAt").toArray();
  });

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
        topicList={topicList ?? []}
        selectedTopicId={topicId}
        selectTopic={selectTopic}
        onAddTopicButtonClick={openModal}
      />
      <TopicAdditionModal open={isModalOpen} onClose={closeModal} />
      {topicId === null ? (
        <MainSection />
      ) : (
        // TODO: Add a topic details component
        <div>
          <h1>{selectedTopic?.title}</h1>
          <p>{selectedTopic?.description}</p>
        </div>
      )}
    </Grid>
  );
};

export default Home;
