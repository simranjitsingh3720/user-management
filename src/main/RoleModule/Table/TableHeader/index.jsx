import React from "react";
import styles from "./styles.module.css";

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
      <div className={styles.nameCell} onClick={() => handleSort("roleName")}>
        Role Name {renderSortIcon("roleName")}
      </div>
      <div className={styles.groupNameCell}>Group Name</div>
      <div className={styles.createdAt} onClick={() => handleSort("createdAt")}>
        Created At
        {renderSortIcon("createdAt")}
      </div>{" "}
      <div className={styles.groupStatusCell}>Role Status</div>
      <div className={styles.actionCell}>Action</div>
    </div>
  );
}

export default TableHeader;
