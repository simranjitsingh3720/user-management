import React from "react";
import styles from "./styles.module.scss";

function TableHeader({ sort, setSort, setLoading }) {
  return (
    <div className={styles.tableHeader}>
      <div className={styles.type}>Type</div>
      <div className={styles.value}>Name</div>
      <div className={styles.value}>Values</div>
      <div className={styles.action}>Status</div>
    </div>
  );
}

export default TableHeader;
