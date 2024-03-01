import React from "react";
import styles from "./styles.module.css";

function TableHeader() {
  return (
    <div className={styles.tableHeader}>
      <div className={styles.userIdCell}>User ID</div>
      <div className={styles.loginIdCell}>NT/Email ID Login</div>
      <div className={styles.mobileCell}>Mobile No.</div>
      <div className={styles.roleCell}>Role</div>
      <div className={styles.dateCell}> Date Of Creation</div>
      <div className={styles.insillionCell}>Insillion Status</div>
      <div className={styles.actionCell}>Action</div>
    </div>
  );
}

export default TableHeader;
