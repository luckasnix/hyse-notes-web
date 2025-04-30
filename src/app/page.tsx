"use client";
import { useState, useMemo } from "react";
import { useQueryState } from "nuqs";
import Grid from "@mui/material/Grid";

import { MainSection } from "~/sections/main-section";
import { TopicsSection } from "~/sections/topics-section";
import { TopicAdditionModal } from "~/modals/topic-addition-modal";
import { topicList } from "~/mocks/general";

const Home = () => {
  const [topicId, setTopicId] = useQueryState("topic");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const selectedTopic = useMemo(() => topicList.find(({ id }) => id === topicId), [topicId]);

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
        topicList={topicList}
        selectedTopic={topicId}
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
