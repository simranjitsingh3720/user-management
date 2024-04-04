import React from "react";
import styles from "./styles.module.css";
import { Tooltip } from "@mui/material";
import capitalizeFirstLetter from "../../../../../../globalization/globalizationFunction";

function List({ item }) {
  return (
    <div className={styles.listHeader}>
      <div className={styles.nameCell}>
        {" "}
        {item.permissionName.length > 20 ? (
          <Tooltip title={item.permissionName.toUpperCase()}>
            <span>{`${item.permissionName
              .substring(0, 20)
              .toUpperCase()}...`}</span>
          </Tooltip>
        ) : (
          <span>{item.permissionName.toUpperCase()}</span>
        )}
      </div>
      <div className={styles.privilegeTypeCell}>
        {capitalizeFirstLetter(item?.permissionType)}
      </div>
      <div className={styles.privilegeStatusCell}>
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
    </div>
  );
}

export default List;
