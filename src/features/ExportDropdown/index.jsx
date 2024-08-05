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
import { useDispatch, useSelector } from "react-redux";
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
import { EXPORT_DROPDOWN_VALUES, EXPORT_CONSTANTS } from "./utils/constants";
import CustomDialog from "../../components/CustomDialog";

const ExportDropdown = ({ tableHeader }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const { tableName } = useSelector((state) => state.export)

  const handleMenuItemClick = (event, index) => {
    setOpen(false);
    const selectedValue = EXPORT_DROPDOWN_VALUES[index];
    dispatch(setSelectedValue(selectedValue));
    if (selectedValue === EXPORT_CONSTANTS.last30Days) {
      dispatch(setLast30Days());
    }

    dispatch(
      showDialog({
        title: EXPORT_CONSTANTS.dialogTitle,
        content: <Content tableHeader={tableHeader} />,
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

  if(!tableName) {
    return;
  }

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
                  {EXPORT_DROPDOWN_VALUES.map((option, index) => (
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
      <CustomDialog size='md' />
    </React.Fragment>
  );
};

export default ExportDropdown;
