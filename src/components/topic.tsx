import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export type TopicData = {
  id: string;
  title: string;
  description: string;
};

export type TopicProps = Readonly<TopicData & {
  selected: boolean;
  onClick: () => void;
}>;

export const Topic = ({ title, description, selected, onClick }: TopicProps) => (
  <ListItemButton
    selected={selected}
    onClick={onClick}
  >
    <ListItemAvatar>
      <Avatar>{title.at(0)?.toUpperCase()}</Avatar>
    </ListItemAvatar>
    <ListItemText primary={title} secondary={description} />
  </ListItemButton>
);
