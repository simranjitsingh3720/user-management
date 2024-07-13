import React from "react";
import styles from "./styles.module.scss";

function TableHeader({ sort, setSort, canUpdate }) {
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
        className={styles.houseBankCode}
      >
        House Bank Code
      </div>
      <div
        className={styles.bankCode}
      >
        Bank Code
      </div>
      <div
        className={styles.branchName}
      >
        Branch Name
      </div>
      <div
        className={styles.accountNumber}
      >
        Account Number
      </div>
      <div className={styles.createdAt} onClick={() => handleSort("createdAt")}>
        Created At
        {renderSortIcon("createdAt")}
      </div>{" "}
      <div className={styles.createdAt} onClick={() => handleSort("updatedAt")}>
        Updated At
        {renderSortIcon("updatedAt")}
      </div>
      {canUpdate && (<div className={styles.actionCell}>Action</div>)}
    </div>
  );
}

export default TableHeader;
