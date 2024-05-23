import React from "react";
import styles from "./styles.module.css";

import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

function List({ item }) {
  return (
    <div>
      <div className={styles.listHeader}>
        <div className={styles.nameCell}>{item?.groupName || "-"}</div>
        <div className={styles.createdAt}> {item?.createdAt || "-"}</div>

        <div className={styles.groupStatusCell}>
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
