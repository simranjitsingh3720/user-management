import React from "react";
import styles from "./styles.module.css";

function TableHeader() {
  return (
    <div className={styles.tableHeader}>
      <div className={styles.nameCell}>Type</div>
      <div className={styles.nameCell}>Value</div>
      <div className={styles.nameCell}>Send Proposal Bitly Link</div>
      <div className={styles.actionCell}>Action</div>
    </div>
  );
}

export default TableHeader;
