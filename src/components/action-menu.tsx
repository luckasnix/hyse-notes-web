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

const menuItemStyleMap: Record<ActionMenuItemType, SxProps<Theme>> = {
  neutral: {},
  success: {
    color: "success.main",
  },
  error: {
    color: "error.main",
  },
};

const listItemIconStyleMap: Record<ActionMenuItemType, SxProps<Theme>> = {
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
  <Menu
    anchorEl={anchorEl}
    open={open}
    onClose={onClose}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
  >
    {items.map((item) => (
      <MenuItem
        key={item.label}
        onClick={item.onClick}
        disabled={item.disabled}
        sx={menuItemStyleMap[item.type]}
      >
        <ListItemIcon sx={listItemIconStyleMap[item.type]}>
          {item.icon}
        </ListItemIcon>
        <ListItemText>{item.label}</ListItemText>
      </MenuItem>
    ))}
  </Menu>
);
