import React from "react";
import styles from "./styles.module.css";

function TableHeader({ sort, setSort }) {
  return (
    <div className={styles.tableHeader}>
      <div className={styles.code}>Intermediary Code</div>
      <div className={styles.code}>Name</div>
      <div className={styles.code}>Email Id</div>
      <div className={styles.code}>Intermediary U_TS</div>
      <div className={styles.code}>Producer List C_TS</div>
      <div className={styles.code}>Remarks</div>
    </div>
  );
}

export default TableHeader;
