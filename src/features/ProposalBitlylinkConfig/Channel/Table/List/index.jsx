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
import useUpdateBitlyLink from "../../../hooks/useUpdateBitlyLink";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Table from "./Table";
import NoDataFound from "../../../../../components/NoDataCard";
import CustomButton from "../../../../../components/CustomButton";

function List({ item, fetchData: fetchGroupList, canUpdate }) {
  const [changeStatusOpen, setChangeStatusOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [checked] = useState(item?.proposalBitlyConfig.status);

  const handleChange = () => {
    setChangeStatusOpen(true);
  };

  const handleChangeStatusClose = () => {
    setChangeStatusOpen(false);
  };

  const { UpdateDataFun, updateLoading } = useUpdateBitlyLink(
    setChangeStatusOpen,
    fetchGroupList
  );

  const handleClickYes = () => {
    const payload = {
      id: item.proposalBitlyConfig.id,
      properties: {
        status: !item.proposalBitlyConfig.status,
      },
    };
    UpdateDataFun(payload);
  };
  return (
    <div>
      <div className={styles.listHeader}>
        <div className={styles.nameCell}>
          {item?.proposalBitlyConfig.producer ? "Producer" : "Channel" || "-"}
        </div>
        <div className={styles.nameCell}>
          {`${item?.producer[0]?.firstName} ${item?.producer[0]?.lastName}` || "-"}
        </div>
        <div className={styles.nameCell}>
          {item?.producer[0]?.producerCode || "-"}
        </div>
        <div className={styles.nameCell}>
          <Tooltip title="View Bitly Link">
            <IconButton
              aria-label="back"
              type="button"
              onClick={() => handleClickOpen()}
            >
              <VisibilityIcon color="primary" />
            </IconButton>{" "}
          </Tooltip>
        </div>
        <div className={styles.createdAt}> {item?.proposalBitlyConfig?.createdAt || "-"}</div>
        <div className={styles.actionCell}>
          <div>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "toggle button" }}
              disabled={!canUpdate}
            />
          </div>
          <div className={styles.styledActiveSelect}>
            {item?.proposalBitlyConfig.status ? "Active" : "Inactive"}
          </div>
        </div>
      </div>
      <Dialog
        onClose={handleChangeStatusClose}
        aria-labelledby="customized-dialog-title"
        open={changeStatusOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Change Status
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
          <span className={styles.styledText}>
            Are you sure you want to change the Proposal Bitly Link status?
          </span>

          <div className={styles.SubmitContainer}>
            <CustomButton
              variant="outlined"
              onClick={() => setChangeStatusOpen(false)}
              size="small"
            >
              No
            </CustomButton>
            <CustomButton
              variant="contained"
              
              size="small"
              disabled={updateLoading}
              onClick={() => handleClickYes()}
            >
              yes
            </CustomButton>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Proposal Bitly Link details
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
            {item?.proposalBitlyConfig.products ? (
              <Table ListData={item?.proposalBitlyConfig?.products} />
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
