import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavbarDrawer from "../NavbarDrawer";
import Header from "../Header";
import { drawerWidth } from "../../utils/globalConstants";
import { useLocation } from "react-router-dom";
import { SideNavData } from "../../utils/Navbar Data/navbar";

const HEADER_HEIGHT = 64; // Adjust this based on the height of your header

export const getLabelFromPath = (pathData) => {
  for (const item of SideNavData) {
    if (item.navigateRoute && item.navigateRoute === pathData) {
      return item.label;
    }
    if (item.child) {
      for (const childItem of item.child) {
        if (childItem.navigateRoute && childItem.navigateRoute === pathData) {
          return childItem.label;
        }
      }
    }
  }
  return null;
};

function ResponsiveDrawer({ showSidebarAndHeader, children }) {
  const location = useLocation();
  const path = location.pathname;
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
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      {showSidebarAndHeader && (
        <>
          <Box
            component="nav"
            sx={{
              width: { md: drawerWidth },
              flexShrink: { md: 0 },
            }}
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
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              overflow: "hidden",
              paddingTop: `${HEADER_HEIGHT}px`, // Adjust this based on the height of your header
            }}
          >
            <Header
              handleDrawerToggle={handleDrawerToggle}
              selectedNavbar={selectedNavbar}
              selectedParentIndex={selectedParentIndex}
            />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                padding: 3,
              }}
            >
              {children}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

export default ResponsiveDrawer;
