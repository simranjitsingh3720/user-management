import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Switch,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useGetGroupById from "../../hooks/useGetGroupByID";
import TableHeader from "./Table/TableHeader";
import Table from "./Table";
import NoDataFound from "../../../../components/NoDataCard";
import ListLoader from "./ListLoader";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import useUpdateGroup from "../../hooks/useUpdateGroup";
import CustomButton from "../../../../components/CustomButton";

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
    fetchData(item.id);
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
    navigate(`/group/group-form/${item.id}`);
  };

  const { UpdateDataFun, updateLoading } = useUpdateGroup(
    setChangeStatusOpen,
    fetchGroupList
  );

  const handleClickYes = () => {
    const payload = {
      properties: {
        status: !item.status,
      },
      id: item?.id,
    };
    UpdateDataFun(payload);
    setChecked((prev) => !prev);
    setChangeStatusOpen(false);
    setGroupLoading(true);
  };

  return (
    <div>
      <div className={styles.listHeader}>
        <div className={styles.nameCell}>{item?.groupName || "-"}</div>
        <div className={styles.createdAt}> {item?.createdAt || "-"}</div>
        <div className={styles.createdAt}> {item?.updatedAt || "-"}</div>

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
            Are you sure you want to change the group status?
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
