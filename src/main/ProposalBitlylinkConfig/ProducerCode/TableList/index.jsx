import React from "react";
import styles from "./styles.module.css";
import { MenuItem, Select } from "@mui/material";
import { BitlyLinkMandatory } from "../../constants";

function TableList() {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div className={styles.nameCell}>Type</div>
        <div className={styles.nameCell}>Value</div>
      </div>
      <div className={styles.listHeader}>
        <div className={styles.namelistCell}>Value</div>
        <Select
          labelId="search-select"
          id="bitlyLinkMandatory"
          //   onChange={(event, newValue) => {
          //     field.onChange(newValue);
          //   }}
          size="small"
          displayEmpty
          className={styles.customizeSelect}
          //   renderValue={(selected) => {
          //     if (selected === undefined) {
          //       return <div className={styles.placeholderStyle}>Select</div>;
          //     }
          //     const selectedItem = BitlyLinkMandatory.find(
          //       (item) => item.value === selected
          //     );
          //     return selectedItem ? selectedItem.label : "";
          //   }}
        >
          {BitlyLinkMandatory.map((item) => (
            <MenuItem value={item.value} className={styles.styledOptionText}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default TableList;
