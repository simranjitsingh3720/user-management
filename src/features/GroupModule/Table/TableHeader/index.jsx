import React from "react";
import styles from "./styles.module.scss";

function TableHeader({ sort, setSort, setLoading }) {
  const handleSort = (sortKey) => {
    const newSortOrder = sort.sortOrder === "asc" ? "desc" : "asc";
    setSort({ sortKey, sortOrder: newSortOrder });
    setLoading(true);
  };

  const renderSortIcon = (sortKey) => {
    if (sort?.sortKey === sortKey) {
      return <span>{sort.sortOrder === "asc" ? " ▲" : " ▼"}</span>;
    }
    return <span> ↕</span>;
  };

  return (
    <div className={styles.tableHeader}>
      <div className={styles.nameCell}>
        Group Name
      </div>
      <div className={styles.createdAt} onClick={() => handleSort("createdAt")}>
        Created At
        {renderSortIcon("createdAt")}
      </div>
      <div className={styles.updatedAt} onClick={() => handleSort("updatedAt")}>
        Updated At {renderSortIcon("updatedAt")}
      </div>
      <div className={styles.groupStatusCell}>Group Status</div>
      <div className={styles.actionCell}>Action</div>
    </div>
  );
}

export default TableHeader;
