import { Fragment, type MouseEventHandler } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import type { SxProps, Theme } from "@mui/material/styles";

import { Topic, type TopicData } from "~/components/topic";

export const containerStyle: SxProps<Theme> = {
  width: "100%",
  maxWidth: 400,
  height: "100vh",
  overflow: "hidden",
  overflowY: "scroll",
};

export type TopicsSectionProps = Readonly<{
  topicList: TopicData[];
  selectedTopic: string | null;
  selectTopic: (id: string) => void;
  onAddTopicButtonClick: MouseEventHandler<HTMLButtonElement>;
}>;

export const TopicsSection = ({
  topicList,
  selectedTopic,
  selectTopic,
  onAddTopicButtonClick
}: TopicsSectionProps) => (
  <Box component="section" sx={containerStyle}>
    <Grid container direction="row" justifyContent="space-between" paddingX={2} paddingY={1}>
      <Typography variant="h4">Topics</Typography>
      <Tooltip title="Add topic" placement="bottom">
        <IconButton onClick={onAddTopicButtonClick}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Grid>
    <List component="nav">
      {topicList.map(({ id, title, description }, index) => (
        <Fragment key={id}>
          <Topic
            id={id}
            title={title}
            description={description}
            selected={selectedTopic === id}
            onClick={() => selectTopic(id)}
          />
          {topicList.length !== index + 1 && <Divider variant="middle" />}
        </Fragment>
      ))}
    </List>
  </Box>
);
