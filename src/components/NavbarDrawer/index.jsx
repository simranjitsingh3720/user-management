import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import TataNormalLogo from "../../assets/TataNormalLogo";
import SearchInput from "../SearchInput";
import { Collapse, List, ListItem, ListItemButton } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { drawerWidth } from "../../utils/globalConstants";
import useSideNavData from "./hooks/useSideNavData";

function NavbarDrawer({
  setIsClosing,
  mobileOpen,
  setMobileOpen,
  selectedNavbar,
  setSelectedNavbar,
  selectedParentIndex,
  setSelectedParentIndex,
}) {
  const [open, setOpen] = useState(false);
  const [filteredNavData, setFilteredNavData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  const handleListItemClick = (obj) => {
    navigate(`/${obj.route}`);
    setSelectedParentIndex(null);
    setSelectedNavbar(obj.moduleName);
    setOpen(false);
  };

  const handleCollpaseListItemClick = (label, childLabel) => {
    setSelectedParentIndex(`${label.toLowerCase()}/${childLabel}`);
    setSelectedNavbar(null);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const sideNavData = useSideNavData();

  useEffect(() => {
    const filteredData = sideNavData.filter((item) =>
      item.moduleName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNavData(filteredData);
  }, [searchQuery, sideNavData]);

  const drawer = (
    <div>
      <div className="flex flex-col items-center text-center px-3">
        <div className="my-4">
          <TataNormalLogo />
        </div>
        <div className="text-[#18478b] text-lg font-semibold mb-4">
          User Management Portal
        </div>
        <SearchInput onSearch={(query) => setSearchQuery(query)} />
      </div>
      <List className="mr-3">
        {filteredNavData.map((obj, index) =>
          !obj.child ? (
            <ListItem key={index} disablePadding>
              <ListItemButton
                selected={selectedNavbar === obj.moduleName}
                onClick={(event) => handleListItemClick(obj)}
                className={`${
                  selectedNavbar === obj.moduleName
                    ? "text-[#185ec4] bg-[#f2f7ff] border-l-4 border-[#185ec4]"
                    : ""
                }`}
              >
                <img
                  src={"/icons/" + obj.icon || "/icons/dashboard.svg"}
                  alt={obj.moduleName}
                  className={(selectedNavbar === obj.moduleName ? "selected" : "") + " w-6 h-6 mr-2"}
                />
                <div className="text-sm capitalize">{obj?.moduleName}</div>
              </ListItemButton>
            </ListItem>
          ) : (
            <React.Fragment key={index}>
              <ListItemButton
                onClick={handleClick}
                className={`${
                  selectedParentIndex !== null
                    ? "text-[#185ec4] bg-[#f2f7ff] border-l-4 border-[#185ec4]"
                    : ""
                }`}
              >
                <img
                  src={"/icons/" + obj.icon || "/icons/dashboard.svg"}
                  alt={obj.moduleName}
                  className="w-6 h-6 mr-2"
                />
                <div className="text-sm">{obj.moduleName}</div>
                {open ? (
                  <ExpandLess className="ml-3" />
                ) : (
                  <ExpandMore className="ml-3" />
                )}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {obj.child.map((childObj, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        selected={
                          selectedParentIndex ===
                          `${obj.moduleName}/${childObj.moduleName}`
                        }
                        onClick={(event) =>
                          handleCollpaseListItemClick(
                            event,
                            index,
                            obj.moduleName,
                            childObj.moduleName
                          )
                        }
                        className={`${
                          selectedParentIndex ===
                          `${obj.moduleName}/${childObj.moduleName}`
                            ? "text-[#185ec4] bg-[#f2f7ff] border-l-4 border-[#185ec4]"
                            : ""
                        }`}
                      >
                        <img
                          src={"/icons/" + obj.icon || "/icons/dashboard.svg"}
                          alt={obj.moduleName}
                          className="w-6 h-6 mr-2"
                        />
                        <div className="teListItemIconxt-sm">
                          {childObj?.moduleName}
                        </div>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          )
        )}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            boxShadow: "3px 0px 6px #00000014",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </div>
  );
}

export default NavbarDrawer;
