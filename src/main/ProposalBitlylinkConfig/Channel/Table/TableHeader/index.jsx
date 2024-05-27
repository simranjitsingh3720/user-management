import React from "react";
import styles from "./styles.module.css";

function TableHeader({ sort, setSort }) {
  const handleSort = (sortKey) => {
    const newSortOrder = sort.sortOrder === "asc" ? "desc" : "asc";
    setSort({ sortKey, sortOrder: newSortOrder });
  };

  const renderSortIcon = (sortKey) => {
    if (sort?.sortKey === sortKey) {
      return <span>{sort.sortOrder === "asc" ? " ▲" : " ▼"}</span>;
    }
    return <span> ↕</span>;
  };
  return (
    <div className={styles.tableHeader}>
      <div className={styles.nameCell} onClick={() => handleSort("type")}>
        Type{renderSortIcon("type")}
      </div>
      <div className={styles.nameCell}>Value</div>
      <div className={styles.nameCell}>Send Proposal Bitly Link</div>
      <div className={styles.createdAt} onClick={() => handleSort("createdAt")}>
        Created At {renderSortIcon("createdAt")}
      </div>
      <div className={styles.actionCell}>Action</div>
    </div>
  );
}

export default TableHeader;
