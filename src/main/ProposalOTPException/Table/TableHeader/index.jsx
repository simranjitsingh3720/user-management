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
      <div className={styles.type}>Type</div>
      <div className={styles.type}>Name</div>
      <div className={styles.value}>Value</div>
      <div className={styles.lobName}>LOB</div>
      <div className={styles.product}>Product</div>
      <div className={styles.startDate} onClick={() => handleSort("startDate")}>
        Start Date {renderSortIcon("startDate")}
      </div>
      <div className={styles.endDate} onClick={() => handleSort("endDate")}>
        End Date {renderSortIcon("endDate")}
      </div>
      <div className={styles.createdAt} onClick={() => handleSort("createdAt")}>
        Created At
        {renderSortIcon("createdAt")}
      </div>{" "}
      <div className={styles.productStatus}>Status</div>
      <div className={styles.editStatus}>Edit</div>
    </div>
  );
}

export default TableHeader;
