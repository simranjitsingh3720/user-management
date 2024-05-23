import React from "react";
import styles from "./styles.module.css";

function TableHeader({ sort, setSort, setLoading }) {
  return (
    <div className={styles.tableHeader}>
      <div className={styles.type}>Type</div>
      <div className={styles.value}>Values</div>
      <div className={styles.action}>Actions</div>
    </div>
  );
}

export default TableHeader;
