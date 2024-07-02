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

  return (
    <div>
      <div className={styles.listHeader}>
        <div className={styles.houseBankCode}>{item?.houseBankCode || "-"}</div>
        <div className={styles.bankCode}>{item?.bankCode || "-"}</div>
        <div className={styles.branchName}>{item?.branchName || "-"}</div>
        <div className={styles.accountNumber}>{item?.accountNumber || "-"}</div>

        <div className={styles.createdAt}> {item?.createdAt || "-"}</div>
        <div className={styles.updatedAt}> {item?.updatedAt || "-"}</div>

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
      </div>
    </div>
  );
}

export default List;
