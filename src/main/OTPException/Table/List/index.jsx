import React from "react";
import styles from "./styles.module.css";

function List({ item, fetchData: fetchGroupList }) {
  return (
    <div className={styles.listHeader}>
      <div className={styles.nameCell}>{item?.lob || "-"}</div>
      <div className={styles.nameCell}>{item?.lob_value || "-"}</div>
      <div className={styles.nameCell}>{item?.lob_value || "-"}</div>
    </div>
  );
}

export default List;
