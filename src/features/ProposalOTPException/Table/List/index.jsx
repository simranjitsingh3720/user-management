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
import useUpdateProposal from "../../hooks/useUpdateProposal";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
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

  const { UpdateDataFun, updateLoading } = useUpdateProposal(
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
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/proposalOtpException/form/${item.id}`);
  };
  return (
    <div>
      <div className={styles.listHeader}>
        <div className={styles.type}>
          {item?.producer ? "Producer" : "Channel"}
        </div>
        <div className={styles.type}>
          {`${item?.producer?.firstName} ${item?.producer?.lastName}` || "-"}
        </div>
        <div className={styles.value}>
          {item?.producer?.producerCode || "-"}
        </div>
        <div className={styles.lobName}>{item?.lob?.lob || "-"}</div>
        <div className={styles.product}>{item?.product?.product || "-"}</div>
        <div className={styles.startDate}> {item?.startDate || "-"}</div>
        <div className={styles.endDate}> {item?.endDate || "-"}</div>
        <div className={styles.createdAt}> {item?.createdAt || "-"}</div>
        <div className={styles.productStatus}>
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
        <div className={styles.editIcon}>
          <Tooltip title="Edit Proposal OTP">
            <IconButton
              aria-label="back"
              type="button"
              onClick={() => {
                handleEditClick();
              }}
            >
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
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
          <span className={styles.styledText}>
            Are you sure you want to change the Proposal OTP Exception status?
          </span>

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
