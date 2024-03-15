import React from "react";
import styles from "./styles.module.css";

function TableHeader() {
  return (
    <div className={styles.tableHeader}>
      <div className={styles.nameCell}>Role Name</div>
      <div className={styles.roleStatusCell}>Role Status</div>
      <div className={styles.actionCell}>Action</div>
    </div>
  );
}

export default TableHeader;
