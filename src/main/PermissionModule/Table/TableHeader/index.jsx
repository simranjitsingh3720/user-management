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
      <div
        className={styles.nameCell}
        onClick={() => handleSort("permissionName")}
      >
        Name {renderSortIcon("permissionName")}
      </div>
      <div
        className={styles.privilegeTypeCell}
        onClick={() => handleSort("permissionType")}
      >
        Permission Type {renderSortIcon("permissionType")}
      </div>
      <div className={styles.createdAt} onClick={() => handleSort("createdAt")}>
        Created At {renderSortIcon("createdAt")}
      </div>
      <div className={styles.updatedAt} onClick={() => handleSort("updatedAt")}>
        Updated At {renderSortIcon("updatedAt")}
      </div>
      <div className={styles.privilegeStatusCell}>Privilege Status</div>
    </div>
  );
}

export default TableHeader;
