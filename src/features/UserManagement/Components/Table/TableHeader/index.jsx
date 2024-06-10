import React from "react";
import styles from "./styles.module.scss";

function TableHeader({ sort, setSort }) {
  const handleSort = (sortKey) => {
    const newSortOrder = sort.sortOrder === "asc" ? "desc" : "asc";
    setSort({ sortKey, sortOrder: newSortOrder });
  };
  return (
    <div className={styles.tableHeader}>
      <div className={styles.userIdCell}>User ID</div>
      <div className={styles.name}>Name</div>
      <div className={styles.loginIdCell}>NT/Email ID Login</div>
      <div className={styles.mobileCell}>Mobile No.</div>
      <div className={styles.roleCell}>Role</div>
      <div className={styles.dateCell} onClick={() => handleSort("createdAt")}>
        Date Of Creation
        {sort?.sortKey === "createdAt" && (
          <span>{sort.sortOrder === "asc" ? " ▲" : " ▼"}</span>
        )}
      </div>
      <div className={styles.insillionCell}>Insillion Status</div>
      <div className={styles.actionCell}>Action</div>
    </div>
  );
}

export default TableHeader;
