import React, { useState } from "react";
import styles from "./styles.module.css";
import RenderStatus from "./RenderStatus";
import EditLogo from "../../../../assets/EditLogo";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

function List({ item }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const handleEditClick = (roleName) => {
    navigate(`/roles/role-form/${roleName}`);
    // navigate("/permission/privilege-form", { state: { item } }); // Pass item data as state
  };

  return (
    <div>
      <div className={styles.listHeader}>
        <div className={styles.nameCell}>{item.roleName}</div>
        <div className={styles.roleStatusCell}>
          {<RenderStatus status={item.status} />}
        </div>
        <div className={styles.actionCell}>
          <IconButton
            aria-label="back"
            type="button"
            onClick={() => handleClickOpen(item.permissions)}
          >
            <VisibilityIcon color="primary" />
          </IconButton>{" "}
          <IconButton
            aria-label="back"
            type="button"
            onClick={() => handleEditClick()}
          >
            <EditLogo color="primary" />
          </IconButton>
        </div>
      </div>{" "}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {/* <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
            dui. Donec ullamcorper nulla non metus auctor fringilla.
          </Typography> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default List;
