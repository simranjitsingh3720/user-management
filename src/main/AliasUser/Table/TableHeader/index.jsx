import React from "react";
import styles from "./styles.module.scss";

function TableHeader({ sort, setSort }) {
  return (
    <div className={styles.tableHeader}>
      <div className={styles.code}>Producer Code</div>
      <div className={styles.code}>Producer Email</div>
      <div className={styles.code}>Alias Email</div>
      <div className={styles.code}>First Name</div>
      <div className={styles.code}>Last Name</div>
      <div className={styles.code}>User Created</div>
      <div className={styles.code}>Status</div>
    </div>
  );
}

export default TableHeader;
