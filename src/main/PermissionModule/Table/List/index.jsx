import React, { useState } from "react";
import styles from "./styles.module.css";
import EditLogo from "../../../../assets/EditLogo";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Switch,
  Tooltip,
} from "@mui/material";
import capitalizeFirstLetter from "../../../../globalization/globalizationFunction";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import useUpdatePrivilege from "../../hooks/useUpdatePrivilege";

function List({ item, fetchData, setLoading }) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(item?.status);

  const handleClose = () => {
    setOpen(false);
  };

  const { updateData } = useUpdatePrivilege(setOpen, fetchData);

  const handleChange = () => {
    setOpen(true);
  };

  const handleClickYes = () => {
    updateData(item?.id, !item.status);
    setChecked((prev) => !prev);
    setOpen(false);
    setLoading(true);
  };

  return (
    <>
      <div className={styles.listHeader}>
        <div className={styles.nameCell}>
          {" "}
          {item.permissionName.length > 30 ? (
            <Tooltip title={item.permissionName.toUpperCase()}>
              <span>{`${item.permissionName
                .substring(0, 30)
                .toUpperCase()}...`}</span>
            </Tooltip>
          ) : (
            <span>{item.permissionName.toUpperCase()}</span>
          )}
        </div>
        <div className={styles.privilegeTypeCell}>
          {capitalizeFirstLetter(item?.permissionType)}
        </div>
        <div className={styles.createdAt}> {item.createdAt}</div>
        <div className={styles.privilegeStatusCell}>
          <div>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "toggle button" }}
            />
          </div>
          <div className={styles.styledActiveSelect}>
            {item?.status ? "Active" : "Inactive"}
          </div>
        </div>
        {/* <div className={styles.actionCell}>
          <Tooltip title="Change status">
            <IconButton
              aria-label="back"
              type="button"
              onClick={() => setOpen(true)}
            >
              <EditLogo color="primary" />
            </IconButton>
          </Tooltip>
        </div> */}
      </div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Change status
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
          <div className={styles.infoIconStyle}>
            <InfoIcon fontSize="x-large" className={styles.iconStyle} />
          </div>
          <text className={styles.styledText}>
            Are you sure you want to change the Group status?
          </text>

          <div className={styles.SubmitContainer}>
            <Button
              variant="outlined"
              onClick={() => setOpen(false)}
              size="small"
            >
              No
            </Button>
            <Button
              variant="contained"
              className={styles.styledButton}
              size="small"
              onClick={() => handleClickYes()}
            >
              yes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default List;
