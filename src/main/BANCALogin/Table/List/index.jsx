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
import EditIcon from "@mui/icons-material/Edit";

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

  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.listHeader}>
        <div className={styles.nameCell}>{item?.groupName || "-"}</div>
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
          <Tooltip title="View permissions">
            <IconButton aria-label="back" type="button">
              <VisibilityIcon color="primary" />
            </IconButton>{" "}
          </Tooltip>
          <Tooltip title="Edit Group">
            <IconButton aria-label="back" type="button">
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      </div>{" "}
    </div>
  );
}

export default List;
