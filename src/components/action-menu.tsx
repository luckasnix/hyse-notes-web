import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import type { SxProps, Theme } from "@mui/material/styles";
import type { JSX, MouseEventHandler } from "react";

export type ActionMenuItemType = "neutral" | "success" | "error";

export type ActionMenuItem = {
  type: ActionMenuItemType;
  label: string;
  icon: JSX.Element;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLLIElement>;
};

export type ActionMenuProps = Readonly<{
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  items: Array<ActionMenuItem>;
}>;

export const menuItemStyleMap: Record<ActionMenuItemType, SxProps<Theme>> = {
  neutral: {},
  success: {
    color: "success.main",
  },
  error: {
    color: "error.main",
  },
};

export const listItemIconStyleMap: Record<
  ActionMenuItemType,
  SxProps<Theme>
> = {
  neutral: {},
  success: {
    color: "success.light",
  },
  error: {
    color: "error.light",
  },
};

export const ActionMenu = ({
  anchorEl,
  open,
  onClose,
  items,
}: ActionMenuProps) => (
  <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
    {items.map(({ type, label, icon, disabled, onClick }) => (
      <MenuItem
        key={label}
        onClick={onClick}
        disabled={disabled}
        sx={menuItemStyleMap[type]}
      >
        <ListItemIcon sx={listItemIconStyleMap[type]}>{icon}</ListItemIcon>
        <ListItemText>{label}</ListItemText>
      </MenuItem>
    ))}
  </Menu>
);
