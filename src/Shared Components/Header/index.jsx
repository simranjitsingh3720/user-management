import { AppBar, Avatar, Button, IconButton, Toolbar } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./styles.module.css";
import LogoutIcon from "../../Assets/LogoutIcon";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function Header({ handleDrawerToggle }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/sign-in");
  };
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#FFFFFF",
        }}
      >
        <div className={styles.headerContainer}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" }, color: "#465465" }}
            >
              <MenuIcon />
            </IconButton>
            <div noWrap className={styles.userManagementText}>
              User Management Portal
            </div>
          </Toolbar>
          <div className={styles.logoutContainer}>
            <div className={styles.iconContainer}>
              <IconButton>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
              <div className={styles.loginText}>
                <text className={styles.styledName}>KRUTIKA SAWANT</text>
                <text className={styles.styledRole}>Admin</text>
              </div>
            </div>
            <div className={styles.lineStyle} />
            <Button
              variant="text"
              startIcon={<LogoutIcon />}
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </AppBar>
    </div>
  );
}

export default Header;
