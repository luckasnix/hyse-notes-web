import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import type { SxProps, Theme } from "@mui/material/styles";
import { IconPlus } from "@tabler/icons-react";
import { useLiveQuery } from "dexie-react-hooks";
import { Fragment, type MouseEventHandler } from "react";

import { TopicItem } from "#/components/topic-item";
import { db } from "#/integrations/dexie";

const containerStyle: SxProps<Theme> = {
  width: "100%",
  maxWidth: "400px",
  height: "100dvh",
  overflowY: "scroll",
};

const navStyle: SxProps<Theme> = {
  paddingY: 0,
};

export type TopicsSectionProps = Readonly<{
  selectedTopicId: string | undefined;
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
      return db.topics.orderBy("updatedAt").toArray();
    },
    [],
    [],
  );

  return (
    <Box component="section" sx={containerStyle}>
      <List component="nav" sx={navStyle}>
        <ListSubheader>
          <Button
            variant="contained"
            size="large"
            fullWidth
            endIcon={<IconPlus />}
            onClick={onAddTopicButtonClick}
          >
            Add topic
          </Button>
        </ListSubheader>
        {topics.map((topic, index) => (
          <Fragment key={topic.id}>
            <TopicItem
              title={topic.title}
              description={topic.description}
              selected={selectedTopicId === topic.id}
              onClick={() => {
                selectTopic(topic.id);
              }}
            />
            {topics.length !== index + 1 && <Divider variant="fullWidth" />}
          </Fragment>
        ))}
      </List>
    </Box>
  );
};
