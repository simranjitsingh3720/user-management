import { AppBar, Avatar, IconButton, Toolbar, Typography, Box } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "../../assets/LogoutIcon";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";
import { HEADER } from "../../utils/constants";
import { TOKEN, TOKEN_EXPIRATION } from "../../utils/globalConstants";

function Header({ handleDrawerToggle, selectedNavbar, selectedParentIndex }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(TOKEN_EXPIRATION);
    navigate("/sign-in");
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
          <Typography variant="h6" noWrap fontWeight={HEADER.HEADING_FONT_WEIGHT}>
            {selectedNavbar}
            {selectedParentIndex}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mr={3}>
          <Box display="flex" alignItems="center">
            <IconButton>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
            <Box display="flex" flexDirection="column" ml={1}>
              <Typography variant="body1">
                KRUTIKA SAWANT
              </Typography>
              <Typography variant="body2">
                Admin
              </Typography>
            </Box>
          </Box>
          <Box mx={2} />
          <CustomButton
            variant="text"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </CustomButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
