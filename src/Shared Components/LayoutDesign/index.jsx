import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavbarDrawer from "../NavbarDrawer";
import Header from "../Header";
import Body from "../Body";
import Styles from "./styles.module.css";
import { drawerWidth } from "../../globalization/globalConstants";
import UserManagement from "../../Main/User Management";
import CreateUserMangementForm from "../../Main/User Management/Components/CreateForm";

function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box className={Styles.mainContainer}>
      <CssBaseline />
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <NavbarDrawer
          setIsClosing={setIsClosing}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      </Box>
      <Box component="main" className={Styles.main}>
        {/* <UserManagement /> */}
        <CreateUserMangementForm />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
