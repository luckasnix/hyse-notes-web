"use client";
import { useState } from "react";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { yellow } from "@mui/material/colors";

import { TopicsSection } from "~/sections/topics-sections";
import { TopicAdditionModal } from "~/modals/topic-addition-modal";
import type { TopicData } from "~/components/topic";

const topicList: TopicData[] = [
  { id: "1", title: "Things to do", description: "Daily or weekly task list" },
  { id: "2", title: "Things to buy", description: "Grocery items or general shopping" },
  { id: "3", title: "Creative ideas", description: "Notes of ideas and inspirations" },
  { id: "4", title: "Movies to watch", description: "Movie and series suggestions" },
  { id: "5", title: "Books to read", description: "Future reading list" },
  { id: "6", title: "Personal goals", description: "Short and long-term objectives" },
  { id: "7", title: "Ongoing projects", description: "Tasks related to projects" },
  { id: "8", title: "Travel and places", description: "Desired destinations and itineraries" },
  { id: "9", title: "Study notes", description: "Summaries of subjects and topics" },
  { id: "10", title: "Favorite recipes", description: "Dishes to try or repeat" },
  { id: "11", title: "Passwords and logins", description: "Manage securely" },
  { id: "12", title: "Event calendar", description: "Appointments and important dates" },
];

const Home = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const selectTopic = (id: string) => {
    setSelectedTopic(id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Grid container direction="row" spacing={4}>
      <TopicsSection
        topicList={topicList}
        selectedTopic={selectedTopic}
        selectTopic={selectTopic}
        onAddTopicButtonClick={openModal}
      />
      <Grid container size="grow" direction="row" justifyContent="center" alignItems="center">
        <Image
          src="/logo.svg"
          width={128}
          height={128}
          alt="Hyse Notes logo"
        />
        <Typography variant="h1" sx={{ color: yellow[800] }}>Hyse Notes</Typography>
      </Grid>
      <TopicAdditionModal open={isModalOpen} onClose={closeModal} />
    </Grid>
  );
};

export default Home;
