import React, { useState } from "react";
import styles from "./styles.module.scss";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import NoDataFound from "../../../../sharedComponents/NoDataCard";
import Table from "./Table";

function List({ item }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className={styles.listHeader}>
        <div className={styles.producerCode}>
          {item?.producer?.producerCode || "-"}
        </div>
        <div className={styles.producerCode}>
          {`${item?.producer?.firstName}  ${item.producer.lastName}`}
        </div>
        <div className={styles.producerCode}>
          <Tooltip title="View permissions">
            <IconButton
              aria-label="back"
              type="button"
              onClick={() => handleClickOpen()}
            >
              <VisibilityIcon color="primary" />
            </IconButton>{" "}
          </Tooltip>
        </div>

        <div className={styles.createdAt}> {item?.createdAt || "-"}</div>
        <div className={styles.updatedAt}> {item?.updatedAt || "-"}</div>
      </div>{" "}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Permissions
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
          <div>
            {item?.products ? (
              <Table ListData={item?.products} />
            ) : (
              <NoDataFound />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default List;
