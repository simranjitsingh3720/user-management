import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavbarDrawer from "../NavbarDrawer";
import Header from "../Header";
import { drawerWidth } from "../../utils/globalConstants";
import useSideNavData from "../NavbarDrawer/hooks/useSideNavData";

const HEADER_HEIGHT = 64;

export const getLabelFromPath = (pathData, sideNavData) => {
  for (const item of sideNavData) {
    if (item.route && item.route === pathData) {
      return item.label;
    }
    if (item.child) {
      for (const childItem of item.child) {
        if (childItem.route && childItem.route === pathData) {
          return childItem.label;
        }
      }
    }
  }
  return null;
};

function ResponsiveDrawer({ showSidebarAndHeader, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedNavbar, setSelectedNavbar] = useState("dashboard");
  const [selectedParentIndex, setSelectedParentIndex] = useState(null);
  
  const sideNavData = useSideNavData();

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
              sideNavData={sideNavData}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              overflow: "hidden",
              paddingTop: `${HEADER_HEIGHT}px`, 
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
