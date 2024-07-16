import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import NavbarDrawer from '../NavbarDrawer';
import Header from '../Header';
import { drawerWidth, MODULE_TYPE } from '../../utils/globalConstants';
import { useLocation } from 'react-router-dom';
import { COMMON_WORDS } from '../../utils/constants';

const HEADER_HEIGHT = 64;

function ResponsiveDrawer({ showSidebarAndHeader, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedNavbar, setSelectedNavbar] = useState('');
  const [selectedParentIndex, setSelectedParentIndex] = useState(null);
  const location = useLocation();

  const scopes = useMemo(() => JSON.parse(localStorage.getItem(COMMON_WORDS.SCOPES))?.read || [], []);
  let sideNavData = (scopes && scopes.length > 0 && scopes.filter(item => item.moduleType === MODULE_TYPE)) || [];
  sideNavData = sideNavData.sort((a, b) => (parseInt(a.displayOrder) || 0) - (parseInt(b.displayOrder) || 0));

  const getModuleName = useCallback((pathname) => {
    scopes.forEach((scope) => {
      if (scope.route === pathname) {
        setSelectedNavbar(scope.moduleName);
      }
    }
    );
  }, [scopes, setSelectedNavbar]);

  useEffect(() => {
    let pathname = location?.pathname?.split('/')[1] || '';
    getModuleName(pathname);
  }, [getModuleName, location]);
 

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
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
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              overflow: 'hidden',
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
                overflowY: 'auto',
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
