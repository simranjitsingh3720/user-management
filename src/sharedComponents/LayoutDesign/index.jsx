import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavbarDrawer from "../NavbarDrawer";
import Header from "../Header";
import Styles from "./styles.module.css";
import { drawerWidth } from "../../globalization/globalConstants";

function ResponsiveDrawer({ showSidebarAndHeader, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedNavbar, setSelectedNavbar] = useState("Permission");
  const [selectedParentIndex, setSelectedParentIndex] = useState(null);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box className={Styles.mainContainer}>
      <CssBaseline />
      {showSidebarAndHeader && (
        <React.Fragment>
          <Header
            handleDrawerToggle={handleDrawerToggle}
            selectedNavbar={selectedNavbar}
            selectedParentIndex={selectedParentIndex}
          />
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <NavbarDrawer
              setIsClosing={setIsClosing}
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
              selectedNavbar={selectedNavbar}
              setSelectedNavbar={setSelectedNavbar}
              selectedParentIndex={selectedParentIndex}
              setSelectedParentIndex={setSelectedParentIndex}
            />
          </Box>
        </React.Fragment>
      )}

      <Box component="main" className={Styles.main}>
        {children}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
