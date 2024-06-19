import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import TataNormalLogo from "../../assets/TataNormalLogo";
import SearchInput from "../SearchInput";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Styles from "./styles.module.scss";
import { SideNavData } from "../../utils/Navbar Data/navbar";
import { drawerWidth } from "../../utils/globalConstants";
import { useNavigate } from "react-router-dom";

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
  const [filteredNavData, setFilteredNavData] = useState(SideNavData);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  const handleListItemClick = (event, index, navigateRoute, label) => {
    navigate(`/${navigateRoute}`);
    setSelectedParentIndex(null);
    setSelectedNavbar(label);
    setOpen(false);
  };

  const handleCollpaseListItemClick = (event, index, label, childLabel) => {
    setSelectedParentIndex(`${label}/${childLabel}`);
    setSelectedNavbar(null);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  useEffect(() => {
    const filteredData = SideNavData.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNavData(filteredData);
  }, [searchQuery]);
  const drawer = (
    <div>
      <div className={Styles.IconContainer}>
        <div className={Styles.StyledIcon}>
          <TataNormalLogo />
        </div>
        <div className={Styles.styledText}>User Management Portal</div>
        <div className={Styles.StyledSearch}>
          <SearchInput onSearch={(query) => setSearchQuery(query)} />
        </div>
      </div>
      <List sx={{ marginRight: "12px" }}>
        {filteredNavData.map((obj, index) =>
          !obj.child ? (
            <ListItem key={index} disablePadding>
              <ListItemButton
                selected={selectedNavbar === obj.label}
                onClick={(event) =>
                  handleListItemClick(
                    event,
                    index,
                    obj.navigateRoute,
                    obj.label
                  )
                }
                sx={{
                  "&.Mui-selected": {
                    color: "#185EC4",
                    backgroundColor: "#F2F7FF",
                    borderLeft: "4px solid #185EC4",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: selectedNavbar === obj.label ? "#185EC4" : "#7E84A3", // Change color when selected
                  }}
                >
                  <obj.icon className={Styles.navbarIcon} />
                </ListItemIcon>
                <div className={Styles.navbarText}>{obj?.label}</div>
              </ListItemButton>
            </ListItem>
          ) : (
            <React.Fragment key={index}>
              <ListItemButton
                onClick={handleClick}
                sx={{
                  backgroundColor:
                    selectedParentIndex !== null ? "#F2F7FF" : "",
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      selectedParentIndex === obj.label ? "#185EC4" : "#7E84A3", // Change color when selected
                  }}
                >
                  <obj.icon />
                </ListItemIcon>
                <div className={Styles.navbarText}>{obj.label}</div>
                {open ? (
                  <ExpandLess className={Styles.expandIconStyle} />
                ) : (
                  <ExpandMore className={Styles.expandIconStyle} />
                )}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {obj.child.map((childObj, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        selected={
                          selectedParentIndex ===
                          `${obj.label}/${childObj.label}`
                        }
                        onClick={(event) =>
                          handleCollpaseListItemClick(
                            event,
                            index,
                            obj.label,
                            childObj.label
                          )
                        }
                        sx={{
                          "&.Mui-selected": {
                            color: "#185EC4",
                            backgroundColor: "#F2F7FF",
                            borderLeft: "4px solid #185EC4",
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color:
                              selectedParentIndex ===
                              `${obj.label}/${childObj.label}`
                                ? "#185EC4"
                                : "#7E84A3", // Change color when selected
                          }}
                        >
                          <childObj.icon />
                        </ListItemIcon>
                        <div className={Styles.navbarText}>
                          {childObj?.label}
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
          display: { xs: "block", md: "none", },
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
