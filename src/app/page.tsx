"use client";
import { useState } from "react";
import { useQueryState } from "nuqs";
import { useLiveQuery } from "dexie-react-hooks";
import Grid from "@mui/material/Grid";

import { TopicHeader } from "~/components/topic-header";
import { localDb } from "~/database/local";
import { TopicAdditionModal } from "~/modals/topic-addition-modal";
import { MainSection } from "~/sections/main-section";
import { TopicsSection } from "~/sections/topics-section";

const Home = () => {
  const [topicId, setTopicId] = useQueryState("t");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const topicList = useLiveQuery(() => {
    return localDb.topics.orderBy("updatedAt").toArray();
  }, [], []);

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
        topicList={topicList}
        selectedTopicId={topicId}
        selectTopic={selectTopic}
        onAddTopicButtonClick={openModal}
      />
      <TopicAdditionModal open={isModalOpen} onClose={closeModal} />
      {topicId === null ? (
        <MainSection />
      ) : (
        <Grid size="grow">
          <TopicHeader
            id={topicId}
            title={selectedTopic?.title ?? ""}
            description={selectedTopic?.description ?? ""}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Home;
