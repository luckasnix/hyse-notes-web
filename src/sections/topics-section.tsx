"use client";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { useLiveQuery } from "dexie-react-hooks";
import { Fragment, type MouseEventHandler } from "react";

import { TopicItem } from "~/components/topic-item";
import { localDb } from "~/database/local";

const containerStyle: SxProps<Theme> = {
  width: "100%",
  maxWidth: 400,
  height: "100dvh",
  overflowY: "scroll",
};

const headerStyle: SxProps<Theme> = {
  direction: "row",
  justifyContent: "space-between",
  paddingX: 2,
  paddingY: 1,
};

export type TopicsSectionProps = Readonly<{
  selectedTopicId: string | null;
  selectTopic: (id: string) => void;
  onAddTopicButtonClick: MouseEventHandler<HTMLButtonElement>;
}>;

export const TopicsSection = ({
  selectedTopicId,
  selectTopic,
  onAddTopicButtonClick,
}: TopicsSectionProps) => {
  const topics = useLiveQuery(
    () => {
      return localDb.topics.orderBy("updatedAt").toArray();
    },
    [],
    []
  );

  return (
    <Box component="section" sx={containerStyle}>
      <Grid container sx={headerStyle}>
        <Typography variant="h4">Topics</Typography>
        <Tooltip title="Add topic" placement="bottom">
          <IconButton onClick={onAddTopicButtonClick}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <List component="nav">
        {topics.map(({ id, title, description }, index) => (
          <Fragment key={id}>
            <TopicItem
              title={title}
              description={description}
              selected={selectedTopicId === id}
              onClick={() => selectTopic(id)}
            />
            {topics.length !== index + 1 && <Divider variant="fullWidth" />}
          </Fragment>
        ))}
      </List>
    </Box>
  );
};
