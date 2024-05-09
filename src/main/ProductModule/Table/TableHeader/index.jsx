import React from "react";
import styles from "./styles.module.css";

function TableHeader({ sort, setSort }) {
  const handleSort = (sortKey) => {
    const newSortOrder = sort.sortOrder === "asc" ? "desc" : "asc";
    setSort({ sortKey, sortOrder: newSortOrder });
  };
  return (
    <div className={styles.tableHeader}>
      <div className={styles.name}>Product Name</div>
      <div className={styles.productValue}>Product Value</div>
      <div className={styles.lobName}>LOB Name</div>
      <div className={styles.productCode}>Product Code</div>
      <div className={styles.createdAt} onClick={() => handleSort("createdAt")}>
        Created At
        {sort?.sortKey === "createdAt" && (
          <span>{sort.sortOrder === "asc" ? " ▲" : " ▼"}</span>
        )}
      </div>{" "}
      <div className={styles.productStatus}>Status</div>
    </div>
  );
}

export default TableHeader;
