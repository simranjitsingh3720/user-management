import React from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function List({
  item,
  fetchData: fetchGroupList,
  setLoading: setGroupLoading,
}) {
  // const [open, setOpen] = useState(false);
  // const [changeStatusOpen, setChangeStatusOpen] = useState(false);

  // const [checked, setChecked] = useState(item?.status);

  // const handleChange = () => {
  //   setChangeStatusOpen(true);
  // };

  // const { data, loading, fetchData, setLoading } = useGetGroupById();

  // const handleClickOpen = () => {
  //   fetchData(item.groupId);
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleChangeStatusClose = () => {
  //   setChangeStatusOpen(false);
  // };

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/house-bank-master/form/${item.id}`);
  };

  // const { UpdateDataFun, updateLoading } = useUpdateHouseBank(
  //   setChangeStatusOpen,
  //   fetchGroupList
  // );

  // const handleClickYes = () => {
  //   const payload = {
  //     id: item.id,
  //     properties: {
  //       status: !item.status,
  //     },
  //   };
  //   UpdateDataFun(payload);
  //   setChecked((prev) => !prev);
  //   setChangeStatusOpen(false);
  // };

  return (
    <div>
      <div className={styles.listHeader}>
        <div className={styles.houseBankCode}>{item?.houseBankCode || "-"}</div>
        <div className={styles.bankCode}>{item?.bankCode || "-"}</div>
        <div className={styles.branchName}>{item?.branchName || "-"}</div>
        <div className={styles.accountNumber}>{item?.accountNumber || "-"}</div>

        <div className={styles.createdAt}> {item?.createdAt || "-"}</div>
        <div className={styles.updatedAt}> {item?.updatedAt || "-"}</div>
        {/* <div className={styles.StatusCell}>
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
        </div> */}

        <div className={styles.actionCell}>
          <Tooltip title="Edit House Bank">
            <IconButton
              aria-label="back"
              type="button"
              onClick={() => {
                handleEditClick(item);
              }}
            >
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      </div>{" "}
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
          <text className={styles.styledText}>
            Are you sure you want to change the House Bank status?
          </text>

          <div className={styles.SubmitContainer}>
            <Button
              variant="outlined"
              onClick={() => setChangeStatusOpen(false)}
              size="small"
            >
              No
            </Button>
            <Button
              variant="contained"
              className={styles.styledButton}
              size="small"
              disabled={updateLoading}
              onClick={() => handleClickYes()}
            >
              yes
            </Button>
          </div>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}

export default List;
