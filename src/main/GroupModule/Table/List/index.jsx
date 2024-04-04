import React, { useState } from "react";
import styles from "./styles.module.css";
import EditLogo from "../../../../assets/EditLogo";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useGetGroupById from "../../hooks/useGetGroupByID";
import TableHeader from "./Table/TableHeader";
import Table from "./Table";
import NoDataFound from "../../../../sharedComponents/NoDataCard";
import ListLoader from "./ListLoader";

function List({ item }) {
  const [open, setOpen] = useState(false);

  const { data, loading, fetchData, setLoading } = useGetGroupById();

  const handleClickOpen = () => {
    fetchData(item.id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const handleEditClick = () => {
    fetchData(item.id);
    // navigate(`/group/group-form/${data}`);
    navigate(`/group/group-form/${item.id}`);
    // navigate("/permission/privilege-form", { state: { item } }); // Pass item data as state
  };

  console.log("data", data);

  return (
    <div>
      <div className={styles.listHeader}>
        <div className={styles.nameCell}>{item?.groupName || "-"}</div>
        <div className={styles.createdAt}> {item?.createdAt || "-"}</div>

        <div className={styles.groupStatusCell}>
          <div
            className={
              item?.status
                ? styles.styledActiveSelect
                : styles.styledInactiveSelect
            }
          >
            {item?.status ? "Active" : "Inactive"}
          </div>
        </div>
        <div className={styles.actionCell}>
          <Tooltip title="View permissions">
            <IconButton
              aria-label="back"
              type="button"
              onClick={() => handleClickOpen()}
            >
              <VisibilityIcon color="primary" />
            </IconButton>{" "}
          </Tooltip>
          <Tooltip title="Edit Group">
            <IconButton
              aria-label="back"
              type="button"
              onClick={() => handleEditClick()}
            >
              <EditLogo color="primary" />
            </IconButton>
          </Tooltip>
        </div>
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
            {loading ? (
              <>
                <TableHeader />
                <ListLoader />
              </>
            ) : data?.data?.permissions && data?.data?.permissions.length ? (
              <Table
                ListData={data?.data?.permissions}
                fetchData={fetchData}
                setLoading={setLoading}
              />
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
