import React from "react";
import styles from "./styles.module.css";

function TableHeader({ sort, setSort, setLoading }) {
  const handleSort = (sortKey) => {
    const newSortOrder = sort.sortOrder === "asc" ? "desc" : "asc";
    setSort({ sortKey, sortOrder: newSortOrder });
    setLoading(true);
  };
  return (
    <div className={styles.tableHeader}>
      <div className={styles.name}>LOB Name</div>
      <div className={styles.lobValue}>LOB Value</div>
      <div className={styles.lobLevel}>LOB Level</div>
      <div className={styles.lobCode}>LOB Code</div>
      <div className={styles.lobCreated}>LOB Created</div>
      <div className={styles.createdAt} onClick={() => handleSort("createdAt")}>
        Created At
        {sort?.sortKey === "createdAt" && (
          <span>{sort.sortOrder === "asc" ? " ▲" : " ▼"}</span>
        )}
      </div>{" "}
      <div className={styles.lobStatus}>Status</div>
    </div>
  );
}

export default TableHeader;
