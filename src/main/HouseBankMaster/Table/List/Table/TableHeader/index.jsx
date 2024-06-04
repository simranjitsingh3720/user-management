import React from "react";
import styles from "./styles.module.css";

function TableHeader({ sort, setSort }) {
  return (
    <div className={styles.tableHeader}>
      <div className={styles.nameCell}>Name </div>
      <div className={styles.privilegeTypeCell}>Permission Type</div>
      <div className={styles.privilegeStatusCell}>Permission Status</div>
    </div>
  );
}

export default TableHeader;
