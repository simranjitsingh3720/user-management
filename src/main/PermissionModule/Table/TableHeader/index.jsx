import React from "react";
import styles from "./styles.module.css";

function TableHeader() {
  return (
    <div className={styles.tableHeader}>
      <div className={styles.nameCell}>Name</div>
      <div className={styles.privilegeTypeCell}>Permission Type</div>
      {/* <div className={styles.moduleCell}>Module/Sub-Module</div> */}
      {/* <div className={styles.apiCell}>API</div>
      <div className={styles.crudCell}>Crud</div> */}
      <div className={styles.privilegeStatusCell}>Privilege Status</div>
      <div className={styles.actionCell}>Action</div>
    </div>
  );
}

export default TableHeader;
