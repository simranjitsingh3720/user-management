import React from "react";
import styles from "./styles.module.css";

function TableHeader({ sort, setSort }) {
  const handleSort = (sortKey) => {
    const newSortOrder = sort.sortOrder === "asc" ? "desc" : "asc";
    setSort({ sortKey, sortOrder: newSortOrder });
  };
  return (
    <div className={styles.tableHeader}>
      <div
        className={styles.nameCell}
        onClick={() => handleSort("permissionName")}
      >
        Name{" "}
        {sort?.sortKey === "permissionName" && (
          <span>{sort.sortOrder === "asc" ? " ▲" : " ▼"}</span>
        )}
      </div>
      <div className={styles.privilegeTypeCell}>Permission Type</div>
      <div className={styles.createdAt} onClick={() => handleSort("createdAt")}>
        Created At
        {sort?.sortKey === "createdAt" && (
          <span>{sort.sortOrder === "asc" ? " ▲" : " ▼"}</span>
        )}
      </div>{" "}
      <div className={styles.privilegeStatusCell}>Privilege Status</div>
      {/* <div className={styles.actionCell}>Action</div> */}
    </div>
  );
}

export default TableHeader;
