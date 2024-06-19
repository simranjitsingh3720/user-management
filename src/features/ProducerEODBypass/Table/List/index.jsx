import React from "react";
import moment from "moment";
import styles from "./styles.module.scss";
import { IconButton, Tooltip } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const calculateUnlockedDays = (startDateString, endDateString) => {
  const startMoment = moment(startDateString, "DD/MM/YYYY");
  const endMoment = moment(endDateString, "DD/MM/YYYY");

  const differenceInDays = endMoment.diff(startMoment, "days");

  return differenceInDays;
};

function List({ item, fetchData: fetchGroupList }) {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/producer-eod-bypass-list/form/${item.id}`);
  };
  return (
    <div>
      <div className={styles.listHeader}>
        <div className={styles.code}>{item?.producer?.producerCode || "-"}</div>
        <div className={styles.producerName}>
          {`${item?.producer?.firstName} ${item?.producer?.lastName} ` || "-"}
        </div>

        <div className={styles.unlockedDays}>
          {calculateUnlockedDays(item?.startDate, item?.endDate) || "-"}
        </div>
        <div className={styles.startDate}> {item?.startDate || "-"}</div>

        <div className={styles.endDate}> {item?.endDate || "-"}</div>

        {item.reason.length > 20 ? (
          <Tooltip title={item.reason}>
            <span className={styles.reason}>{`${item.reason.substring(
              0,
              25
            )}...`}</span>
          </Tooltip>
        ) : (
          <span className={styles.reason}>{item.reason || ""}</span>
        )}

        <div className={styles.createdAt}> {item?.createdAt || "-"}</div>
        <div className={styles.createdAt}> {item?.updatedAt || "-"}</div>

        <div className={styles.productStatus}>
          <Tooltip title="Edit EOD Lock Bypass">
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
      {/* <Dialog
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
            Are you sure you want to change the product status?
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
      </Dialog> */}
    </div>
  );
}

export default List;
