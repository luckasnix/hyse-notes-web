"use client";
import { useState } from "react";
import { useQueryState } from "nuqs";
import { useLiveQuery } from "dexie-react-hooks";
import Grid from "@mui/material/Grid";

import { NoteInput } from "~/components/note-input";
import { NoteList } from "~/components/note-list";
import { TopicHeader } from "~/components/topic-header";
import { localDb } from "~/database/local";
import { noteListMock } from "~/mocks/general";
import { TopicAdditionModal } from "~/modals/topic-addition-modal";
import { MainSection } from "~/sections/main-section";
import { TopicsSection } from "~/sections/topics-section";

const Home = () => {
  const [topicId, setTopicId] = useQueryState("t");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const topicList = useLiveQuery(
    () => {
      return localDb.topics.orderBy("updatedAt").toArray();
    },
    [],
    []
  );

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
        <Grid
          size="grow"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100dvh",
          }}
        >
          <TopicHeader
            id={topicId}
            title={selectedTopic?.title ?? ""}
            description={selectedTopic?.description ?? ""}
          />
          <NoteList notes={noteListMock} />
          <NoteInput onSubmit={() => console.log("Note saved!")} />
        </Grid>
      )}
    </Grid>
  );
};

export default Home;
