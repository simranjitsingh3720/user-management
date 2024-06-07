import { MenuItem, Select } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";

function RenderStatus({ status }) {
  const [insillionStatus, setInsillionStatus] = React.useState(status);

  const handleChange = (event) => {
    setInsillionStatus(event.target.value);
  };

  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={insillionStatus}
      onChange={handleChange}
      className={
        insillionStatus === "active"
          ? styles.styledActiveSelect
          : styles.styledInactiveSelect
      }
      size="small"
    >
      <MenuItem value="active" className={styles.styledMenuText}>
        Active
      </MenuItem>
      <MenuItem value="inactive" className={styles.styledMenuText}>
        Inactive
      </MenuItem>
    </Select>
  );
}

export default RenderStatus;
