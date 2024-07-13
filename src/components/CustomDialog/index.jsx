import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { hideDialog } from '../../stores/slices/dialogSlice';

const CustomDialog = ({size}) => {
  const dispatch = useDispatch();
  const { open, title, content, actions } = useSelector((state) => state.dialog);

  return (
    <Dialog open={open} onClose={() => dispatch(hideDialog())} maxWidth={size} fullWidth={true}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        {actions || (
          <Button onClick={() => dispatch(hideDialog())} color="primary">
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
