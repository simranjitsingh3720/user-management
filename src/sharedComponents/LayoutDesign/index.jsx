import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavbarDrawer from "../NavbarDrawer";
import Header from "../Header";
import Styles from "./styles.module.scss";
import { drawerWidth } from "../../globalization/globalConstants";
import { useLocation } from "react-router-dom";
import { SideNavData } from "../../data/navbar";

export const getLabelFromPath = (pathData) => {
  // Iterate through the SideNavData array
  for (const item of SideNavData) {
    // Check if navigateRoute property is present and matches pathData
    if (item.navigateRoute && item.navigateRoute === pathData) {
      return item.label; // Return the label if match found
    }
    // If child items are present, check them recursively
    if (item.child) {
      for (const childItem of item.child) {
        if (childItem.navigateRoute && childItem.navigateRoute === pathData) {
          return childItem.label; // Return the child label if match found
        }
      }
    }
  }
  return null; // Return null if no match found
};

function ResponsiveDrawer({ showSidebarAndHeader, children }) {
  const location = useLocation();
  const path = location.pathname; // Get the pathname from the location

  // Split the pathname by '/' and get the last part
  const parts = path.split("/");

  const defaultRoute = parts[1];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedNavbar, setSelectedNavbar] = useState(
    getLabelFromPath(defaultRoute) || "Permission"
  );

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
