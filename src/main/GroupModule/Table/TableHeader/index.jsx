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
      <div className={styles.nameCell}>Group Name</div>
      <div className={styles.createdAt} onClick={() => handleSort("createdAt")}>
        Created At
        {sort?.sortKey === "createdAt" && (
          <span>{sort.sortOrder === "asc" ? " ▲" : " ▼"}</span>
        )}
      </div>{" "}
      <div className={styles.groupStatusCell}>Group Status</div>
      <div className={styles.actionCell}>Action</div>
    </div>
  );
}

export default TableHeader;
