import React from "react";
import styles from "./styles.module.scss";

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
        className={styles.houseBankCode}
        onClick={() => handleSort("houseBankCode")}
      >
        House Bank Code {renderSortIcon("houseBankCode")}
      </div>
      <div
        className={styles.bankCode}
        onClick={() => handleSort("houseBankCode")}
      >
        Bank Code
      </div>
      <div
        className={styles.branchName}
        onClick={() => handleSort("branchName")}
      >
        Branch Name {renderSortIcon("branchName")}
      </div>
      <div
        className={styles.accountNumber}
        onClick={() => handleSort("accountNumber")}
      >
        Account Number {renderSortIcon("accountNumber")}
      </div>
      <div className={styles.createdAt} onClick={() => handleSort("createdAt")}>
        Created At
        {renderSortIcon("createdAt")}
      </div>{" "}
      <div className={styles.createdAt} onClick={() => handleSort("updatedAt")}>
        Updated At
        {renderSortIcon("updatedAt")}
      </div>
      <div className={styles.actionCell}>Action</div>
    </div>
  );
}

export default TableHeader;
