import * as React from "react";
import Drawer from "@mui/material/Drawer";
import TataNormalLogo from "../../Assets/TataNormalLogo";
import SearchInput from "../SearchInput";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Styles from "./styles.module.css";
import { SideNavData } from "../../data/navbar";
import { drawerWidth } from "../../globalization/globalConstants";

console.log("SideNavData", SideNavData);

function NavbarDrawer({ setIsClosing, mobileOpen, setMobileOpen }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedParentIndex, setSelectedParentIndex] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleListItemClick = (event, index) => {
    setSelectedParentIndex(null);
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleCollpaseListItemClick = (event, index) => {
    setSelectedParentIndex(index);
    setSelectedIndex(null);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleSearch = (query) => {
    console.log(query);
  };

  const drawer = (
    <div>
      <div className={Styles.IconContainer}>
        <div className={Styles.StyledIcon}>
          <TataNormalLogo />
        </div>
        <div className={Styles.styledText}>User Management Portal</div>
        <div className={Styles.StyledSearch}>
          <SearchInput onSearch={handleSearch} />
        </div>
      </div>
      <List sx={{ marginRight: "12px" }}>
        {SideNavData.map((obj, index) =>
          !obj.child ? (
            <ListItem key={index} disablePadding>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
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
                    color: selectedIndex === index ? "#185EC4" : "#7E84A3", // Change color when selected
                  }}
                >
                  <obj.icon className={Styles.navbarIcon} />
                </ListItemIcon>
                <div className={Styles.navbarText}>{obj?.label}</div>
              </ListItemButton>
            </ListItem>
          ) : (
            <>
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
                      selectedParentIndex === index ? "#185EC4" : "#7E84A3", // Change color when selected
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
                    <ListItem key={childObj.label} disablePadding>
                      <ListItemButton
                        selected={selectedParentIndex === index} // Apply selectedIndex
                        onClick={(event) =>
                          handleCollpaseListItemClick(event, index)
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
                              selectedParentIndex === index
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
            </>
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
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
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
