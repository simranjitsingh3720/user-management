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
      <div className={styles.code}>Producer Code</div>
      <div className={styles.producerName}>Producer Name</div>
      <div className={styles.unlockedDays}>Unlocked days</div>
      <div className={styles.startDate} onClick={() => handleSort("startDate")}>
        Start Date {renderSortIcon("startDate")}
      </div>
      <div className={styles.endDate} onClick={() => handleSort("endDate")}>
        End Date {renderSortIcon("endDate")}
      </div>
      <div className={styles.reason} onClick={() => handleSort("reason")}>
        Reason {renderSortIcon("reason")}
      </div>
      <div className={styles.createdAt} onClick={() => handleSort("createdAt")}>
        Created At
        {renderSortIcon("createdAt")}
      </div>{" "}
      <div className={styles.updatedAt} onClick={() => handleSort("updatedAt")}>
        updated At
        {renderSortIcon("updatedAt")}
      </div>{" "}
      <div className={styles.productStatus}>Action</div>
    </div>
  );
}

export default TableHeader;
