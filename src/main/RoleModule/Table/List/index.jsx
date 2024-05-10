import React, { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Switch,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableHeader from "./Table/TableHeader";
import Table from "./Table";
import NoDataFound from "../../../../sharedComponents/NoDataCard";
import ListLoader from "./ListLoader";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import useUpdateRole from "../../hooks/useUpdateRole";
import useGetGroupById from "../../hooks/useGetGroupById";

function List({
  item,
  fetchData: fetchGroupList,
  setLoading: setGroupLoading,
}) {
  const [open, setOpen] = useState(false);
  const [changeStatusOpen, setChangeStatusOpen] = useState(false);

  const [checked, setChecked] = useState(item?.status);

  const handleChange = () => {
    setChangeStatusOpen(true);
  };

  const { data, loading, fetchData, setLoading } = useGetGroupById();

  const handleClickOpen = () => {
    fetchData(item.groupId);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeStatusClose = () => {
    setChangeStatusOpen(false);
  };

  const navigate = useNavigate();

  const handleEditClick = () => {
    fetchData(item.id);
    navigate(`/roles/role-form/${item.id}`);
  };

  const { UpdateDataFun, updateLoading } = useUpdateRole(
    item.id,
    setChangeStatusOpen,
    fetchGroupList
  );

  const handleClickYes = () => {
    const payload = {
      status: !item.status,
      groupId: item.groupId,
    };
    UpdateDataFun(payload);
    setChecked((prev) => !prev);
    setChangeStatusOpen(false);
    setGroupLoading(true);
  };

  return (
    <div>
      <div className={styles.listHeader}>
        <div className={styles.nameCell}>{item?.roleName || "-"}</div>
        <div className={styles.groupNameCell}>
          {item?.group?.groupName || "-"}
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

        <div className={styles.groupStatusCell}>
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
          <Tooltip title="Edit Role">
            <IconButton
              aria-label="back"
              type="button"
              onClick={() => handleEditClick()}
            >
              <EditIcon color="primary" />
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
            Are you sure you want to change the role status?
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
      </Dialog>
    </div>
  );
}

export default List;
