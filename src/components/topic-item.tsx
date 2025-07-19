import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type { SxProps, Theme } from "@mui/material/styles";

const avatarStyle: SxProps<Theme> = {
	bgcolor: "primary.main",
};

const textStyle: SxProps<Theme> = {
	maxWidth: "100%",
	overflow: "hidden",
	textOverflow: "ellipsis",
};

export type TopicItemProps = Readonly<{
	title: string;
	description: string;
	selected: boolean;
	onClick: () => void;
}>;

export const TopicItem = ({
	title,
	description,
	selected,
	onClick,
}: TopicItemProps) => (
	<ListItemButton selected={selected} onClick={onClick}>
		<ListItemAvatar>
			<Avatar variant="rounded" sx={avatarStyle}>
				{title.at(0)?.toUpperCase()}
			</Avatar>
		</ListItemAvatar>
		<ListItemText
			primary={title}
			secondary={description}
			slotProps={{
				primary: {
					noWrap: true,
					sx: textStyle,
				},
				secondary: {
					noWrap: true,
					sx: textStyle,
				},
			}}
		/>
	</ListItemButton>
);
