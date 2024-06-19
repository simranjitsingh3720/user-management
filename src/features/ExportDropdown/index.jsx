// ExportDropdown.js
import React, { useState, useRef } from 'react';
import {
  ButtonGroup, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList
} from '@mui/material';
import { useDispatch } from 'react-redux';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CustomButton from '../../components/CustomButton';
import { showDialog } from '../../stores/slices/dialogSlice';
import { setLast30Days, setSelectedValue } from '../../stores/slices/exportSlice';
import Content from './Dialog/Content';
import DownloadIcon from '../../assets/DownloadLogo';
import Actions from './Dialog/Action';

const options = ["Last 30 Days", "Custom"];

const ExportDropdown = ({ columnsList }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();

  const handleMenuItemClick = (event, index) => {
    setOpen(false);
    if (options[index] === 'Last 30 Days') {
      dispatch(setSelectedValue(options[index]))
      dispatch(setLast30Days());
    } else if (options[index] === 'Custom') {
      dispatch(setSelectedValue('custom'));
    }
    dispatch(showDialog({
      title: 'Export Data',
      content: <Content />,
      actions: <Actions />, // Replace with your dialog actions if any
    }));
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
        sx={{ boxShadow: 'none' }}
        className="mr-2"
      >
        <CustomButton
          variant="outlined"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
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
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
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
}


export default ExportDropdown;