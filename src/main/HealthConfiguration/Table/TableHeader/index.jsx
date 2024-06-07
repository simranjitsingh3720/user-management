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
      <div className={styles.producerCode}>Producer</div>
      <div className={styles.isExistingCustomer}>
        Medicare Existing TATA AIG General Insurance Customer
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
