import React from "react";
import styles from "./styles.module.scss";
import { IconButton, Tooltip } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

function List({ item, fetchData: fetchGroupList, paymentData }) {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/producer-eod-bypass-list/form/${item.id}`);
  };

  const isSelected = (payment, selected) => {
    return selected.some((sel) => sel.id === payment.id);
  };

  const result = (paymentData?.data || []).map((payment) => {
    return {
      ...payment,
      selected: isSelected(payment, item?.paymentTypes) ? "Yes" : "No",
    };
  });

  return (
    <div>
      <div className={styles.listHeader}>
        <div className={styles.product}>{item?.product?.product || "-"}</div>
        <div className={styles.lob}>{item?.lob?.lob}</div>
        <div className={styles.paymentModes}>
          <div className={styles.paymentSubModes}>
            {(result || []).map((obj) => (
              <div className={styles.subPayment}> {obj.selected}</div>
            ))}
          </div>
        </div>

        <div className={styles.createdAt}> {item?.createdAt || "-"}</div>
        <div className={styles.createdAt}> {item?.updatedAt || "-"}</div>

        <div className={styles.productStatus}>
          <Tooltip title="Edit Role">
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
      </Dialog> */}
    </div>
  );
}

export default List;
