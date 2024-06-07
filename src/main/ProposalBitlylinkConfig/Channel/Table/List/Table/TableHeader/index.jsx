import React from "react";
import styles from "./styles.module.scss";

function TableHeader({ sort, setSort }) {
  return (
    <div className={styles.tableHeader}>
      <div className={styles.nameCell}>Product Name</div>
      <div className={styles.nameCell}>Product Code</div>
      <div className={styles.privilegeTypeCell}>Member is employee</div>
    </div>
  );
}

export default TableHeader;
