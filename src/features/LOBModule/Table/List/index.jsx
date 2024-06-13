import React, { useState } from "react";
import styles from "./styles.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import {
  
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Switch,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import useUpdateLob from "../../hooks/useUpdateLob";
import CustomButton from "../../../../components/CustomButton";

function List({ item, fetchData: fetchGroupList }) {
  const [changeStatusOpen, setChangeStatusOpen] = useState(false);

  const [checked] = useState(item?.status);

  const handleChange = () => {
    setChangeStatusOpen(true);
  };

  const handleChangeStatusClose = () => {
    setChangeStatusOpen(false);
  };

  const { UpdateDataFun, updateLoading } = useUpdateLob(
    setChangeStatusOpen,
    fetchGroupList
  );

  const handleClickYes = () => {
    const payload = {
      id: item.id,
      properties: {
        status: !item.status,
      },
    };
    UpdateDataFun(payload);
  };

  return (
    <div>
      <div className={styles.listHeader}>
        <div className={styles.nameCell}>{item?.lob || "-"}</div>
        <div className={styles.lobValue}>{item?.lob_value || "-"}</div>
        <div className={styles.lobLevel}>{item?.lob_level || "-"}</div>
        <div className={styles.lobCode}>{item?.lob_code || "-"}</div>
        <div className={styles.createdAt}> {item?.createdAt || "-"}</div>
        <div className={styles.lobStatus}>
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
      </div>{" "}
      <Dialog
        onClose={handleChangeStatusClose}
        aria-labelledby="customized-dialog-title"
        open={changeStatusOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Change status
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleChangeStatusClose}
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
            Are you sure you want to change the LOB status?
          </text>

          <div className={styles.SubmitContainer}>
            <CustomButton
              variant="outlined"
              onClick={() => setChangeStatusOpen(false)}
            >
              No
            </CustomButton>
            <CustomButton
              variant="contained"
              disabled={updateLoading}
              onClick={() => handleClickYes()}
            >
              yes
            </CustomButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default List;
