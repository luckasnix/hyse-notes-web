import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
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

const navStyle: SxProps<Theme> = {
  paddingY: 0,
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
            endIcon={<AddIcon />}
            onClick={onAddTopicButtonClick}
          >
            Add topic
          </Button>
        </ListSubheader>
        {topics.map(({ id, title, description }, index) => (
          <Fragment key={id}>
            <TopicItem
              title={title}
              description={description}
              selected={selectedTopicId === id}
              onClick={() => {
                selectTopic(id);
              }}
            />
            {topics.length !== index + 1 && <Divider variant="fullWidth" />}
          </Fragment>
        ))}
      </List>
    </Box>
  );
};
