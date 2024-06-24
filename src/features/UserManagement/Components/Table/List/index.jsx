import React, { useState } from "react";
import styles from "./styles.module.scss";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Switch,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import useUpdateUser from "../../hooks/useUpdateUser";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../../../components/CustomButton";

function List({ item, loading, fetchData, setLoading }) {
  const [checked, setChecked] = useState(item?.status);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const { updateData } = useUpdateUser(setOpen, fetchData);

  const handleClickYes = () => {
    const data = { status: !item.status };
    const userStatus = true;
    updateData(item?.id, data, userStatus);
    setChecked((prev) => !prev);
    setOpen(false);
    setLoading(true);
  };

  const handleChange = () => {
    setOpen(true);
  };

  const navigate = useNavigate();

  const handleEditClick = () => {
    fetchData(item.id);
    navigate(`/user-management/user-management-form/${item.id}`);
  };

  return (
    <>
      <div className={styles.listHeader}>
        <div className={styles.userIdCell}>{item.userId}</div>
        <div
          className={styles.name}
        >{`${item.firstName} ${item.lastName}`}</div>

        <div className={styles.loginCell}>
          <span>
            NT Login:<span>{item.ntId}</span>
          </span>
          <span>
            Email ID:
            <span>{item.email}</span>
          </span>
        </div>
        <div className={styles.mobileCell}>{item.mobileNo}</div>
        <div className={styles.roleCell}>{item.roleName}</div>
        <div className={styles.dateCell}>{item.createdAt}</div>
        <div className={styles.statusCell}>
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
        <div className={styles.actionCell}>
          <Tooltip title="Edit Group">
            <IconButton
              aria-label="back"
              type="button"
              onClick={() => handleEditClick()}
            >
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
        </div>
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
          <span className={styles.styledText}>
            Are you sure you want to change the Group status?
          </span>

          <div className={styles.SubmitContainer}>
            <CustomButton
              variant="outlined"
              onClick={() => setOpen(false)}
            >
              No
            </CustomButton>
            <CustomButton
              variant="contained"
              onClick={() => handleClickYes()}
            >
              yes
            </CustomButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default List;
