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
      <div className={styles.name} onClick={() => handleSort("product")}>
        Product Name {renderSortIcon("product")}
      </div>
      <div
        className={styles.productValue}
        onClick={() => handleSort("product_value")}
      >
        Product Value {renderSortIcon("product_value")}
      </div>
      <div className={styles.lobName}>LOB Name</div>
      <div
        className={styles.productCode}
        onClick={() => handleSort("product_code")}
      >
        Product Code {renderSortIcon("product_code")}
      </div>
      <div className={styles.createdAt} onClick={() => handleSort("createdAt")}>
        Created At
        {renderSortIcon("createdAt")}
      </div>{" "}
      <div className={styles.productStatus}>Status</div>
    </div>
  );
}

export default TableHeader;
