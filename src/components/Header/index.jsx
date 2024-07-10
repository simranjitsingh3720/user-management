import {
  AppBar,
  Avatar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Tooltip,
  MenuItem,
  Menu,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { HEADER } from "../../utils/constants";
import { TOKEN, TOKEN_EXPIRATION } from "../../utils/globalConstants";
import { COMMON_WORDS } from "../../utils/constants";
import { useDispatch } from "react-redux";

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function Header({ handleDrawerToggle, selectedNavbar, selectedParentIndex }) {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const settings = ['Logout'];
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(TOKEN_EXPIRATION);
    navigate("/");
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (setting) => {
    if (setting === COMMON_WORDS.LOGOUT) {
      handleLogout();
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${HEADER.DRAWER_WIDTH}px)` },
        ml: { md: `${HEADER.DRAWER_WIDTH}px` },
        backgroundColor: HEADER.HEADER_BACKGROUND_COLOR,
        color: HEADER.TEXT_COLOR,
      }}
    >
      <Toolbar className="flex items-center justify-between">
        <Box display="flex" alignItems="center">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" }, color: HEADER.ICON_COLOR }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            fontWeight={HEADER.HEADING_FONT_WEIGHT}
            textOverflow="ellipsis"
            sx={{
              maxWidth: { sm: '100%', xs: "200px" }
            }}
            textTransform="capitalize"
          >
            {selectedNavbar}
            {selectedParentIndex}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open Menu">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar {...stringAvatar('KRUTIKA SAWANT')} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
