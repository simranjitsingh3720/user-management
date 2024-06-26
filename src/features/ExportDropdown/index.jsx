import React, { useState, useRef } from "react";
import {
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@mui/material";
import { useDispatch } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CustomButton from "../../components/CustomButton";
import { showDialog } from "../../stores/slices/dialogSlice";
import {
  setLast30Days,
  setSelectedValue,
} from "../../stores/slices/exportSlice";
import Content from "./Dialog/Content";
import DownloadIcon from "../../assets/DownloadLogo";
import Actions from "./Dialog/Action";

const ExportDropdown = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const EXPORT_DROPDOWN_VALUE = ["Last 30 Days", "Custom"];

  const EXPORT_ACTIONS = {
    "Last 30 Days": {
      selectedValue: "Last 30 Days",
      actions: [setLast30Days],
    },
    Custom: {
      selectedValue: "custom",
      actions: [],
    },
  };

  const handleMenuItemClick = (event, index) => {
    setOpen(false);

    const selectedValue = EXPORT_DROPDOWN_VALUE[index];
    const config = EXPORT_ACTIONS[selectedValue];

    if (config) {
      dispatch(setSelectedValue(config.selectedValue));
      config.actions.forEach((action) => dispatch(action()));
    }

    dispatch(
      showDialog({
        title: "Export Data",
        content: <Content />,
        actions: <Actions />,
      })
    );
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Export Button"
        sx={{ boxShadow: "none" }}
        className="mr-2"
      >
        <CustomButton
          variant="outlined"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          startIcon={<DownloadIcon />}
        >
          <span>Export</span>
          <ArrowDropDownIcon />
        </CustomButton>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {EXPORT_DROPDOWN_VALUE.map((option, index) => (
                    <MenuItem
                      key={option}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default ExportDropdown;
